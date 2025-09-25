import db from '../database/LocalDatabase.js';

export class UserModel {
    constructor(data = {}) {
        this.id = data.id;
        this.username = data.username || '';
        this.email = data.email || '';
        this.password = data.password || ''; // En producción esto debe estar hasheado
        this.profile = {
            displayName: data.profile?.displayName || '',
            bio: data.profile?.bio || '',
            avatar: data.profile?.avatar || '',
            banner: data.profile?.banner || '',
            birthDate: data.profile?.birthDate || null,
            location: data.profile?.location || '',
            website: data.profile?.website || '',
            favoriteGenres: data.profile?.favoriteGenres || [],
            stats: data.profile?.stats || {
                animeWatched: 0,
                episodesWatched: 0,
                daysWatched: 0,
                meanScore: 0
            }
        };
        this.preferences = {
            language: data.preferences?.language || 'es',
            theme: data.preferences?.theme || 'light',
            adultContent: data.preferences?.adultContent || false,
            notifications: data.preferences?.notifications || {
                newEpisodes: true,
                forumReplies: true,
                friendRequests: true,
                recommendations: false
            },
            privacy: data.preferences?.privacy || {
                profileVisibility: 'public',
                listVisibility: 'public',
                activityVisibility: 'friends'
            }
        };
        this.isVerified = data.isVerified || false;
        this.isActive = data.isActive !== false;
        this.role = data.role || 'user'; // user, moderator, admin
        this.lastLoginAt = data.lastLoginAt || null;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }

    save() {
        if (this.id) {
            return db.update('users', this.id, this.toJSON());
        } else {
            const saved = db.create('users', this.toJSON());
            this.id = saved.id;
            this.createdAt = saved.createdAt;
            this.updatedAt = saved.updatedAt;
            return saved;
        }
    }

    delete() {
        if (this.id) {
            return db.delete('users', this.id);
        }
        return null;
    }

    static findById(id) {
        const data = db.findById('users', id);
        return data ? new UserModel(data) : null;
    }

    static findByUsername(username) {
        const users = db.findWhere('users', { username });
        return users.length > 0 ? new UserModel(users[0]) : null;
    }

    static findByEmail(email) {
        const users = db.findWhere('users', { email });
        return users.length > 0 ? new UserModel(users[0]) : null;
    }

    static findAll() {
        const data = db.findAll('users');
        return data.map(item => new UserModel(item));
    }

    static search(query) {
        const data = db.search('users', query);
        return data.map(item => new UserModel(item));
    }

    static authenticate(username, password) {
        const user = this.findByUsername(username) || this.findByEmail(username);
        if (user && user.password === password && user.isActive) {
            user.lastLoginAt = new Date().toISOString();
            user.save();
            return user;
        }
        return null;
    }

    static register(userData) {
        const existingUser = this.findByUsername(userData.username) || this.findByEmail(userData.email);
        if (existingUser) {
            throw new Error('Usuario o email ya existe');
        }

        const newUser = new UserModel(userData);
        return newUser.save();
    }

    updateProfile(profileData) {
        this.profile = { ...this.profile, ...profileData };
        return this.save();
    }

    updatePreferences(preferencesData) {
        this.preferences = { ...this.preferences, ...preferencesData };
        return this.save();
    }

    changePassword(newPassword) {
        this.password = newPassword;
        return this.save();
    }

    getAnimeList(status = null) {
        const userLists = status
            ? db.findWhere('userLists', { userId: this.id, status })
            : db.findWhere('userLists', { userId: this.id });

        return userLists.map(list => ({
            ...list,
            anime: db.findById('animes', list.animeId)
        }));
    }

    addAnimeToList(animeId, status, score = 0, progress = 0) {
        const existingList = db.findWhere('userLists', { userId: this.id, animeId });

        if (existingList.length > 0) {
            return db.update('userLists', existingList[0].id, {
                status,
                score,
                progress,
                updatedAt: new Date().toISOString()
            });
        } else {
            return db.create('userLists', {
                userId: this.id,
                animeId,
                status,
                score,
                progress,
                startDate: status === 'watching' ? new Date().toISOString() : null,
                finishDate: status === 'completed' ? new Date().toISOString() : null
            });
        }
    }

    removeAnimeFromList(animeId) {
        const userList = db.findWhere('userLists', { userId: this.id, animeId });
        if (userList.length > 0) {
            return db.delete('userLists', userList[0].id);
        }
        return null;
    }

    updateAnimeProgress(animeId, progress, score = null) {
        const userList = db.findWhere('userLists', { userId: this.id, animeId });
        if (userList.length > 0) {
            const updateData = { progress };
            if (score !== null) updateData.score = score;

            const anime = db.findById('animes', animeId);
            if (anime && progress >= anime.episodes && anime.episodes > 0) {
                updateData.status = 'completed';
                updateData.finishDate = new Date().toISOString();
            }

            return db.update('userLists', userList[0].id, updateData);
        }
        return null;
    }

    calculateStats() {
        const userLists = this.getAnimeList();
        const completedAnimes = userLists.filter(list => list.status === 'completed');

        const stats = {
            animeWatched: completedAnimes.length,
            episodesWatched: completedAnimes.reduce((total, list) => {
                return total + (list.anime?.episodes || 0);
            }, 0),
            daysWatched: completedAnimes.reduce((total, list) => {
                const episodes = list.anime?.episodes || 0;
                const duration = list.anime?.duration || 24; // default 24 min
                return total + (episodes * duration);
            }, 0) / (24 * 60), // convert to days
            meanScore: completedAnimes.length > 0
                ? completedAnimes.reduce((total, list) => total + (list.score || 0), 0) / completedAnimes.length
                : 0
        };

        this.profile.stats = stats;
        this.save();
        return stats;
    }

    getFriends() {
        // Simular sistema de amigos
        const connections = db.findWhere('connections', {
            $or: [
                { fromUserId: this.id, status: 'accepted' },
                { toUserId: this.id, status: 'accepted' }
            ]
        });

        return connections.map(conn => {
            const friendId = conn.fromUserId === this.id ? conn.toUserId : conn.fromUserId;
            return db.findById('users', friendId);
        }).filter(Boolean).map(user => new UserModel(user));
    }

    sendFriendRequest(toUserId) {
        const existingConnection = db.findWhere('connections', {
            fromUserId: this.id,
            toUserId
        });

        if (existingConnection.length > 0) {
            throw new Error('Ya existe una solicitud de amistad');
        }

        return db.create('connections', {
            fromUserId: this.id,
            toUserId,
            status: 'pending'
        });
    }

    toJSON() {
        const { password, ...userWithoutPassword } = {
            id: this.id,
            username: this.username,
            email: this.email,
            password: this.password,
            profile: this.profile,
            preferences: this.preferences,
            isVerified: this.isVerified,
            isActive: this.isActive,
            role: this.role,
            lastLoginAt: this.lastLoginAt,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };

        // Solo incluir password si es necesario (para guardado)
        return this.id ? userWithoutPassword : { password, ...userWithoutPassword };
    }
}
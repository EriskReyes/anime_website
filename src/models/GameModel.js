import db from '../database/LocalDatabase.js';

export class GameModel {
    constructor(data = {}) {
        this.id = data.id;
        this.title = data.title || '';
        this.alternativeTitles = data.alternativeTitles || [];
        this.description = data.description || '';
        this.genres = data.genres || [];
        this.status = data.status || 'released'; // released, early_access, upcoming, cancelled
        this.platform = data.platform || []; // PC, PlayStation, Xbox, Nintendo Switch, Mobile
        this.rating = data.rating || 0;
        this.popularity = data.popularity || 0;
        this.releaseDate = data.releaseDate || null;
        this.developer = data.developer || '';
        this.publisher = data.publisher || '';
        this.price = data.price || 0;
        this.currency = data.currency || 'EUR';
        this.images = data.images || {
            poster: '',
            banner: '',
            screenshots: []
        };
        this.trailer = data.trailer || '';
        this.features = data.features || []; // Multiplayer, Single Player, Co-op, etc.
        this.systemRequirements = data.systemRequirements || {
            minimum: {},
            recommended: {}
        };
        this.dlc = data.dlc || [];
        this.statistics = data.statistics || {
            playing: 0,
            completed: 0,
            wishlist: 0,
            owned: 0
        };
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }

    save() {
        if (this.id) {
            return db.update('games', this.id, this.toJSON());
        } else {
            const saved = db.create('games', this.toJSON());
            this.id = saved.id;
            this.createdAt = saved.createdAt;
            this.updatedAt = saved.updatedAt;
            return saved;
        }
    }

    delete() {
        if (this.id) {
            return db.delete('games', this.id);
        }
        return null;
    }

    static findById(id) {
        const data = db.findById('games', id);
        return data ? new GameModel(data) : null;
    }

    static findAll() {
        const data = db.findAll('games');
        return data.map(item => new GameModel(item));
    }

    static search(query) {
        const data = db.search('games', query);
        return data.map(item => new GameModel(item));
    }

    static findByGenre(genre) {
        const data = db.findWhere('games', {});
        return data.filter(item => item.genres.includes(genre))
                  .map(item => new GameModel(item));
    }

    static findByStatus(status) {
        const data = db.findWhere('games', { status });
        return data.map(item => new GameModel(item));
    }

    static findByPlatform(platform) {
        const data = db.findAll('games');
        return data.filter(item => item.platform && item.platform.includes(platform))
                  .map(item => new GameModel(item));
    }

    static getTrending(limit = 10) {
        const data = db.findAll('games');
        return data.sort((a, b) => b.popularity - a.popularity)
                  .slice(0, limit)
                  .map(item => new GameModel(item));
    }

    static getTopRated(limit = 10) {
        const data = db.findAll('games');
        return data.sort((a, b) => b.rating - a.rating)
                  .slice(0, limit)
                  .map(item => new GameModel(item));
    }

    static getNewReleases(limit = 10) {
        const data = db.findAll('games');
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        return data.filter(item => new Date(item.releaseDate) >= thirtyDaysAgo)
                  .sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate))
                  .slice(0, limit)
                  .map(item => new GameModel(item));
    }

    addToUserLibrary(userId, status) {
        const userLibrary = db.findWhere('userGameLibrary', { userId, gameId: this.id });

        if (userLibrary.length > 0) {
            return db.update('userGameLibrary', userLibrary[0].id, { status });
        } else {
            return db.create('userGameLibrary', {
                userId,
                gameId: this.id,
                status, // playing, completed, wishlist, owned
                playtime: 0,
                achievements: [],
                purchaseDate: status === 'owned' ? new Date().toISOString() : null,
                score: 0
            });
        }
    }

    updateStatistics() {
        const userLibrary = db.findWhere('userGameLibrary', { gameId: this.id });
        const stats = {
            playing: 0,
            completed: 0,
            wishlist: 0,
            owned: 0
        };

        userLibrary.forEach(library => {
            if (stats[library.status] !== undefined) {
                stats[library.status]++;
            }
        });

        this.statistics = stats;
        return this.save();
    }

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            alternativeTitles: this.alternativeTitles,
            description: this.description,
            genres: this.genres,
            status: this.status,
            platform: this.platform,
            rating: this.rating,
            popularity: this.popularity,
            releaseDate: this.releaseDate,
            developer: this.developer,
            publisher: this.publisher,
            price: this.price,
            currency: this.currency,
            images: this.images,
            trailer: this.trailer,
            features: this.features,
            systemRequirements: this.systemRequirements,
            dlc: this.dlc,
            statistics: this.statistics,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}
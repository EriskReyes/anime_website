import db from '../database/LocalDatabase.js';

export class AnimeModel {
    constructor(data = {}) {
        this.id = data.id;
        this.title = data.title || '';
        this.alternativeTitles = data.alternativeTitles || [];
        this.synopsis = data.synopsis || '';
        this.genres = data.genres || [];
        this.status = data.status || 'ongoing'; // ongoing, completed, upcoming
        this.type = data.type || 'TV'; // TV, Movie, OVA, Special
        this.episodes = data.episodes || 0;
        this.duration = data.duration || 0; // minutes per episode
        this.rating = data.rating || 0; // average rating
        this.popularity = data.popularity || 0;
        this.releaseDate = data.releaseDate || null;
        this.endDate = data.endDate || null;
        this.studio = data.studio || '';
        this.source = data.source || ''; // Manga, Light Novel, Original, etc.
        this.images = data.images || {
            poster: '',
            banner: '',
            screenshots: []
        };
        this.trailer = data.trailer || '';
        this.characters = data.characters || [];
        this.staff = data.staff || [];
        this.themes = data.themes || {
            opening: [],
            ending: []
        };
        this.statistics = data.statistics || {
            watching: 0,
            completed: 0,
            onHold: 0,
            dropped: 0,
            planToWatch: 0
        };
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }

    save() {
        if (this.id) {
            return db.update('animes', this.id, this.toJSON());
        } else {
            const saved = db.create('animes', this.toJSON());
            this.id = saved.id;
            this.createdAt = saved.createdAt;
            this.updatedAt = saved.updatedAt;
            return saved;
        }
    }

    delete() {
        if (this.id) {
            return db.delete('animes', this.id);
        }
        return null;
    }

    static findById(id) {
        const data = db.findById('animes', id);
        return data ? new AnimeModel(data) : null;
    }

    static findAll() {
        const data = db.findAll('animes');
        return data.map(item => new AnimeModel(item));
    }

    static search(query) {
        const data = db.search('animes', query);
        return data.map(item => new AnimeModel(item));
    }

    static findByGenre(genre) {
        const data = db.findWhere('animes', {});
        return data.filter(item => item.genres.includes(genre))
                  .map(item => new AnimeModel(item));
    }

    static findByStatus(status) {
        const data = db.findWhere('animes', { status });
        return data.map(item => new AnimeModel(item));
    }

    static findByType(type) {
        const data = db.findWhere('animes', { type });
        return data.map(item => new AnimeModel(item));
    }

    static getTrending(limit = 10) {
        const data = db.findAll('animes');
        return data.sort((a, b) => b.popularity - a.popularity)
                  .slice(0, limit)
                  .map(item => new AnimeModel(item));
    }

    static getTopRated(limit = 10) {
        const data = db.findAll('animes');
        return data.sort((a, b) => b.rating - a.rating)
                  .slice(0, limit)
                  .map(item => new AnimeModel(item));
    }

    addToUserList(userId, status) {
        const userLists = db.findWhere('userLists', { userId, animeId: this.id });

        if (userLists.length > 0) {
            return db.update('userLists', userLists[0].id, { status });
        } else {
            return db.create('userLists', {
                userId,
                animeId: this.id,
                status, // watching, completed, onHold, dropped, planToWatch
                progress: 0,
                score: 0,
                startDate: null,
                finishDate: null
            });
        }
    }

    updateStatistics() {
        const userLists = db.findWhere('userLists', { animeId: this.id });
        const stats = {
            watching: 0,
            completed: 0,
            onHold: 0,
            dropped: 0,
            planToWatch: 0
        };

        userLists.forEach(list => {
            if (stats[list.status] !== undefined) {
                stats[list.status]++;
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
            synopsis: this.synopsis,
            genres: this.genres,
            status: this.status,
            type: this.type,
            episodes: this.episodes,
            duration: this.duration,
            rating: this.rating,
            popularity: this.popularity,
            releaseDate: this.releaseDate,
            endDate: this.endDate,
            studio: this.studio,
            source: this.source,
            images: this.images,
            trailer: this.trailer,
            characters: this.characters,
            staff: this.staff,
            themes: this.themes,
            statistics: this.statistics,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}
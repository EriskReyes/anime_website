import db from '../database/LocalDatabase.js';

export class ReviewModel {
    constructor(data = {}) {
        this.id = data.id;
        this.userId = data.userId || null;
        this.animeId = data.animeId || null;
        this.title = data.title || '';
        this.content = data.content || '';
        this.rating = data.rating || 0; // 1-10 scale
        this.categories = {
            story: data.categories?.story || 0,
            animation: data.categories?.animation || 0,
            sound: data.categories?.sound || 0,
            character: data.categories?.character || 0,
            enjoyment: data.categories?.enjoyment || 0
        };
        this.pros = data.pros || [];
        this.cons = data.cons || [];
        this.recommendedFor = data.recommendedFor || [];
        this.spoilerLevel = data.spoilerLevel || 'none'; // none, minor, major
        this.helpfulVotes = data.helpfulVotes || 0;
        this.notHelpfulVotes = data.notHelpfulVotes || 0;
        this.status = data.status || 'published'; // draft, published, hidden
        this.episodeWatched = data.episodeWatched || 0;
        this.tags = data.tags || [];
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }

    save() {
        this.calculateOverallRating();

        if (this.id) {
            return db.update('reviews', this.id, this.toJSON());
        } else {
            const saved = db.create('reviews', this.toJSON());
            this.id = saved.id;
            this.createdAt = saved.createdAt;
            this.updatedAt = saved.updatedAt;
            return saved;
        }
    }

    delete() {
        if (this.id) {
            return db.delete('reviews', this.id);
        }
        return null;
    }

    calculateOverallRating() {
        const categoryRatings = Object.values(this.categories).filter(rating => rating > 0);
        if (categoryRatings.length > 0) {
            this.rating = Math.round(
                categoryRatings.reduce((sum, rating) => sum + rating, 0) / categoryRatings.length * 10
            ) / 10;
        }
    }

    static findById(id) {
        const data = db.findById('reviews', id);
        return data ? new ReviewModel(data) : null;
    }

    static findAll() {
        const data = db.findAll('reviews');
        return data.map(item => new ReviewModel(item));
    }

    static findByAnime(animeId, options = {}) {
        let reviews = db.findWhere('reviews', { animeId, status: 'published' });

        // Sort options
        switch (options.sortBy) {
            case 'newest':
                reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case 'oldest':
                reviews.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            case 'helpful':
                reviews.sort((a, b) => b.helpfulVotes - a.helpfulVotes);
                break;
            case 'rating_high':
                reviews.sort((a, b) => b.rating - a.rating);
                break;
            case 'rating_low':
                reviews.sort((a, b) => a.rating - b.rating);
                break;
            default:
                reviews.sort((a, b) => b.helpfulVotes - a.helpfulVotes);
        }

        // Filter by spoiler level
        if (options.spoilerFilter) {
            reviews = reviews.filter(review => {
                switch (options.spoilerFilter) {
                    case 'none':
                        return review.spoilerLevel === 'none';
                    case 'minor':
                        return ['none', 'minor'].includes(review.spoilerLevel);
                    case 'all':
                    default:
                        return true;
                }
            });
        }

        // Limit results
        if (options.limit) {
            reviews = reviews.slice(0, options.limit);
        }

        return reviews.map(item => new ReviewModel(item));
    }

    static findByUser(userId) {
        const data = db.findWhere('reviews', { userId });
        return data.map(item => new ReviewModel(item));
    }

    static getTopReviews(limit = 10) {
        const reviews = db.findWhere('reviews', { status: 'published' });
        return reviews
            .sort((a, b) => (b.helpfulVotes - b.notHelpfulVotes) - (a.helpfulVotes - a.notHelpfulVotes))
            .slice(0, limit)
            .map(item => new ReviewModel(item));
    }

    static getRecentReviews(limit = 10) {
        const reviews = db.findWhere('reviews', { status: 'published' });
        return reviews
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, limit)
            .map(item => new ReviewModel(item));
    }

    static search(query, filters = {}) {
        let reviews = db.search('reviews', query);

        // Apply filters
        if (filters.animeId) {
            reviews = reviews.filter(review => review.animeId === filters.animeId);
        }

        if (filters.userId) {
            reviews = reviews.filter(review => review.userId === filters.userId);
        }

        if (filters.minRating) {
            reviews = reviews.filter(review => review.rating >= filters.minRating);
        }

        if (filters.maxRating) {
            reviews = reviews.filter(review => review.rating <= filters.maxRating);
        }

        if (filters.spoilerLevel) {
            reviews = reviews.filter(review => review.spoilerLevel === filters.spoilerLevel);
        }

        return reviews
            .filter(review => review.status === 'published')
            .map(item => new ReviewModel(item));
    }

    markHelpful(userId) {
        // Check if user already voted
        const existingVote = db.findWhere('reviewVotes', { reviewId: this.id, userId });

        if (existingVote.length > 0) {
            const vote = existingVote[0];
            if (vote.type === 'helpful') {
                return false; // Already voted helpful
            } else {
                // Change vote from not helpful to helpful
                db.update('reviewVotes', vote.id, { type: 'helpful' });
                this.helpfulVotes++;
                this.notHelpfulVotes = Math.max(0, this.notHelpfulVotes - 1);
            }
        } else {
            // New helpful vote
            db.create('reviewVotes', {
                reviewId: this.id,
                userId,
                type: 'helpful'
            });
            this.helpfulVotes++;
        }

        this.save();
        return true;
    }

    markNotHelpful(userId) {
        // Check if user already voted
        const existingVote = db.findWhere('reviewVotes', { reviewId: this.id, userId });

        if (existingVote.length > 0) {
            const vote = existingVote[0];
            if (vote.type === 'not_helpful') {
                return false; // Already voted not helpful
            } else {
                // Change vote from helpful to not helpful
                db.update('reviewVotes', vote.id, { type: 'not_helpful' });
                this.notHelpfulVotes++;
                this.helpfulVotes = Math.max(0, this.helpfulVotes - 1);
            }
        } else {
            // New not helpful vote
            db.create('reviewVotes', {
                reviewId: this.id,
                userId,
                type: 'not_helpful'
            });
            this.notHelpfulVotes++;
        }

        this.save();
        return true;
    }

    getUserVote(userId) {
        const vote = db.findWhere('reviewVotes', { reviewId: this.id, userId });
        return vote.length > 0 ? vote[0].type : null;
    }

    getHelpfulnessRatio() {
        const totalVotes = this.helpfulVotes + this.notHelpfulVotes;
        return totalVotes > 0 ? (this.helpfulVotes / totalVotes) * 100 : 0;
    }

    addComment(userId, content) {
        return db.create('reviewComments', {
            reviewId: this.id,
            userId,
            content,
            status: 'published'
        });
    }

    getComments() {
        const comments = db.findWhere('reviewComments', {
            reviewId: this.id,
            status: 'published'
        });
        return comments.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    // Get enriched data with user and anime info
    getEnrichedData() {
        const user = db.findById('users', this.userId);
        const anime = db.findById('animes', this.animeId);

        return {
            ...this.toJSON(),
            user: user ? {
                id: user.id,
                username: user.username,
                profile: user.profile
            } : null,
            anime: anime ? {
                id: anime.id,
                title: anime.title,
                images: anime.images
            } : null
        };
    }

    toJSON() {
        return {
            id: this.id,
            userId: this.userId,
            animeId: this.animeId,
            title: this.title,
            content: this.content,
            rating: this.rating,
            categories: this.categories,
            pros: this.pros,
            cons: this.cons,
            recommendedFor: this.recommendedFor,
            spoilerLevel: this.spoilerLevel,
            helpfulVotes: this.helpfulVotes,
            notHelpfulVotes: this.notHelpfulVotes,
            status: this.status,
            episodeWatched: this.episodeWatched,
            tags: this.tags,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}
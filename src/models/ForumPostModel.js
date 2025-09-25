import db from '../database/LocalDatabase.js';

export class ForumPostModel {
    constructor(data = {}) {
        this.id = data.id;
        this.title = data.title || '';
        this.content = data.content || '';
        this.authorId = data.authorId || null;
        this.category = data.category || 'general'; // general, anime-discussion, recommendations, help, off-topic
        this.subcategory = data.subcategory || null;
        this.tags = data.tags || [];
        this.animeId = data.animeId || null; // If discussing specific anime
        this.type = data.type || 'discussion'; // discussion, question, announcement, poll
        this.status = data.status || 'published'; // draft, published, locked, hidden
        this.isPinned = data.isPinned || false;
        this.isLocked = data.isLocked || false;
        this.views = data.views || 0;
        this.replies = data.replies || 0;
        this.likes = data.likes || 0;
        this.lastReplyAt = data.lastReplyAt || null;
        this.lastReplyBy = data.lastReplyBy || null;
        this.pollOptions = data.pollOptions || null; // For poll type posts
        this.attachments = data.attachments || [];
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }

    save() {
        if (this.id) {
            return db.update('forumPosts', this.id, this.toJSON());
        } else {
            const saved = db.create('forumPosts', this.toJSON());
            this.id = saved.id;
            this.createdAt = saved.createdAt;
            this.updatedAt = saved.updatedAt;
            return saved;
        }
    }

    delete() {
        if (this.id) {
            // Also delete all replies
            const replies = db.findWhere('forumReplies', { postId: this.id });
            replies.forEach(reply => {
                db.delete('forumReplies', reply.id);
            });

            return db.delete('forumPosts', this.id);
        }
        return null;
    }

    static findById(id) {
        const data = db.findById('forumPosts', id);
        if (data) {
            // Increment view count
            db.update('forumPosts', id, { views: data.views + 1 });
            data.views += 1;
            return new ForumPostModel(data);
        }
        return null;
    }

    static findAll(options = {}) {
        let posts = db.findWhere('forumPosts', { status: 'published' });

        // Filter by category
        if (options.category) {
            posts = posts.filter(post => post.category === options.category);
        }

        // Filter by subcategory
        if (options.subcategory) {
            posts = posts.filter(post => post.subcategory === options.subcategory);
        }

        // Filter by anime
        if (options.animeId) {
            posts = posts.filter(post => post.animeId === options.animeId);
        }

        // Filter by type
        if (options.type) {
            posts = posts.filter(post => post.type === options.type);
        }

        // Sort options
        switch (options.sortBy) {
            case 'newest':
                posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case 'oldest':
                posts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            case 'most_replies':
                posts.sort((a, b) => b.replies - a.replies);
                break;
            case 'most_views':
                posts.sort((a, b) => b.views - a.views);
                break;
            case 'most_likes':
                posts.sort((a, b) => b.likes - a.likes);
                break;
            case 'last_activity':
            default:
                posts.sort((a, b) => {
                    const aActivity = a.lastReplyAt || a.createdAt;
                    const bActivity = b.lastReplyAt || b.createdAt;
                    return new Date(bActivity) - new Date(aActivity);
                });
        }

        // Prioritize pinned posts
        posts.sort((a, b) => {
            if (a.isPinned && !b.isPinned) return -1;
            if (!a.isPinned && b.isPinned) return 1;
            return 0;
        });

        // Limit results
        if (options.limit) {
            posts = posts.slice(0, options.limit);
        }

        return posts.map(item => new ForumPostModel(item));
    }

    static findByUser(userId, options = {}) {
        let posts = db.findWhere('forumPosts', { authorId: userId });

        if (options.status) {
            posts = posts.filter(post => post.status === options.status);
        } else {
            posts = posts.filter(post => post.status === 'published');
        }

        posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        return posts.map(item => new ForumPostModel(item));
    }

    static search(query, options = {}) {
        let posts = db.search('forumPosts', query);

        posts = posts.filter(post => post.status === 'published');

        if (options.category) {
            posts = posts.filter(post => post.category === options.category);
        }

        if (options.animeId) {
            posts = posts.filter(post => post.animeId === options.animeId);
        }

        posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        return posts.map(item => new ForumPostModel(item));
    }

    static getTrending(limit = 10) {
        const posts = db.findWhere('forumPosts', { status: 'published' });
        const now = new Date();
        const oneDayAgo = new Date(now - 24 * 60 * 60 * 1000);

        // Score based on recent activity
        const scoredPosts = posts.map(post => {
            const createdAt = new Date(post.createdAt);
            const isRecent = createdAt > oneDayAgo;
            const score = (post.views * 0.1) + (post.replies * 2) + (post.likes * 1.5) + (isRecent ? 10 : 0);

            return { ...post, trendingScore: score };
        });

        return scoredPosts
            .sort((a, b) => b.trendingScore - a.trendingScore)
            .slice(0, limit)
            .map(item => new ForumPostModel(item));
    }

    static getPopular(limit = 10) {
        const posts = db.findWhere('forumPosts', { status: 'published' });

        return posts
            .sort((a, b) => (b.views + b.replies * 2 + b.likes * 1.5) - (a.views + a.replies * 2 + a.likes * 1.5))
            .slice(0, limit)
            .map(item => new ForumPostModel(item));
    }

    addReply(userId, content, parentReplyId = null) {
        const reply = db.create('forumReplies', {
            postId: this.id,
            authorId: userId,
            content,
            parentReplyId,
            status: 'published'
        });

        // Update post statistics
        this.replies++;
        this.lastReplyAt = reply.createdAt;
        this.lastReplyBy = userId;
        this.save();

        return reply;
    }

    getReplies(options = {}) {
        let replies = db.findWhere('forumReplies', {
            postId: this.id,
            status: 'published'
        });

        // Sort by creation date
        replies.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

        // Build threaded structure if needed
        if (options.threaded) {
            const threaded = [];
            const replyMap = {};

            replies.forEach(reply => {
                reply.children = [];
                replyMap[reply.id] = reply;

                if (reply.parentReplyId && replyMap[reply.parentReplyId]) {
                    replyMap[reply.parentReplyId].children.push(reply);
                } else {
                    threaded.push(reply);
                }
            });

            return threaded;
        }

        return replies;
    }

    like(userId) {
        // Check if user already liked this post
        const existingLike = db.findWhere('forumLikes', { postId: this.id, userId });

        if (existingLike.length > 0) {
            // Unlike
            db.delete('forumLikes', existingLike[0].id);
            this.likes = Math.max(0, this.likes - 1);
        } else {
            // Like
            db.create('forumLikes', { postId: this.id, userId });
            this.likes++;
        }

        this.save();
        return this.likes;
    }

    isLikedBy(userId) {
        const likes = db.findWhere('forumLikes', { postId: this.id, userId });
        return likes.length > 0;
    }

    pin() {
        this.isPinned = true;
        return this.save();
    }

    unpin() {
        this.isPinned = false;
        return this.save();
    }

    lock() {
        this.isLocked = true;
        return this.save();
    }

    unlock() {
        this.isLocked = false;
        return this.save();
    }

    hide() {
        this.status = 'hidden';
        return this.save();
    }

    // For poll posts
    addPollVote(userId, optionId) {
        if (this.type !== 'poll' || !this.pollOptions) {
            return false;
        }

        // Check if user already voted
        const existingVote = db.findWhere('pollVotes', { postId: this.id, userId });
        if (existingVote.length > 0) {
            return false; // Already voted
        }

        // Add vote
        db.create('pollVotes', { postId: this.id, userId, optionId });

        // Update poll option count
        this.pollOptions = this.pollOptions.map(option => {
            if (option.id === optionId) {
                return { ...option, votes: (option.votes || 0) + 1 };
            }
            return option;
        });

        this.save();
        return true;
    }

    getPollResults() {
        if (this.type !== 'poll') return null;

        const totalVotes = (this.pollOptions || []).reduce((sum, option) => sum + (option.votes || 0), 0);

        return {
            options: this.pollOptions.map(option => ({
                ...option,
                percentage: totalVotes > 0 ? ((option.votes || 0) / totalVotes) * 100 : 0
            })),
            totalVotes
        };
    }

    // Get enriched data with author info
    getEnrichedData() {
        const author = db.findById('users', this.authorId);
        const anime = this.animeId ? db.findById('animes', this.animeId) : null;

        return {
            ...this.toJSON(),
            author: author ? {
                id: author.id,
                username: author.username,
                profile: author.profile
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
            title: this.title,
            content: this.content,
            authorId: this.authorId,
            category: this.category,
            subcategory: this.subcategory,
            tags: this.tags,
            animeId: this.animeId,
            type: this.type,
            status: this.status,
            isPinned: this.isPinned,
            isLocked: this.isLocked,
            views: this.views,
            replies: this.replies,
            likes: this.likes,
            lastReplyAt: this.lastReplyAt,
            lastReplyBy: this.lastReplyBy,
            pollOptions: this.pollOptions,
            attachments: this.attachments,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}
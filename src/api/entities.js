// Independent entities implementation - completely standalone

import { client } from './client.js';

// Article Entity
class ArticleEntity {
    constructor(data = {}) {
        this.id = data.id;
        this.title = data.title;
        this.content = data.content;
        this.author = data.author;
        this.publishedAt = data.publishedAt;
        this.tags = data.tags || [];
        this.status = data.status || 'draft';
    }

    async save() {
        const endpoint = this.id ? `/api/articles/${this.id}` : '/api/articles';
        const method = this.id ? 'PUT' : 'POST';

        try {
            const response = await fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${client.getAccessToken()}`
                },
                body: JSON.stringify(this.toJSON())
            });

            if (!response.ok) {
                throw new Error(`Failed to save article: ${response.status}`);
            }

            const savedData = await response.json();
            Object.assign(this, savedData);
            return this;
        } catch (error) {
            console.error('Error saving article:', error);
            throw error;
        }
    }

    async delete() {
        if (!this.id) {
            throw new Error('Cannot delete article without ID');
        }

        try {
            const response = await fetch(`/api/articles/${this.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${client.getAccessToken()}`
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to delete article: ${response.status}`);
            }

            return true;
        } catch (error) {
            console.error('Error deleting article:', error);
            throw error;
        }
    }

    static async findById(id) {
        try {
            const response = await fetch(`/api/articles/${id}`, {
                headers: {
                    'Authorization': `Bearer ${client.getAccessToken()}`
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch article: ${response.status}`);
            }

            const data = await response.json();
            return new ArticleEntity(data);
        } catch (error) {
            console.error('Error fetching article:', error);
            throw error;
        }
    }

    static async findAll(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const url = `/api/articles${queryString ? `?${queryString}` : ''}`;

        try {
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${client.getAccessToken()}`
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch articles: ${response.status}`);
            }

            const data = await response.json();
            return data.map(item => new ArticleEntity(item));
        } catch (error) {
            console.error('Error fetching articles:', error);
            throw error;
        }
    }

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            content: this.content,
            author: this.author,
            publishedAt: this.publishedAt,
            tags: this.tags,
            status: this.status
        };
    }
}

// Connection Entity
class ConnectionEntity {
    constructor(data = {}) {
        this.id = data.id;
        this.fromUserId = data.fromUserId;
        this.toUserId = data.toUserId;
        this.status = data.status || 'pending'; // pending, accepted, rejected
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }

    async save() {
        const endpoint = this.id ? `/api/connections/${this.id}` : '/api/connections';
        const method = this.id ? 'PUT' : 'POST';

        try {
            const response = await fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${client.getAccessToken()}`
                },
                body: JSON.stringify(this.toJSON())
            });

            if (!response.ok) {
                throw new Error(`Failed to save connection: ${response.status}`);
            }

            const savedData = await response.json();
            Object.assign(this, savedData);
            return this;
        } catch (error) {
            console.error('Error saving connection:', error);
            throw error;
        }
    }

    async accept() {
        this.status = 'accepted';
        return await this.save();
    }

    async reject() {
        this.status = 'rejected';
        return await this.save();
    }

    static async findByUserId(userId) {
        try {
            const response = await fetch(`/api/connections/user/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${client.getAccessToken()}`
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch connections: ${response.status}`);
            }

            const data = await response.json();
            return data.map(item => new ConnectionEntity(item));
        } catch (error) {
            console.error('Error fetching connections:', error);
            throw error;
        }
    }

    toJSON() {
        return {
            id: this.id,
            fromUserId: this.fromUserId,
            toUserId: this.toUserId,
            status: this.status,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

// ForumPost Entity
class ForumPostEntity {
    constructor(data = {}) {
        this.id = data.id;
        this.title = data.title;
        this.content = data.content;
        this.authorId = data.authorId;
        this.category = data.category;
        this.tags = data.tags || [];
        this.likes = data.likes || 0;
        this.replies = data.replies || 0;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.isPinned = data.isPinned || false;
        this.isLocked = data.isLocked || false;
    }

    async save() {
        const endpoint = this.id ? `/api/forum/posts/${this.id}` : '/api/forum/posts';
        const method = this.id ? 'PUT' : 'POST';

        try {
            const response = await fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${client.getAccessToken()}`
                },
                body: JSON.stringify(this.toJSON())
            });

            if (!response.ok) {
                throw new Error(`Failed to save forum post: ${response.status}`);
            }

            const savedData = await response.json();
            Object.assign(this, savedData);
            return this;
        } catch (error) {
            console.error('Error saving forum post:', error);
            throw error;
        }
    }

    async like() {
        try {
            const response = await fetch(`/api/forum/posts/${this.id}/like`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${client.getAccessToken()}`
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to like post: ${response.status}`);
            }

            this.likes++;
            return this;
        } catch (error) {
            console.error('Error liking post:', error);
            throw error;
        }
    }

    async pin() {
        this.isPinned = true;
        return await this.save();
    }

    async lock() {
        this.isLocked = true;
        return await this.save();
    }

    static async findByCategory(category, params = {}) {
        const queryString = new URLSearchParams({...params, category}).toString();

        try {
            const response = await fetch(`/api/forum/posts?${queryString}`, {
                headers: {
                    'Authorization': `Bearer ${client.getAccessToken()}`
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch forum posts: ${response.status}`);
            }

            const data = await response.json();
            return data.map(item => new ForumPostEntity(item));
        } catch (error) {
            console.error('Error fetching forum posts:', error);
            throw error;
        }
    }

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            content: this.content,
            authorId: this.authorId,
            category: this.category,
            tags: this.tags,
            likes: this.likes,
            replies: this.replies,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            isPinned: this.isPinned,
            isLocked: this.isLocked
        };
    }
}

// Review Entity
class ReviewEntity {
    constructor(data = {}) {
        this.id = data.id;
        this.itemId = data.itemId; // ID of anime/game being reviewed
        this.itemType = data.itemType; // 'anime' or 'game'
        this.userId = data.userId;
        this.rating = data.rating; // 1-5 stars
        this.title = data.title;
        this.content = data.content;
        this.pros = data.pros || [];
        this.cons = data.cons || [];
        this.recommendedFor = data.recommendedFor || [];
        this.spoilerWarning = data.spoilerWarning || false;
        this.helpfulVotes = data.helpfulVotes || 0;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }

    async save() {
        const endpoint = this.id ? `/api/reviews/${this.id}` : '/api/reviews';
        const method = this.id ? 'PUT' : 'POST';

        try {
            const response = await fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${client.getAccessToken()}`
                },
                body: JSON.stringify(this.toJSON())
            });

            if (!response.ok) {
                throw new Error(`Failed to save review: ${response.status}`);
            }

            const savedData = await response.json();
            Object.assign(this, savedData);
            return this;
        } catch (error) {
            console.error('Error saving review:', error);
            throw error;
        }
    }

    async markHelpful() {
        try {
            const response = await fetch(`/api/reviews/${this.id}/helpful`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${client.getAccessToken()}`
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to mark review as helpful: ${response.status}`);
            }

            this.helpfulVotes++;
            return this;
        } catch (error) {
            console.error('Error marking review as helpful:', error);
            throw error;
        }
    }

    static async findByItem(itemId, itemType) {
        try {
            const response = await fetch(`/api/reviews/item/${itemId}?type=${itemType}`, {
                headers: {
                    'Authorization': `Bearer ${client.getAccessToken()}`
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch reviews: ${response.status}`);
            }

            const data = await response.json();
            return data.map(item => new ReviewEntity(item));
        } catch (error) {
            console.error('Error fetching reviews:', error);
            throw error;
        }
    }

    static async findByUser(userId) {
        try {
            const response = await fetch(`/api/reviews/user/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${client.getAccessToken()}`
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch user reviews: ${response.status}`);
            }

            const data = await response.json();
            return data.map(item => new ReviewEntity(item));
        } catch (error) {
            console.error('Error fetching user reviews:', error);
            throw error;
        }
    }

    toJSON() {
        return {
            id: this.id,
            itemId: this.itemId,
            itemType: this.itemType,
            userId: this.userId,
            rating: this.rating,
            title: this.title,
            content: this.content,
            pros: this.pros,
            cons: this.cons,
            recommendedFor: this.recommendedFor,
            spoilerWarning: this.spoilerWarning,
            helpfulVotes: this.helpfulVotes,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

// User/Auth Entity
class UserEntity {
    constructor(data = {}) {
        this.id = data.id;
        this.username = data.username;
        this.email = data.email;
        this.profile = data.profile || {};
        this.preferences = data.preferences || {};
        this.isVerified = data.isVerified || false;
        this.role = data.role || 'user';
        this.createdAt = data.createdAt;
        this.lastLoginAt = data.lastLoginAt;
    }

    async login(credentials) {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            if (!response.ok) {
                throw new Error(`Login failed: ${response.status}`);
            }

            const data = await response.json();
            client.setAccessToken(data.token);
            Object.assign(this, data.user);
            return data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    async register(userData) {
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error(`Registration failed: ${response.status}`);
            }

            const data = await response.json();
            Object.assign(this, data.user);
            return data;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }

    async updateProfile(profileData) {
        try {
            const response = await fetch('/api/auth/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${client.getAccessToken()}`
                },
                body: JSON.stringify(profileData)
            });

            if (!response.ok) {
                throw new Error(`Profile update failed: ${response.status}`);
            }

            const data = await response.json();
            Object.assign(this, data);
            return this;
        } catch (error) {
            console.error('Profile update error:', error);
            throw error;
        }
    }

    logout() {
        client.logout();
        // Clear user data
        Object.keys(this).forEach(key => {
            delete this[key];
        });
    }

    static async getCurrentUser() {
        try {
            const response = await fetch('/api/auth/me', {
                headers: {
                    'Authorization': `Bearer ${client.getAccessToken()}`
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch current user: ${response.status}`);
            }

            const data = await response.json();
            return new UserEntity(data);
        } catch (error) {
            console.error('Error fetching current user:', error);
            throw error;
        }
    }

    toJSON() {
        return {
            id: this.id,
            username: this.username,
            email: this.email,
            profile: this.profile,
            preferences: this.preferences,
            isVerified: this.isVerified,
            role: this.role,
            createdAt: this.createdAt,
            lastLoginAt: this.lastLoginAt
        };
    }
}

// Export entities
export const Article = ArticleEntity;
export const Connection = ConnectionEntity;
export const ForumPost = ForumPostEntity;
export const Review = ReviewEntity;
export const User = UserEntity;

// Default exports
export default {
    Article: ArticleEntity,
    Connection: ConnectionEntity,
    ForumPost: ForumPostEntity,
    Review: ReviewEntity,
    User: UserEntity
};
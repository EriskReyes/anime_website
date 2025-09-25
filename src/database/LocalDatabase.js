class LocalDatabase {
    constructor() {
        this.dbName = 'AnimeWebsiteDB';
        this.init();
    }

    init() {
        if (!localStorage.getItem(this.dbName)) {
            localStorage.setItem(this.dbName, JSON.stringify({
                animes: [],
                users: [],
                reviews: [],
                forumPosts: [],
                articles: [],
                games: [],
                userLists: []
            }));
        }
    }

    getDatabase() {
        return JSON.parse(localStorage.getItem(this.dbName));
    }

    saveDatabase(db) {
        localStorage.setItem(this.dbName, JSON.stringify(db));
    }

    generateId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    create(collection, data) {
        const db = this.getDatabase();
        const newItem = {
            ...data,
            id: this.generateId(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        if (!db[collection]) {
            db[collection] = [];
        }

        db[collection].push(newItem);
        this.saveDatabase(db);
        return newItem;
    }

    findAll(collection) {
        const db = this.getDatabase();
        return db[collection] || [];
    }

    findById(collection, id) {
        const db = this.getDatabase();
        return db[collection]?.find(item => item.id === id) || null;
    }

    update(collection, id, updateData) {
        const db = this.getDatabase();
        const itemIndex = db[collection]?.findIndex(item => item.id === id);

        if (itemIndex !== -1) {
            db[collection][itemIndex] = {
                ...db[collection][itemIndex],
                ...updateData,
                updatedAt: new Date().toISOString()
            };
            this.saveDatabase(db);
            return db[collection][itemIndex];
        }
        return null;
    }

    delete(collection, id) {
        const db = this.getDatabase();
        const itemIndex = db[collection]?.findIndex(item => item.id === id);

        if (itemIndex !== -1) {
            const deletedItem = db[collection].splice(itemIndex, 1)[0];
            this.saveDatabase(db);
            return deletedItem;
        }
        return null;
    }

    search(collection, query) {
        const db = this.getDatabase();
        const items = db[collection] || [];

        if (!query) return items;

        return items.filter(item => {
            return Object.values(item).some(value =>
                String(value).toLowerCase().includes(query.toLowerCase())
            );
        });
    }

    findWhere(collection, conditions) {
        const db = this.getDatabase();
        const items = db[collection] || [];

        return items.filter(item => {
            return Object.entries(conditions).every(([key, value]) =>
                item[key] === value
            );
        });
    }

    clearCollection(collection) {
        const db = this.getDatabase();
        db[collection] = [];
        this.saveDatabase(db);
    }

    exportDatabase() {
        const db = this.getDatabase();
        const dataStr = JSON.stringify(db, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});

        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = 'anime_database.json';
        link.click();
    }

    importDatabase(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const importedData = JSON.parse(e.target.result);
                    localStorage.setItem(this.dbName, JSON.stringify(importedData));
                    resolve();
                } catch (error) {
                    reject(error);
                }
            };
            reader.readAsText(file);
        });
    }
}

export default new LocalDatabase();
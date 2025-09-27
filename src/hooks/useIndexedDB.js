// src/hooks/useIndexedDB.js
import { useState, useEffect, useCallback } from 'react';

const DB_NAME = 'HeavyAppDatabase';
const DB_VERSION = 1;

class IndexedDBManager {
    constructor() {
        this.db = null;
    }

    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve(this.db);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;

                // Crear tablas (object stores)
                if (!db.objectStoreNames.contains('users')) {
                    const usersStore = db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
                    usersStore.createIndex('email', 'email', { unique: true });
                    usersStore.createIndex('name', 'name', { unique: false });
                }

                if (!db.objectStoreNames.contains('products')) {
                    const productsStore = db.createObjectStore('products', { keyPath: 'id', autoIncrement: true });
                    productsStore.createIndex('name', 'name', { unique: false });
                    productsStore.createIndex('category', 'category', { unique: false });
                    productsStore.createIndex('price', 'price', { unique: false });
                }

                if (!db.objectStoreNames.contains('orders')) {
                    const ordersStore = db.createObjectStore('orders', { keyPath: 'id', autoIncrement: true });
                    ordersStore.createIndex('userId', 'userId', { unique: false });
                    ordersStore.createIndex('date', 'date', { unique: false });
                }

                if (!db.objectStoreNames.contains('files')) {
                    const filesStore = db.createObjectStore('files', { keyPath: 'id', autoIncrement: true });
                    filesStore.createIndex('name', 'name', { unique: false });
                    filesStore.createIndex('type', 'type', { unique: false });
                }
            };
        });
    }

    async create(storeName, data) {
        const transaction = this.db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);

        const dataWithTimestamp = {
            ...data,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        return new Promise((resolve, reject) => {
            const request = store.add(dataWithTimestamp);
            request.onsuccess = () => resolve({ ...dataWithTimestamp, id: request.result });
            request.onerror = () => reject(request.error);
        });
    }

    async getAll(storeName) {
        const transaction = this.db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);

        return new Promise((resolve, reject) => {
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async getById(storeName, id) {
        const transaction = this.db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);

        return new Promise((resolve, reject) => {
            const request = store.get(id);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async update(storeName, id, data) {
        const transaction = this.db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);

        return new Promise((resolve, reject) => {
            const getRequest = store.get(id);
            getRequest.onsuccess = () => {
                const existing = getRequest.result;
                if (existing) {
                    const updated = {
                        ...existing,
                        ...data,
                        updatedAt: new Date().toISOString()
                    };
                    const putRequest = store.put(updated);
                    putRequest.onsuccess = () => resolve(updated);
                    putRequest.onerror = () => reject(putRequest.error);
                } else {
                    reject(new Error('Registro no encontrado'));
                }
            };
            getRequest.onerror = () => reject(getRequest.error);
        });
    }

    async delete(storeName, id) {
        const transaction = this.db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);

        return new Promise((resolve, reject) => {
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async search(storeName, indexName, value) {
        const transaction = this.db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        const index = store.index(indexName);

        return new Promise((resolve, reject) => {
            const request = index.getAll(value);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async searchRange(storeName, indexName, lowerBound, upperBound) {
        const transaction = this.db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        const index = store.index(indexName);
        const range = IDBKeyRange.bound(lowerBound, upperBound);

        return new Promise((resolve, reject) => {
            const request = index.getAll(range);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async count(storeName) {
        const transaction = this.db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);

        return new Promise((resolve, reject) => {
            const request = store.count();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async clear(storeName) {
        const transaction = this.db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);

        return new Promise((resolve, reject) => {
            const request = store.clear();
            request.onsuccess = () => resolve(true);
            request.onerror = () => reject(request.error);
        });
    }

    // Método para almacenar archivos grandes (imágenes, documentos, etc.)
    async saveFile(file, metadata = {}) {
        const fileData = {
            name: file.name,
            type: file.type,
            size: file.size,
            data: await this.fileToArrayBuffer(file),
            ...metadata
        };

        return this.create('files', fileData);
    }

    async getFile(id) {
        const fileData = await this.getById('files', id);
        if (fileData) {
            const blob = new Blob([fileData.data], { type: fileData.type });
            return {
                ...fileData,
                blob,
                url: URL.createObjectURL(blob)
            };
        }
        return null;
    }

    fileToArrayBuffer(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        });
    }

    // Exportar toda la base de datos
    async exportDatabase() {
        const tables = ['users', 'products', 'orders', 'files'];
        const exportData = {};

        for (const table of tables) {
            exportData[table] = await this.getAll(table);
        }

        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `database-backup-${new Date().toISOString().split('T')[0]}.json`;
        link.click();

        URL.revokeObjectURL(url);
    }

    // Importar base de datos desde archivo JSON
    async importDatabase(file) {
        const text = await file.text();
        const data = JSON.parse(text);

        for (const [tableName, records] of Object.entries(data)) {
            if (Array.isArray(records)) {
                await this.clear(tableName); // Limpiar tabla antes de importar

                for (const record of records) {
                    // Remover ID para que se genere uno nuevo
                    const { id, ...recordData } = record;
                    await this.create(tableName, recordData);
                }
            }
        }
    }
}

// Hook personalizado para usar IndexedDB
export const useIndexedDB = () => {
    const [db, setDb] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const initDB = async () => {
            try {
                setIsLoading(true);
                const dbManager = new IndexedDBManager();
                await dbManager.init();
                setDb(dbManager);
                setError(null);
            } catch (err) {
                setError(err.message);
                console.error('Error inicializando IndexedDB:', err);
            } finally {
                setIsLoading(false);
            }
        };

        initDB();
    }, []);

    // Funciones de conveniencia
    const operations = {
        // Operaciones básicas CRUD
        create: useCallback((table, data) => db?.create(table, data), [db]),
        getAll: useCallback((table) => db?.getAll(table), [db]),
        getById: useCallback((table, id) => db?.getById(table, id), [db]),
        update: useCallback((table, id, data) => db?.update(table, id, data), [db]),
        delete: useCallback((table, id) => db?.delete(table, id), [db]),

        // Operaciones de búsqueda avanzada
        search: useCallback((table, index, value) => db?.search(table, index, value), [db]),
        searchRange: useCallback((table, index, lower, upper) => db?.searchRange(table, index, lower, upper), [db]),

        // Utilidades
        count: useCallback((table) => db?.count(table), [db]),
        clear: useCallback((table) => db?.clear(table), [db]),

        // Manejo de archivos grandes
        saveFile: useCallback((file, metadata) => db?.saveFile(file, metadata), [db]),
        getFile: useCallback((id) => db?.getFile(id), [db]),

        // Exportar/Importar base de datos completa
        exportDatabase: useCallback(() => db?.exportDatabase(), [db]),
        importDatabase: useCallback((file) => db?.importDatabase(file), [db])
    };

    return {
        isLoading,
        error,
        isReady: !!db && !isLoading,
        db,
        ...operations
    };
};
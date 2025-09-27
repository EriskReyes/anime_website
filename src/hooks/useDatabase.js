import { useState, useEffect } from 'react';
import db from '../database/LocalDatabase.js';
import { seedDatabase } from '../database/SeedData.js';

export const useDatabase = () => {
    const [isInitialized, setIsInitialized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        initializeDatabase();
    }, []);

    const initializeDatabase = () => {
        try {
            setIsLoading(true);

            // Check database version to force updates
            const currentVersion = localStorage.getItem('anime_website_db_version');
            const expectedVersion = '2.1.0'; // Anime and Games pages now match Startseite design exactly

            // Check if database exists and has data
            const animes = db.findAll('animes');

            // If no animes exist or version is outdated, seed the database
            if (!animes || animes.length === 0 || currentVersion !== expectedVersion) {
                console.log('🌱 Updating database with new images...');
                seedDatabase();
                localStorage.setItem('anime_website_db_version', expectedVersion);
            }

            setIsInitialized(true);
            setError(null);
        } catch (err) {
            console.error('Database initialization error:', err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const resetDatabase = () => {
        try {
            seedDatabase();
            setIsInitialized(true);
            setError(null);
            return true;
        } catch (err) {
            console.error('Database reset error:', err);
            setError(err.message);
            return false;
        }
    };

    return {
        isInitialized,
        isLoading,
        error,
        resetDatabase,
        database: db
    };
};

export default useDatabase;
import db from './LocalDatabase.js';

export const seedDatabase = () => {
    // Clear existing data
    db.clearCollection('animes');
    db.clearCollection('games');
    db.clearCollection('users');
    db.clearCollection('reviews');
    db.clearCollection('forumPosts');
    db.clearCollection('articles');
    db.clearCollection('userLists');

    // Sample Animes
    const sampleAnimes = [
        {
            title: "Attack on Titan",
            alternativeTitles: ["Shingeki no Kyojin", "進撃の巨人"],
            synopsis: "Humanity fights for survival against giant humanoid Titans behind massive walls.",
            genres: ["Action", "Drama", "Fantasy", "Military"],
            status: "completed",
            type: "TV",
            episodes: 75,
            duration: 24,
            rating: 9.0,
            popularity: 95,
            releaseDate: "2013-04-07",
            endDate: "2021-04-08",
            studio: "Mappa, Pierrot",
            source: "Manga",
            images: {
                poster: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=1200&h=400&fit=crop",
                screenshots: ["https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=450&fit=crop", "https://images.unsplash.com/photo-1611003229296-7b1d83e84b48?w=800&h=450&fit=crop"]
            },
            trailer: "https://youtube.com/watch?v=example",
            characters: [
                { name: "Eren Yeager", role: "Main" },
                { name: "Mikasa Ackerman", role: "Main" },
                { name: "Armin Arlert", role: "Main" }
            ],
            staff: [
                { name: "Hajime Isayama", role: "Original Creator" },
                { name: "Tetsuro Araki", role: "Director" }
            ],
            themes: {
                opening: ["Guren no Yumiya", "Jiyuu no Tsubasa"],
                ending: ["Utsukushiki Zankoku na Sekai", "great escape"]
            }
        },
        {
            title: "Your Name",
            alternativeTitles: ["Kimi no Na wa", "君の名は。"],
            synopsis: "Two teenagers share a profound, magical connection upon discovering they are swapping bodies.",
            genres: ["Romance", "Drama", "Supernatural"],
            status: "completed",
            type: "Movie",
            episodes: 1,
            duration: 106,
            rating: 8.4,
            popularity: 88,
            releaseDate: "2016-08-26",
            endDate: "2016-08-26",
            studio: "CoMix Wave Films",
            source: "Original",
            images: {
                poster: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=1200&h=400&fit=crop",
                screenshots: ["https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=800&h=450&fit=crop"]
            },
            trailer: "https://youtube.com/watch?v=example2",
            characters: [
                { name: "Taki Tachibana", role: "Main" },
                { name: "Mitsuha Miyamizu", role: "Main" }
            ],
            staff: [
                { name: "Makoto Shinkai", role: "Director" }
            ],
            themes: {
                opening: [],
                ending: ["Zen Zen Zense", "Sparkle"]
            }
        },
        {
            title: "Demon Slayer",
            alternativeTitles: ["Kimetsu no Yaiba", "鬼滅の刃"],
            synopsis: "A young boy becomes a demon slayer to save his sister and avenge his family.",
            genres: ["Action", "Historical", "Supernatural"],
            status: "ongoing",
            type: "TV",
            episodes: 32,
            duration: 24,
            rating: 8.7,
            popularity: 92,
            releaseDate: "2019-04-06",
            endDate: null,
            studio: "Ufotable",
            source: "Manga",
            images: {
                poster: "https://images.unsplash.com/photo-1586182987320-4f376d39d787?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1586182987320-4f376d39d787?w=1200&h=400&fit=crop",
                screenshots: ["https://images.unsplash.com/photo-1626618012641-bfbca5a31239?w=800&h=450&fit=crop", "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=800&h=450&fit=crop", "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=450&fit=crop"]
            },
            trailer: "https://youtube.com/watch?v=example3",
            characters: [
                { name: "Tanjiro Kamado", role: "Main" },
                { name: "Nezuko Kamado", role: "Main" },
                { name: "Zenitsu Agatsuma", role: "Supporting" },
                { name: "Inosuke Hashibira", role: "Supporting" }
            ],
            staff: [
                { name: "Koyoharu Gotouge", role: "Original Creator" },
                { name: "Haruo Sotozaki", role: "Director" }
            ],
            themes: {
                opening: ["Gurenge", "Akeboshi"],
                ending: ["from the edge", "Shirogane"]
            }
        },
        {
            title: "Spirited Away",
            alternativeTitles: ["Sen to Chihiro no Kamikakushi", "千と千尋の神隠し"],
            synopsis: "A young girl enters a world ruled by gods and witches where humans are turned into beasts.",
            genres: ["Adventure", "Family", "Fantasy"],
            status: "completed",
            type: "Movie",
            episodes: 1,
            duration: 125,
            rating: 9.2,
            popularity: 85,
            releaseDate: "2001-07-20",
            endDate: "2001-07-20",
            studio: "Studio Ghibli",
            source: "Original",
            images: {
                poster: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=400&fit=crop",
                screenshots: ["https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=800&h=450&fit=crop"]
            },
            trailer: "https://youtube.com/watch?v=example4",
            characters: [
                { name: "Chihiro Ogino", role: "Main" },
                { name: "Haku", role: "Main" },
                { name: "Yubaba", role: "Supporting" }
            ],
            staff: [
                { name: "Hayao Miyazaki", role: "Director" }
            ],
            themes: {
                opening: [],
                ending: ["Itsumo Nando Demo"]
            }
        },
        {
            title: "One Piece",
            alternativeTitles: ["ワンピース"],
            synopsis: "Monkey D. Luffy explores the Grand Line with his pirate crew in search of the ultimate treasure known as One Piece.",
            genres: ["Action", "Adventure", "Comedy", "Shounen"],
            status: "ongoing",
            type: "TV",
            episodes: 1000,
            duration: 24,
            rating: 8.9,
            popularity: 94,
            releaseDate: "1999-10-20",
            endDate: null,
            studio: "Toei Animation",
            source: "Manga",
            images: {
                poster: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=1200&h=400&fit=crop",
                screenshots: ["https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=450&fit=crop", "https://images.unsplash.com/photo-1611003229296-7b1d83e84b48?w=800&h=450&fit=crop"]
            },
            trailer: "https://youtube.com/watch?v=example5",
            characters: [
                { name: "Monkey D. Luffy", role: "Main" },
                { name: "Roronoa Zoro", role: "Main" },
                { name: "Nami", role: "Main" },
                { name: "Usopp", role: "Main" },
                { name: "Sanji", role: "Main" }
            ],
            staff: [
                { name: "Eiichiro Oda", role: "Original Creator" }
            ],
            themes: {
                opening: ["We Are!", "Believe", "Hikari E"],
                ending: ["memories", "RUN! RUN! RUN!"]
            }
        }
    ];

    // Sample Users
    const sampleUsers = [
        {
            username: "admin",
            email: "admin@animewebsite.com",
            password: "admin123",
            profile: {
                displayName: "Administrator",
                bio: "Website administrator and anime enthusiast",
                avatar: "/images/admin_avatar.jpg",
                favoriteGenres: ["Action", "Adventure", "Fantasy"]
            },
            role: "admin",
            isVerified: true
        },
        {
            username: "otaku_master",
            email: "otaku@example.com",
            password: "password123",
            profile: {
                displayName: "Otaku Master",
                bio: "Anime lover since 2005. Always watching the latest series!",
                avatar: "/images/otaku_avatar.jpg",
                favoriteGenres: ["Action", "Romance", "Slice of Life"]
            },
            role: "user",
            isVerified: true
        },
        {
            username: "casual_viewer",
            email: "casual@example.com",
            password: "password123",
            profile: {
                displayName: "Casual Viewer",
                bio: "New to anime, looking for recommendations!",
                avatar: "/images/casual_avatar.jpg",
                favoriteGenres: ["Comedy", "Romance"]
            },
            role: "user",
            isVerified: false
        }
    ];

    // Sample Games
    const sampleGames = [
        {
            title: "The Legend of Zelda: Breath of the Wild",
            alternativeTitles: ["BotW", "Zelda BotW"],
            description: "Ein Open-World-Abenteuer, das die Grenzen von Hyrule neu definiert.",
            genres: ["Action", "Adventure", "Open World", "RPG"],
            status: "released",
            platform: ["Nintendo Switch", "Wii U"],
            rating: 9.7,
            popularity: 95,
            releaseDate: "2017-03-03",
            developer: "Nintendo EPD",
            publisher: "Nintendo",
            price: 59.99,
            currency: "EUR",
            images: {
                poster: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=1200&h=400&fit=crop",
                screenshots: ["https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=450&fit=crop", "https://images.unsplash.com/photo-1586182987320-4f376d39d787?w=800&h=450&fit=crop"]
            },
            features: ["Single Player", "Exploration", "Crafting"],
            trailer: "https://youtube.com/watch?v=zw47_q9wbBE"
        },
        {
            title: "Cyberpunk 2077",
            alternativeTitles: ["CP2077", "Cyberpunk"],
            description: "Ein Open-World-RPG in einer dystopischen Zukunft mit Keanu Reeves.",
            genres: ["RPG", "Action", "Open World", "Sci-Fi"],
            status: "released",
            platform: ["PC", "PlayStation", "Xbox", "Google Stadia"],
            rating: 7.8,
            popularity: 88,
            releaseDate: "2020-12-10",
            developer: "CD Projekt RED",
            publisher: "CD Projekt",
            price: 29.99,
            currency: "EUR",
            images: {
                poster: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=1200&h=400&fit=crop",
                screenshots: ["https://images.unsplash.com/photo-1586182987320-4f376d39d787?w=800&h=450&fit=crop", "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=450&fit=crop"]
            },
            features: ["Single Player", "Character Customization", "Choices Matter"],
            trailer: "https://youtube.com/watch?v=8X2kIfS6fb8"
        },
        {
            title: "Elden Ring",
            alternativeTitles: ["エルデンリング"],
            description: "FromSoftware's größtes Abenteuer bisher, geschaffen mit George R.R. Martin.",
            genres: ["Action", "RPG", "Dark Fantasy", "Souls-like"],
            status: "released",
            platform: ["PC", "PlayStation", "Xbox"],
            rating: 9.5,
            popularity: 92,
            releaseDate: "2022-02-25",
            developer: "FromSoftware",
            publisher: "Bandai Namco Entertainment",
            price: 59.99,
            currency: "EUR",
            images: {
                poster: "https://images.unsplash.com/photo-1586182987320-4f376d39d787?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1586182987320-4f376d39d787?w=1200&h=400&fit=crop",
                screenshots: ["https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=450&fit=crop", "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=800&h=450&fit=crop"]
            },
            features: ["Single Player", "Multiplayer", "Character Creation"],
            trailer: "https://youtube.com/watch?v=E3Huy2cdih0"
        },
        {
            title: "Among Us",
            alternativeTitles: ["アモングアス"],
            description: "Ein Social-Deduction-Spiel über Teamarbeit und Verrat im Weltraum.",
            genres: ["Social Deduction", "Multiplayer", "Party", "Indie"],
            status: "released",
            platform: ["PC", "Mobile", "Nintendo Switch", "PlayStation", "Xbox"],
            rating: 8.2,
            popularity: 78,
            releaseDate: "2018-06-15",
            developer: "InnerSloth",
            publisher: "InnerSloth",
            price: 4.99,
            currency: "EUR",
            images: {
                poster: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=400&fit=crop",
                screenshots: ["https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=800&h=450&fit=crop", "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&h=450&fit=crop"]
            },
            features: ["Multiplayer", "Cross-Platform", "Voice Chat"],
            trailer: "https://youtube.com/watch?v=nsJZ_kKjXcE"
        },
        {
            title: "Hades",
            alternativeTitles: ["ハデス"],
            description: "Ein Rogue-like-Dungeon-Crawler über den Sohn des Hades, der aus der Unterwelt flieht.",
            genres: ["Rogue-like", "Action", "Indie", "Mythology"],
            status: "released",
            platform: ["PC", "Nintendo Switch", "PlayStation", "Xbox"],
            rating: 9.3,
            popularity: 86,
            releaseDate: "2020-09-17",
            developer: "Supergiant Games",
            publisher: "Supergiant Games",
            price: 24.99,
            currency: "EUR",
            images: {
                poster: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=1200&h=400&fit=crop",
                screenshots: ["https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&h=450&fit=crop", "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=450&fit=crop"]
            },
            features: ["Single Player", "Narrative", "Replayability"],
            trailer: "https://youtube.com/watch?v=91t0ha9x0AE"
        }
    ];

    // Add sample data to database
    const createdAnimes = sampleAnimes.map(anime => db.create('animes', anime));
    const createdGames = sampleGames.map(game => db.create('games', game));
    const createdUsers = sampleUsers.map(user => db.create('users', user));

    // Sample Reviews
    const sampleReviews = [
        {
            userId: createdUsers[1].id,
            animeId: createdAnimes[0].id,
            title: "Epic masterpiece!",
            content: "Attack on Titan is absolutely incredible. The story, animation, and character development are all top-notch. This anime will keep you on the edge of your seat.",
            rating: 9.5,
            categories: {
                story: 10,
                animation: 9,
                sound: 9,
                character: 9,
                enjoyment: 10
            },
            pros: ["Amazing plot twists", "Great character development", "Stunning animation"],
            cons: ["Can be very dark", "Complex story might confuse some viewers"],
            spoilerLevel: "none",
            episodeWatched: 75
        },
        {
            userId: createdUsers[2].id,
            animeId: createdAnimes[1].id,
            title: "Beautiful and emotional",
            content: "Your Name is a visual masterpiece with an emotional story that will make you cry. Makoto Shinkai outdid himself with this one.",
            rating: 8.5,
            categories: {
                story: 8,
                animation: 10,
                sound: 9,
                character: 8,
                enjoyment: 9
            },
            pros: ["Gorgeous animation", "Emotional story", "Great soundtrack"],
            cons: ["Some plot elements could be clearer"],
            spoilerLevel: "minor"
        }
    ];

    const createdReviews = sampleReviews.map(review => db.create('reviews', review));

    // Sample Forum Posts
    const sampleForumPosts = [
        {
            title: "What's the best anime of 2023?",
            content: "Looking for recommendations for the best anime that came out this year. What are your favorites?",
            authorId: createdUsers[2].id,
            category: "recommendations",
            type: "question",
            tags: ["recommendations", "2023", "best-of"]
        },
        {
            title: "Attack on Titan Discussion - Season 4",
            content: "Let's discuss the final season of Attack on Titan! What did you think of the ending?",
            authorId: createdUsers[1].id,
            category: "anime-discussion",
            animeId: createdAnimes[0].id,
            type: "discussion",
            tags: ["attack-on-titan", "discussion", "spoilers"],
            isPinned: true
        },
        {
            title: "Welcome to the Anime Forum!",
            content: "Welcome everyone to our anime discussion forum! Please read the rules and enjoy your stay.",
            authorId: createdUsers[0].id,
            category: "general",
            type: "announcement",
            tags: ["welcome", "rules"],
            isPinned: true
        }
    ];

    const createdForumPosts = sampleForumPosts.map(post => db.create('forumPosts', post));

    // Sample User Lists
    const sampleUserLists = [
        {
            userId: createdUsers[1].id,
            animeId: createdAnimes[0].id,
            status: "completed",
            score: 10,
            progress: 75,
            startDate: "2023-01-01",
            finishDate: "2023-02-15"
        },
        {
            userId: createdUsers[1].id,
            animeId: createdAnimes[2].id,
            status: "watching",
            score: 0,
            progress: 15,
            startDate: "2023-12-01",
            finishDate: null
        },
        {
            userId: createdUsers[2].id,
            animeId: createdAnimes[1].id,
            status: "completed",
            score: 8,
            progress: 1,
            startDate: "2023-11-15",
            finishDate: "2023-11-15"
        }
    ];

    sampleUserLists.forEach(list => db.create('userLists', list));

    // Sample Articles
    const sampleArticles = [
        {
            title: "Top 10 Anime Movies You Must Watch",
            content: "Discover the most breathtaking anime movies that have captivated audiences worldwide...",
            author: "Editorial Team",
            status: "published",
            tags: ["movies", "top-10", "recommendations"],
            publishedAt: new Date().toISOString()
        },
        {
            title: "Spring 2024 Anime Season Preview",
            content: "Get ready for an exciting spring season with these upcoming anime releases...",
            author: "News Team",
            status: "published",
            tags: ["seasonal", "preview", "spring-2024"],
            publishedAt: new Date().toISOString()
        }
    ];

    sampleArticles.forEach(article => db.create('articles', article));

    console.log('🎉 Database seeded successfully!');
    console.log(`Created ${createdAnimes.length} animes`);
    console.log(`Created ${createdGames.length} games`);
    console.log(`Created ${createdUsers.length} users`);
    console.log(`Created ${createdReviews.length} reviews`);
    console.log(`Created ${createdForumPosts.length} forum posts`);
    console.log(`Created ${sampleUserLists.length} user list entries`);
    console.log(`Created ${sampleArticles.length} articles`);

    return {
        animes: createdAnimes,
        games: createdGames,
        users: createdUsers,
        reviews: createdReviews,
        forumPosts: createdForumPosts,
        userLists: sampleUserLists,
        articles: sampleArticles
    };
};

export const clearDatabase = () => {
    const collections = ['animes', 'games', 'users', 'reviews', 'forumPosts', 'articles', 'userLists', 'reviewVotes', 'forumReplies', 'forumLikes', 'connections', 'pollVotes'];

    collections.forEach(collection => {
        db.clearCollection(collection);
    });

    console.log('🗑️ Database cleared successfully!');
};

export default {
    seedDatabase,
    clearDatabase
};
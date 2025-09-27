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
        },
        {
            title: "Naruto",
            alternativeTitles: ["ナルト"],
            synopsis: "A young ninja who seeks recognition from his peers and dreams of becoming the Hokage.",
            genres: ["Action", "Martial Arts", "Comedy", "Shounen"],
            status: "completed",
            type: "TV",
            episodes: 720,
            duration: 23,
            rating: 8.3,
            popularity: 91,
            releaseDate: "2002-10-03",
            endDate: "2017-03-23",
            studio: "Pierrot",
            source: "Manga",
            images: {
                poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Dragon Ball Z",
            alternativeTitles: ["ドラゴンボールZ"],
            synopsis: "Goku and his friends defend Earth against powerful enemies.",
            genres: ["Action", "Adventure", "Martial Arts", "Shounen"],
            status: "completed",
            type: "TV",
            episodes: 291,
            duration: 24,
            rating: 8.7,
            popularity: 89,
            releaseDate: "1989-04-26",
            endDate: "1996-01-31",
            studio: "Toei Animation",
            source: "Manga",
            images: {
                poster: "https://images.unsplash.com/photo-1611003229296-7b1d83e84b48?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1611003229296-7b1d83e84b48?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Death Note",
            alternativeTitles: ["デスノート"],
            synopsis: "A high school student discovers a supernatural notebook that kills anyone whose name is written in it.",
            genres: ["Supernatural", "Thriller", "Psychological"],
            status: "completed",
            type: "TV",
            episodes: 37,
            duration: 23,
            rating: 9.0,
            popularity: 93,
            releaseDate: "2006-10-04",
            endDate: "2007-06-27",
            studio: "Madhouse",
            source: "Manga",
            images: {
                poster: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "My Hero Academia",
            alternativeTitles: ["Boku no Hero Academia", "僕のヒーローアカデミア"],
            synopsis: "In a world where most people have superpowers, a boy without them dreams of becoming a hero.",
            genres: ["Action", "School", "Superhero", "Shounen"],
            status: "ongoing",
            type: "TV",
            episodes: 138,
            duration: 24,
            rating: 8.5,
            popularity: 88,
            releaseDate: "2016-04-03",
            endDate: null,
            studio: "Bones",
            source: "Manga",
            images: {
                poster: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Fullmetal Alchemist: Brotherhood",
            alternativeTitles: ["Hagane no Renkinjutsushi: Fullmetal Alchemist"],
            synopsis: "Two brothers use alchemy in their quest to find the Philosopher's Stone.",
            genres: ["Action", "Adventure", "Dark Fantasy", "Military"],
            status: "completed",
            type: "TV",
            episodes: 64,
            duration: 24,
            rating: 9.1,
            popularity: 90,
            releaseDate: "2009-04-05",
            endDate: "2010-07-04",
            studio: "Bones",
            source: "Manga",
            images: {
                poster: "https://images.unsplash.com/photo-1626618012641-bfbca5a31239?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1626618012641-bfbca5a31239?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Hunter x Hunter",
            alternativeTitles: ["ハンター×ハンター"],
            synopsis: "A boy searches for his father by becoming a Hunter like him.",
            genres: ["Action", "Adventure", "Fantasy", "Shounen"],
            status: "completed",
            type: "TV",
            episodes: 148,
            duration: 23,
            rating: 9.0,
            popularity: 87,
            releaseDate: "2011-10-02",
            endDate: "2014-09-24",
            studio: "Madhouse",
            source: "Manga",
            images: {
                poster: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "One Punch Man",
            alternativeTitles: ["ワンパンマン"],
            synopsis: "A superhero who can defeat any enemy with a single punch but struggles with existential ennui.",
            genres: ["Action", "Comedy", "Superhero", "Seinen"],
            status: "ongoing",
            type: "TV",
            episodes: 24,
            duration: 24,
            rating: 8.7,
            popularity: 86,
            releaseDate: "2015-10-05",
            endDate: null,
            studio: "Madhouse",
            source: "Manga",
            images: {
                poster: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Mob Psycho 100",
            alternativeTitles: ["モブサイコ100"],
            synopsis: "A middle school boy with psychic powers tries to live a normal life.",
            genres: ["Supernatural", "Comedy", "School"],
            status: "completed",
            type: "TV",
            episodes: 37,
            duration: 24,
            rating: 8.6,
            popularity: 82,
            releaseDate: "2016-07-12",
            endDate: "2022-12-22",
            studio: "Bones",
            source: "Manga",
            images: {
                poster: "https://images.unsplash.com/photo-1586182987320-4f376d39d787?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1586182987320-4f376d39d787?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Jujutsu Kaisen",
            alternativeTitles: ["呪術廻戦"],
            synopsis: "A student joins a secret organization to eliminate cursed spirits.",
            genres: ["Action", "School", "Supernatural", "Shounen"],
            status: "ongoing",
            type: "TV",
            episodes: 24,
            duration: 24,
            rating: 8.5,
            popularity: 89,
            releaseDate: "2020-10-03",
            endDate: null,
            studio: "Mappa",
            source: "Manga",
            images: {
                poster: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Chainsaw Man",
            alternativeTitles: ["チェンソーマン"],
            synopsis: "A young man makes a contract with a chainsaw devil to become a devil hunter.",
            genres: ["Action", "Horror", "Supernatural", "Seinen"],
            status: "completed",
            type: "TV",
            episodes: 12,
            duration: 24,
            rating: 8.4,
            popularity: 85,
            releaseDate: "2022-10-12",
            endDate: "2022-12-28",
            studio: "Mappa",
            source: "Manga",
            images: {
                poster: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Bleach",
            alternativeTitles: ["ブリーチ"],
            synopsis: "A teenager gains Soul Reaper powers and must protect the living world from evil spirits.",
            genres: ["Action", "Supernatural", "Shounen"],
            status: "ongoing",
            type: "TV",
            episodes: 366,
            duration: 24,
            rating: 8.2,
            popularity: 84,
            releaseDate: "2004-10-05",
            endDate: null,
            studio: "Pierrot",
            source: "Manga",
            images: {
                poster: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Tokyo Ghoul",
            alternativeTitles: ["東京喰種"],
            synopsis: "A college student becomes a half-ghoul and must learn to survive in both worlds.",
            genres: ["Action", "Horror", "Supernatural", "Seinen"],
            status: "completed",
            type: "TV",
            episodes: 48,
            duration: 24,
            rating: 7.8,
            popularity: 81,
            releaseDate: "2014-07-04",
            endDate: "2018-12-25",
            studio: "Pierrot",
            source: "Manga",
            images: {
                poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Cowboy Bebop",
            alternativeTitles: ["カウボーイビバップ"],
            synopsis: "A group of bounty hunters travel through space in 2071.",
            genres: ["Action", "Space", "Drama", "Seinen"],
            status: "completed",
            type: "TV",
            episodes: 26,
            duration: 24,
            rating: 8.8,
            popularity: 79,
            releaseDate: "1998-04-03",
            endDate: "1999-04-24",
            studio: "Sunrise",
            source: "Original",
            images: {
                poster: "https://images.unsplash.com/photo-1611003229296-7b1d83e84b48?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1611003229296-7b1d83e84b48?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Neon Genesis Evangelion",
            alternativeTitles: ["新世紀エヴァンゲリオン"],
            synopsis: "Teenagers pilot giant mechs to fight mysterious beings called Angels.",
            genres: ["Mecha", "Psychological", "Drama", "Sci-Fi"],
            status: "completed",
            type: "TV",
            episodes: 26,
            duration: 24,
            rating: 8.5,
            popularity: 78,
            releaseDate: "1995-10-04",
            endDate: "1996-03-27",
            studio: "Gainax",
            source: "Original",
            images: {
                poster: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "JoJo's Bizarre Adventure",
            alternativeTitles: ["ジョジョの奇妙な冒険"],
            synopsis: "The multigenerational tale of the heroic Joestar family and their supernatural battles.",
            genres: ["Action", "Adventure", "Supernatural", "Shounen"],
            status: "ongoing",
            type: "TV",
            episodes: 152,
            duration: 24,
            rating: 8.6,
            popularity: 83,
            releaseDate: "2012-10-06",
            endDate: null,
            studio: "David Production",
            source: "Manga",
            images: {
                poster: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Code Geass",
            alternativeTitles: ["コードギアス"],
            synopsis: "An exiled prince gains the power of absolute obedience and leads a rebellion.",
            genres: ["Mecha", "Military", "Drama", "Thriller"],
            status: "completed",
            type: "TV",
            episodes: 50,
            duration: 24,
            rating: 8.9,
            popularity: 80,
            releaseDate: "2006-10-06",
            endDate: "2008-09-28",
            studio: "Sunrise",
            source: "Original",
            images: {
                poster: "https://images.unsplash.com/photo-1626618012641-bfbca5a31239?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1626618012641-bfbca5a31239?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Violet Evergarden",
            alternativeTitles: ["ヴァイオレット・エヴァーガーデン"],
            synopsis: "A former soldier works as an Auto Memory Doll, writing letters for others.",
            genres: ["Drama", "Fantasy", "Slice of Life"],
            status: "completed",
            type: "TV",
            episodes: 13,
            duration: 24,
            rating: 8.5,
            popularity: 76,
            releaseDate: "2018-01-11",
            endDate: "2018-04-05",
            studio: "Kyoto Animation",
            source: "Light Novel",
            images: {
                poster: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Akira",
            alternativeTitles: ["アキラ"],
            synopsis: "In a dystopian 2019, a secret military project turns a biker gang member into a rampaging psychic psychopath.",
            genres: ["Action", "Thriller", "Supernatural", "Military"],
            status: "completed",
            type: "Movie",
            episodes: 1,
            duration: 124,
            rating: 8.0,
            popularity: 75,
            releaseDate: "1988-07-16",
            endDate: "1988-07-16",
            studio: "Akira Committee",
            source: "Manga",
            images: {
                poster: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Princess Mononoke",
            alternativeTitles: ["もののけ姫"],
            synopsis: "A young warrior becomes embroiled in a struggle between the gods of a forest and humans.",
            genres: ["Adventure", "Drama", "Family", "Fantasy"],
            status: "completed",
            type: "Movie",
            episodes: 1,
            duration: 134,
            rating: 8.4,
            popularity: 74,
            releaseDate: "1997-07-12",
            endDate: "1997-07-12",
            studio: "Studio Ghibli",
            source: "Original",
            images: {
                poster: "https://images.unsplash.com/photo-1586182987320-4f376d39d787?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1586182987320-4f376d39d787?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Howl's Moving Castle",
            alternativeTitles: ["ハウルの動く城"],
            synopsis: "A young woman is cursed with an old body by a spiteful witch.",
            genres: ["Adventure", "Family", "Fantasy", "Romance"],
            status: "completed",
            type: "Movie",
            episodes: 1,
            duration: 119,
            rating: 8.2,
            popularity: 73,
            releaseDate: "2004-11-20",
            endDate: "2004-11-20",
            studio: "Studio Ghibli",
            source: "Novel",
            images: {
                poster: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Ghost in the Shell",
            alternativeTitles: ["攻殻機動隊"],
            synopsis: "A cyborg policewoman hunts a mysterious hacker in a futuristic world.",
            genres: ["Action", "Sci-Fi", "Thriller", "Seinen"],
            status: "completed",
            type: "Movie",
            episodes: 1,
            duration: 83,
            rating: 8.0,
            popularity: 72,
            releaseDate: "1995-11-18",
            endDate: "1995-11-18",
            studio: "Production I.G",
            source: "Manga",
            images: {
                poster: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Steins;Gate",
            alternativeTitles: ["シュタインズ・ゲート"],
            synopsis: "A group of friends discover a way to send messages to the past and change the present.",
            genres: ["Sci-Fi", "Thriller", "Drama"],
            status: "completed",
            type: "TV",
            episodes: 24,
            duration: 24,
            rating: 9.0,
            popularity: 85,
            releaseDate: "2011-04-06",
            endDate: "2011-09-14",
            studio: "White Fox",
            source: "Visual Novel",
            images: {
                poster: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Monster",
            alternativeTitles: ["モンスター"],
            synopsis: "A doctor chases a former patient who has become a serial killer.",
            genres: ["Drama", "Horror", "Mystery", "Psychological", "Thriller", "Seinen"],
            status: "completed",
            type: "TV",
            episodes: 74,
            duration: 24,
            rating: 9.0,
            popularity: 71,
            releaseDate: "2004-04-07",
            endDate: "2005-09-28",
            studio: "Madhouse",
            source: "Manga",
            images: {
                poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Berserk",
            alternativeTitles: ["ベルセルク"],
            synopsis: "A former mercenary seeks revenge against his former best friend.",
            genres: ["Action", "Adventure", "Drama", "Horror", "Military", "Seinen"],
            status: "completed",
            type: "TV",
            episodes: 25,
            duration: 24,
            rating: 8.7,
            popularity: 70,
            releaseDate: "1997-10-08",
            endDate: "1998-04-01",
            studio: "OLM",
            source: "Manga",
            images: {
                poster: "https://images.unsplash.com/photo-1611003229296-7b1d83e84b48?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1611003229296-7b1d83e84b48?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Vinland Saga",
            alternativeTitles: ["ヴィンランド・サガ"],
            synopsis: "A young Viking warrior seeks revenge but discovers the true meaning of being a warrior.",
            genres: ["Action", "Adventure", "Drama", "Historical", "Seinen"],
            status: "ongoing",
            type: "TV",
            episodes: 48,
            duration: 24,
            rating: 8.8,
            popularity: 78,
            releaseDate: "2019-07-08",
            endDate: null,
            studio: "Wit Studio",
            source: "Manga",
            images: {
                poster: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Spy x Family",
            alternativeTitles: ["スパイファミリー"],
            synopsis: "A spy, an assassin, and a telepath form a fake family for their respective missions.",
            genres: ["Action", "Comedy", "Family", "Shounen"],
            status: "ongoing",
            type: "TV",
            episodes: 25,
            duration: 24,
            rating: 8.6,
            popularity: 90,
            releaseDate: "2022-04-09",
            endDate: null,
            studio: "Wit Studio",
            source: "Manga",
            images: {
                poster: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Haikyuu!!",
            alternativeTitles: ["ハイキュー!!"],
            synopsis: "A short student joins his school's volleyball team and discovers his talent for the sport.",
            genres: ["Comedy", "Drama", "School", "Sports", "Shounen"],
            status: "completed",
            type: "TV",
            episodes: 85,
            duration: 24,
            rating: 8.7,
            popularity: 82,
            releaseDate: "2014-04-06",
            endDate: "2020-12-19",
            studio: "Production I.G",
            source: "Manga",
            images: {
                poster: "https://images.unsplash.com/photo-1626618012641-bfbca5a31239?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1626618012641-bfbca5a31239?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Dr. Stone",
            alternativeTitles: ["ドクターストーン"],
            synopsis: "After humanity is petrified, a genius student uses science to rebuild civilization.",
            genres: ["Adventure", "Comedy", "Sci-Fi", "Shounen"],
            status: "ongoing",
            type: "TV",
            episodes: 58,
            duration: 24,
            rating: 8.2,
            popularity: 77,
            releaseDate: "2019-07-05",
            endDate: null,
            studio: "TMS Entertainment",
            source: "Manga",
            images: {
                poster: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "A Silent Voice",
            alternativeTitles: ["聲の形", "Koe no Katachi"],
            synopsis: "A former bully seeks redemption by reconnecting with a deaf girl he tormented in elementary school.",
            genres: ["Drama", "Family", "School", "Slice of Life"],
            status: "completed",
            type: "Movie",
            episodes: 1,
            duration: 130,
            rating: 8.9,
            popularity: 88,
            releaseDate: "2016-09-17",
            endDate: "2016-09-17",
            studio: "Kyoto Animation",
            source: "Manga",
            images: {
                poster: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Your Lie in April",
            alternativeTitles: ["四月は君の嘘", "Shigatsu wa Kimi no Uso"],
            synopsis: "A piano prodigy who lost his ability to hear music meets a free-spirited violinist.",
            genres: ["Drama", "Music", "Romance", "School", "Shounen"],
            status: "completed",
            type: "TV",
            episodes: 22,
            duration: 23,
            rating: 8.6,
            popularity: 83,
            releaseDate: "2014-10-10",
            endDate: "2015-03-20",
            studio: "A-1 Pictures",
            source: "Manga",
            images: {
                poster: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Made in Abyss",
            alternativeTitles: ["メイドインアビス"],
            synopsis: "A girl descends into a mysterious chasm to find her mother.",
            genres: ["Adventure", "Drama", "Fantasy", "Mystery", "Sci-Fi"],
            status: "ongoing",
            type: "TV",
            episodes: 25,
            duration: 25,
            rating: 8.8,
            popularity: 79,
            releaseDate: "2017-07-07",
            endDate: null,
            studio: "Kinema Citrus",
            source: "Manga",
            images: {
                poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "The Promised Neverland",
            alternativeTitles: ["約束のネバーランド", "Yakusoku no Neverland"],
            synopsis: "Children at an orphanage discover the dark truth about their home and plan their escape.",
            genres: ["Mystery", "Psychological", "Sci-Fi", "Shounen", "Thriller"],
            status: "completed",
            type: "TV",
            episodes: 23,
            duration: 23,
            rating: 8.5,
            popularity: 86,
            releaseDate: "2019-01-11",
            endDate: "2021-03-26",
            studio: "CloverWorks",
            source: "Manga",
            images: {
                poster: "https://images.unsplash.com/photo-1611003229296-7b1d83e84b48?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1611003229296-7b1d83e84b48?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Black Clover",
            alternativeTitles: ["ブラッククローバー"],
            synopsis: "A boy born without magic powers aims to become the Wizard King in a world where magic is everything.",
            genres: ["Action", "Comedy", "Fantasy", "Shounen"],
            status: "completed",
            type: "TV",
            episodes: 170,
            duration: 24,
            rating: 8.2,
            popularity: 84,
            releaseDate: "2017-10-03",
            endDate: "2021-03-30",
            studio: "Pierrot",
            source: "Manga",
            images: {
                poster: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=1200&h=400&fit=crop"
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
        },
        {
            title: "Grand Theft Auto V",
            description: "An action-adventure game set in the fictional state of San Andreas, focusing on three protagonists.",
            genres: ["Action", "Adventure", "Crime"],
            platform: ["PC", "PlayStation", "Xbox"],
            rating: 9.2,
            popularity: 98,
            releaseDate: "2013-09-17",
            developer: "Rockstar North",
            publisher: "Rockstar Games",
            price: 29.99,
            currency: "EUR",
            images: {
                poster: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "The Elder Scrolls V: Skyrim",
            description: "An epic fantasy role-playing game set in the province of Skyrim.",
            genres: ["RPG", "Fantasy", "Adventure"],
            platform: ["PC", "PlayStation", "Xbox", "Nintendo Switch"],
            rating: 9.4,
            popularity: 95,
            releaseDate: "2011-11-11",
            developer: "Bethesda Game Studios",
            publisher: "Bethesda Softworks",
            price: 39.99,
            currency: "EUR",
            images: {
                poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Red Dead Redemption 2",
            description: "An epic tale of life in America's unforgiving heartland during the dawn of the modern age.",
            genres: ["Action", "Adventure", "Western"],
            platform: ["PC", "PlayStation", "Xbox"],
            rating: 9.7,
            popularity: 97,
            releaseDate: "2018-10-26",
            developer: "Rockstar Studios",
            publisher: "Rockstar Games",
            price: 59.99,
            currency: "EUR",
            images: {
                poster: "https://images.unsplash.com/photo-1611003229296-7b1d83e84b48?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1611003229296-7b1d83e84b48?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Minecraft",
            description: "A sandbox video game about placing blocks and going on adventures.",
            genres: ["Sandbox", "Survival", "Creative"],
            platform: ["PC", "Mobile", "Console"],
            rating: 9.0,
            popularity: 99,
            releaseDate: "2011-11-18",
            developer: "Mojang Studios",
            publisher: "Microsoft",
            price: 26.95,
            currency: "EUR",
            images: {
                poster: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Call of Duty: Modern Warfare",
            description: "A first-person shooter that redefines the iconic series for a new generation.",
            genres: ["FPS", "Action", "Multiplayer"],
            platform: ["PC", "PlayStation", "Xbox"],
            rating: 8.1,
            popularity: 94,
            releaseDate: "2019-10-25",
            developer: "Infinity Ward",
            publisher: "Activision",
            price: 59.99,
            currency: "EUR",
            images: {
                poster: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "FIFA 24",
            description: "The latest installment in the world's most popular football simulation series.",
            genres: ["Sports", "Simulation", "Multiplayer"],
            platform: ["PC", "PlayStation", "Xbox", "Nintendo Switch"],
            rating: 8.5,
            popularity: 92,
            releaseDate: "2023-09-29",
            developer: "EA Sports",
            publisher: "Electronic Arts",
            price: 69.99,
            currency: "EUR",
            images: {
                poster: "https://images.unsplash.com/photo-1626618012641-bfbca5a31239?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1626618012641-bfbca5a31239?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Assassin's Creed Valhalla",
            description: "Become Eivor, a legendary Viking raider, and lead your clan to glory.",
            genres: ["Action", "Adventure", "RPG"],
            platform: ["PC", "PlayStation", "Xbox"],
            rating: 8.2,
            popularity: 88,
            releaseDate: "2020-11-10",
            developer: "Ubisoft Montreal",
            publisher: "Ubisoft",
            price: 59.99,
            currency: "EUR",
            images: {
                poster: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Fortnite",
            description: "A free-to-play battle royale game where 100 players fight to be the last one standing.",
            genres: ["Battle Royale", "Action", "Multiplayer"],
            platform: ["PC", "Mobile", "Console"],
            rating: 7.8,
            popularity: 96,
            releaseDate: "2017-09-26",
            developer: "Epic Games",
            publisher: "Epic Games",
            price: 0,
            currency: "EUR",
            images: {
                poster: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Apex Legends",
            description: "A free-to-play battle royale game featuring unique characters with special abilities.",
            genres: ["Battle Royale", "FPS", "Multiplayer"],
            platform: ["PC", "PlayStation", "Xbox", "Nintendo Switch"],
            rating: 8.3,
            popularity: 89,
            releaseDate: "2019-02-04",
            developer: "Respawn Entertainment",
            publisher: "Electronic Arts",
            price: 0,
            currency: "EUR",
            images: {
                poster: "https://images.unsplash.com/photo-1586182987320-4f376d39d787?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1586182987320-4f376d39d787?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Valorant",
            description: "A competitive first-person tactical shooter with unique agent abilities.",
            genres: ["FPS", "Tactical", "Competitive"],
            platform: ["PC"],
            rating: 8.0,
            popularity: 91,
            releaseDate: "2020-06-02",
            developer: "Riot Games",
            publisher: "Riot Games",
            price: 0,
            currency: "EUR",
            images: {
                poster: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "League of Legends",
            description: "A multiplayer online battle arena game where teams compete to destroy the enemy base.",
            genres: ["MOBA", "Strategy", "Multiplayer"],
            platform: ["PC"],
            rating: 8.2,
            popularity: 93,
            releaseDate: "2009-10-27",
            developer: "Riot Games",
            publisher: "Riot Games",
            price: 0,
            currency: "EUR",
            images: {
                poster: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Counter-Strike 2",
            description: "The latest evolution of the world's most popular tactical FPS.",
            genres: ["FPS", "Tactical", "Competitive"],
            platform: ["PC"],
            rating: 8.4,
            popularity: 90,
            releaseDate: "2023-09-27",
            developer: "Valve",
            publisher: "Valve",
            price: 0,
            currency: "EUR",
            images: {
                poster: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Overwatch 2",
            description: "A team-based multiplayer first-person shooter with unique heroes.",
            genres: ["FPS", "Hero Shooter", "Multiplayer"],
            platform: ["PC", "PlayStation", "Xbox", "Nintendo Switch"],
            rating: 7.5,
            popularity: 87,
            releaseDate: "2022-10-04",
            developer: "Blizzard Entertainment",
            publisher: "Blizzard Entertainment",
            price: 0,
            currency: "EUR",
            images: {
                poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "World of Warcraft",
            description: "The most popular MMORPG, set in the fantasy world of Azeroth.",
            genres: ["MMORPG", "Fantasy", "Adventure"],
            platform: ["PC"],
            rating: 8.8,
            popularity: 85,
            releaseDate: "2004-11-23",
            developer: "Blizzard Entertainment",
            publisher: "Blizzard Entertainment",
            price: 14.99,
            currency: "EUR",
            images: {
                poster: "https://images.unsplash.com/photo-1611003229296-7b1d83e84b48?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1611003229296-7b1d83e84b48?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Cyberpunk 2077",
            description: "An open-world, action-adventure story set in the dark future of Night City.",
            genres: ["RPG", "Sci-Fi", "Action"],
            platform: ["PC", "PlayStation", "Xbox"],
            rating: 8.1,
            popularity: 84,
            releaseDate: "2020-12-10",
            developer: "CD Projekt RED",
            publisher: "CD Projekt",
            price: 49.99,
            currency: "EUR",
            images: {
                poster: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "The Witcher 3: Wild Hunt",
            description: "A story-driven open world RPG set in a fantasy universe full of choices and consequences.",
            genres: ["RPG", "Fantasy", "Adventure"],
            platform: ["PC", "PlayStation", "Xbox", "Nintendo Switch"],
            rating: 9.3,
            popularity: 93,
            releaseDate: "2015-05-19",
            developer: "CD Projekt RED",
            publisher: "CD Projekt",
            price: 39.99,
            currency: "EUR",
            images: {
                poster: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Elden Ring",
            description: "A dark fantasy action RPG from the creators of Dark Souls.",
            genres: ["Action RPG", "Dark Fantasy", "Adventure"],
            platform: ["PC", "PlayStation", "Xbox"],
            rating: 9.5,
            popularity: 92,
            releaseDate: "2022-02-25",
            developer: "FromSoftware",
            publisher: "Bandai Namco",
            price: 59.99,
            currency: "EUR",
            images: {
                poster: "https://images.unsplash.com/photo-1626618012641-bfbca5a31239?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1626618012641-bfbca5a31239?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "God of War",
            description: "Follow Kratos and his son Atreus on their journey through the Norse realms.",
            genres: ["Action", "Adventure", "Mythology"],
            platform: ["PC", "PlayStation"],
            rating: 9.1,
            popularity: 89,
            releaseDate: "2018-04-20",
            developer: "Santa Monica Studio",
            publisher: "Sony Interactive Entertainment",
            price: 49.99,
            currency: "EUR",
            images: {
                poster: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Spider-Man: Miles Morales",
            description: "Experience the rise of Miles Morales as he masters new powers to become his own Spider-Man.",
            genres: ["Action", "Adventure", "Superhero"],
            platform: ["PlayStation", "PC"],
            rating: 8.5,
            popularity: 86,
            releaseDate: "2020-11-12",
            developer: "Insomniac Games",
            publisher: "Sony Interactive Entertainment",
            price: 49.99,
            currency: "EUR",
            images: {
                poster: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Horizon Zero Dawn",
            description: "Experience Aloy's legendary quest to unravel the mysteries of a future Earth.",
            genres: ["Action RPG", "Sci-Fi", "Adventure"],
            platform: ["PC", "PlayStation"],
            rating: 8.9,
            popularity: 88,
            releaseDate: "2017-02-28",
            developer: "Guerrilla Games",
            publisher: "Sony Interactive Entertainment",
            price: 49.99,
            currency: "EUR",
            images: {
                poster: "https://images.unsplash.com/photo-1586182987320-4f376d39d787?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1586182987320-4f376d39d787?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Ghost of Tsushima",
            description: "Forge a new path and wage an unconventional war for the freedom of Tsushima.",
            genres: ["Action", "Adventure", "Historical"],
            platform: ["PC", "PlayStation"],
            rating: 8.7,
            popularity: 83,
            releaseDate: "2020-07-17",
            developer: "Sucker Punch Productions",
            publisher: "Sony Interactive Entertainment",
            price: 59.99,
            currency: "EUR",
            images: {
                poster: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "The Last of Us Part II",
            description: "Experience the emotional sequel to the acclaimed post-apocalyptic adventure.",
            genres: ["Action", "Survival", "Post-Apocalyptic"],
            platform: ["PlayStation", "PC"],
            rating: 9.2,
            popularity: 91,
            releaseDate: "2020-06-19",
            developer: "Naughty Dog",
            publisher: "Sony Interactive Entertainment",
            price: 39.99,
            currency: "EUR",
            images: {
                poster: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Halo Infinite",
            description: "Master Chief's greatest adventure yet in the most expansive Halo campaign ever.",
            genres: ["FPS", "Sci-Fi", "Action"],
            platform: ["PC", "Xbox"],
            rating: 8.3,
            popularity: 87,
            releaseDate: "2021-12-08",
            developer: "343 Industries",
            publisher: "Microsoft Studios",
            price: 59.99,
            currency: "EUR",
            images: {
                poster: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Rocket League",
            description: "A unique blend of arcade-style soccer and vehicular mayhem.",
            genres: ["Sports", "Racing", "Multiplayer"],
            platform: ["PC", "PlayStation", "Xbox", "Nintendo Switch"],
            rating: 8.5,
            popularity: 90,
            releaseDate: "2015-07-07",
            developer: "Psyonix",
            publisher: "Epic Games",
            price: 0,
            currency: "EUR",
            images: {
                poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Among Us",
            description: "A multiplayer game of teamwork and betrayal set on a space station.",
            genres: ["Social Deduction", "Multiplayer", "Casual"],
            platform: ["PC", "Mobile", "Console"],
            rating: 7.8,
            popularity: 85,
            releaseDate: "2018-06-15",
            developer: "InnerSloth",
            publisher: "InnerSloth",
            price: 4.99,
            currency: "EUR",
            images: {
                poster: "https://images.unsplash.com/photo-1611003229296-7b1d83e84b48?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1611003229296-7b1d83e84b48?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Fall Guys",
            description: "A massively multiplayer party game with up to 60 players in hilarious obstacle courses.",
            genres: ["Party", "Multiplayer", "Casual"],
            platform: ["PC", "PlayStation", "Xbox", "Nintendo Switch"],
            rating: 8.0,
            popularity: 82,
            releaseDate: "2020-08-04",
            developer: "Mediatonic",
            publisher: "Epic Games",
            price: 0,
            currency: "EUR",
            images: {
                poster: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Genshin Impact",
            description: "An open-world action RPG that takes you on a journey across the fantasy world of Teyvat.",
            genres: ["Action RPG", "Anime", "Gacha"],
            platform: ["PC", "Mobile", "PlayStation"],
            rating: 8.2,
            popularity: 94,
            releaseDate: "2020-09-28",
            developer: "miHoYo",
            publisher: "miHoYo",
            price: 0,
            currency: "EUR",
            images: {
                poster: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Stardew Valley",
            description: "A farming simulation game where you inherit your grandfather's old farm plot.",
            genres: ["Simulation", "RPG", "Indie"],
            platform: ["PC", "Mobile", "Console"],
            rating: 8.9,
            popularity: 86,
            releaseDate: "2016-02-26",
            developer: "ConcernedApe",
            publisher: "ConcernedApe",
            price: 13.99,
            currency: "EUR",
            images: {
                poster: "https://images.unsplash.com/photo-1626618012641-bfbca5a31239?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1626618012641-bfbca5a31239?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Animal Crossing: New Horizons",
            description: "Create your own island paradise in this relaxing life simulation game.",
            genres: ["Simulation", "Social", "Family"],
            platform: ["Nintendo Switch"],
            rating: 8.6,
            popularity: 88,
            releaseDate: "2020-03-20",
            developer: "Nintendo EPD",
            publisher: "Nintendo",
            price: 59.99,
            currency: "EUR",
            images: {
                poster: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Super Mario Odyssey",
            description: "Join Mario on a massive, globe-trotting 3D adventure using his incredible new abilities.",
            genres: ["Platformer", "Adventure", "Family"],
            platform: ["Nintendo Switch"],
            rating: 9.7,
            popularity: 91,
            releaseDate: "2017-10-27",
            developer: "Nintendo EPD",
            publisher: "Nintendo",
            price: 59.99,
            currency: "EUR",
            images: {
                poster: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "The Legend of Zelda: Tears of the Kingdom",
            description: "The latest adventure in the acclaimed Legend of Zelda series.",
            genres: ["Action", "Adventure", "Fantasy"],
            platform: ["Nintendo Switch"],
            rating: 9.6,
            popularity: 95,
            releaseDate: "2023-05-12",
            developer: "Nintendo EPD",
            publisher: "Nintendo",
            price: 69.99,
            currency: "EUR",
            images: {
                poster: "https://images.unsplash.com/photo-1586182987320-4f376d39d787?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1586182987320-4f376d39d787?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Super Smash Bros. Ultimate",
            description: "The biggest fighting game in the series' history, featuring every fighter ever.",
            genres: ["Fighting", "Multiplayer", "Party"],
            platform: ["Nintendo Switch"],
            rating: 9.3,
            popularity: 90,
            releaseDate: "2018-12-07",
            developer: "Bandai Namco",
            publisher: "Nintendo",
            price: 59.99,
            currency: "EUR",
            images: {
                poster: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Pokémon Scarlet and Violet",
            description: "The newest entries in the Pokémon series, set in the Paldea region.",
            genres: ["RPG", "Adventure", "Family"],
            platform: ["Nintendo Switch"],
            rating: 7.9,
            popularity: 89,
            releaseDate: "2022-11-18",
            developer: "Game Freak",
            publisher: "Nintendo",
            price: 59.99,
            currency: "EUR",
            images: {
                poster: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Diablo IV",
            description: "Return to the world of Sanctuary in this dark fantasy action RPG.",
            genres: ["Action RPG", "Dark Fantasy", "Multiplayer"],
            platform: ["PC", "PlayStation", "Xbox"],
            rating: 8.4,
            popularity: 87,
            releaseDate: "2023-06-06",
            developer: "Blizzard Entertainment",
            publisher: "Blizzard Entertainment",
            price: 69.99,
            currency: "EUR",
            images: {
                poster: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Baldur's Gate 3",
            description: "An RPG masterpiece based on the iconic Dungeons & Dragons tabletop RPG.",
            genres: ["RPG", "Fantasy", "Turn-Based"],
            platform: ["PC", "PlayStation"],
            rating: 9.6,
            popularity: 92,
            releaseDate: "2023-08-03",
            developer: "Larian Studios",
            publisher: "Larian Studios",
            price: 59.99,
            currency: "EUR",
            images: {
                poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=400&fit=crop"
            }
        },
        {
            title: "Starfield",
            description: "Bethesda's first new universe in over 25 years - explore the cosmos in this space RPG.",
            genres: ["RPG", "Sci-Fi", "Space"],
            platform: ["PC", "Xbox"],
            rating: 8.1,
            popularity: 85,
            releaseDate: "2023-09-06",
            developer: "Bethesda Game Studios",
            publisher: "Bethesda Softworks",
            price: 69.99,
            currency: "EUR",
            images: {
                poster: "https://images.unsplash.com/photo-1611003229296-7b1d83e84b48?w=400&h=600&fit=crop",
                banner: "https://images.unsplash.com/photo-1611003229296-7b1d83e84b48?w=1200&h=400&fit=crop"
            }
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
            title: "Attack on Titan Finale - War es das Warten wert?",
            content: "Nach dem langen Warten ist das Finale endlich da! Ich muss sagen, dass die Animationsqualität unglaublich war, besonders in den Kampfszenen. Die emotionalen Momente haben mich wirklich berührt. Was denkst du über Erens Entscheidungen? Hat er das Richtige getan? Ich finde, dass die Serie perfekt abgeschlossen wurde, obwohl einige Fans anderer Meinung sind. Die OST-Musik war wieder einmal phänomenal!",
            authorId: createdUsers[1].id,
            category: "anime-discussion",
            animeId: createdAnimes[0].id,
            type: "discussion",
            tags: ["attack-on-titan", "finale", "discussion"]
        },
        {
            title: "Elden Ring vs. Dark Souls - Welches ist besser?",
            content: "Ich habe beide Spiele durchgespielt und bin mir immer noch nicht sicher. Elden Ring hat diese riesige offene Welt und so viel zu entdecken, aber Dark Souls hat dieses klassische, kompakte Level-Design. Die Bosse in Elden Ring sind spektakulär, aber manchmal fühlt sich die Welt zu groß an. Dark Souls dagegen ist perfekt ausbalanciert. Was ist eure Meinung? Welches FromSoftware-Spiel ist das beste?",
            authorId: createdUsers[2].id,
            category: "games",
            type: "discussion",
            tags: ["elden-ring", "dark-souls", "fromsoft", "vergleich"]
        },
        {
            title: "Demon Slayer Staffel 3 Diskussion - Spoiler Alert!",
            content: "WOW! Diese Staffel war unglaublich! Die Animation von Ufotable ist wieder einmal atemberaubend. Die Kämpfe waren so flüssig und die Effekte... einfach perfekt! Tanjiros Entwicklung ist so gut geschrieben. Ich liebe es, wie sie die Charaktere entwickeln. Nezuko ist immer noch meine Lieblingsfigur. Wer freut sich schon auf die nächste Staffel? Was waren eure Lieblingsmomente?",
            authorId: createdUsers[0].id,
            category: "anime-discussion",
            animeId: createdAnimes[2].id,
            type: "discussion",
            tags: ["demon-slayer", "staffel-3", "ufotable", "spoiler"]
        },
        {
            title: "Gaming Setup 2024 - Meine Empfehlungen",
            content: "Hier ist mein ultimativer Gaming-Setup Guide für 2024! Monitor: LG OLED 27\" für die besten Farben. Tastatur: Corsair K95 RGB - mechanisch und langlebig. Maus: Logitech G Pro X Superlight. Headset: SteelSeries Arctis 7. Grafikkarte: RTX 4070 Super ist das beste Preis-Leistungs-Verhältnis. Was ist euer Setup? Teilt eure Builds!",
            authorId: createdUsers[1].id,
            category: "games",
            type: "guide",
            tags: ["gaming-setup", "hardware", "2024", "empfehlungen"]
        },
        {
            title: "One Piece - Gear 5 Animation ist UNGLAUBLICH!",
            content: "Leute, ich kann nicht glauben, wie gut Toei diese Gear 5 Szenen animiert hat! Die Art, wie sie Luffys neue Kräfte dargestellt haben, ist einfach perfekt. Der Rubberhose-Stil passt so gut zu seinem Charakter. Die Farben, die Bewegungen, alles ist so lebendig! Wer hätte gedacht, dass Toei Animation so einen Sprung machen würde? Das ist wahrscheinlich die beste One Piece Animation aller Zeiten!",
            authorId: createdUsers[2].id,
            category: "anime-discussion",
            animeId: createdAnimes[4].id,
            type: "discussion",
            tags: ["one-piece", "gear-5", "animation", "toei"]
        },
        {
            title: "Zelda: Tears of the Kingdom - Perfektes Spiel?",
            content: "Ich habe jetzt 150 Stunden gespielt und bin immer noch begeistert! Die Baum-Mechanik ist revolutionär. Man kann ALLES bauen! Habe ein fliegendes Auto gebaut und bin durch ganz Hyrule geflogen. Die Story ist auch viel besser als in Breath of the Wild. Link und Zelda haben endlich echte Charakterentwicklung. Die Dungeons sind zurück und besser denn je! 10/10 Spiel für mich. Was baut ihr so?",
            authorId: createdUsers[0].id,
            category: "games",
            gameId: createdGames[0].id,
            type: "review",
            tags: ["zelda", "tears-of-kingdom", "nintendo", "open-world"]
        },
        {
            title: "Anime Empfehlungen für Neulinge",
            content: "Mein Freund will mit Anime anfangen. Was sind die besten Starter-Anime? Ich denke an: 1. Attack on Titan - spannend und nicht zu lang. 2. Death Note - psychologisch faszinierend. 3. Your Name - perfekt für Film-Liebhaber. 4. Spirited Away - Studio Ghibli Klassiker. 5. Demon Slayer - moderne Animation. Was würdet ihr noch empfehlen? Keine zu langen Serien bitte!",
            authorId: createdUsers[1].id,
            category: "recommendations",
            type: "question",
            tags: ["empfehlungen", "anfänger", "starter", "anime"]
        },
        {
            title: "Cyberpunk 2077 ist jetzt richtig gut!",
            content: "Nach all den Updates ist Cyberpunk endlich das Spiel, was es hätte sein sollen! Die Bugs sind fast alle weg, die Performance ist stabil und die Story ist immer noch fantastisch. Night City fühlt sich jetzt wirklich lebendig an. Die Phantom Liberty DLC ist auch großartig - Keanu Reeves ist wieder perfekt. Wer hat es nochmal gespielt? Hat sich wirklich gelohnt zu warten!",
            authorId: createdUsers[2].id,
            category: "games",
            gameId: createdGames[1].id,
            type: "discussion",
            tags: ["cyberpunk-2077", "update", "phantom-liberty", "cdpr"]
        },
        {
            title: "Studio Ghibli vs. Makoto Shinkai - Wer ist besser?",
            content: "Beide sind Legenden, aber sie haben komplett unterschiedliche Stile. Ghibli hat diese nostalgische, warme Atmosphäre mit perfekten Geschichten. Miyazaki ist ein Genie! Aber Shinkai... seine Filme sind visuell atemberaubend. Your Name und Weathering with You sind Meisterwerke der Animation. Die Lichteffekte sind unglaublich! Was ist euer Favorit? Klassisches Ghibli oder moderner Shinkai?",
            authorId: createdUsers[0].id,
            category: "anime-discussion",
            animeId: createdAnimes[1].id,
            type: "discussion",
            tags: ["ghibli", "shinkai", "vergleich", "filme"]
        },
        {
            title: "Among Us ist zurück! Neues Update ist genial",
            content: "Das neue Hide and Seek Mode ist so lustig! Endlich gibt es offizielle Verstecken-Spielmodi. Die neuen Rollen bringen auch viel Abwechslung ins Spiel. Scientist, Guardian, Shapeshifter - alles macht das Spiel viel taktischer. Wer spielt noch regelmäßig? Suche eine nette Gruppe zum gemeinsamen Spielen. Am besten abends nach der Arbeit!",
            authorId: createdUsers[1].id,
            category: "games",
            gameId: createdGames[3].id,
            type: "discussion",
            tags: ["among-us", "update", "multiplayer", "gruppe-gesucht"]
        },
        {
            title: "Warum sind Isekai-Anime so beliebt?",
            content: "Ich verstehe den Hype nicht ganz. Überall sehe ich diese 'in eine andere Welt transportiert' Geschichten. Einige sind gut wie Re:Zero oder Konosuba, aber viele sind doch sehr ähnlich. Overpowered Protagonist, Harem, Gaming-Mechaniken... wird das nicht langweilig? Oder übersehe ich etwas? Erklärt mir bitte, was ihr an Isekai liebt! Vielleicht kann ich es dann auch mehr schätzen.",
            authorId: createdUsers[2].id,
            category: "anime-discussion",
            type: "discussion",
            tags: ["isekai", "genre", "diskussion", "meinung"]
        },
        {
            title: "Hades - Das perfekte Roguelike Game?",
            content: "Supergiant Games hat wirklich ein Meisterwerk geschaffen! Die Art, wie sie Story und Gameplay verbunden haben, ist genial. Jeder Tod bringt die Geschichte voran. Die Charaktere sind so gut geschrieben, besonders die Beziehungen zu den Göttern. Der Soundtrack ist auch unglaublich! Ich habe 200+ Runs gemacht und es wird nicht langweilig. Wer spielt es auch noch?",
            authorId: createdUsers[0].id,
            category: "games",
            gameId: createdGames[4].id,
            type: "review",
            tags: ["hades", "roguelike", "supergiant", "indie"]
        },
        {
            title: "Anime Filme vs. Serien - Was ist besser?",
            content: "Ich bin hin und her gerissen. Filme wie Spirited Away oder Your Name sind perfekt abgerundete Kunstwerke. Aber Serien wie Attack on Titan oder One Piece haben so viel mehr Zeit für Charakterentwicklung. In 2 Stunden kann man nicht alles erzählen, was in 100+ Episoden möglich ist. Aber Filme sind oft visuell beeindruckender. Was bevorzugt ihr und warum?",
            authorId: createdUsers[1].id,
            category: "anime-discussion",
            type: "discussion",
            tags: ["filme", "serien", "vergleich", "diskussion"]
        },
        {
            title: "Gaming auf Steam Deck - Lohnt sich das?",
            content: "Ich überlege mir ein Steam Deck zu kaufen. Wie ist die Performance bei aktuellen Spielen? Kann man wirklich AAA Games flüssig spielen? Battery Life ist auch wichtig - wie lange hält es bei intensiven Spielen? Und wie ist das Handheld-Gefühl? Fühlt sich das wie eine echte Konsole an? Wer hat Erfahrungen damit gemacht? Lohnt sich der Kauf?",
            authorId: createdUsers[2].id,
            category: "games",
            type: "question",
            tags: ["steam-deck", "handheld", "valve", "beratung"]
        },
        {
            title: "Willkommen in unserer Community! 🎮🍿",
            content: "Hallo und herzlich willkommen in unserem Anime & Gaming Forum! Hier könnt ihr über eure Lieblings-Anime diskutieren, Gaming-Tipps austauschen und neue Freunde finden. Bitte lest unsere Community-Regeln und stellt euch gerne vor! Was sind eure aktuellen Lieblingsanime/Spiele? Wir freuen uns auf interessante Diskussionen mit euch allen!",
            authorId: createdUsers[0].id,
            category: "general",
            type: "announcement",
            tags: ["willkommen", "regeln", "vorstellung"],
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
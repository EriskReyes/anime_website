
import React, { useState, useEffect } from "react";
import { AnimeModel } from "../models/AnimeModel.js";
import { GameModel } from "../models/GameModel.js";
import HeroSection from "../components/home/HeroSection";
import TrendingSection from "../components/home/TrendingSection";
import ArticleCard from "../components/home/ArticleCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Gamepad2, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [featuredArticle, setFeaturedArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = () => {
    setIsLoading(true);
    try {
      const animes = AnimeModel.findAll();
      const games = GameModel.findAll();

      // Convert animes to article format
      const animeArticles = animes.map(anime => ({
        id: anime.id,
        title: anime.title,
        description: anime.description,
        type: 'anime',
        rating: anime.rating,
        image_url: anime.images?.poster || null,
        preview_url: anime.trailer || null,
        manufacturer: anime.studio,
        platform: anime.platform || [],
        genre: anime.genres || [],
        status: anime.status,
        createdAt: anime.createdAt,
        featured: anime.featured || false
      }));

      // Convert games to article format
      const gameArticles = games.map(game => ({
        id: game.id,
        title: game.title,
        description: game.description,
        type: 'game',
        rating: game.rating,
        image_url: game.images?.poster || null,
        preview_url: game.trailer || null,
        manufacturer: game.developer,
        platform: game.platform || [],
        genre: game.genres || [],
        status: game.status,
        createdAt: game.createdAt,
        featured: game.featured || false
      }));

      // Combine and sort by creation date
      const allArticles = [...animeArticles, ...gameArticles].sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      );

      setArticles(allArticles);

      // Find featured article or use the first one
      const featured = allArticles.find(article => article.featured) || allArticles[0];
      setFeaturedArticle(featured);
    } catch (error) {
      console.error('Error loading content:', error);
      setArticles([]);
      setFeaturedArticle(null);
    }
    setIsLoading(false);
  };

  const animeArticles = articles.filter(article => article.type === 'anime').slice(0, 6);
  const gameArticles = articles.filter(article => article.type === 'game').slice(0, 6);
  const recentArticles = articles.slice(0, 9);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-white/60">Inhalt wird geladen...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Helden-Abschnitt */}
      <HeroSection featuredArticle={featuredArticle} />

      {/* Trending-Abschnitt */}
      <TrendingSection articles={articles} />

      {/* Hauptinhaltsbereiche */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-purple-400" />
              <h2 className="text-3xl md:text-4xl font-black text-white">Nach Kategorie entdecken</h2>
              <Sparkles className="w-6 h-6 text-purple-400" />
            </div>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Entdecke die besten, sorgfältig ausgewählten Anime- und Gaming-Inhalte
            </p>
          </motion.div>

          <Tabs defaultValue="recent" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white/5 backdrop-blur-lg border border-white/10 mb-8">
              <TabsTrigger 
                value="recent" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 text-white"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Neueste
              </TabsTrigger>
              <TabsTrigger 
                value="anime"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-600 data-[state=active]:to-red-600 text-white"
              >
                <Play className="w-4 h-4 mr-2" />
                Anime
              </TabsTrigger>
              <TabsTrigger 
                value="games"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 text-white"
              >
                <Gamepad2 className="w-4 h-4 mr-2" />
                Spiele
              </TabsTrigger>
            </TabsList>

            <TabsContent value="recent">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentArticles.map((article, index) => (
                  <ArticleCard key={article.id} article={article} index={index} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="anime">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {animeArticles.map((article, index) => (
                  <ArticleCard key={article.id} article={article} index={index} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="games">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gameArticles.map((article, index) => (
                  <ArticleCard key={article.id} article={article} index={index} />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="text-center mt-12">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-2xl shadow-purple-500/25"
            >
              Alle Inhalte ansehen
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}


import React, { useState, useEffect } from "react";
import { Article } from "@/api/entities";
import ArticleCard from "../components/home/ArticleCard";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Star, Flame, Award } from "lucide-react";
import { motion } from "framer-motion";

export default function Trending() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    setIsLoading(true);
    const data = await Article.list("-created_date");
    setArticles(data);
    setIsLoading(false);
  };

  // Trendartikel abrufen (hoch bewertet)
  const trendingArticles = articles.filter(article => article.rating >= 4.0);
  const topRatedArticles = [...articles].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 12);
  const newReleases = articles.filter(article => article.status === 'released').slice(0, 12);
  const upcoming = articles.filter(article => article.status === 'upcoming').slice(0, 12);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-white/60">Lade trendende Inhalte...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Kopfzeile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-black text-white">Trending</h1>
          </div>
          <p className="text-white/60 text-lg">
            Das Beliebteste und am besten bewertete im Moment
          </p>
        </motion.div>

        {/* Statistik-Karten */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-lg border border-orange-500/30 rounded-xl p-6 text-center">
            <Flame className="w-8 h-8 text-orange-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{trendingArticles.length}</div>
            <div className="text-orange-300 text-sm">Jetzt im Trend</div>
          </div>
          
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-lg border border-yellow-500/30 rounded-xl p-6 text-center">
            <Award className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{topRatedArticles.length > 0 ? topRatedArticles[0].rating?.toFixed(1) : "0.0"}</div>
            <div className="text-yellow-300 text-sm">Top-Bewertung</div>
          </div>
          
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-lg border border-green-500/30 rounded-xl p-6 text-center">
            <Star className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{newReleases.length}</div>
            <div className="text-green-300 text-sm">Neuerscheinungen</div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-lg border border-blue-500/30 rounded-xl p-6 text-center">
            <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{upcoming.length}</div>
            <div className="text-blue-300 text-sm">Demnächst</div>
          </div>
        </motion.div>

        {/* Trending-Inhalte-Tabs */}
        <Tabs defaultValue="trending" className="w-full">
          <TabsList className="grid grid-cols-4 bg-white/5 backdrop-blur-lg border border-white/10 mb-8">
            <TabsTrigger 
              value="trending"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-red-600 text-white"
            >
              <Flame className="w-4 h-4 mr-2" />
              Trending
            </TabsTrigger>
            <TabsTrigger 
              value="top-rated"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-600 data-[state=active]:to-orange-600 text-white"
            >
              <Award className="w-4 h-4 mr-2" />
              Top bewertet
            </TabsTrigger>
            <TabsTrigger 
              value="new-releases"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-emerald-600 text-white"
            >
              <Star className="w-4 h-4 mr-2" />
              Neuerscheinungen
            </TabsTrigger>
            <TabsTrigger 
              value="upcoming"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 text-white"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Demnächst
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trending">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Flame className="w-5 h-5 text-orange-400" />
                <h3 className="text-xl font-bold text-white">Beliebtester Inhalt</h3>
                <Badge variant="outline" className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                  {trendingArticles.length} Einträge
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {trendingArticles.map((article, index) => (
                  <ArticleCard key={article.id} article={article} index={index} />
                ))}
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="top-rated">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-yellow-400" />
                <h3 className="text-xl font-bold text-white">Top bewertet</h3>
                <Badge variant="outline" className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                  Top 12
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {topRatedArticles.map((article, index) => (
                  <ArticleCard key={article.id} article={article} index={index} />
                ))}
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="new-releases">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-green-400" />
                <h3 className="text-xl font-bold text-white">Aktuelle Veröffentlichungen</h3>
                <Badge variant="outline" className="bg-green-500/20 text-green-300 border-green-500/30">
                  {newReleases.length} neu
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {newReleases.map((article, index) => (
                  <ArticleCard key={article.id} article={article} index={index} />
                ))}
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="upcoming">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <h3 className="text-xl font-bold text-white">Demnächst</h3>
                <Badge variant="outline" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                  {upcoming.length} erwartet
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {upcoming.map((article, index) => (
                  <ArticleCard key={article.id} article={article} index={index} />
                ))}
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

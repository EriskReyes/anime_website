
import React, { useState, useEffect, useCallback } from "react";
import { Article } from "@/api/entities";
import ArticleCard from "../components/home/ArticleCard";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Search, Filter, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function Anime() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [isLoading, setIsLoading] = useState(true);

  const loadArticles = useCallback(async () => {
    setIsLoading(true);
    const data = await Article.filter({ type: "anime" }, "-created_date");
    setArticles(data);
    setIsLoading(false);
  }, []);

  const filterArticles = useCallback(() => {
    let filtered = [...articles];

    // Suchfilter
    if (searchTerm) {
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.manufacturer?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Genre-Filter
    if (selectedGenre !== "all") {
      filtered = filtered.filter(article => 
        article.genre && article.genre.includes(selectedGenre)
      );
    }

    // Status-Filter
    if (selectedStatus !== "all") {
      filtered = filtered.filter(article => article.status === selectedStatus);
    }

    // Sortierung
    switch (sortBy) {
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "title":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "release_date":
        filtered.sort((a, b) => new Date(b.release_date || 0) - new Date(a.release_date || 0));
        break;
      default: // Neueste
        filtered.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
    }

    setFilteredArticles(filtered);
  }, [articles, searchTerm, selectedGenre, selectedStatus, sortBy]);

  useEffect(() => {
    loadArticles();
  }, [loadArticles]); // Abhängig von loadArticles, das jetzt memoisiert ist

  useEffect(() => {
    filterArticles();
  }, [filterArticles]); // Abhängig von filterArticles, das jetzt memoisiert ist

  const allGenres = [...new Set(articles.flatMap(article => article.genre || []))];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-white/60">Anime werden geladen...</p>
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
            <div className="w-12 h-12 bg-gradient-to-r from-pink-600 to-red-600 rounded-xl flex items-center justify-center">
              <Play className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-black text-white">Anime</h1>
          </div>
          <p className="text-white/60 text-lg">
            Entdecke die besten Animes aller Genres
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-purple-400" />
            <h3 className="text-white font-semibold">Filter</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Suchfilter */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
              <Input
                placeholder="Suche nach Anime..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/50"
              />
            </div>

            {/* Genre-Filter */}
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Genres</SelectItem>
                {allGenres.map(genre => (
                  <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Status-Filter */}
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Status</SelectItem>
                <SelectItem value="released">Veröffentlicht</SelectItem>
                <SelectItem value="upcoming">Demnächst</SelectItem>
                <SelectItem value="announced">Angekündigt</SelectItem>
              </SelectContent>
            </Select>

            {/* Sortierung */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Sortieren nach" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Neueste</SelectItem>
                <SelectItem value="rating">Beste Bewertung</SelectItem>
                <SelectItem value="title">Titel A-Z</SelectItem>
                <SelectItem value="release_date">Veröffentlichungsdatum</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Aktive Filter */}
          <div className="flex flex-wrap gap-2 mt-4">
            {searchTerm && (
              <Badge variant="outline" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                Suche: "{searchTerm}"
              </Badge>
            )}
            {selectedGenre !== "all" && (
              <Badge variant="outline" className="bg-pink-500/20 text-pink-300 border-pink-500/30">
                Genre: {selectedGenre}
              </Badge>
            )}
            {selectedStatus !== "all" && (
              <Badge variant="outline" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                Status: {selectedStatus}
              </Badge>
            )}
          </div>
        </motion.div>

        {/* Ergebniszählung */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-white/60">
            Zeige {filteredArticles.length} von {articles.length} Animes
          </p>
          
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-white/80 text-sm">
              Durchschnitt: {articles.length > 0 ? 
                (articles.reduce((sum, article) => sum + (article.rating || 0), 0) / articles.length).toFixed(1) : 
                "0.0"
              }
            </span>
          </div>
        </div>

        {/* Artikel-Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredArticles.map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Play className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Keine Animes gefunden</h3>
            <p className="text-white/60 mb-6">
              Versuche, deine Filter oder Suchbegriffe anzupassen
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedGenre("all");
                setSelectedStatus("all");
                setSortBy("recent");
              }}
              variant="outline"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              Filter zurücksetzen
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

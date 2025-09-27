
import React, { useState, useEffect, useCallback } from "react";
import { AnimeModel } from "../models/AnimeModel.js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Search, Filter, Star, Calendar, Clock, Eye, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export default function Anime() {
  const [animes, setAnimes] = useState([]);
  const [filteredAnimes, setFilteredAnimes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [isLoading, setIsLoading] = useState(true);

  const loadAnimes = useCallback(() => {
    setIsLoading(true);
    try {
      const data = AnimeModel.findAll();
      setAnimes(data);
    } catch (error) {
      console.error('Error loading animes:', error);
      setAnimes([]);
    }
    setIsLoading(false);
  }, []);

  const filterAnimes = useCallback(() => {
    let filtered = [...animes];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(anime =>
        anime.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        anime.synopsis.toLowerCase().includes(searchTerm.toLowerCase()) ||
        anime.studio?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        anime.alternativeTitles?.some(title => title.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Genre filter
    if (selectedGenre !== "all") {
      filtered = filtered.filter(anime =>
        anime.genres && anime.genres.includes(selectedGenre)
      );
    }

    // Status filter
    if (selectedStatus !== "all") {
      filtered = filtered.filter(anime => anime.status === selectedStatus);
    }

    // Sorting
    switch (sortBy) {
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "title":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "release_date":
        filtered.sort((a, b) => new Date(b.releaseDate || 0) - new Date(a.releaseDate || 0));
        break;
      case "episodes":
        filtered.sort((a, b) => (b.episodes || 0) - (a.episodes || 0));
        break;
      case "popularity":
        filtered.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        break;
      default: // Recent (by created date)
        filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }

    setFilteredAnimes(filtered);
  }, [animes, searchTerm, selectedGenre, selectedStatus, sortBy]);

  useEffect(() => {
    loadAnimes();
  }, [loadAnimes]);

  useEffect(() => {
    filterAnimes();
  }, [filterAnimes]);

  const allGenres = [...new Set(animes.flatMap(anime => anime.genres || []))];

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
                <SelectItem value="completed">Abgeschlossen</SelectItem>
                <SelectItem value="ongoing">Laufend</SelectItem>
                <SelectItem value="upcoming">Demnächst</SelectItem>
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
                <SelectItem value="popularity">Beliebtheit</SelectItem>
                <SelectItem value="title">Titel A-Z</SelectItem>
                <SelectItem value="release_date">Veröffentlichungsdatum</SelectItem>
                <SelectItem value="episodes">Episodenzahl</SelectItem>
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
            Zeige {filteredAnimes.length} von {animes.length} Animes
          </p>

          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-white/80 text-sm">
              Durchschnitt: {animes.length > 0 ?
                (animes.reduce((sum, anime) => sum + (anime.rating || 0), 0) / animes.length).toFixed(1) :
                "0.0"
              }
            </span>
          </div>
        </div>

        {/* Anime Grid */}
        {filteredAnimes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAnimes.map((anime, index) => (
              <motion.div
                key={anime.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 transition-all duration-300 overflow-hidden group h-full flex flex-col">
                  {/* Bild */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={anime.images?.poster || "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=225&fit=crop"}
                      alt={anime.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    {/* Typ-Badge */}
                    <Badge className="absolute top-3 left-3 bg-pink-500/90 text-white border-0 font-semibold">
                      🎬 ANIME
                    </Badge>

                    {/* Status-Badge */}
                    {anime.status === 'upcoming' && (
                      <Badge className="absolute top-3 right-3 bg-orange-500/90 text-white border-0">
                        <Calendar className="w-3 h-3 mr-1" />
                        Demnächst
                      </Badge>
                    )}

                    {/* Play-Button-Overlay */}
                    {anime.trailer && (
                      <Button
                        size="icon"
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 opacity-0 group-hover:opacity-100 transition-all duration-300"
                        variant="ghost"
                      >
                        <Play className="w-6 h-6 text-white" />
                      </Button>
                    )}
                  </div>

                  <CardHeader className="pb-3">
                    <h3 className="font-bold text-white text-lg line-clamp-2 group-hover:text-purple-300 transition-colors">
                      {anime.title}
                    </h3>

                    {anime.studio && (
                      <p className="text-white/60 text-sm font-medium">
                        von {anime.studio}
                      </p>
                    )}
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col justify-between">
                    <p className="text-white/80 text-sm leading-relaxed line-clamp-3 mb-4">
                      {anime.synopsis}
                    </p>

                    <div className="space-y-3">
                      {/* Bewertung */}
                      {anime.rating && (
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(anime.rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-600'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-white font-semibold text-sm">
                            {anime.rating.toFixed(1)}
                          </span>
                        </div>
                      )}

                      {/* Episodes/Type */}
                      {anime.episodes && (
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="outline" className="bg-white/5 border-white/20 text-white/80 text-xs">
                            {anime.episodes} Episoden
                          </Badge>
                          <Badge variant="outline" className="bg-white/5 border-white/20 text-white/80 text-xs">
                            {anime.type}
                          </Badge>
                        </div>
                      )}

                      {/* Genres */}
                      {anime.genres && anime.genres.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {anime.genres.slice(0, 2).map((genre) => (
                            <Badge key={genre} variant="secondary" className="bg-purple-500/20 text-purple-300 border-0 text-xs">
                              {genre}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <Button
                        variant="ghost"
                        className="w-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 hover:from-purple-600/30 hover:to-pink-600/30 text-white border-white/20 mt-2"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Details ansehen
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
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

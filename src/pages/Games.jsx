import React, { useState, useEffect, useCallback } from "react";
import { GameModel } from "../models/GameModel.js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Gamepad2, Search, Filter, Star, Calendar, Euro, ExternalLink, Play } from "lucide-react";
import { motion } from "framer-motion";

export default function Games() {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [isLoading, setIsLoading] = useState(true);

  const loadGames = useCallback(() => {
    setIsLoading(true);
    try {
      const data = GameModel.findAll();
      setGames(data);
    } catch (error) {
      console.error('Error loading games:', error);
      setGames([]);
    }
    setIsLoading(false);
  }, []);

  const filterGames = useCallback(() => {
    let filtered = [...games];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(game =>
        game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.developer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.publisher?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.alternativeTitles?.some(title => title.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Genre filter
    if (selectedGenre !== "all") {
      filtered = filtered.filter(game =>
        game.genres && game.genres.includes(selectedGenre)
      );
    }

    // Platform filter
    if (selectedPlatform !== "all") {
      filtered = filtered.filter(game =>
        game.platform && game.platform.includes(selectedPlatform)
      );
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
      case "price":
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "popularity":
        filtered.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        break;
      default: // Recent
        filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }

    setFilteredGames(filtered);
  }, [games, searchTerm, selectedGenre, selectedPlatform, sortBy]);

  useEffect(() => {
    loadGames();
  }, [loadGames]);

  useEffect(() => {
    filterGames();
  }, [filterGames]);

  const allGenres = [...new Set(games.flatMap(game => game.genres || []))];
  const allPlatforms = [...new Set(games.flatMap(game => game.platform || []))];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white/60">Spiele werden geladen...</p>
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
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-black text-white">Spiele</h1>
          </div>
          <p className="text-white/60 text-lg">
            Entdecke die besten Spiele aller Genres und Plattformen
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
            <Filter className="w-5 h-5 text-blue-400" />
            <h3 className="text-white font-semibold">Filter</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Suchfilter */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
              <Input
                placeholder="Suche nach Spielen..."
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

            {/* Plattform-Filter */}
            <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Plattform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Plattformen</SelectItem>
                {allPlatforms.map(platform => (
                  <SelectItem key={platform} value={platform}>{platform}</SelectItem>
                ))}
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
                <SelectItem value="price">Preis (niedrig zu hoch)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Aktive Filter */}
          <div className="flex flex-wrap gap-2 mt-4">
            {searchTerm && (
              <Badge variant="outline" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                Suche: "{searchTerm}"
              </Badge>
            )}
            {selectedGenre !== "all" && (
              <Badge variant="outline" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                Genre: {selectedGenre}
              </Badge>
            )}
            {selectedPlatform !== "all" && (
              <Badge variant="outline" className="bg-green-500/20 text-green-300 border-green-500/30">
                Plattform: {selectedPlatform}
              </Badge>
            )}
          </div>
        </motion.div>

        {/* Ergebniszählung */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-white/60">
            Zeige {filteredGames.length} von {games.length} Spielen
          </p>

          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-white/80 text-sm">
              Durchschnitt: {games.length > 0 ?
                (games.reduce((sum, game) => sum + (game.rating || 0), 0) / games.length).toFixed(1) :
                "0.0"
              }
            </span>
          </div>
        </div>

        {/* Game Grid */}
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGames.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 transition-all duration-300 overflow-hidden group h-full flex flex-col">
                  {/* Bild */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={game.images?.poster || "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=225&fit=crop"}
                      alt={game.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    {/* Typ-Badge */}
                    <Badge className="absolute top-3 left-3 bg-blue-500/90 text-white border-0 font-semibold">
                      🎮 SPIEL
                    </Badge>

                    {/* Status-Badge */}
                    {game.status === 'upcoming' && (
                      <Badge className="absolute top-3 right-3 bg-orange-500/90 text-white border-0">
                        <Calendar className="w-3 h-3 mr-1" />
                        Demnächst
                      </Badge>
                    )}

                    {/* Play-Button-Overlay */}
                    {game.trailer && (
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
                      {game.title}
                    </h3>

                    {game.developer && (
                      <p className="text-white/60 text-sm font-medium">
                        von {game.developer}
                      </p>
                    )}
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col justify-between">
                    <p className="text-white/80 text-sm leading-relaxed line-clamp-3 mb-4">
                      {game.description}
                    </p>

                    <div className="space-y-3">
                      {/* Bewertung */}
                      {game.rating && (
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(game.rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-600'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-white font-semibold text-sm">
                            {game.rating.toFixed(1)}
                          </span>
                        </div>
                      )}

                      {/* Platforms/Price */}
                      {game.platform && game.platform.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {game.platform.slice(0, 3).map((platform) => (
                            <Badge key={platform} variant="outline" className="bg-white/5 border-white/20 text-white/80 text-xs">
                              {platform}
                            </Badge>
                          ))}
                          {game.platform.length > 3 && (
                            <Badge variant="outline" className="bg-white/5 border-white/20 text-white/80 text-xs">
                              +{game.platform.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}

                      {/* Genres */}
                      {game.genres && game.genres.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {game.genres.slice(0, 2).map((genre) => (
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
            <Gamepad2 className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Keine Spiele gefunden</h3>
            <p className="text-white/60 mb-6">
              Versuche, deine Filter oder Suchbegriffe anzupassen
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedGenre("all");
                setSelectedPlatform("all");
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
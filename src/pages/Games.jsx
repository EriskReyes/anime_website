import React, { useState, useEffect, useCallback } from "react";
import { GameModel } from "../models/GameModel.js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Gamepad2, Search, Filter, Star, Calendar, Euro } from "lucide-react";
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
                <Card className="group bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <div className="aspect-[3/4] overflow-hidden">
                      <img
                        src={game.images?.poster || "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=600&fit=crop"}
                        alt={game.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute top-2 left-2 flex gap-1">
                      <Badge variant="secondary" className="bg-black/60 text-white text-xs">
                        {game.platform?.[0] || 'PC'}
                      </Badge>
                      {game.status === 'released' && (
                        <Badge variant="default" className="bg-green-500 text-white text-xs">
                          Verfügbar
                        </Badge>
                      )}
                    </div>
                    <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 rounded px-2 py-1">
                      <Star className="w-3 h-3 text-yellow-400" />
                      <span className="text-white text-xs">{game.rating || 'N/A'}</span>
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    <CardTitle className="text-white text-lg leading-tight line-clamp-2">
                      {game.title}
                    </CardTitle>
                    <CardDescription className="text-white/60 text-sm line-clamp-2">
                      {game.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      {/* Genres */}
                      <div className="flex flex-wrap gap-1">
                        {game.genres?.slice(0, 3).map((genre) => (
                          <Badge key={genre} variant="outline" className="text-xs bg-blue-500/20 text-blue-300 border-blue-500/30">
                            {genre}
                          </Badge>
                        ))}
                        {game.genres?.length > 3 && (
                          <Badge variant="outline" className="text-xs bg-gray-500/20 text-gray-300 border-gray-500/30">
                            +{game.genres.length - 3}
                          </Badge>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex items-center justify-between text-xs text-white/60">
                        <div className="flex items-center gap-1">
                          <Euro className="w-3 h-3" />
                          <span>{game.price ? `${game.price}€` : 'Free'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{game.releaseDate ? new Date(game.releaseDate).getFullYear() : 'TBA'}</span>
                        </div>
                      </div>

                      {/* Developer */}
                      {game.developer && (
                        <div className="text-xs text-white/50">
                          Entwickler: {game.developer}
                        </div>
                      )}

                      {/* Features */}
                      {game.features && game.features.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {game.features.slice(0, 2).map((feature) => (
                            <Badge key={feature} variant="outline" className="text-xs bg-green-500/20 text-green-300 border-green-500/30">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Wishlist progress */}
                      <div className="w-full bg-white/10 rounded-full h-1.5">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full transition-all duration-300" style={{width: '0%'}}></div>
                      </div>
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

import React, { useState, useEffect } from "react";
import { AnimeModel } from "../models/AnimeModel.js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Star, Flame, Award, Play, Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function Trending() {
  const [animes, setAnimes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAnimes();
  }, []);

  const loadAnimes = () => {
    setIsLoading(true);
    try {
      const data = AnimeModel.findAll();
      setAnimes(data);
    } catch (error) {
      console.error('Error loading animes:', error);
      setAnimes([]);
    }
    setIsLoading(false);
  };

  // Trend-Animes abrufen (hoch bewertet)
  const trendingAnimes = AnimeModel.getTrending(12);
  const topRatedAnimes = AnimeModel.getTopRated(12);
  const newReleases = animes.filter(anime => anime.status === 'completed').slice(0, 12);
  const upcoming = animes.filter(anime => anime.status === 'upcoming').slice(0, 12);

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
            <div className="text-2xl font-bold text-white">{trendingAnimes.length}</div>
            <div className="text-orange-300 text-sm">Jetzt im Trend</div>
          </div>

          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-lg border border-yellow-500/30 rounded-xl p-6 text-center">
            <Award className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{topRatedAnimes.length > 0 ? topRatedAnimes[0].rating?.toFixed(1) : "0.0"}</div>
            <div className="text-yellow-300 text-sm">Top-Bewertung</div>
          </div>

          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-lg border border-green-500/30 rounded-xl p-6 text-center">
            <Star className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{newReleases.length}</div>
            <div className="text-green-300 text-sm">Abgeschlossen</div>
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
              Abgeschlossen
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
                <h3 className="text-xl font-bold text-white">Beliebteste Anime</h3>
                <Badge variant="outline" className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                  {trendingAnimes.length} Einträge
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {trendingAnimes.map((anime, index) => (
                  <motion.div
                    key={anime.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="group bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <div className="aspect-[3/4] overflow-hidden">
                          <img
                            src={anime.images?.poster || "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=600&fit=crop"}
                            alt={anime.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                        <div className="absolute top-2 left-2 flex gap-1">
                          <Badge variant="secondary" className="bg-black/60 text-white text-xs">
                            {anime.type || 'Anime'}
                          </Badge>
                          {anime.status === 'ongoing' && (
                            <Badge variant="default" className="bg-green-500 text-white text-xs">
                              Laufend
                            </Badge>
                          )}
                        </div>
                        <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 rounded px-2 py-1">
                          <Star className="w-3 h-3 text-yellow-400" />
                          <span className="text-white text-xs">{anime.rating || 'N/A'}</span>
                        </div>
                      </div>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-white text-lg leading-tight line-clamp-2">
                          {anime.title}
                        </CardTitle>
                        <CardDescription className="text-white/60 text-sm line-clamp-2">
                          {anime.synopsis}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-3">
                          {/* Genres */}
                          <div className="flex flex-wrap gap-1">
                            {anime.genres?.slice(0, 3).map((genre) => (
                              <Badge key={genre} variant="outline" className="text-xs bg-blue-500/20 text-blue-300 border-blue-500/30">
                                {genre}
                              </Badge>
                            ))}
                            {anime.genres?.length > 3 && (
                              <Badge variant="outline" className="text-xs bg-gray-500/20 text-gray-300 border-gray-500/30">
                                +{anime.genres.length - 3}
                              </Badge>
                            )}
                          </div>

                          {/* Info */}
                          <div className="flex items-center justify-between text-xs text-white/60">
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              <span>{anime.rating || 0}/10</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{anime.releaseDate ? new Date(anime.releaseDate).getFullYear() : 'TBA'}</span>
                            </div>
                          </div>

                          {/* Studio */}
                          {anime.studio && (
                            <div className="text-xs text-white/50">
                              Studio: {anime.studio}
                            </div>
                          )}

                          {/* Episodes */}
                          {anime.episodes && (
                            <div className="flex flex-wrap gap-1">
                              <Badge variant="outline" className="text-xs bg-green-500/20 text-green-300 border-green-500/30">
                                {anime.episodes} Episoden
                              </Badge>
                              <Badge variant="outline" className="text-xs bg-green-500/20 text-green-300 border-green-500/30">
                                {anime.type}
                              </Badge>
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
                <h3 className="text-xl font-bold text-white">Top bewertete Anime</h3>
                <Badge variant="outline" className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                  Top 12
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {topRatedAnimes.map((anime, index) => (
                  <motion.div key={anime.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                    <Card className="group bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <div className="aspect-[3/4] overflow-hidden">
                          <img
                            src={anime.images?.poster || "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=600&fit=crop"}
                            alt={anime.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                        <div className="absolute top-2 left-2 flex gap-1">
                          <Badge variant="secondary" className="bg-black/60 text-white text-xs">
                            {anime.type || 'Anime'}
                          </Badge>
                          {anime.status === 'ongoing' && (
                            <Badge variant="default" className="bg-green-500 text-white text-xs">
                              Laufend
                            </Badge>
                          )}
                        </div>
                        <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 rounded px-2 py-1">
                          <Star className="w-3 h-3 text-yellow-400" />
                          <span className="text-white text-xs">{anime.rating || 'N/A'}</span>
                        </div>
                      </div>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-white text-lg leading-tight line-clamp-2">{anime.title}</CardTitle>
                        <CardDescription className="text-white/60 text-sm line-clamp-2">{anime.synopsis}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-3">
                          {/* Genres */}
                          <div className="flex flex-wrap gap-1">
                            {anime.genres?.slice(0, 3).map((genre) => (
                              <Badge key={genre} variant="outline" className="text-xs bg-blue-500/20 text-blue-300 border-blue-500/30">
                                {genre}
                              </Badge>
                            ))}
                            {anime.genres?.length > 3 && (
                              <Badge variant="outline" className="text-xs bg-gray-500/20 text-gray-300 border-gray-500/30">
                                +{anime.genres.length - 3}
                              </Badge>
                            )}
                          </div>

                          {/* Info */}
                          <div className="flex items-center justify-between text-xs text-white/60">
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              <span>{anime.rating || 0}/10</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{anime.releaseDate ? new Date(anime.releaseDate).getFullYear() : 'TBA'}</span>
                            </div>
                          </div>

                          {/* Studio */}
                          {anime.studio && (
                            <div className="text-xs text-white/50">
                              Studio: {anime.studio}
                            </div>
                          )}

                          {/* Episodes */}
                          {anime.episodes && (
                            <div className="flex flex-wrap gap-1">
                              <Badge variant="outline" className="text-xs bg-green-500/20 text-green-300 border-green-500/30">
                                {anime.episodes} Episoden
                              </Badge>
                              <Badge variant="outline" className="text-xs bg-green-500/20 text-green-300 border-green-500/30">
                                {anime.type}
                              </Badge>
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
                <h3 className="text-xl font-bold text-white">Abgeschlossene Anime</h3>
                <Badge variant="outline" className="bg-green-500/20 text-green-300 border-green-500/30">
                  {newReleases.length} abgeschlossen
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {newReleases.map((anime, index) => (
                  <motion.div key={anime.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                    <Card className="group bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <div className="aspect-[3/4] overflow-hidden">
                          <img
                            src={anime.images?.poster || "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=600&fit=crop"}
                            alt={anime.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                        <div className="absolute top-2 left-2 flex gap-1">
                          <Badge variant="secondary" className="bg-black/60 text-white text-xs">
                            {anime.type || 'Anime'}
                          </Badge>
                          {anime.status === 'ongoing' && (
                            <Badge variant="default" className="bg-green-500 text-white text-xs">
                              Laufend
                            </Badge>
                          )}
                        </div>
                        <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 rounded px-2 py-1">
                          <Star className="w-3 h-3 text-yellow-400" />
                          <span className="text-white text-xs">{anime.rating || 'N/A'}</span>
                        </div>
                      </div>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-white text-lg leading-tight line-clamp-2">{anime.title}</CardTitle>
                        <CardDescription className="text-white/60 text-sm line-clamp-2">{anime.synopsis}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-3">
                          {/* Genres */}
                          <div className="flex flex-wrap gap-1">
                            {anime.genres?.slice(0, 3).map((genre) => (
                              <Badge key={genre} variant="outline" className="text-xs bg-blue-500/20 text-blue-300 border-blue-500/30">
                                {genre}
                              </Badge>
                            ))}
                            {anime.genres?.length > 3 && (
                              <Badge variant="outline" className="text-xs bg-gray-500/20 text-gray-300 border-gray-500/30">
                                +{anime.genres.length - 3}
                              </Badge>
                            )}
                          </div>

                          {/* Info */}
                          <div className="flex items-center justify-between text-xs text-white/60">
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              <span>{anime.rating || 0}/10</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{anime.releaseDate ? new Date(anime.releaseDate).getFullYear() : 'TBA'}</span>
                            </div>
                          </div>

                          {/* Studio */}
                          {anime.studio && (
                            <div className="text-xs text-white/50">
                              Studio: {anime.studio}
                            </div>
                          )}

                          {/* Episodes */}
                          {anime.episodes && (
                            <div className="flex flex-wrap gap-1">
                              <Badge variant="outline" className="text-xs bg-green-500/20 text-green-300 border-green-500/30">
                                {anime.episodes} Episoden
                              </Badge>
                              <Badge variant="outline" className="text-xs bg-green-500/20 text-green-300 border-green-500/30">
                                {anime.type}
                              </Badge>
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
                <h3 className="text-xl font-bold text-white">Kommende Anime</h3>
                <Badge variant="outline" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                  {upcoming.length} erwartet
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {upcoming.map((anime, index) => (
                  <motion.div key={anime.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                    <Card className="group bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <div className="aspect-[3/4] overflow-hidden">
                          <img
                            src={anime.images?.poster || "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=600&fit=crop"}
                            alt={anime.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                        <div className="absolute top-2 left-2 flex gap-1">
                          <Badge variant="secondary" className="bg-black/60 text-white text-xs">
                            {anime.type || 'Anime'}
                          </Badge>
                          {anime.status === 'ongoing' && (
                            <Badge variant="default" className="bg-green-500 text-white text-xs">
                              Laufend
                            </Badge>
                          )}
                        </div>
                        <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 rounded px-2 py-1">
                          <Star className="w-3 h-3 text-yellow-400" />
                          <span className="text-white text-xs">{anime.rating || 'N/A'}</span>
                        </div>
                      </div>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-white text-lg leading-tight line-clamp-2">{anime.title}</CardTitle>
                        <CardDescription className="text-white/60 text-sm line-clamp-2">{anime.synopsis}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-3">
                          {/* Genres */}
                          <div className="flex flex-wrap gap-1">
                            {anime.genres?.slice(0, 3).map((genre) => (
                              <Badge key={genre} variant="outline" className="text-xs bg-blue-500/20 text-blue-300 border-blue-500/30">
                                {genre}
                              </Badge>
                            ))}
                            {anime.genres?.length > 3 && (
                              <Badge variant="outline" className="text-xs bg-gray-500/20 text-gray-300 border-gray-500/30">
                                +{anime.genres.length - 3}
                              </Badge>
                            )}
                          </div>

                          {/* Info */}
                          <div className="flex items-center justify-between text-xs text-white/60">
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              <span>{anime.rating || 0}/10</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{anime.releaseDate ? new Date(anime.releaseDate).getFullYear() : 'TBA'}</span>
                            </div>
                          </div>

                          {/* Studio */}
                          {anime.studio && (
                            <div className="text-xs text-white/50">
                              Studio: {anime.studio}
                            </div>
                          )}

                          {/* Episodes */}
                          {anime.episodes && (
                            <div className="flex flex-wrap gap-1">
                              <Badge variant="outline" className="text-xs bg-green-500/20 text-green-300 border-green-500/30">
                                {anime.episodes} Episoden
                              </Badge>
                              <Badge variant="outline" className="text-xs bg-green-500/20 text-green-300 border-green-500/30">
                                {anime.type}
                              </Badge>
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
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}


import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Play, Calendar, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export default function ArticleCard({ article, index }) {
  const isAnime = article.type === 'anime';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 transition-all duration-300 overflow-hidden group h-full flex flex-col">
        {/* Bild */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={article.image_url || "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=225&fit=crop"}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Typ-Badge */}
          <Badge
            className={`absolute top-3 left-3 ${
              isAnime
                ? 'bg-pink-500/90 text-white'
                : 'bg-blue-500/90 text-white'
            } border-0 font-semibold`}
          >
            {isAnime ? '🎬 ANIME' : '🎮 SPIEL'}
          </Badge>

          {/* Status-Badge */}
          {article.status === 'upcoming' && (
            <Badge className="absolute top-3 right-3 bg-orange-500/90 text-white border-0">
              <Calendar className="w-3 h-3 mr-1" />
              Demnächst
            </Badge>
          )}

          {/* Play-Button-Overlay */}
          {article.preview_url && (
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
            {article.title}
          </h3>

          {article.manufacturer && (
            <p className="text-white/60 text-sm font-medium">
              von {article.manufacturer}
            </p>
          )}
        </CardHeader>

        <CardContent className="flex-1 flex flex-col justify-between">
          <p className="text-white/80 text-sm leading-relaxed line-clamp-3 mb-4">
            {article.description}
          </p>

          <div className="space-y-3">
            {/* Bewertung */}
            {article.rating && (
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(article.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-white font-semibold text-sm">
                  {article.rating.toFixed(1)}
                </span>
              </div>
            )}

            {/* Plattformen */}
            {article.platform && article.platform.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {article.platform.slice(0, 3).map((platform) => (
                  <Badge key={platform} variant="outline" className="bg-white/5 border-white/20 text-white/80 text-xs">
                    {platform}
                  </Badge>
                ))}
                {article.platform.length > 3 && (
                  <Badge variant="outline" className="bg-white/5 border-white/20 text-white/80 text-xs">
                    +{article.platform.length - 3}
                  </Badge>
                )}
              </div>
            )}

            {/* Genres */}
            {article.genre && article.genre.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {article.genre.slice(0, 2).map((g) => (
                  <Badge key={g} variant="secondary" className="bg-purple-500/20 text-purple-300 border-0 text-xs">
                    {g}
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
  );
}

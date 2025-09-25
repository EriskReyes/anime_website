
import React from "react";
import { Button } from "@/components/ui/button";
import { Play, Star, Calendar, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function HeroSection({ featuredArticle }) {
  if (!featuredArticle) return null;

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Hintergrundbild mit Überlagerung */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: featuredArticle.image_url ? `url(${featuredArticle.image_url})` : `url(https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=1920&h=1080&fit=crop)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
      </div>

      {/* Inhalt */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <Badge 
              variant="secondary" 
              className={`${featuredArticle.type === 'anime' ? 'bg-pink-500/20 text-pink-400' : 'bg-blue-500/20 text-blue-400'} border-0 text-sm font-semibold`}
            >
              {featuredArticle.type === 'anime' ? '🎬 ANIME' : '🎮 SPIEL'}
            </Badge>
            {featuredArticle.status === 'upcoming' && (
              <Badge variant="outline" className="bg-orange-500/20 text-orange-400 border-orange-400/20">
                <Calendar className="w-3 h-3 mr-1" />
                Demnächst
              </Badge>
            )}
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent leading-tight">
            {featuredArticle.title}
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
            {featuredArticle.description}
          </p>

          <div className="flex items-center gap-6 mb-8">
            {featuredArticle.manufacturer && (
              <div className="text-white/80">
                <span className="text-sm text-white/60">Von</span>
                <div className="font-semibold">{featuredArticle.manufacturer}</div>
              </div>
            )}
            
            {featuredArticle.rating && (
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(featuredArticle.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-white font-semibold">
                  {featuredArticle.rating.toFixed(1)}
                </span>
              </div>
            )}

            {featuredArticle.platform && featuredArticle.platform.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-white/60 text-sm">Auf</span>
                <div className="flex gap-2">
                  {featuredArticle.platform.slice(0, 3).map((platform) => (
                    <Badge key={platform} variant="outline" className="bg-white/10 border-white/20 text-white text-xs">
                      {platform}
                    </Badge>
                  ))}
                  {featuredArticle.platform.length > 3 && (
                    <Badge variant="outline" className="bg-white/10 border-white/20 text-white text-xs">
                      +{featuredArticle.platform.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-4">
            {featuredArticle.preview_url && (
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-2xl shadow-purple-500/25">
                <Play className="w-5 h-5 mr-2" />
                Trailer ansehen
              </Button>
            )}
            
            <Button size="lg" variant="outline" className="border-white/30 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm">
              <ExternalLink className="w-5 h-5 mr-2" />
              Mehr erfahren
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll-Indikator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

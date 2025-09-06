
import React from "react";
import { Button } from "@/components/ui/button";
import { TrendingUp, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import ArticleCard from "./ArticleCard";

export default function TrendingSection({ articles }) {
  const trendingArticles = articles.filter(article => article.rating >= 4.0).slice(0, 6);

  if (trendingArticles.length === 0) return null;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-black/20">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-12"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-white">Trending</h2>
              <p className="text-white/60">Was gerade angesagt ist</p>
            </div>
          </div>
          
          <Button variant="ghost" className="hidden md:flex text-white hover:text-purple-300 hover:bg-white/10">
            Alle ansehen <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingArticles.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
            Alle ansehen <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}


import React, { useState, useEffect } from "react";
import { ForumPostModel } from "../models/ForumPostModel.js";
import { UserModel } from "../models/UserModel.js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Plus, Heart, Clock, User as UserIcon } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { de } from "date-fns/locale";

export default function Forum() {
  const [posts, setPosts] = useState([]);
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", content: "", category: "general" });
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setIsLoading(true);
    try {
      const forumPosts = ForumPostModel.findAll();
      const users = UserModel.findAll();
      const user = users.find(u => u.username === 'otaku_master') || users[0];

      setPosts(forumPosts);
      setCurrentUser(user);
    } catch (error) {
      console.error("Fehler beim Laden der Forendaten:", error);
    }
    setIsLoading(false);
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    try {
      const post = new ForumPostModel({
        title: newPost.title,
        content: newPost.content,
        category: newPost.category,
        authorId: currentUser?.id || 'anonymous'
      });

      post.save();
      setNewPost({ title: "", content: "", category: "general" });
      setShowNewPost(false);
      loadData();
    } catch (error) {
      console.error('Fehler beim Erstellen des Beitrags:', error);
    }
  };

  const categoryColors = {
    "anime-discussion": "bg-pink-500/20 text-pink-400 border-pink-500/30",
    "games": "bg-blue-500/20 text-blue-400 border-blue-500/30",
    "general": "bg-purple-500/20 text-purple-400 border-purple-500/30",
    "recommendations": "bg-orange-500/20 text-orange-400 border-orange-500/30",
    "help": "bg-green-500/20 text-green-400 border-green-500/30"
  };
  
  const categoryTranslations = {
    "anime-discussion": "Anime",
    "games": "Spiele",
    "general": "Allgemein",
    "recommendations": "Empfehlungen",
    "help": "Hilfe"
  };

  const filterPostsByCategory = (category) => {
    return category === "all" ? posts : posts.filter(post => post.category === category);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-white/60">Forum wird geladen...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Kopfzeile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-black text-white">Community-Forum</h1>
          </div>
          <p className="text-white/60 text-lg">
            Nimm an Diskussionen über Anime und Gaming teil
          </p>
        </motion.div>

        {/* "Neuer Beitrag"-Button */}
        <div className="flex justify-center mb-8">
          <Button
            onClick={() => setShowNewPost(!showNewPost)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Neuen Beitrag erstellen
          </Button>
        </div>

        {/* "Neuer Beitrag"-Formular */}
        {showNewPost && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card className="bg-white/5 backdrop-blur-lg border-white/10 mb-8">
              <CardHeader>
                <CardTitle className="text-white">Neuen Beitrag erstellen</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreatePost} className="space-y-4">
                  <Input
                    placeholder="Titel des Beitrags..."
                    value={newPost.title}
                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                    className="bg-white/10 border-white/20 text-white placeholder-white/50"
                  />
                  
                  <select
                    value={newPost.category}
                    onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white"
                  >
                    <option value="general">Allgemein</option>
                    <option value="anime-discussion">Anime Diskussion</option>
                    <option value="games">Spiele</option>
                    <option value="recommendations">Empfehlungen</option>
                    <option value="help">Hilfe</option>
                  </select>

                  <Textarea
                    placeholder="Schreibe deinen Inhalt hier..."
                    value={newPost.content}
                    onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                    className="bg-white/10 border-white/20 text-white placeholder-white/50 min-h-[100px]"
                  />

                  <div className="flex gap-3">
                    <Button type="submit" className="bg-green-600 hover:bg-green-700">
                      Veröffentlichen
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowNewPost(false)} className="border-white/20 text-white hover:bg-white/10">
                      Abbrechen
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Forumsbeiträge */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-6 bg-white/5 backdrop-blur-lg border border-white/10 mb-6">
            <TabsTrigger value="all" className="data-[state=active]:bg-white/20 text-white text-sm">
              Alle
            </TabsTrigger>
            <TabsTrigger value="general" className="data-[state=active]:bg-purple-600 text-white text-sm">
              Allgemein
            </TabsTrigger>
            <TabsTrigger value="anime-discussion" className="data-[state=active]:bg-pink-600 text-white text-sm">
              Anime
            </TabsTrigger>
            <TabsTrigger value="games" className="data-[state=active]:bg-blue-600 text-white text-sm">
              Spiele
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="data-[state=active]:bg-orange-600 text-white text-sm">
              Empfehlungen
            </TabsTrigger>
            <TabsTrigger value="help" className="data-[state=active]:bg-green-600 text-white text-sm">
              Hilfe
            </TabsTrigger>
          </TabsList>

          {["all", "general", "anime-discussion", "games", "recommendations", "help"].map((category) => (
            <TabsContent key={category} value={category}>
              <div className="space-y-4">
                {filterPostsByCategory(category).map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Badge variant="outline" className={categoryColors[post.category]}>
                                {categoryTranslations[post.category]}
                              </Badge>
                              <div className="flex items-center gap-2 text-white/60 text-sm">
                                <UserIcon className="w-4 h-4" />
                                <span>Benutzer</span>
                                <Clock className="w-4 h-4" />
                                <span>{format(new Date(post.createdAt), "dd. MMM yyyy", { locale: de })}</span>
                              </div>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{post.title}</h3>
                            <p className="text-white/80 leading-relaxed line-clamp-3">{post.content}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                          <div className="flex items-center gap-4">
                            <button className="flex items-center gap-2 text-white/60 hover:text-red-400 transition-colors">
                              <Heart className="w-4 h-4" />
                              <span>{post.likes || 0}</span>
                            </button>
                            <div className="flex items-center gap-2 text-white/60">
                              <MessageSquare className="w-4 h-4" />
                              <span>{post.replies_count || 0} Antworten</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300 hover:bg-white/10">
                            Weiterlesen
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}

                {filterPostsByCategory(category).length === 0 && (
                  <div className="text-center py-12">
                    <MessageSquare className="w-16 h-16 text-white/20 mx-auto mb-4" />
                    <p className="text-white/60 text-lg">Noch keine Beiträge in dieser Kategorie</p>
                    <p className="text-white/40">Sei der Erste, der einen erstellt!</p>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

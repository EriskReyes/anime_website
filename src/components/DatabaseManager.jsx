import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import db from '../database/LocalDatabase.js';
import { seedDatabase, clearDatabase } from '../database/SeedData.js';
import { AnimeModel } from '../models/AnimeModel.js';
import { UserModel } from '../models/UserModel.js';
import { ReviewModel } from '../models/ReviewModel.js';
import { ForumPostModel } from '../models/ForumPostModel.js';

const DatabaseManager = () => {
    const [stats, setStats] = useState({});
    const [selectedTab, setSelectedTab] = useState('overview');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isAddingAnime, setIsAddingAnime] = useState(false);
    const [newAnime, setNewAnime] = useState({
        title: '',
        synopsis: '',
        genres: '',
        status: 'ongoing',
        type: 'TV',
        episodes: 0,
        rating: 0,
        studio: '',
        releaseDate: ''
    });

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = () => {
        const animes = db.findAll('animes');
        const users = db.findAll('users');
        const reviews = db.findAll('reviews');
        const forumPosts = db.findAll('forumPosts');
        const articles = db.findAll('articles');
        const userLists = db.findAll('userLists');

        setStats({
            animes: animes.length,
            users: users.length,
            reviews: reviews.length,
            forumPosts: forumPosts.length,
            articles: articles.length,
            userLists: userLists.length
        });
    };

    const handleSeedDatabase = () => {
        seedDatabase();
        loadStats();
        alert('¡Base de datos poblada con datos de ejemplo!');
    };

    const handleClearDatabase = () => {
        clearDatabase();
        loadStats();
        setSearchResults([]);
        alert('¡Base de datos limpiada!');
    };

    const handleSearch = (collection) => {
        if (!searchTerm.trim()) {
            setSearchResults([]);
            return;
        }

        const results = db.search(collection, searchTerm);
        setSearchResults(results.slice(0, 20)); // Limit to 20 results
    };

    const handleAddAnime = () => {
        try {
            const anime = new AnimeModel({
                ...newAnime,
                genres: newAnime.genres.split(',').map(g => g.trim()),
                episodes: parseInt(newAnime.episodes) || 0,
                rating: parseFloat(newAnime.rating) || 0,
                images: {
                    poster: '/images/default_poster.jpg',
                    banner: '/images/default_banner.jpg',
                    screenshots: []
                }
            });

            anime.save();
            loadStats();
            setIsAddingAnime(false);
            setNewAnime({
                title: '',
                synopsis: '',
                genres: '',
                status: 'ongoing',
                type: 'TV',
                episodes: 0,
                rating: 0,
                studio: '',
                releaseDate: ''
            });
            alert('¡Anime agregado exitosamente!');
        } catch (error) {
            console.error('Error adding anime:', error);
            alert('Error al agregar el anime');
        }
    };

    const handleDeleteItem = (collection, id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este elemento?')) {
            db.delete(collection, id);
            loadStats();
            // Remove from search results if visible
            setSearchResults(prev => prev.filter(item => item.id !== id));
            alert('Elemento eliminado');
        }
    };

    const exportDatabase = () => {
        db.exportDatabase();
    };

    const importDatabase = async (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/json') {
            try {
                await db.importDatabase(file);
                loadStats();
                alert('Base de datos importada con éxito');
            } catch (error) {
                console.error('Error importing database:', error);
                alert('Error al importar la base de datos');
            }
        }
    };

    return (
        <div className="container mx-auto p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Gestión de Base de Datos</h1>
                    <p className="text-muted-foreground">Administra la base de datos local del sitio de anime</p>
                </div>

                <div className="flex gap-2">
                    <Button onClick={exportDatabase} variant="outline">
                        📥 Exportar BD
                    </Button>

                    <label className="cursor-pointer">
                        <Button variant="outline" asChild>
                            <span>📤 Importar BD</span>
                        </Button>
                        <input
                            type="file"
                            accept=".json"
                            onChange={importDatabase}
                            className="hidden"
                        />
                    </label>

                    <Button onClick={handleSeedDatabase} variant="default">
                        🌱 Poblar BD
                    </Button>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive">🗑️ Limpiar BD</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Esta acción eliminará todos los datos de la base de datos y no se puede deshacer.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={handleClearDatabase}>
                                    Sí, limpiar
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {Object.entries(stats).map(([key, value]) => (
                    <Card key={key}>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium capitalize">
                                {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{value || 0}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Resumen</TabsTrigger>
                    <TabsTrigger value="animes">Animes</TabsTrigger>
                    <TabsTrigger value="users">Usuarios</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    <TabsTrigger value="forum">Foro</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Estado de la Base de Datos</CardTitle>
                            <CardDescription>
                                Información general sobre el contenido almacenado localmente
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                    <div>
                                        <h3 className="font-medium">Almacenamiento Local</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Los datos se guardan en localStorage del navegador
                                        </p>
                                    </div>
                                    <Badge variant="secondary">Activo</Badge>
                                </div>

                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                    <div>
                                        <h3 className="font-medium">Total de Registros</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Suma de todos los elementos en todas las colecciones
                                        </p>
                                    </div>
                                    <Badge variant="default">
                                        {Object.values(stats).reduce((sum, count) => sum + (count || 0), 0)}
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="animes" className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Input
                                placeholder="Buscar animes..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-64"
                            />
                            <Button onClick={() => handleSearch('animes')}>
                                🔍 Buscar
                            </Button>
                        </div>

                        <Dialog open={isAddingAnime} onOpenChange={setIsAddingAnime}>
                            <DialogTrigger asChild>
                                <Button>➕ Agregar Anime</Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                    <DialogTitle>Agregar Nuevo Anime</DialogTitle>
                                    <DialogDescription>
                                        Completa la información del anime que quieres agregar
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="title">Título</Label>
                                            <Input
                                                id="title"
                                                value={newAnime.title}
                                                onChange={(e) => setNewAnime({...newAnime, title: e.target.value})}
                                                placeholder="Nombre del anime"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="studio">Estudio</Label>
                                            <Input
                                                id="studio"
                                                value={newAnime.studio}
                                                onChange={(e) => setNewAnime({...newAnime, studio: e.target.value})}
                                                placeholder="Estudio de animación"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="synopsis">Sinopsis</Label>
                                        <Textarea
                                            id="synopsis"
                                            value={newAnime.synopsis}
                                            onChange={(e) => setNewAnime({...newAnime, synopsis: e.target.value})}
                                            placeholder="Descripción del anime"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="genres">Géneros</Label>
                                            <Input
                                                id="genres"
                                                value={newAnime.genres}
                                                onChange={(e) => setNewAnime({...newAnime, genres: e.target.value})}
                                                placeholder="Acción, Drama, Fantasía"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="episodes">Episodios</Label>
                                            <Input
                                                id="episodes"
                                                type="number"
                                                value={newAnime.episodes}
                                                onChange={(e) => setNewAnime({...newAnime, episodes: e.target.value})}
                                                placeholder="24"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="status">Estado</Label>
                                            <Select value={newAnime.status} onValueChange={(value) => setNewAnime({...newAnime, status: value})}>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="ongoing">En emisión</SelectItem>
                                                    <SelectItem value="completed">Completado</SelectItem>
                                                    <SelectItem value="upcoming">Próximamente</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="type">Tipo</Label>
                                            <Select value={newAnime.type} onValueChange={(value) => setNewAnime({...newAnime, type: value})}>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="TV">Serie TV</SelectItem>
                                                    <SelectItem value="Movie">Película</SelectItem>
                                                    <SelectItem value="OVA">OVA</SelectItem>
                                                    <SelectItem value="Special">Especial</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="rating">Calificación</Label>
                                            <Input
                                                id="rating"
                                                type="number"
                                                step="0.1"
                                                min="0"
                                                max="10"
                                                value={newAnime.rating}
                                                onChange={(e) => setNewAnime({...newAnime, rating: e.target.value})}
                                                placeholder="8.5"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="releaseDate">Fecha de Estreno</Label>
                                        <Input
                                            id="releaseDate"
                                            type="date"
                                            value={newAnime.releaseDate}
                                            onChange={(e) => setNewAnime({...newAnime, releaseDate: e.target.value})}
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end gap-2">
                                    <Button variant="outline" onClick={() => setIsAddingAnime(false)}>
                                        Cancelar
                                    </Button>
                                    <Button onClick={handleAddAnime}>
                                        Agregar Anime
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>

                    {/* Search Results */}
                    {searchResults.length > 0 && (
                        <div className="space-y-2">
                            <h3 className="text-lg font-medium">Resultados de Búsqueda</h3>
                            <div className="grid gap-4">
                                {searchResults.map((anime) => (
                                    <Card key={anime.id}>
                                        <CardContent className="p-4">
                                            <div className="flex items-start justify-between">
                                                <div className="space-y-1">
                                                    <h4 className="font-medium">{anime.title}</h4>
                                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                                        {anime.synopsis}
                                                    </p>
                                                    <div className="flex gap-2 flex-wrap">
                                                        {anime.genres?.slice(0, 3).map((genre) => (
                                                            <Badge key={genre} variant="secondary" className="text-xs">
                                                                {genre}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Badge variant="outline">
                                                        {anime.type} • {anime.episodes} ep.
                                                    </Badge>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() => handleDeleteItem('animes', anime.id)}
                                                    >
                                                        🗑️
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="users" className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Input
                            placeholder="Buscar usuarios..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-64"
                        />
                        <Button onClick={() => handleSearch('users')}>
                            🔍 Buscar
                        </Button>
                    </div>

                    {searchResults.length > 0 && (
                        <div className="space-y-2">
                            <h3 className="text-lg font-medium">Usuarios Encontrados</h3>
                            <div className="grid gap-4">
                                {searchResults.map((user) => (
                                    <Card key={user.id}>
                                        <CardContent className="p-4">
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="font-medium">{user.username}</h4>
                                                        <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                                                            {user.role}
                                                        </Badge>
                                                        {user.isVerified && <Badge variant="outline">✓</Badge>}
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">{user.email}</p>
                                                    <p className="text-sm">{user.profile?.bio}</p>
                                                </div>
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() => handleDeleteItem('users', user.id)}
                                                >
                                                    🗑️
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="reviews" className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Input
                            placeholder="Buscar reviews..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-64"
                        />
                        <Button onClick={() => handleSearch('reviews')}>
                            🔍 Buscar
                        </Button>
                    </div>

                    {searchResults.length > 0 && (
                        <div className="space-y-2">
                            <h3 className="text-lg font-medium">Reviews Encontradas</h3>
                            <div className="grid gap-4">
                                {searchResults.map((review) => (
                                    <Card key={review.id}>
                                        <CardContent className="p-4">
                                            <div className="flex items-start justify-between">
                                                <div className="space-y-1 flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="font-medium">{review.title}</h4>
                                                        <Badge variant="default">{review.rating}/10</Badge>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                                        {review.content}
                                                    </p>
                                                    <div className="flex gap-2 text-xs text-muted-foreground">
                                                        <span>👍 {review.helpfulVotes}</span>
                                                        <span>•</span>
                                                        <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() => handleDeleteItem('reviews', review.id)}
                                                >
                                                    🗑️
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="forum" className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Input
                            placeholder="Buscar posts del foro..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-64"
                        />
                        <Button onClick={() => handleSearch('forumPosts')}>
                            🔍 Buscar
                        </Button>
                    </div>

                    {searchResults.length > 0 && (
                        <div className="space-y-2">
                            <h3 className="text-lg font-medium">Posts Encontrados</h3>
                            <div className="grid gap-4">
                                {searchResults.map((post) => (
                                    <Card key={post.id}>
                                        <CardContent className="p-4">
                                            <div className="flex items-start justify-between">
                                                <div className="space-y-1 flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="font-medium">{post.title}</h4>
                                                        <Badge variant="outline">{post.category}</Badge>
                                                        {post.isPinned && <Badge>📌 Fijado</Badge>}
                                                        {post.isLocked && <Badge variant="destructive">🔒 Cerrado</Badge>}
                                                    </div>
                                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                                        {post.content}
                                                    </p>
                                                    <div className="flex gap-4 text-xs text-muted-foreground">
                                                        <span>👁️ {post.views}</span>
                                                        <span>💬 {post.replies}</span>
                                                        <span>👍 {post.likes}</span>
                                                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() => handleDeleteItem('forumPosts', post.id)}
                                                >
                                                    🗑️
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default DatabaseManager;
// src/components/HeavyDataApp.jsx
import React, { useState, useEffect } from 'react';
import { useIndexedDB } from '../hooks/useIndexedDB';

const HeavyDataApp = () => {
    const {
        isLoading,
        error,
        isReady,
        create,
        getAll,
        update,
        delete: deleteRecord,
        search,
        count,
        clear,
        saveFile,
        getFile,
        exportDatabase,
        importDatabase
    } = useIndexedDB();

    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [files, setFiles] = useState([]);
    const [stats, setStats] = useState({});
    const [activeTab, setActiveTab] = useState('users');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);

    // Cargar datos cuando la DB esté lista
    useEffect(() => {
        if (isReady) {
            loadAllData();
        }
    }, [isReady]);

    const loadAllData = async () => {
        try {
            const [usersData, productsData, filesData] = await Promise.all([
                getAll('users'),
                getAll('products'),
                getAll('files')
            ]);

            setUsers(usersData || []);
            setProducts(productsData || []);
            setFiles(filesData || []);

            // Cargar estadísticas
            const [userCount, productCount, fileCount, orderCount] = await Promise.all([
                count('users'),
                count('products'),
                count('files'),
                count('orders')
            ]);

            setStats({
                users: userCount,
                products: productCount,
                files: fileCount,
                orders: orderCount
            });
        } catch (err) {
            console.error('Error cargando datos:', err);
        }
    };

    const generateHeavyUser = async () => {
        const heavyData = {
            name: `Usuario Pesado ${Date.now()}`,
            email: `heavy${Date.now()}@example.com`,
            profile: {
                age: Math.floor(Math.random() * 50) + 18,
                city: ['Madrid', 'Barcelona', 'Valencia', 'Sevilla'][Math.floor(Math.random() * 4)],
                bio: 'Usuario con datos extensos para pruebas de rendimiento',
                interests: Array.from({length: 50}, (_, i) => `Interés ${i + 1}`),
                preferences: {
                    theme: 'dark',
                    language: 'es',
                    notifications: true,
                    privacy: 'high',
                    customSettings: Object.fromEntries(
                        Array.from({length: 20}, (_, i) => [`setting_${i}`, `value_${i}`])
                    )
                }
            },
            // Simular datos pesados: miles de transacciones
            transactions: Array.from({length: 2000}, (_, i) => ({
                id: i + 1,
                amount: Math.random() * 1000,
                date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
                category: ['food', 'transport', 'entertainment', 'bills', 'shopping'][Math.floor(Math.random() * 5)],
                description: `Transacción #${i + 1}`,
                merchant: `Merchant ${Math.floor(Math.random() * 100)}`,
                tags: [`tag${i}`, `category${i % 10}`]
            })),
            // Actividades del usuario
            activities: Array.from({length: 1000}, (_, i) => ({
                id: i + 1,
                action: `Action ${i + 1}`,
                timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
                metadata: {
                    score: Math.random() * 100,
                    location: `Location ${i}`,
                    device: ['mobile', 'desktop', 'tablet'][Math.floor(Math.random() * 3)],
                    duration: Math.floor(Math.random() * 3600) // segundos
                }
            })),
            // Configuraciones complejas
            dashboardConfig: {
                widgets: Array.from({length: 30}, (_, i) => ({
                    id: `widget_${i}`,
                    type: ['chart', 'table', 'card'][Math.floor(Math.random() * 3)],
                    position: { x: Math.floor(Math.random() * 12), y: Math.floor(Math.random() * 12) },
                    size: { w: Math.floor(Math.random() * 6) + 1, h: Math.floor(Math.random() * 6) + 1 },
                    enabled: Math.random() > 0.3,
                    config: { color: `#${Math.floor(Math.random()*16777215).toString(16)}` }
                })),
                layouts: {
                    desktop: Array.from({length: 20}, (_, i) => ({ id: i, settings: `config_${i}` })),
                    mobile: Array.from({length: 10}, (_, i) => ({ id: i, settings: `mobile_config_${i}` }))
                }
            }
        };

        try {
            await create('users', heavyData);
            await loadAllData();
            console.log('Usuario pesado creado con éxito');
        } catch (err) {
            console.error('Error creando usuario pesado:', err);
        }
    };

    const generateHeavyProduct = async () => {
        const categories = ['Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Beauty'];
        const brands = ['Brand A', 'Brand B', 'Brand C', 'Brand D', 'Brand E'];

        const heavyProduct = {
            name: `Producto Premium ${Date.now()}`,
            category: categories[Math.floor(Math.random() * categories.length)],
            brand: brands[Math.floor(Math.random() * brands.length)],
            price: Math.random() * 1000 + 50,
            originalPrice: Math.random() * 1200 + 60,
            currency: 'EUR',
            description: 'Producto con especificaciones técnicas extensas y múltiples variaciones',
            longDescription: 'Este es un producto de alta calidad con características avanzadas. '.repeat(50),

            // Especificaciones técnicas detalladas
            specifications: Object.fromEntries(
                Array.from({length: 100}, (_, i) => [`spec_${i}`, `Valor técnico ${i}`])
            ),

            // Sistema de inventario complejo
            inventory: {
                warehouses: Array.from({length: 15}, (_, i) => ({
                    id: i + 1,
                    name: `Almacén ${i + 1}`,
                    location: {
                        country: 'España',
                        city: ['Madrid', 'Barcelona', 'Valencia'][Math.floor(Math.random() * 3)],
                        address: `Calle ${i + 1}, Polígono Industrial`
                    },
                    stock: Math.floor(Math.random() * 1000),
                    reserved: Math.floor(Math.random() * 100),
                    incoming: Math.floor(Math.random() * 200),
                    lastUpdated: new Date().toISOString()
                })),
                stockHistory: Array.from({length: 365}, (_, i) => ({
                    date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
                    stock: Math.floor(Math.random() * 1000),
                    sold: Math.floor(Math.random() * 50),
                    received: Math.floor(Math.random() * 100)
                }))
            },

            // Reseñas y calificaciones
            reviews: Array.from({length: 500}, (_, i) => ({
                id: i + 1,
                rating: Math.floor(Math.random() * 5) + 1,
                title: `Reseña ${i + 1}`,
                comment: `Esta es una reseña detallada del producto. El usuario ${i + 1} ha compartido su experiencia.`,
                author: `Usuario${i + 1}`,
                date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
                helpful: Math.floor(Math.random() * 50),
                verified: Math.random() > 0.3,
                images: Math.random() > 0.7 ? [`img_${i}_1.jpg`, `img_${i}_2.jpg`] : []
            })),

            // Variantes y opciones
            variants: Array.from({length: 25}, (_, i) => ({
                id: i + 1,
                sku: `SKU-${Date.now()}-${i}`,
                name: `Variante ${i + 1}`,
                price: Math.random() * 100 + 10,
                attributes: {
                    color: `Color${i}`,
                    size: ['XS', 'S', 'M', 'L', 'XL'][Math.floor(Math.random() * 5)],
                    material: `Material${i}`,
                    weight: Math.random() * 5 + 0.1
                },
                stock: Math.floor(Math.random() * 100),
                images: [`variant_${i}_1.jpg`, `variant_${i}_2.jpg`, `variant_${i}_3.jpg`]
            })),

            // Datos de analytics
            analytics: {
                views: Math.floor(Math.random() * 10000),
                clicks: Math.floor(Math.random() * 1000),
                purchases: Math.floor(Math.random() * 100),
                conversionRate: Math.random(),
                dailyStats: Array.from({length: 30}, (_, i) => ({
                    date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
                    views: Math.floor(Math.random() * 200),
                    clicks: Math.floor(Math.random() * 50),
                    sales: Math.floor(Math.random() * 10)
                }))
            }
        };

        try {
            await create('products', heavyProduct);
            await loadAllData();
            console.log('Producto pesado creado con éxito');
        } catch (err) {
            console.error('Error creando producto pesado:', err);
        }
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const metadata = {
                    category: 'user-upload',
                    description: `Archivo subido: ${file.name}`,
                    tags: ['user-upload', 'document'],
                    uploadedBy: 'current-user',
                    processingStatus: 'pending'
                };

                await saveFile(file, metadata);
                await loadAllData();
                console.log('Archivo guardado con éxito');
            } catch (err) {
                console.error('Error guardando archivo:', err);
            }
        }
    };

    const handleImportDatabase = async (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/json') {
            try {
                await importDatabase(file);
                await loadAllData();
                alert('Base de datos importada con éxito');
            } catch (err) {
                console.error('Error importando base de datos:', err);
                alert('Error importando base de datos');
            }
        }
    };

    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            await loadAllData();
            return;
        }

        try {
            if (activeTab === 'users') {
                // Búsqueda fuzzy en usuarios
                const allUsers = await getAll('users');
                const filtered = allUsers.filter(user =>
                    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.profile?.city?.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setUsers(filtered);
            } else if (activeTab === 'products') {
                // Búsqueda en productos
                const allProducts = await getAll('products');
                const filtered = allProducts.filter(product =>
                    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.brand?.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setProducts(filtered);
            }
        } catch (err) {
            console.error('Error en búsqueda:', err);
        }
    };

    const handleDelete = async (table, id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este registro?')) {
            try {
                await deleteRecord(table, id);
                await loadAllData();
            } catch (err) {
                console.error('Error eliminando registro:', err);
            }
        }
    };

    const handleClearTable = async (table) => {
        if (window.confirm(`¿Estás seguro de que quieres limpiar toda la tabla ${table}?`)) {
            try {
                await clear(table);
                await loadAllData();
            } catch (err) {
                console.error('Error limpiando tabla:', err);
            }
        }
    };

    const viewUserDetails = async (userId) => {
        try {
            const user = await getById('users', userId);
            setSelectedUser(user);
        } catch (err) {
            console.error('Error cargando detalles del usuario:', err);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Inicializando IndexedDB</h2>
                    <p className="text-gray-600">Configurando base de datos pesada...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-red-50">
                <div className="text-center">
                    <div className="text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-red-800 mb-2">Error de Base de Datos</h2>
                    <p className="text-red-600 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">🗄️</span>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Sistema Pesado - IndexedDB</h1>
                                <p className="text-gray-500">Persistencia total con capacidad de gigabytes</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="bg-green-100 px-4 py-2 rounded-full">
                                <span className="text-green-800 font-medium">✓ Base de Datos Conectada</span>
                            </div>

                            <button
                                onClick={exportDatabase}
                                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <span>📥</span>
                                <span>Exportar DB</span>
                            </button>

                            <label className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer transition-colors">
                                <span>📤</span>
                                <span>Importar DB</span>
                                <input
                                    type="file"
                                    accept=".json"
                                    onChange={handleImportDatabase}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    </div>

                    {/* Estadísticas */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-xl text-white">
                            <div className="text-3xl font-bold">{stats.users || 0}</div>
                            <div className="text-blue-100">Usuarios Pesados</div>
                        </div>
                        <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-xl text-white">
                            <div className="text-3xl font-bold">{stats.products || 0}</div>
                            <div className="text-green-100">Productos</div>
                        </div>
                        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-xl text-white">
                            <div className="text-3xl font-bold">{stats.files || 0}</div>
                            <div className="text-purple-100">Archivos</div>
                        </div>
                        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-xl text-white">
                            <div className="text-3xl font-bold">
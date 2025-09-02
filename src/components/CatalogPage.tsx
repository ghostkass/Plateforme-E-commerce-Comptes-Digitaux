import React, { useState, useMemo } from 'react';
import { Search, Filter, Grid, List, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { useApp } from '../context/AppContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Product {
  id: string;
  name: string;
  service: string;
  type: string;
  duration: string;
  price: number;
  originalPrice: number;
  description: string;
  features: string[];
  available: boolean;
  category: string;
  logo: string;
  rating: number;
  reviews: number;
}

const CatalogPage: React.FC = () => {
  const { setCurrentPage, setSelectedProduct, addToCart } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const products: Product[] = [
    {
      id: '1',
      name: 'Netflix Premium',
      service: 'Netflix',
      type: 'Premium',
      duration: '1 mois',
      price: 4.99,
      originalPrice: 15.99,
      description: 'Accès complet à Netflix avec 4K et 4 écrans simultanés',
      features: ['4K Ultra HD', '4 écrans', 'Téléchargements', 'Tous les contenus'],
      available: true,
      category: 'streaming',
      logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=100&fit=crop',
      rating: 4.9,
      reviews: 2547
    },
    {
      id: '2',
      name: 'Spotify Premium',
      service: 'Spotify',
      type: 'Premium',
      duration: '1 mois',
      price: 2.99,
      originalPrice: 9.99,
      description: 'Musique sans publicité avec téléchargements offline',
      features: ['Sans publicité', 'Téléchargements', 'Qualité haute', 'Playlists illimitées'],
      available: true,
      category: 'musique',
      logo: 'https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=100&h=100&fit=crop',
      rating: 4.8,
      reviews: 1893
    },
    {
      id: '3',
      name: 'Disney+ Premium',
      service: 'Disney+',
      type: 'Premium',
      duration: '1 mois',
      price: 3.99,
      originalPrice: 8.99,
      description: 'Tout l\'univers Disney, Marvel, Star Wars et plus',
      features: ['4K disponible', '4 écrans', 'Téléchargements', 'Contenus exclusifs'],
      available: true,
      category: 'streaming',
      logo: 'https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=100&h=100&fit=crop',
      rating: 4.7,
      reviews: 1654
    },
    {
      id: '4',
      name: 'ChatGPT Plus',
      service: 'OpenAI',
      type: 'Plus',
      duration: '1 mois',
      price: 9.99,
      originalPrice: 20.00,
      description: 'IA avancée pour tous vos besoins de rédaction et d\'assistance',
      features: ['GPT-4 Turbo', 'Réponses prioritaires', 'Plugins', 'Génération d\'images'],
      available: true,
      category: 'outils',
      logo: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=100&fit=crop',
      rating: 4.9,
      reviews: 3241
    },
    {
      id: '5',
      name: 'Canva Pro',
      service: 'Canva',
      type: 'Pro',
      duration: '1 mois',
      price: 5.99,
      originalPrice: 12.99,
      description: 'Design professionnel avec templates premium et outils avancés',
      features: ['Templates premium', 'Suppression arrière-plan', 'Brand Kit', 'Stockage 1TB'],
      available: true,
      category: 'design',
      logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop',
      rating: 4.6,
      reviews: 987
    },
    {
      id: '6',
      name: 'YouTube Premium',
      service: 'YouTube',
      type: 'Premium',
      duration: '1 mois',
      price: 3.99,
      originalPrice: 11.99,
      description: 'YouTube sans publicité avec YouTube Music inclus',
      features: ['Sans publicité', 'Lecture en arrière-plan', 'YouTube Music', 'Téléchargements'],
      available: true,
      category: 'streaming',
      logo: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=100&h=100&fit=crop',
      rating: 4.5,
      reviews: 2156
    },
    {
      id: '7',
      name: 'Adobe Creative Cloud',
      service: 'Adobe',
      type: 'Complet',
      duration: '1 mois',
      price: 19.99,
      originalPrice: 59.99,
      description: 'Suite complète Adobe : Photoshop, Illustrator, Premiere Pro...',
      features: ['Tous les logiciels Adobe', 'Cloud storage 100GB', 'Fonts Adobe', 'Support premium'],
      available: false,
      category: 'design',
      logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop',
      rating: 4.8,
      reviews: 1432
    },
    {
      id: '8',
      name: 'Amazon Prime Video',
      service: 'Amazon',
      type: 'Prime',
      duration: '1 mois',
      price: 2.99,
      originalPrice: 6.99,
      description: 'Films et séries Amazon avec livraison Prime incluse',
      features: ['Prime Video', 'Livraison gratuite', 'Prime Music', 'Prime Reading'],
      available: true,
      category: 'streaming',
      logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=100&fit=crop',
      rating: 4.4,
      reviews: 1876
    }
  ];

  const categories = [
    { value: 'all', label: 'Toutes les catégories' },
    { value: 'streaming', label: 'Streaming vidéo' },
    { value: 'musique', label: 'Musique' },
    { value: 'design', label: 'Design & Création' },
    { value: 'outils', label: 'Outils & Productivité' }
  ];

  const durations = [
    { value: 'all', label: 'Toutes les durées' },
    { value: '1 mois', label: '1 mois' },
    { value: '3 mois', label: '3 mois' },
    { value: '6 mois', label: '6 mois' },
    { value: '1 an', label: '1 an' }
  ];

  const priceRanges = [
    { value: 'all', label: 'Tous les prix' },
    { value: '0-5', label: 'Moins de 5€' },
    { value: '5-10', label: '5€ - 10€' },
    { value: '10-20', label: '10€ - 20€' },
    { value: '20+', label: 'Plus de 20€' }
  ];

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.service.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      
      const matchesDuration = selectedDuration === 'all' || product.duration === selectedDuration;
      
      const matchesPrice = priceRange === 'all' || (() => {
        const [min, max] = priceRange.split('-').map(p => p === '+' ? Infinity : parseFloat(p));
        return product.price >= min && (max === undefined ? true : product.price <= max);
      })();

      return matchesSearch && matchesCategory && matchesDuration && matchesPrice;
    });

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default: // popular
        filtered.sort((a, b) => b.reviews - a.reviews);
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedDuration, priceRange, sortBy]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
  };

  const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const discount = Math.round((1 - product.price / product.originalPrice) * 100);

    if (viewMode === 'list') {
      return (
        <Card className="group hover:neon-border transition-all duration-300 cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center space-x-6">
              <ImageWithFallback
                src={product.logo}
                alt={product.service}
                className="h-16 w-16 rounded-lg object-cover flex-shrink-0"
              />
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xl font-bold text-primary">{product.price}€</span>
                      <span className="text-sm text-muted-foreground line-through">
                        {product.originalPrice}€
                      </span>
                      <Badge className="bg-accent/10 text-accent border-accent/20">
                        -{discount}%
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-1 mb-2">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="text-sm">{product.rating}</span>
                      <span className="text-sm text-muted-foreground">({product.reviews})</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {product.features.slice(0, 3).map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProductClick(product);
                      }}
                    >
                      Détails
                    </Button>
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      disabled={!product.available}
                    >
                      {product.available ? 'Ajouter' : 'Indisponible'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card 
        className="group hover:neon-border transition-all duration-300 cursor-pointer"
        onClick={() => handleProductClick(product)}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <ImageWithFallback
              src={product.logo}
              alt={product.service}
              className="h-12 w-12 rounded-lg object-cover"
            />
            <Badge className="bg-accent/10 text-accent border-accent/20">
              -{discount}%
            </Badge>
          </div>
          
          <h3 className="font-semibold mb-2">{product.name}</h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
          
          <div className="flex items-center space-x-1 mb-3">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="text-sm">{product.rating}</span>
            <span className="text-sm text-muted-foreground">({product.reviews})</span>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-lg font-bold text-primary">{product.price}€</span>
              <span className="text-sm text-muted-foreground line-through ml-2">
                {product.originalPrice}€
              </span>
            </div>
            <Badge variant="outline" className="text-xs">
              {product.duration}
            </Badge>
          </div>

          <Button 
            className="w-full" 
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            disabled={!product.available}
          >
            {product.available ? 'Ajouter au panier' : 'Indisponible'}
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Catalogue</h1>
        <p className="text-muted-foreground">
          Découvrez tous nos comptes premium à prix réduits
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="Trier par" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Plus populaires</SelectItem>
              <SelectItem value="price-asc">Prix croissant</SelectItem>
              <SelectItem value="price-desc">Prix décroissant</SelectItem>
              <SelectItem value="rating">Mieux notés</SelectItem>
              <SelectItem value="name">Nom A-Z</SelectItem>
            </SelectContent>
          </Select>

          {/* View Mode */}
          <div className="flex border rounded-lg">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Filter Toggle */}
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filtres
          </Button>
        </div>

        {/* Filters */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${showFilters || 'hidden lg:grid'}`}>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Catégorie" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedDuration} onValueChange={setSelectedDuration}>
            <SelectTrigger>
              <SelectValue placeholder="Durée" />
            </SelectTrigger>
            <SelectContent>
              {durations.map((duration) => (
                <SelectItem key={duration.value} value={duration.value}>
                  {duration.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger>
              <SelectValue placeholder="Prix" />
            </SelectTrigger>
            <SelectContent>
              {priceRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center space-x-2">
            <Checkbox id="available" />
            <label htmlFor="available" className="text-sm">
              Disponible uniquement
            </label>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
        </p>
      </div>

      {/* Products Grid */}
      <div className={
        viewMode === 'grid' 
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
          : 'space-y-4'
      }>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="h-24 w-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Aucun produit trouvé</h3>
          <p className="text-muted-foreground mb-4">
            Essayez de modifier vos critères de recherche
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedDuration('all');
              setPriceRange('all');
            }}
          >
            Réinitialiser les filtres
          </Button>
        </div>
      )}
    </div>
  );
};

export default CatalogPage;
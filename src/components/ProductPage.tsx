import React, { useState } from 'react';
import { ArrowLeft, Star, Shield, Zap, Users, Check, Plus, Minus } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { useApp } from '../context/AppContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

const ProductPage: React.FC = () => {
  const { selectedProduct, setCurrentPage, addToCart } = useApp();
  const [quantity, setQuantity] = useState(1);

  if (!selectedProduct) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Produit non trouvé</h1>
          <Button onClick={() => setCurrentPage('catalog')}>
            Retour au catalogue
          </Button>
        </div>
      </div>
    );
  }

  const discount = Math.round((1 - selectedProduct.price / selectedProduct.originalPrice) * 100);

  const relatedProducts = [
    {
      id: 'related-1',
      name: 'Netflix Premium 3 mois',
      price: 12.99,
      originalPrice: 47.97,
      logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=100&fit=crop'
    },
    {
      id: 'related-2',
      name: 'Spotify Premium 3 mois',
      price: 8.99,
      originalPrice: 29.97,
      logo: 'https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=100&h=100&fit=crop'
    },
    {
      id: 'related-3',
      name: 'Disney+ Premium 3 mois',
      price: 10.99,
      originalPrice: 26.97,
      logo: 'https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=100&h=100&fit=crop'
    }
  ];

  const reviews = [
    {
      id: 1,
      author: 'Marie L.',
      rating: 5,
      date: '2024-01-15',
      comment: 'Parfait ! Compte reçu instantanément et fonctionne parfaitement. Je recommande.',
      verified: true
    },
    {
      id: 2,
      author: 'Thomas B.',
      rating: 5,
      date: '2024-01-12',
      comment: 'Service excellent, livraison rapide. Exactement ce que je cherchais.',
      verified: true
    },
    {
      id: 3,
      author: 'Sarah K.',
      rating: 4,
      date: '2024-01-10',
      comment: 'Très bien, petit délai de livraison mais le compte fonctionne parfaitement.',
      verified: true
    }
  ];

  const faqItems = [
    {
      question: 'Combien de temps le compte est-il valide ?',
      answer: `Ce compte ${selectedProduct.service} ${selectedProduct.type} est valide pendant ${selectedProduct.duration} à partir de la date d'activation.`
    },
    {
      question: 'Puis-je changer le mot de passe ?',
      answer: 'Il est recommandé de ne pas modifier les informations du compte pour éviter sa suspension.'
    },
    {
      question: 'Que faire si le compte ne fonctionne pas ?',
      answer: 'Contactez notre support dans les 24h et nous vous fournirons un remplacement gratuit.'
    },
    {
      question: 'Le compte est-il partagé ?',
      answer: 'Non, vous recevez un accès exclusif selon les conditions du service.'
    }
  ];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(selectedProduct);
    }
    setCurrentPage('cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 mb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentPage('catalog')}
          className="p-0 h-auto"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour au catalogue
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        {/* Product Image & Gallery */}
        <div>
          <Card className="mb-6">
            <CardContent className="p-8">
              <div className="aspect-square bg-gradient-to-br from-[var(--neon-blue)]/10 to-[var(--neon-purple)]/10 rounded-xl flex items-center justify-center mb-6">
                <ImageWithFallback
                  src={selectedProduct.logo}
                  alt={selectedProduct.service}
                  className="h-32 w-32 rounded-2xl object-cover"
                />
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                    <ImageWithFallback
                      src={selectedProduct.logo}
                      alt={`${selectedProduct.service} ${i + 1}`}
                      className="h-16 w-16 rounded-lg object-cover opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="text-center p-4">
              <Zap className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">Livraison instantanée</p>
            </Card>
            <Card className="text-center p-4">
              <Shield className="h-6 w-6 text-accent mx-auto mb-2" />
              <p className="text-sm font-medium">Garantie 24h</p>
            </Card>
            <Card className="text-center p-4">
              <Users className="h-6 w-6 text-secondary mx-auto mb-2" />
              <p className="text-sm font-medium">Support 24/7</p>
            </Card>
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-6">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
              -{discount}% de réduction
            </Badge>
            <h1 className="text-3xl font-bold mb-2">{selectedProduct.name}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                <Star className="h-5 w-5 fill-primary text-primary" />
                <span className="font-medium">4.9</span>
                <span className="text-muted-foreground">(2547 avis)</span>
              </div>
              <Badge variant="outline">{selectedProduct.available ? 'En stock' : 'Rupture'}</Badge>
            </div>
            <p className="text-muted-foreground text-lg">{selectedProduct.description}</p>
          </div>

          {/* Pricing */}
          <Card className="mb-6 neon-border">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-bold text-primary">{selectedProduct.price}€</span>
                <span className="text-xl text-muted-foreground line-through">
                  {selectedProduct.originalPrice}€
                </span>
                <Badge className="bg-accent/10 text-accent border-accent/20">
                  Économisez {(selectedProduct.originalPrice - selectedProduct.price).toFixed(2)}€
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Prix pour {selectedProduct.duration} • Livraison instantanée
              </p>
            </CardContent>
          </Card>

          {/* Features */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Inclus dans cette offre</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {selectedProduct.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-accent flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Quantity & Add to Cart */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-6">
                <label className="font-medium">Quantité :</label>
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity >= 5}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">
                  (Max. 5 comptes par commande)
                </span>
              </div>

              <div className="space-y-3">
                <Button
                  className="w-full neon-glow"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={!selectedProduct.available}
                >
                  {selectedProduct.available 
                    ? `Ajouter au panier • ${(selectedProduct.price * quantity).toFixed(2)}€`
                    : 'Produit indisponible'
                  }
                </Button>
                
                <div className="text-center text-sm text-muted-foreground">
                  <Shield className="h-4 w-4 inline mr-1" />
                  Paiement sécurisé • Livraison instantanée • Garantie 24h
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabs Content */}
      <div className="space-y-12">
        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Questions fréquentes</h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{item.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Avis clients</h2>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 fill-primary text-primary" />
              <span className="font-bold">4.9</span>
              <span className="text-muted-foreground">/ 5 (2547 avis)</span>
            </div>
          </div>

          <div className="space-y-4">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium">{review.author}</span>
                        {review.verified && (
                          <Badge variant="outline" className="text-xs bg-accent/10 text-accent border-accent/20">
                            <Check className="h-3 w-3 mr-1" />
                            Achat vérifié
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-1 mb-2">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                        <span className="text-sm text-muted-foreground ml-2">
                          {new Date(review.date).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Related Products */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Produits similaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((product) => {
              const relatedDiscount = Math.round((1 - product.price / product.originalPrice) * 100);
              return (
                <Card key={product.id} className="group hover:neon-border transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <ImageWithFallback
                        src={product.logo}
                        alt={product.name}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                      <Badge className="bg-accent/10 text-accent border-accent/20">
                        -{relatedDiscount}%
                      </Badge>
                    </div>
                    
                    <h3 className="font-semibold mb-3">{product.name}</h3>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-lg font-bold text-primary">{product.price}€</span>
                        <span className="text-sm text-muted-foreground line-through ml-2">
                          {product.originalPrice}€
                        </span>
                      </div>
                    </div>

                    <Button className="w-full" variant="outline">
                      Voir les détails
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductPage;
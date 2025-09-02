import React from 'react';
import { Star, Shield, Zap, Users, ChevronRight, Play } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { useApp } from '../context/AppContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

const HomePage: React.FC = () => {
  const { setCurrentPage } = useApp();

  const featuredProducts = [
    {
      id: '1',
      name: 'Netflix Premium',
      service: 'Netflix',
      price: 4.99,
      originalPrice: 15.99,
      duration: '1 mois',
      logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=100&fit=crop',
      discount: '-69%'
    },
    {
      id: '2',
      name: 'Spotify Premium',
      service: 'Spotify',
      price: 2.99,
      originalPrice: 9.99,
      duration: '1 mois',
      logo: 'https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=100&h=100&fit=crop',
      discount: '-70%'
    },
    {
      id: '3',
      name: 'Disney+ Premium',
      service: 'Disney+',
      price: 3.99,
      originalPrice: 8.99,
      duration: '1 mois',
      logo: 'https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=100&h=100&fit=crop',
      discount: '-56%'
    },
    {
      id: '4',
      name: 'ChatGPT Plus',
      service: 'OpenAI',
      price: 9.99,
      originalPrice: 20.00,
      duration: '1 mois',
      logo: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=100&fit=crop',
      discount: '-50%'
    }
  ];

  const testimonials = [
    {
      name: 'Marie L.',
      rating: 5,
      comment: 'Service excellent ! J\'ai reçu mes identifiants Netflix en moins de 5 minutes. Tout fonctionne parfaitement.',
      service: 'Netflix Premium'
    },
    {
      name: 'Thomas B.',
      rating: 5,
      comment: 'Très satisfait de mes achats. Les comptes sont toujours fonctionnels et le support client est réactif.',
      service: 'Spotify Premium'
    },
    {
      name: 'Sarah K.',
      rating: 5,
      comment: 'Prix imbattables ! J\'économise plus de 100€ par an sur mes abonnements streaming.',
      service: 'Disney+ Premium'
    }
  ];

  const faqItems = [
    {
      question: 'Comment ça marche ?',
      answer: 'Choisissez votre service, ajoutez au panier, payez et recevez vos identifiants instantanément par email ou Telegram.'
    },
    {
      question: 'Les comptes sont-ils sécurisés ?',
      answer: 'Oui, tous nos comptes sont vérifiés et fonctionnels. En cas de problème, nous proposons un remplacement gratuit.'
    },
    {
      question: 'Quels modes de paiement acceptez-vous ?',
      answer: 'Nous acceptons les cartes bancaires, PayPal, et les cryptomonnaies pour plus de flexibilité.'
    },
    {
      question: 'Puis-je partager mon compte ?',
      answer: 'Les comptes sont destinés à un usage personnel. Le partage peut entraîner la suspension du compte.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--neon-blue)]/10 via-[var(--neon-purple)]/10 to-[var(--neon-green)]/10"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              🎉 -50% sur tous les comptes premium cette semaine !
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Vos abonnements
              <span className="gradient-text block">premium à prix mini</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Accédez à Netflix, Spotify, Disney+, Canva et bien plus à prix réduits. 
              Livraison instantanée, support 24/7 et garantie de fonctionnement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="neon-glow"
                onClick={() => setCurrentPage('catalog')}
              >
                <Play className="mr-2 h-5 w-5" />
                Voir le catalogue
              </Button>
              <Button variant="outline" size="lg">
                Comment ça marche ?
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="neon-border bg-card/50">
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-purple)] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-background" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Livraison instantanée</h3>
                <p className="text-muted-foreground">
                  Recevez vos identifiants en moins de 5 minutes après votre achat
                </p>
              </CardContent>
            </Card>

            <Card className="neon-border bg-card/50">
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-green)] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-background" />
                </div>
                <h3 className="text-lg font-semibold mb-2">100% sécurisé</h3>
                <p className="text-muted-foreground">
                  Comptes vérifiés et garantie de remplacement en cas de problème
                </p>
              </CardContent>
            </Card>

            <Card className="neon-border bg-card/50">
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 bg-gradient-to-r from-[var(--neon-green)] to-[var(--neon-blue)] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-background" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Support 24/7</h3>
                <p className="text-muted-foreground">
                  Notre équipe est disponible pour vous aider à tout moment
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nos meilleures offres</h2>
            <p className="text-muted-foreground">
              Découvrez nos comptes premium les plus populaires
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group hover:neon-border transition-all duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <ImageWithFallback
                      src={product.logo}
                      alt={product.service}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                    <Badge className="bg-accent/10 text-accent border-accent/20">
                      {product.discount}
                    </Badge>
                  </div>
                  
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{product.duration}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-lg font-bold text-primary">{product.price}€</span>
                      <span className="text-sm text-muted-foreground line-through ml-2">
                        {product.originalPrice}€
                      </span>
                    </div>
                  </div>

                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => setCurrentPage('catalog')}
                  >
                    Voir les détails
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => setCurrentPage('catalog')}
            >
              Voir tout le catalogue
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Ce que disent nos clients</h2>
            <p className="text-muted-foreground">
              Plus de 10 000 clients satisfaits nous font confiance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card/50">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.comment}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.service}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Questions fréquentes</h2>
            <p className="text-muted-foreground">
              Tout ce que vous devez savoir sur nos services
            </p>
          </div>

          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <Card key={index} className="bg-card/50">
                <CardHeader>
                  <CardTitle className="text-lg">{item.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button 
              variant="outline"
              onClick={() => setCurrentPage('support')}
            >
              Voir plus de questions
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
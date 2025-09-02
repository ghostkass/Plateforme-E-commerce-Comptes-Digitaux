import React, { useState } from 'react';
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag, CreditCard, Smartphone, Coins } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { useApp } from '../context/AppContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, setCurrentPage } = useApp();
  const [promoCode, setPromoCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const promoDiscount = promoCode === 'WELCOME10' ? subtotal * 0.1 : 0;
  const total = subtotal - promoDiscount;

  const paymentMethods = [
    {
      id: 'card',
      name: 'Carte bancaire',
      icon: CreditCard,
      description: 'Visa, Mastercard, American Express'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: Smartphone,
      description: 'Paiement sécurisé avec PayPal'
    },
    {
      id: 'crypto',
      name: 'Cryptomonnaie',
      icon: Coins,
      description: 'Bitcoin, Ethereum, USDT'
    }
  ];

  const handleCheckout = () => {
    setIsProcessing(true);
    // Simuler le traitement du paiement
    setTimeout(() => {
      alert('Commande validée ! Vous recevrez vos identifiants par email dans quelques minutes.');
      setIsProcessing(false);
      setCurrentPage('dashboard');
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="h-24 w-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Votre panier est vide</h1>
          <p className="text-muted-foreground mb-6">
            Découvrez nos offres exceptionnelles sur les comptes premium
          </p>
          <Button onClick={() => setCurrentPage('catalog')}>
            Parcourir le catalogue
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentPage('catalog')}
          className="p-0 h-auto"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Continuer mes achats
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Mon panier ({cart.length} article{cart.length > 1 ? 's' : ''})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cart.map((item, index) => {
                  const discount = Math.round((1 - item.price / item.originalPrice) * 100);
                  
                  return (
                    <div key={`${item.id}-${index}`} className="border rounded-lg p-4">
                      <div className="flex items-start space-x-4">
                        <ImageWithFallback
                          src={item.logo}
                          alt={item.service}
                          className="h-16 w-16 rounded-lg object-cover flex-shrink-0"
                        />
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold">{item.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {item.type} • {item.duration}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center space-x-2">
                                <span className="text-lg font-bold text-primary">
                                  {item.price}€
                                </span>
                                <span className="text-sm text-muted-foreground line-through">
                                  {item.originalPrice}€
                                </span>
                                <Badge className="bg-accent/10 text-accent border-accent/20">
                                  -{discount}%
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-muted-foreground">Quantité:</span>
                              <span className="font-medium">{item.quantity}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Checkout Sidebar */}
        <div className="space-y-6">
          {/* Promo Code */}
          <Card>
            <CardHeader>
              <CardTitle>Code promo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <Input
                  placeholder="Entrez votre code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <Button variant="outline">
                  Appliquer
                </Button>
              </div>
              {promoCode === 'WELCOME10' && (
                <p className="text-sm text-accent mt-2">
                  ✅ Code appliqué ! -10% sur votre commande
                </p>
              )}
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Récapitulatif</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span>{subtotal.toFixed(2)}€</span>
                </div>
                
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-accent">
                    <span>Remise (WELCOME10)</span>
                    <span>-{promoDiscount.toFixed(2)}€</span>
                  </div>
                )}
                
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Frais de traitement</span>
                  <span>Gratuit</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">{total.toFixed(2)}€</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle>Mode de paiement</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <div key={method.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                      <RadioGroupItem value={method.id} id={method.id} />
                      <Icon className="h-5 w-5" />
                      <div className="flex-1">
                        <Label htmlFor={method.id} className="font-medium cursor-pointer">
                          {method.name}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {method.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Payment Form */}
          {paymentMethod === 'card' && (
            <Card>
              <CardHeader>
                <CardTitle>Informations de paiement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="card-number">Numéro de carte</Label>
                    <Input
                      id="card-number"
                      placeholder="1234 5678 9012 3456"
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Date d'expiration</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/AA"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="name">Nom sur la carte</Label>
                    <Input
                      id="name"
                      placeholder="Jean Dupont"
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Checkout Button */}
          <Button
            className="w-full neon-glow"
            size="lg"
            onClick={handleCheckout}
            disabled={isProcessing}
          >
            {isProcessing ? (
              'Traitement en cours...'
            ) : (
              `Finaliser la commande • ${total.toFixed(2)}€`
            )}
          </Button>

          {/* Security Notice */}
          <div className="text-center text-sm text-muted-foreground">
            <p>🔒 Paiement 100% sécurisé</p>
            <p>Livraison instantanée par email</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
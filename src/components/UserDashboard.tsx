import React, { useState } from 'react';
import { User, Package, Download, Eye, EyeOff, Copy, Check, MessageCircle, Settings, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useApp } from '../context/AppContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

const UserDashboard: React.FC = () => {
  const { setCurrentPage, setIsLoggedIn } = useApp();
  const [showPasswords, setShowPasswords] = useState<{[key: string]: boolean}>({});
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const userInfo = {
    name: 'Jean Dupont',
    email: 'jean.dupont@email.com',
    joinDate: '2024-01-15',
    totalOrders: 12,
    totalSpent: 89.76
  };

  const orders = [
    {
      id: 'CMD-001',
      date: '2024-01-20',
      status: 'delivered',
      total: 4.99,
      items: [
        {
          name: 'Netflix Premium',
          service: 'Netflix',
          duration: '1 mois',
          logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=100&fit=crop',
          credentials: {
            email: 'user.netflix.2024@email.com',
            password: 'NetflixPass123!',
            profile: 'Profil 1'
          }
        }
      ]
    },
    {
      id: 'CMD-002',
      date: '2024-01-18',
      status: 'delivered',
      total: 7.98,
      items: [
        {
          name: 'Spotify Premium',
          service: 'Spotify',
          duration: '1 mois',
          logo: 'https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=100&h=100&fit=crop',
          credentials: {
            email: 'spotify.user.2024@email.com',
            password: 'SpotifyPass456!'
          }
        },
        {
          name: 'Disney+ Premium',
          service: 'Disney+',
          duration: '1 mois',
          logo: 'https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=100&h=100&fit=crop',
          credentials: {
            email: 'disney.user.2024@email.com',
            password: 'DisneyPass789!'
          }
        }
      ]
    },
    {
      id: 'CMD-003',
      date: '2024-01-15',
      status: 'processing',
      total: 9.99,
      items: [
        {
          name: 'ChatGPT Plus',
          service: 'OpenAI',
          duration: '1 mois',
          logo: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=100&fit=crop',
          credentials: null
        }
      ]
    }
  ];

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'processing':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'cancelled':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getOrderStatusText = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'Livré';
      case 'processing':
        return 'En traitement';
      case 'cancelled':
        return 'Annulé';
      default:
        return status;
    }
  };

  const togglePasswordVisibility = (itemId: string, field: string) => {
    const key = `${itemId}-${field}`;
    setShowPasswords(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('home');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Mon espace</h1>
          <p className="text-muted-foreground">
            Gérez vos commandes et accédez à vos comptes
          </p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Déconnexion
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{userInfo.totalOrders}</p>
                <p className="text-sm text-muted-foreground">Commandes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Download className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{orders.filter(o => o.status === 'delivered').length}</p>
                <p className="text-sm text-muted-foreground">Comptes actifs</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <User className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{userInfo.totalSpent}€</p>
                <p className="text-sm text-muted-foreground">Total dépensé</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="orders" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="orders">Mes commandes</TabsTrigger>
          <TabsTrigger value="accounts">Mes comptes</TabsTrigger>
          <TabsTrigger value="profile">Mon profil</TabsTrigger>
        </TabsList>

        {/* Orders Tab */}
        <TabsContent value="orders">
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Commande {order.id}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.date).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge className={getOrderStatusColor(order.status)}>
                        {getOrderStatusText(order.status)}
                      </Badge>
                      <p className="text-lg font-bold mt-2">{order.total}€</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <ImageWithFallback
                          src={item.logo}
                          alt={item.service}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">{item.duration}</p>
                        </div>
                        {order.status === 'delivered' && item.credentials && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              // Scroll to accounts tab
                              const accountsTab = document.querySelector('[value="accounts"]') as HTMLElement;
                              accountsTab?.click();
                            }}
                          >
                            Voir les identifiants
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Accounts Tab */}
        <TabsContent value="accounts">
          <div className="space-y-6">
            {orders
              .filter(order => order.status === 'delivered')
              .flatMap(order => order.items.filter(item => item.credentials))
              .map((account, index) => (
                <Card key={index} className="neon-border">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <ImageWithFallback
                        src={account.logo}
                        alt={account.service}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                      <div>
                        <CardTitle>{account.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{account.duration}</p>
                      </div>
                      <Badge className="bg-accent/10 text-accent border-accent/20">
                        Actif
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Email */}
                      <div>
                        <Label className="text-sm font-medium mb-2 block">Email</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            value={account.credentials?.email || ''}
                            readOnly
                            className="flex-1"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(account.credentials?.email || '', `email-${index}`)}
                          >
                            {copiedField === `email-${index}` ? (
                              <Check className="h-4 w-4 text-accent" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      {/* Password */}
                      <div>
                        <Label className="text-sm font-medium mb-2 block">Mot de passe</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            type={showPasswords[`password-${index}`] ? 'text' : 'password'}
                            value={account.credentials?.password || ''}
                            readOnly
                            className="flex-1"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => togglePasswordVisibility(index.toString(), 'password')}
                          >
                            {showPasswords[`password-${index}`] ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(account.credentials?.password || '', `password-${index}`)}
                          >
                            {copiedField === `password-${index}` ? (
                              <Check className="h-4 w-4 text-accent" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      {/* Additional Info */}
                      {account.credentials?.profile && (
                        <div>
                          <Label className="text-sm font-medium mb-2 block">Profil recommandé</Label>
                          <Input
                            value={account.credentials.profile}
                            readOnly
                          />
                        </div>
                      )}

                      <Separator />

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>📝 Compte personnel - Ne pas partager</span>
                        <span>🛡️ Garantie 24h</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

            {orders.filter(order => order.status === 'delivered').length === 0 && (
              <div className="text-center py-12">
                <div className="h-24 w-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Aucun compte actif</h3>
                <p className="text-muted-foreground mb-4">
                  Vos comptes apparaîtront ici après votre première commande
                </p>
                <Button onClick={() => setCurrentPage('catalog')}>
                  Parcourir le catalogue
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Profile Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Informations personnelles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nom complet</Label>
                    <Input id="name" defaultValue={userInfo.name} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue={userInfo.email} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="join-date">Membre depuis</Label>
                    <Input 
                      id="join-date" 
                      value={new Date(userInfo.joinDate).toLocaleDateString('fr-FR')}
                      readOnly 
                      className="mt-1 bg-muted" 
                    />
                  </div>
                  <Button className="w-full">
                    Mettre à jour le profil
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Actions rapides
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setCurrentPage('support')}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contacter le support
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setCurrentPage('catalog')}
                  >
                    <Package className="h-4 w-4 mr-2" />
                    Parcourir le catalogue
                  </Button>
                  
                  <Separator />
                  
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p><strong>Conseils de sécurité :</strong></p>
                    <ul className="space-y-1 text-xs">
                      <li>• Ne partagez jamais vos identifiants</li>
                      <li>• Ne modifiez pas les mots de passe</li>
                      <li>• Contactez le support en cas de problème</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboard;
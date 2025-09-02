import React, { useState } from 'react';
import { MessageCircle, Phone, Mail, Send, Clock, CheckCircle, AlertCircle, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { useApp } from '../context/AppContext';

const SupportPage: React.FC = () => {
  const { isLoggedIn } = useApp();
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const existingTickets = [
    {
      id: 'TICKET-001',
      subject: 'Problème de connexion Netflix',
      category: 'Problème technique',
      status: 'resolved',
      date: '2024-01-20',
      response: 'Nous avons remplacé votre compte. Vérifiez votre email.'
    },
    {
      id: 'TICKET-002',
      subject: 'Remboursement commande',
      category: 'Remboursement',
      status: 'pending',
      date: '2024-01-18',
      response: null
    }
  ];

  const faqData = [
    {
      category: 'Commandes & Livraison',
      questions: [
        {
          question: 'Combien de temps pour recevoir mes identifiants ?',
          answer: 'Vous recevrez vos identifiants dans les 5-10 minutes suivant votre paiement par email et/ou Telegram/WhatsApp selon votre choix.'
        },
        {
          question: 'Que faire si je ne reçois pas mes identifiants ?',
          answer: 'Vérifiez d\'abord vos spams. Si vous ne trouvez rien, contactez-nous immédiatement via le chat ou créez un ticket.'
        },
        {
          question: 'Puis-je modifier ma commande après paiement ?',
          answer: 'Les commandes ne peuvent pas être modifiées après paiement. Contactez le support pour des cas exceptionnels.'
        }
      ]
    },
    {
      category: 'Comptes & Accès',
      questions: [
        {
          question: 'Puis-je changer le mot de passe du compte ?',
          answer: 'Non, il est fortement déconseillé de modifier les informations du compte car cela peut entraîner sa suspension.'
        },
        {
          question: 'Combien d\'appareils puis-je utiliser simultanément ?',
          answer: 'Cela dépend du service : Netflix Premium (4 écrans), Spotify Premium (1 appareil), Disney+ (4 écrans), etc.'
        },
        {
          question: 'Que faire si le compte ne fonctionne plus ?',
          answer: 'Contactez-nous immédiatement avec les détails du problème. Nous fournirons un remplacement sous 24h.'
        }
      ]
    },
    {
      category: 'Paiement & Remboursement',
      questions: [
        {
          question: 'Quels moyens de paiement acceptez-vous ?',
          answer: 'Nous acceptons les cartes bancaires, PayPal, et les cryptomonnaies (Bitcoin, Ethereum, USDT).'
        },
        {
          question: 'Puis-je être remboursé ?',
          answer: 'Les remboursements sont possibles dans les 24h si le compte fourni ne fonctionne pas, après vérification.'
        },
        {
          question: 'Mes données de paiement sont-elles sécurisées ?',
          answer: 'Oui, nous utilisons des processeurs de paiement certifiés PCI DSS. Aucune donnée bancaire n\'est stockée sur nos serveurs.'
        }
      ]
    },
    {
      category: 'Sécurité & Légalité',
      questions: [
        {
          question: 'Vos services sont-ils légaux ?',
          answer: 'Nous vendons des accès légitimes obtenus de manière conforme. Cependant, vérifiez les conditions d\'utilisation de chaque service.'
        },
        {
          question: 'Mes données personnelles sont-elles protégées ?',
          answer: 'Oui, nous respectons le RGPD et ne partageons jamais vos données avec des tiers. Consultez notre politique de confidentialité.'
        },
        {
          question: 'Que faire si mon compte est suspendu ?',
          answer: 'Contactez-nous immédiatement. Nous fournirons un remplacement gratuit si la suspension n\'est pas due à un mauvais usage.'
        }
      ]
    }
  ];

  const filteredFAQ = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject || !ticketCategory || !ticketMessage) {
      alert('Veuillez remplir tous les champs');
      return;
    }
    
    alert('Ticket créé avec succès ! Vous recevrez une réponse dans les 24h.');
    setTicketSubject('');
    setTicketCategory('');
    setTicketMessage('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'pending':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'closed':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'Résolu';
      case 'pending':
        return 'En attente';
      case 'closed':
        return 'Fermé';
      default:
        return status;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Centre d'aide</h1>
        <p className="text-muted-foreground text-lg">
          Nous sommes là pour vous aider. Trouvez des réponses ou contactez notre équipe.
        </p>
      </div>

      {/* Contact Methods */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="text-center hover:neon-border transition-all duration-300">
          <CardContent className="p-6">
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Chat en direct</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Réponse immédiate 24/7
            </p>
            <Button className="w-full">
              Ouvrir le chat
            </Button>
          </CardContent>
        </Card>

        <Card className="text-center hover:neon-border transition-all duration-300">
          <CardContent className="p-6">
            <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Phone className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold mb-2">WhatsApp</h3>
            <p className="text-sm text-muted-foreground mb-4">
              +33 1 23 45 67 89
            </p>
            <Button variant="outline" className="w-full">
              Contacter
            </Button>
          </CardContent>
        </Card>

        <Card className="text-center hover:neon-border transition-all duration-300">
          <CardContent className="p-6">
            <div className="h-12 w-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Mail className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="font-semibold mb-2">Telegram</h3>
            <p className="text-sm text-muted-foreground mb-4">
              @DigitalGearSupport
            </p>
            <Button variant="outline" className="w-full">
              Rejoindre
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="faq" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="ticket">Créer un ticket</TabsTrigger>
          {isLoggedIn && <TabsTrigger value="my-tickets">Mes tickets</TabsTrigger>}
        </TabsList>

        {/* FAQ Tab */}
        <TabsContent value="faq">
          <div className="space-y-6">
            {/* Search */}
            <Card>
              <CardContent className="p-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher dans la FAQ..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* FAQ Categories */}
            {filteredFAQ.map((category, categoryIndex) => (
              <Card key={categoryIndex}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2 text-primary" />
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((item, index) => (
                      <AccordionItem key={index} value={`item-${categoryIndex}-${index}`}>
                        <AccordionTrigger className="text-left">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}

            {filteredFAQ.length === 0 && searchQuery && (
              <div className="text-center py-12">
                <div className="h-24 w-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Aucun résultat trouvé</h3>
                <p className="text-muted-foreground mb-4">
                  Essayez avec d'autres mots-clés ou créez un ticket
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSearchQuery('')}
                >
                  Effacer la recherche
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Create Ticket Tab */}
        <TabsContent value="ticket">
          <Card>
            <CardHeader>
              <CardTitle>Créer un ticket de support</CardTitle>
              <p className="text-muted-foreground">
                Décrivez votre problème en détail pour une réponse rapide
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitTicket} className="space-y-6">
                {!isLoggedIn && (
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                    <p className="text-sm text-primary">
                      💡 Connectez-vous pour un suivi plus facile de vos tickets
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email">Email de contact</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="votre@email.com"
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Catégorie</Label>
                    <Select value={ticketCategory} onValueChange={setTicketCategory} required>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Sélectionnez une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">Problème technique</SelectItem>
                        <SelectItem value="account">Problème de compte</SelectItem>
                        <SelectItem value="payment">Problème de paiement</SelectItem>
                        <SelectItem value="refund">Demande de remboursement</SelectItem>
                        <SelectItem value="other">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject">Sujet</Label>
                  <Input
                    id="subject"
                    placeholder="Décrivez brièvement votre problème"
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message détaillé</Label>
                  <Textarea
                    id="message"
                    placeholder="Expliquez votre problème en détail (numéro de commande, étapes suivies, messages d'erreur, etc.)"
                    value={ticketMessage}
                    onChange={(e) => setTicketMessage(e.target.value)}
                    required
                    rows={6}
                    className="mt-1"
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <Button type="submit" className="flex-1">
                    <Send className="h-4 w-4 mr-2" />
                    Envoyer le ticket
                  </Button>
                  <Button type="button" variant="outline" className="flex-1">
                    Annuler
                  </Button>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>📧 Vous recevrez une confirmation par email</p>
                  <p>⏱️ Temps de réponse moyen : 2-4 heures</p>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* My Tickets Tab */}
        {isLoggedIn && (
          <TabsContent value="my-tickets">
            <div className="space-y-6">
              {existingTickets.map((ticket) => (
                <Card key={ticket.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{ticket.subject}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          Ticket {ticket.id} • {new Date(ticket.date).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                      <Badge className={getStatusColor(ticket.status)}>
                        {getStatusText(ticket.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{ticket.category}</Badge>
                        <span className="text-sm text-muted-foreground">•</span>
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>Créé le {new Date(ticket.date).toLocaleDateString('fr-FR')}</span>
                        </div>
                      </div>

                      {ticket.response && (
                        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <CheckCircle className="h-4 w-4 text-accent" />
                            <span className="text-sm font-medium text-accent">Réponse du support</span>
                          </div>
                          <p className="text-sm">{ticket.response}</p>
                        </div>
                      )}

                      {!ticket.response && ticket.status === 'pending' && (
                        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <span className="text-sm text-primary">
                              Votre ticket est en cours de traitement. Vous recevrez une réponse sous 24h.
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {existingTickets.length === 0 && (
                <div className="text-center py-12">
                  <div className="h-24 w-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Aucun ticket trouvé</h3>
                  <p className="text-muted-foreground mb-4">
                    Vous n'avez pas encore créé de ticket de support
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      const ticketTab = document.querySelector('[value="ticket"]') as HTMLElement;
                      ticketTab?.click();
                    }}
                  >
                    Créer un ticket
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default SupportPage;
import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FOOTER_SERVICES, FOOTER_LINKS } from '../constants/navigation';

const Footer: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <div className="h-8 w-8 bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-purple)] rounded-lg flex items-center justify-center mr-3">
                <span className="text-background text-sm font-bold">DG</span>
              </div>
              <span className="gradient-text text-xl font-bold">DigitalGear</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Votre plateforme de confiance pour l'achat de comptes premium à prix réduits.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button 
                  onClick={() => setCurrentPage('home')}
                  className="hover:text-foreground transition-colors"
                >
                  Accueil
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('catalog')}
                  className="hover:text-foreground transition-colors"
                >
                  Catalogue
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('support')}
                  className="hover:text-foreground transition-colors"
                >
                  Support
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {FOOTER_SERVICES.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="space-y-2">
              <a 
                href="#" 
                className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Telegram
              </a>
              <a 
                href="#" 
                className="flex items-center text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                <Phone className="h-4 w-4 mr-2" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; © 2025 Oumar Ba. Tous droits réservés.
</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {FOOTER_LINKS.map((link) => (
                <a key={link.name} href={link.href} className="hover:text-foreground transition-colors">
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
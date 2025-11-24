import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-transparent"
      data-testid="navigation-main"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex-1" />

          {/* Desktop buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              size="icon"
              className="gap-2 bg-accent hover:bg-accent/90"
              onClick={() => window.open('tel:+881936135709', '_blank')}
              data-testid="button-call"
            >
              <Phone className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              className="gap-2 bg-secondary hover:bg-secondary/90"
              onClick={() => window.open('https://wa.me/881936135709', '_blank')}
              data-testid="button-whatsapp-nav"
            >
              <SiWhatsapp className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile buttons - vertical stack in top right */}
          <div
            className={`md:hidden flex flex-col gap-2 transition-all duration-300 transform ${
              !scrolled ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
            }`}
            style={{
              marginTop: !scrolled ? '10px' : '0px',
            }}
          >
            <Button
              size="icon"
              className="gap-2 bg-accent hover:bg-accent/90"
              onClick={() => window.open('tel:+881936135709', '_blank')}
              data-testid="button-call-mobile"
            >
              <Phone className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              className="gap-2 bg-secondary hover:bg-secondary/90"
              onClick={() => window.open('https://wa.me/881936135709', '_blank')}
              data-testid="button-whatsapp-mobile"
            >
              <SiWhatsapp className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

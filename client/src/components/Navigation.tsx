import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import logoImage from '@assets/image-removebg-preview_1764013789708.png';

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
    <>
      {/* Fixed navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-background/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
        }`}
        data-testid="navigation-main"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Spacer for logo area */}
            <div className="w-16 md:w-20" />

            {/* Desktop and Mobile buttons - always visible */}
            <div className="flex items-center gap-2 md:gap-3">
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
          </div>
        </div>
      </nav>

      {/* Fixed logo with smooth transform animation */}
      <div
        className="fixed z-30 transition-all duration-500 ease-out"
        style={{
          top: scrolled ? '12px' : '80px',
          left: scrolled ? '32px' : '50%',
          transform: scrolled ? 'translateX(0) scale(0.6)' : 'translateX(-50%) scale(1)',
          transformOrigin: 'top center',
        }}
        data-testid="logo-container"
      >
        <img src={logoImage} alt="Heat & Eat Logo" className="h-28 md:h-32 w-auto" />
      </div>
    </>
  );
}

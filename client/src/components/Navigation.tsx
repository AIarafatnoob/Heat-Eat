import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Phone } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import logoImage from '@assets/image_1764011036750.png';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setOpen(false);
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent"
      data-testid="navigation-main"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div
            className={`flex items-center transition-all duration-300 ${scrolled ? 'h-10' : 'h-12'}`}
            data-testid="logo-container"
          >
            <img src={logoImage} alt="Heat & Eat Logo" className="h-full w-auto" />
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => window.open('tel:+881936135709', '_blank')}
              data-testid="button-call"
            >
              <Phone className="h-4 w-4" />
              Call Us
            </Button>
            <Button
              size="sm"
              className="gap-2 bg-secondary hover:bg-secondary/90"
              onClick={() => window.open('https://wa.me/881936135709', '_blank')}
              data-testid="button-whatsapp-nav"
            >
              <SiWhatsapp className="h-4 w-4" />
              Order Now
            </Button>
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" data-testid="button-menu-toggle">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col gap-6 mt-8">
                <div className="flex flex-col gap-3 px-4">
                  <Button
                    variant="outline"
                    className="gap-2 w-full"
                    onClick={() => window.open('tel:+881936135709', '_blank')}
                    data-testid="button-call-mobile"
                  >
                    <Phone className="h-4 w-4" />
                    Call Us
                  </Button>
                  <Button
                    className="gap-2 w-full bg-secondary hover:bg-secondary/90"
                    onClick={() => window.open('https://wa.me/881936135709', '_blank')}
                    data-testid="button-whatsapp-mobile"
                  >
                    <SiWhatsapp className="h-4 w-4" />
                    Order Now
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

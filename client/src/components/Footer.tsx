import { SiWhatsapp, SiFacebook, SiInstagram } from 'react-icons/si';

export default function Footer() {
  return (
    <footer className="bg-card border-t" data-testid="footer-main">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Heat & Eat</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Crafted with Care, Served with Heart. Your trusted source for delicious home-cooked meals.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => window.open('https://wa.me/881936135709', '_blank')}
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-secondary/10 hover-elevate active-elevate-2"
                data-testid="button-social-whatsapp"
              >
                <SiWhatsapp className="h-5 w-5 text-secondary" />
              </button>
              <button
                onClick={() => console.log('Facebook clicked')}
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 hover-elevate active-elevate-2"
                data-testid="button-social-facebook"
              >
                <SiFacebook className="h-5 w-5 text-primary" />
              </button>
              <button
                onClick={() => console.log('Instagram clicked')}
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 hover-elevate active-elevate-2"
                data-testid="button-social-instagram"
              >
                <SiInstagram className="h-5 w-5 text-accent" />
              </button>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-home"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('quick-select')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-quick-select"
                >
                  Quick Select
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-menu"
                >
                  Full Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-contact"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li data-testid="text-footer-phone">
                Phone: <a href="tel:+881936135709" className="hover:text-foreground">+88 1936-135709</a>
              </li>
              <li data-testid="text-footer-email">
                Email: <a href="mailto:heatandeat123@gmail.com" className="hover:text-foreground">heatandeat123@gmail.com</a>
              </li>
              <li data-testid="text-footer-location">Location: Dhaka, Bangladesh</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground" data-testid="text-copyright">
            © {new Date().getFullYear()} Heat & Eat. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

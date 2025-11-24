import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 md:py-20 lg:py-24 bg-muted/30" data-testid="section-contact">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-contact-title">
            Get in Touch
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Questions about our frozen items? We're here to help! Reach out via WhatsApp or give us a call.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="hover-elevate" data-testid="card-contact-phone">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Phone</h3>
              <p className="text-muted-foreground mb-3">Call us directly</p>
              <a
                href="tel:+881936135709"
                className="text-primary font-medium hover:underline"
                data-testid="link-phone"
              >
                +88 1936-135709
              </a>
            </CardContent>
          </Card>

          <Card className="hover-elevate" data-testid="card-contact-email">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary/10 mb-4">
                <Mail className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Email</h3>
              <p className="text-muted-foreground mb-3">Send us a message</p>
              <a
                href="mailto:heatandeat123@gmail.com"
                className="text-primary font-medium hover:underline"
                data-testid="link-email"
              >
                heatandeat123@gmail.com
              </a>
            </CardContent>
          </Card>

          <Card className="hover-elevate" data-testid="card-contact-location">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 mb-4">
                <MapPin className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Location</h3>
              <p className="text-muted-foreground mb-3">Delivering fresh daily</p>
              <p className="text-foreground font-medium">Dhaka, Bangladesh</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="gap-2 bg-secondary hover:bg-secondary/90"
            onClick={() => window.open('https://wa.me/881936135709', '_blank')}
            data-testid="button-whatsapp-contact"
          >
            <SiWhatsapp className="h-5 w-5" />
            Order Now via WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}

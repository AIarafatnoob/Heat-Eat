import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import heroImage from '@assets/generated_images/hero_banner_meal_spread.png';

export default function HeroSection() {
  const testimonials = [
    {
      name: 'Sarah Ahmed',
      rating: 5,
      comment: 'Best home-cooked meals! Tastes just like my grandma used to make.',
    },
    {
      name: 'Karim Hassan',
      rating: 5,
      comment: 'Fresh, delicious, and delivered on time. Highly recommend!',
    },
    {
      name: 'Nadia Khan',
      rating: 5,
      comment: 'The chicken tikka kabab is absolutely amazing. Will order again!',
    },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-16" data-testid="section-hero">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-20 text-center">
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          data-testid="text-hero-title"
        >
          Crafted with Care,
          <br />
          Served with Heart
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto" data-testid="text-hero-subtitle">
          Experience the warmth of home-cooked meals delivered fresh to your door. Authentic flavors, quality
          ingredients, made with love.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button
            size="lg"
            className="gap-2 text-lg backdrop-blur-md bg-white/20 hover:bg-white/30 border border-white/40"
            onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
            data-testid="button-view-menu"
          >
            View Menu
          </Button>
          <Button
            size="lg"
            className="gap-2 text-lg bg-secondary hover:bg-secondary/90"
            onClick={() => window.open('https://wa.me/881936135709', '_blank')}
            data-testid="button-order-whatsapp"
          >
            <SiWhatsapp className="h-5 w-5" />
            Order via WhatsApp
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-white/10 backdrop-blur-md border-white/20"
              data-testid={`card-testimonial-${index}`}
            >
              <CardContent className="p-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-white text-sm mb-3 italic">"{testimonial.comment}"</p>
                <p className="text-white/80 text-xs font-medium">{testimonial.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import QuickSelectCarousel from '@/components/QuickSelectCarousel';
import MenuGrid from '@/components/MenuGrid';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import OrderFloatingButton from '@/components/OrderFloatingButton';

interface OrderItem {
  item: {
    id: string;
    name: string;
    priceRegular: number;
    priceLarge: number;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
  size: 'regular' | 'large';
  quantity: number;
}

export default function Home() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <QuickSelectCarousel />
      <MenuGrid onOrderUpdate={setOrderItems} />
      <ContactSection />
      <Footer />
      <OrderFloatingButton items={orderItems} />
    </div>
  );
}

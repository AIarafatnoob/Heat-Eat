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

  const handleQuickSelectUpdate = (quickItems: OrderItem[]) => {
    setOrderItems(prevItems => {
      // Merge quick select items with existing menu items
      const menuItems = prevItems.filter(item => {
        const itemId = parseInt(item.item.id);
        return itemId > 4; // Menu items have IDs > 4
      });
      
      return [...quickItems, ...menuItems];
    });
  };

  const handleMenuUpdate = (menuItems: OrderItem[]) => {
    setOrderItems(prevItems => {
      // Merge menu items with existing quick select items
      const quickItems = prevItems.filter(item => {
        const itemId = parseInt(item.item.id);
        return itemId <= 4; // Quick select items have IDs 1-4
      });
      
      return [...quickItems, ...menuItems];
    });
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <QuickSelectCarousel onOrderUpdate={handleQuickSelectUpdate} />
      <MenuGrid onOrderUpdate={handleMenuUpdate} />
      <ContactSection />
      <Footer />
      <OrderFloatingButton items={orderItems} />
    </div>
  );
}

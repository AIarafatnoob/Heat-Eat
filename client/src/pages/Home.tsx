import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Logo from '@/components/Logo';
import HeroSection from '@/components/HeroSection';
import QuickSelectCarousel from '@/components/QuickSelectCarousel';
import NutritionBar from '@/components/NutritionBar';
import MenuGrid from '@/components/MenuGrid';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import OrderFloatingButton from '@/components/OrderFloatingButton';

interface OrderItem {
  item: {
    id: string;
    name: string;
    prices: { label: string; pieces: number; price: number }[];
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
  pieces: number;
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

  const handleClearCart = () => {
    setOrderItems([]);
  };

  const handleRemoveItem = (index: number) => {
    setOrderItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  // Extract quick select items (IDs 1-4) for nutrition display
  const quickSelectItems = orderItems.filter(item => {
    const itemId = parseInt(item.item.id);
    return itemId <= 4;
  });

  return (
    <div className="min-h-screen">
      <Navigation />
      <Logo />
      <HeroSection />
      <QuickSelectCarousel onOrderUpdate={handleQuickSelectUpdate} />
      <NutritionBar items={quickSelectItems} />
      <MenuGrid onOrderUpdate={handleMenuUpdate} />
      <ContactSection />
      <Footer />
      <OrderFloatingButton items={orderItems} onClearCart={handleClearCart} onRemoveItem={handleRemoveItem} />
    </div>
  );
}

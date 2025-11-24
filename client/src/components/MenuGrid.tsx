import { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Minus } from 'lucide-react';
import frenchFriesImg from '@assets/generated_images/french_fries_product_photo.png';
import chickenNuggetsImg from '@assets/generated_images/chicken_nuggets_product_photo.png';
import chickenRollImg from '@assets/generated_images/chicken_roll_product_photo.png';
import chickenBollImg from '@assets/generated_images/chicken_boll_product_photo.png';
import chickenFryImg from '@assets/generated_images/chicken_fry_product_photo.png';
import vegetableRollImg from '@assets/generated_images/vegetable_roll_product_photo.png';
import nagaShingaraImg from '@assets/generated_images/naga_shingara_product_photo.png';
import chickenKababImg from '@assets/generated_images/chicken_kabab_product_photo.png';
import samuchaImg from '@assets/generated_images/samucha_product_photo.png';
import chickenTikkaKababImg from '@assets/generated_images/chicken_tikka_kabab_photo.png';

interface MenuItem {
  id: string;
  name: string;
  image: string;
  priceRegular: number;
  priceLarge: number;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  description: string;
}

const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'French Fry',
    image: frenchFriesImg,
    priceRegular: 120,
    priceLarge: 180,
    calories: 320,
    protein: 4,
    carbs: 42,
    fats: 15,
    description: 'Crispy golden fries, perfectly seasoned',
  },
  {
    id: '2',
    name: 'Chicken Nuggets',
    image: chickenNuggetsImg,
    priceRegular: 200,
    priceLarge: 300,
    calories: 280,
    protein: 18,
    carbs: 16,
    fats: 14,
    description: 'Tender chicken nuggets with crispy coating',
  },
  {
    id: '3',
    name: 'Chicken Roll',
    image: chickenRollImg,
    priceRegular: 150,
    priceLarge: 220,
    calories: 350,
    protein: 22,
    carbs: 35,
    fats: 12,
    description: 'Delicious chicken wrapped in soft paratha',
  },
  {
    id: '4',
    name: 'Chicken Boll',
    image: chickenBollImg,
    priceRegular: 180,
    priceLarge: 260,
    calories: 310,
    protein: 20,
    carbs: 28,
    fats: 13,
    description: 'Savory chicken balls with special spices',
  },
  {
    id: '5',
    name: 'Chicken Fry',
    image: chickenFryImg,
    priceRegular: 220,
    priceLarge: 320,
    calories: 380,
    protein: 26,
    carbs: 18,
    fats: 20,
    description: 'Crispy fried chicken pieces, perfectly spiced',
  },
  {
    id: '6',
    name: 'Vegetable Roll',
    image: vegetableRollImg,
    priceRegular: 100,
    priceLarge: 150,
    calories: 240,
    protein: 6,
    carbs: 32,
    fats: 10,
    description: 'Fresh vegetables in crispy roll',
  },
  {
    id: '7',
    name: 'Naga Shingara',
    image: nagaShingaraImg,
    priceRegular: 80,
    priceLarge: 120,
    calories: 200,
    protein: 5,
    carbs: 28,
    fats: 8,
    description: 'Spicy traditional samosa with unique filling',
  },
  {
    id: '8',
    name: 'Chicken Kabab',
    image: chickenKababImg,
    priceRegular: 180,
    priceLarge: 260,
    calories: 290,
    protein: 24,
    carbs: 12,
    fats: 16,
    description: 'Grilled chicken kabab with aromatic spices',
  },
  {
    id: '9',
    name: 'Samucha',
    image: samuchaImg,
    priceRegular: 70,
    priceLarge: 110,
    calories: 180,
    protein: 4,
    carbs: 24,
    fats: 7,
    description: 'Classic crispy samosa with potato filling',
  },
  {
    id: '10',
    name: 'Chicken Tikka Kabab',
    image: chickenTikkaKababImg,
    priceRegular: 250,
    priceLarge: 350,
    calories: 320,
    protein: 28,
    carbs: 10,
    fats: 18,
    description: 'Marinated chicken tikka with char-grilled flavor',
  },
];

interface OrderItem {
  item: MenuItem;
  size: 'regular' | 'large';
  quantity: number;
}

export default function MenuGrid({ onOrderUpdate }: { onOrderUpdate?: (items: OrderItem[]) => void }) {
  const [order, setOrder] = useState<Map<string, OrderItem>>(new Map());

  const addToOrder = (item: MenuItem, size: 'regular' | 'large') => {
    const key = `${item.id}-${size}`;
    const newOrder = new Map(order);
    const existing = newOrder.get(key);

    if (existing) {
      newOrder.set(key, { ...existing, quantity: existing.quantity + 1 });
    } else {
      newOrder.set(key, { item, size, quantity: 1 });
    }

    setOrder(newOrder);
    onOrderUpdate?.(Array.from(newOrder.values()));
  };

  const removeFromOrder = (item: MenuItem, size: 'regular' | 'large') => {
    const key = `${item.id}-${size}`;
    const newOrder = new Map(order);
    const existing = newOrder.get(key);

    if (existing && existing.quantity > 1) {
      newOrder.set(key, { ...existing, quantity: existing.quantity - 1 });
    } else {
      newOrder.delete(key);
    }

    setOrder(newOrder);
    onOrderUpdate?.(Array.from(newOrder.values()));
  };

  const getItemQuantity = (itemId: string, size: 'regular' | 'large') => {
    const key = `${itemId}-${size}`;
    return order.get(key)?.quantity || 0;
  };

  return (
    <section id="menu" className="py-16 md:py-20 lg:py-24" data-testid="section-menu">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-menu-title">
            Our Complete Frozen Menu
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Premium frozen food items, flash-frozen for maximum freshness and flavor
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover-elevate" data-testid={`card-menu-item-${item.id}`}>
              <CardContent className="p-0">
                <div className="aspect-video relative overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-xl mb-2" data-testid={`text-menu-item-name-${item.id}`}>
                    {item.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">{item.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="text-xs">
                      {item.calories} cal
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {item.protein}g protein
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {item.carbs}g carbs
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {item.fats}g fats
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Regular</p>
                        <p className="font-semibold">৳{item.priceRegular}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getItemQuantity(item.id, 'regular') > 0 && (
                          <>
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8"
                              onClick={() => removeFromOrder(item, 'regular')}
                              data-testid={`button-decrease-regular-${item.id}`}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center font-semibold" data-testid={`text-qty-regular-${item.id}`}>
                              {getItemQuantity(item.id, 'regular')}
                            </span>
                          </>
                        )}
                        <Button
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => addToOrder(item, 'regular')}
                          data-testid={`button-add-regular-${item.id}`}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Large</p>
                        <p className="font-semibold">৳{item.priceLarge}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getItemQuantity(item.id, 'large') > 0 && (
                          <>
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8"
                              onClick={() => removeFromOrder(item, 'large')}
                              data-testid={`button-decrease-large-${item.id}`}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center font-semibold" data-testid={`text-qty-large-${item.id}`}>
                              {getItemQuantity(item.id, 'large')}
                            </span>
                          </>
                        )}
                        <Button
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => addToOrder(item, 'large')}
                          data-testid={`button-add-large-${item.id}`}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
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
  prices: { pieces: number; price: number }[];
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
    prices: [
      { pieces: 1, price: 250 },
      { pieces: 2, price: 450 },
      { pieces: 5, price: 1000 },
    ],
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
    prices: [
      { pieces: 1, price: 280 },
      { pieces: 2, price: 500 },
      { pieces: 5, price: 1150 },
    ],
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
    prices: [
      { pieces: 1, price: 200 },
      { pieces: 2, price: 380 },
      { pieces: 5, price: 900 },
    ],
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
    prices: [
      { pieces: 1, price: 220 },
      { pieces: 2, price: 400 },
      { pieces: 5, price: 950 },
    ],
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
    prices: [
      { pieces: 2, price: 320 },
      { pieces: 4, price: 580 },
      { pieces: 8, price: 1080 },
    ],
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
    prices: [
      { pieces: 1, price: 180 },
      { pieces: 2, price: 320 },
      { pieces: 5, price: 750 },
    ],
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
    prices: [
      { pieces: 2, price: 200 },
      { pieces: 4, price: 360 },
      { pieces: 10, price: 850 },
    ],
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
    prices: [
      { pieces: 2, price: 300 },
      { pieces: 4, price: 550 },
      { pieces: 8, price: 1050 },
    ],
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
    prices: [
      { pieces: 2, price: 180 },
      { pieces: 4, price: 320 },
      { pieces: 10, price: 750 },
    ],
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
    prices: [
      { pieces: 2, price: 350 },
      { pieces: 4, price: 650 },
      { pieces: 8, price: 1200 },
    ],
    calories: 320,
    protein: 28,
    carbs: 10,
    fats: 18,
    description: 'Marinated chicken tikka with char-grilled flavor',
  },
];

interface OrderItem {
  item: MenuItem;
  pieces: number;
  quantity: number;
}

export default function MenuGrid({ onOrderUpdate }: { onOrderUpdate?: (items: OrderItem[]) => void }) {
  const [order, setOrder] = useState<Map<string, OrderItem>>(new Map());

  const addToOrder = (item: MenuItem, pieces: number) => {
    const key = `${item.id}-${pieces}`;
    const newOrder = new Map(order);
    const existing = newOrder.get(key);

    if (existing) {
      newOrder.set(key, { ...existing, quantity: existing.quantity + 1 });
    } else {
      newOrder.set(key, { item, pieces, quantity: 1 });
    }

    setOrder(newOrder);
    onOrderUpdate?.(Array.from(newOrder.values()));
  };

  const removeFromOrder = (item: MenuItem, pieces: number) => {
    const key = `${item.id}-${pieces}`;
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

  const getItemQuantity = (itemId: string, pieces: number) => {
    const key = `${itemId}-${pieces}`;
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

                  <div className="space-y-2">
                    {item.prices.map((priceOption) => (
                      <div key={`${item.id}-${priceOption.pieces}`} className="flex items-center justify-between gap-2">
                        <div className="text-sm flex-1">
                          <p className="text-muted-foreground">{priceOption.pieces} pc{priceOption.pieces > 1 ? 's' : ''}</p>
                          <p className="font-semibold">৳{priceOption.price}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getItemQuantity(item.id, priceOption.pieces) > 0 && (
                            <>
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-8 w-8"
                                onClick={() => removeFromOrder(item, priceOption.pieces)}
                                data-testid={`button-decrease-${item.id}-${priceOption.pieces}`}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-6 text-center font-semibold text-xs" data-testid={`text-qty-${item.id}-${priceOption.pieces}`}>
                                {getItemQuantity(item.id, priceOption.pieces)}
                              </span>
                            </>
                          )}
                          <Button
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => addToOrder(item, priceOption.pieces)}
                            data-testid={`button-add-${item.id}-${priceOption.pieces}`}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
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

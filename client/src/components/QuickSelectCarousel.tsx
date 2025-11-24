import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Check } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import frenchFriesImg from '@assets/generated_images/french_fries_product_photo.png';
import chickenNuggetsImg from '@assets/generated_images/chicken_nuggets_product_photo.png';
import chickenRollImg from '@assets/generated_images/chicken_roll_product_photo.png';
import chickenBollImg from '@assets/generated_images/chicken_boll_product_photo.png';

interface MenuItem {
  id: string;
  name: string;
  image: string;
  prices: { label: string; pieces: number; price: number }[];
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

const quickItems: MenuItem[] = [
  {
    id: '1',
    name: 'French Fry',
    image: frenchFriesImg,
    prices: [
      { label: '500g', pieces: 500, price: 280 },
      { label: '1kg', pieces: 1000, price: 480 },
    ],
    calories: 320,
    protein: 4,
    carbs: 42,
    fats: 15,
  },
  {
    id: '2',
    name: 'Chicken Nuggets',
    image: chickenNuggetsImg,
    prices: [
      { label: '8 pcs', pieces: 8, price: 350 },
      { label: '16 pcs', pieces: 16, price: 620 },
    ],
    calories: 280,
    protein: 18,
    carbs: 16,
    fats: 14,
  },
  {
    id: '3',
    name: 'Chicken Roll',
    image: chickenRollImg,
    prices: [
      { label: '8 pcs', pieces: 8, price: 320 },
      { label: '16 pcs', pieces: 16, price: 580 },
    ],
    calories: 350,
    protein: 22,
    carbs: 35,
    fats: 12,
  },
  {
    id: '4',
    name: 'Chicken Roll',
    image: chickenBollImg,
    prices: [
      { label: '8 pcs', pieces: 8, price: 300 },
      { label: '16 pcs', pieces: 16, price: 540 },
    ],
    calories: 310,
    protein: 20,
    carbs: 28,
    fats: 13,
  },
];

interface OrderItem {
  item: MenuItem;
  pieces: number;
  quantity: number;
}

export default function QuickSelectCarousel({ onOrderUpdate }: { onOrderUpdate?: (items: OrderItem[]) => void }) {
  const [cart, setCart] = useState<Map<string, OrderItem>>(new Map());

  const toggleCart = (item: MenuItem, pieces: number) => {
    const key = `${item.id}-${pieces}`;
    const newCart = new Map(cart);
    const existing = newCart.get(key);

    if (existing) {
      // If already selected, deselect it
      newCart.delete(key);
    } else {
      // If not selected, add it
      newCart.set(key, { item, pieces, quantity: 1 });
    }

    setCart(newCart);
    onOrderUpdate?.(Array.from(newCart.values()));
  };

  const isSelected = (itemId: string, pieces: number) => {
    return cart.has(`${itemId}-${pieces}`);
  };

  return (
    <section id="quick-select" className="py-16 md:py-20 lg:py-24 bg-muted/30" data-testid="section-quick-select">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-quick-select-title">
            Quick Select Favorites
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Flash-frozen premium items - click to add to your order
          </p>
        </div>

        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-6 pb-4">
            {quickItems.map((item) => (
              <Card
                key={item.id}
                className="flex-none w-[240px] overflow-hidden hover-elevate transition-all"
                data-testid={`card-quick-item-${item.id}`}
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-40 object-cover"
                    />
                  </div>
                  <div className="p-4 space-y-3">
                    <h3 className="font-semibold text-base" data-testid={`text-item-name-${item.id}`}>
                      {item.name}
                    </h3>

                    <div className="space-y-2">
                      {item.prices.map((priceOption) => {
                        const selected = isSelected(item.id, priceOption.pieces);
                        return (
                          <Button
                            key={`${item.id}-${priceOption.pieces}`}
                            variant={selected ? 'default' : 'outline'}
                            size="sm"
                            className={`w-full text-xs flex items-center justify-between gap-1 transition-all ${
                              selected ? 'ring-2 ring-primary' : ''
                            }`}
                            onClick={() => toggleCart(item, priceOption.pieces)}
                            data-testid={`button-add-${item.id}-${priceOption.pieces}`}
                          >
                            <span className="flex items-center gap-1">
                              {selected && <Check className="h-3 w-3" />}
                              {priceOption.label}
                            </span>
                            <span className={`ml-auto font-bold ${selected ? '' : 'text-primary'}`}>
                              ৳{priceOption.price}
                            </span>
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {cart.size > 0 && (
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <ShoppingCart className="h-5 w-5 inline mr-2" />
            {Array.from(cart.values()).reduce((sum, item) => sum + item.quantity, 0)} item
            {Array.from(cart.values()).reduce((sum, item) => sum + item.quantity, 0) > 1 ? 's' : ''} in cart
          </div>
        )}
      </div>
    </section>
  );
}

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Check } from 'lucide-react';
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
  prices: { label: string; pieces: number; price: number }[];
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
      { label: '500g', pieces: 500, price: 280 },
      { label: '1kg', pieces: 1000, price: 480 },
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
      { label: '8 pcs', pieces: 8, price: 350 },
      { label: '16 pcs', pieces: 16, price: 620 },
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
      { label: '8 pcs', pieces: 8, price: 320 },
      { label: '16 pcs', pieces: 16, price: 580 },
    ],
    calories: 350,
    protein: 22,
    carbs: 35,
    fats: 12,
    description: 'Delicious chicken wrapped in soft paratha',
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
    description: 'Crispy chicken roll with aromatic spices',
  },
  {
    id: '5',
    name: 'Chicken Fry',
    image: chickenFryImg,
    prices: [
      { label: '8 pcs', pieces: 8, price: 320 },
      { label: '16 pcs', pieces: 16, price: 580 },
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
      { label: '8 pcs', pieces: 8, price: 280 },
      { label: '16 pcs', pieces: 16, price: 500 },
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
      { label: '8 pcs', pieces: 8, price: 250 },
      { label: '16 pcs', pieces: 16, price: 450 },
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
      { label: '8 pcs', pieces: 8, price: 340 },
      { label: '16 pcs', pieces: 16, price: 620 },
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
      { label: '8 pcs', pieces: 8, price: 240 },
      { label: '16 pcs', pieces: 16, price: 430 },
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
      { label: '8 pcs', pieces: 8, price: 380 },
      { label: '16 pcs', pieces: 16, price: 700 },
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
  const [menuOrder, setMenuOrder] = useState<Map<string, OrderItem>>(new Map());

  const toggleItem = (item: MenuItem, pieces: number) => {
    const key = `${item.id}-${pieces}`;
    const newOrder = new Map(menuOrder);
    const existing = newOrder.get(key);

    if (existing) {
      // If already selected, deselect it
      newOrder.delete(key);
    } else {
      // If not selected, add it
      newOrder.set(key, { item, pieces, quantity: 1 });
    }

    setMenuOrder(newOrder);
    onOrderUpdate?.(Array.from(newOrder.values()));
  };

  const isItemSelected = (itemId: string, pieces: number) => {
    return menuOrder.has(`${itemId}-${pieces}`);
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
                    {item.prices.map((priceOption) => {
                      const isSelected = isItemSelected(item.id, priceOption.pieces);

                      return (
                        <Button
                          key={`${item.id}-${priceOption.pieces}`}
                          variant={isSelected ? 'default' : 'outline'}
                          className="w-full text-sm flex items-center justify-between gap-2 transition-all"
                          onClick={() => toggleItem(item, priceOption.pieces)}
                          data-testid={`button-add-${item.id}-${priceOption.pieces}`}
                        >
                          <span className="flex items-center gap-2">
                            {isSelected && <Check className="h-4 w-4" />}
                            {priceOption.label}
                          </span>
                          <span className="font-bold">৳{priceOption.price}</span>
                        </Button>
                      );
                    })}
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

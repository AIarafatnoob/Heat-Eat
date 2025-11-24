import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import frenchFriesImg from '@assets/generated_images/french_fries_product_photo.png';
import chickenNuggetsImg from '@assets/generated_images/chicken_nuggets_product_photo.png';
import chickenRollImg from '@assets/generated_images/chicken_roll_product_photo.png';
import chickenBollImg from '@assets/generated_images/chicken_boll_product_photo.png';

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
}

const quickItems: MenuItem[] = [
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
  },
];

export default function QuickSelectCarousel() {
  const [selections, setSelections] = useState<Map<string, 'regular' | 'large'>>(new Map());

  const toggleSelection = (id: string, size: 'regular' | 'large') => {
    const newSelections = new Map(selections);
    if (newSelections.has(id) && newSelections.get(id) === size) {
      newSelections.delete(id);
    } else {
      newSelections.set(id, size);
    }
    setSelections(newSelections);
  };

  const calculateTotals = () => {
    let totals = { calories: 0, protein: 0, carbs: 0, fats: 0 };
    selections.forEach((size, id) => {
      const item = quickItems.find((i) => i.id === id);
      if (item) {
        const multiplier = size === 'large' ? 1.5 : 1;
        totals.calories += item.calories * multiplier;
        totals.protein += item.protein * multiplier;
        totals.carbs += item.carbs * multiplier;
        totals.fats += item.fats * multiplier;
      }
    });
    return totals;
  };

  const totals = calculateTotals();

  return (
    <section id="quick-select" className="py-16 md:py-20 lg:py-24 bg-muted/30" data-testid="section-quick-select">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-quick-select-title">
            Quick Select Favorites
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose your favorites and see nutritional information in real-time
          </p>
        </div>

        <ScrollArea className="w-full whitespace-nowrap mb-8">
          <div className="flex gap-6 pb-4">
            {quickItems.map((item) => {
              const isSelected = selections.has(item.id);
              const selectedSize = selections.get(item.id);

              return (
                <Card
                  key={item.id}
                  className={`flex-none w-[280px] transition-all duration-300 ${
                    isSelected ? 'ring-2 ring-primary shadow-lg scale-105' : ''
                  }`}
                  data-testid={`card-quick-item-${item.id}`}
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-3 right-3">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() =>
                            toggleSelection(item.id, selectedSize || 'regular')
                          }
                          className="h-6 w-6 bg-white border-2"
                          data-testid={`checkbox-select-${item.id}`}
                        />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-3" data-testid={`text-item-name-${item.id}`}>
                        {item.name}
                      </h3>
                      <div className="flex gap-2 mb-4">
                        <Button
                          variant={selectedSize === 'regular' ? 'default' : 'outline'}
                          size="sm"
                          className="flex-1"
                          onClick={() => toggleSelection(item.id, 'regular')}
                          data-testid={`button-regular-${item.id}`}
                        >
                          Regular ৳{item.priceRegular}
                        </Button>
                        <Button
                          variant={selectedSize === 'large' ? 'default' : 'outline'}
                          size="sm"
                          className="flex-1"
                          onClick={() => toggleSelection(item.id, 'large')}
                          data-testid={`button-large-${item.id}`}
                        >
                          Large ৳{item.priceLarge}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {selections.size > 0 && (
          <Card className="sticky bottom-4 shadow-xl" data-testid="card-nutrition-counter">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">Your Selection Totals</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <Badge variant="outline" className="mb-2">
                    Calories
                  </Badge>
                  <p className="text-2xl font-bold text-primary" data-testid="text-total-calories">
                    {Math.round(totals.calories)}
                  </p>
                </div>
                <div className="text-center">
                  <Badge variant="outline" className="mb-2">
                    Protein
                  </Badge>
                  <p className="text-2xl font-bold text-secondary" data-testid="text-total-protein">
                    {Math.round(totals.protein)}g
                  </p>
                </div>
                <div className="text-center">
                  <Badge variant="outline" className="mb-2">
                    Carbs
                  </Badge>
                  <p className="text-2xl font-bold text-accent" data-testid="text-total-carbs">
                    {Math.round(totals.carbs)}g
                  </p>
                </div>
                <div className="text-center">
                  <Badge variant="outline" className="mb-2">
                    Fats
                  </Badge>
                  <p className="text-2xl font-bold text-muted-foreground" data-testid="text-total-fats">
                    {Math.round(totals.fats)}g
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}

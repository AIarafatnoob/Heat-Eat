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

export default function NutritionBar({ items }: { items: OrderItem[] }) {
  const totalNutrition = items.reduce(
    (totals, orderItem) => {
      const multiplier = orderItem.quantity;
      return {
        calories: totals.calories + orderItem.item.calories * multiplier,
        protein: totals.protein + orderItem.item.protein * multiplier,
        carbs: totals.carbs + orderItem.item.carbs * multiplier,
        fats: totals.fats + orderItem.item.fats * multiplier,
      };
    },
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  );

  if (items.length === 0) return null;

  return (
    <div className="py-6 md:py-8 bg-background border-t border-b" data-testid="nutrition-bar">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <h3 className="text-sm font-semibold text-muted-foreground mb-4 text-center">
          Selected Items Nutrition
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          <div className="flex flex-col items-center">
            <p className="text-2xl md:text-3xl font-bold text-primary" data-testid="nutrition-calories">
              {Math.round(totalNutrition.calories)}
            </p>
            <p className="text-xs md:text-sm text-muted-foreground">Calories</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-2xl md:text-3xl font-bold text-primary" data-testid="nutrition-protein">
              {Math.round(totalNutrition.protein)}
            </p>
            <p className="text-xs md:text-sm text-muted-foreground">Protein (g)</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-2xl md:text-3xl font-bold text-primary" data-testid="nutrition-carbs">
              {Math.round(totalNutrition.carbs)}
            </p>
            <p className="text-xs md:text-sm text-muted-foreground">Carbs (g)</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-2xl md:text-3xl font-bold text-primary" data-testid="nutrition-fats">
              {Math.round(totalNutrition.fats)}
            </p>
            <p className="text-xs md:text-sm text-muted-foreground">Fats (g)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

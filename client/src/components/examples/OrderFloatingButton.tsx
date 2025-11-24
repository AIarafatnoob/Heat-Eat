import OrderFloatingButton from '../OrderFloatingButton';

export default function OrderFloatingButtonExample() {
  const mockItems = [
    {
      item: {
        id: '1',
        name: 'French Fry',
        priceRegular: 120,
        priceLarge: 180,
        calories: 320,
        protein: 4,
        carbs: 42,
        fats: 15,
      },
      size: 'regular' as const,
      quantity: 2,
    },
    {
      item: {
        id: '2',
        name: 'Chicken Nuggets',
        priceRegular: 200,
        priceLarge: 300,
        calories: 280,
        protein: 18,
        carbs: 16,
        fats: 14,
      },
      size: 'large' as const,
      quantity: 1,
    },
  ];

  return <OrderFloatingButton items={mockItems} />;
}

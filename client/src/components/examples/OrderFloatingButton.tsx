import OrderFloatingButton from '../OrderFloatingButton';

export default function OrderFloatingButtonExample() {
  const mockItems = [
    {
      item: {
        id: '1',
        name: 'French Fry',
        prices: [{ label: '500g', pieces: 500, price: 280 }, { label: '1kg', pieces: 1000, price: 480 }],
        calories: 320,
        protein: 4,
        carbs: 42,
        fats: 15,
      },
      pieces: 500,
      quantity: 2,
    },
    {
      item: {
        id: '2',
        name: 'Chicken Nuggets',
        prices: [{ label: '8 pcs', pieces: 8, price: 350 }, { label: '16 pcs', pieces: 16, price: 620 }],
        calories: 280,
        protein: 18,
        carbs: 16,
        fats: 14,
      },
      pieces: 16,
      quantity: 1,
    },
  ];

  return <OrderFloatingButton items={mockItems} />;
}

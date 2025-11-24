import OrderFloatingButton from '../OrderFloatingButton';

export default function OrderFloatingButtonExample() {
  const mockItems = [
    {
      item: {
        id: '1',
        name: 'French Fry',
        prices: [{ pieces: 1, price: 250 }, { pieces: 2, price: 450 }],
        calories: 320,
        protein: 4,
        carbs: 42,
        fats: 15,
      },
      pieces: 1,
      quantity: 2,
    },
    {
      item: {
        id: '2',
        name: 'Chicken Nuggets',
        prices: [{ pieces: 1, price: 280 }, { pieces: 2, price: 500 }],
        calories: 280,
        protein: 18,
        carbs: 16,
        fats: 14,
      },
      pieces: 2,
      quantity: 1,
    },
  ];

  return <OrderFloatingButton items={mockItems} />;
}

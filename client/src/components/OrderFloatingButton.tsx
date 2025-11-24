import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SiWhatsapp } from 'react-icons/si';
import { ShoppingCart, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

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

export default function OrderFloatingButton({ items, onClearCart, onRemoveItem }: { items: OrderItem[]; onClearCart?: () => void; onRemoveItem?: (index: number) => void }) {
  const [open, setOpen] = useState(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => {
    const priceOption = item.item.prices.find(p => p.pieces === item.pieces);
    const price = priceOption?.price || 0;
    return sum + price * item.quantity;
  }, 0);

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

  const generateWhatsAppMessage = () => {
    let message = '🍽️ *Heat & Eat Order*\n\n';
    message += '📋 *Order Details:*\n';

    items.forEach((orderItem, index) => {
      const priceOption = orderItem.item.prices.find(p => p.pieces === orderItem.pieces);
      const price = priceOption?.price || 0;
      message += `${index + 1}. ${orderItem.item.name} (${orderItem.pieces} pc${orderItem.pieces > 1 ? 's' : ''})\n`;
      message += `   Qty: ${orderItem.quantity} × ৳${price} = ৳${price * orderItem.quantity}\n\n`;
    });

    message += `💰 *Total: ৳${totalPrice}*`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/8801936135709?text=${encoded}`, '_blank');
    setOpen(false);
  };

  if (totalItems === 0) return null;

  return (
    <>
      <div className="hidden md:block fixed bottom-8 right-8 z-40">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="gap-2 relative shadow-xl bg-secondary hover:bg-secondary/90 rounded-full h-14 px-6"
              data-testid="button-view-order"
            >
              <ShoppingCart className="h-5 w-5" />
              View Order
              <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center">
                {totalItems}
              </Badge>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md" data-testid="dialog-order-summary">
            <DialogHeader>
              <DialogTitle>Your Order Summary</DialogTitle>
              <DialogDescription>Review your order before sending to WhatsApp</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="max-h-60 overflow-y-auto space-y-3">
                {items.map((orderItem, index) => {
                  const priceOption = orderItem.item.prices.find(p => p.pieces === orderItem.pieces);
                  const price = priceOption?.price || 0;
                  const label = priceOption?.label || `${orderItem.pieces}`;
                  return (
                    <div key={index} className="flex justify-between items-start pb-3 border-b gap-2" data-testid={`order-item-${index}`}>
                      <div className="flex-1">
                        <p className="font-medium">{orderItem.item.name}</p>
                        <p className="text-sm text-muted-foreground capitalize">
                          {label} • Qty: {orderItem.quantity}
                        </p>
                      </div>
                      <p className="font-semibold">৳{price * orderItem.quantity}</p>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 flex-shrink-0"
                        onClick={() => onRemoveItem?.(index)}
                        data-testid={`button-remove-item-${index}`}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-2">
                <Button
                  className="flex-1 text-xs bg-muted hover:bg-muted/80 text-foreground"
                  onClick={() => {
                    onClearCart?.();
                    setOpen(false);
                  }}
                  data-testid="button-clear-cart"
                >
                  Clear Cart
                </Button>
              </div>

              <div className="pt-3 border-t">
                <div className="flex justify-between items-center mb-4">
                  <p className="font-bold text-lg">Total</p>
                  <p className="font-bold text-lg text-primary" data-testid="text-total-price">৳{totalPrice}</p>
                </div>

                <div className="bg-muted rounded-lg p-4 space-y-2">
                  <p className="font-semibold text-sm mb-2">Nutritional Totals:</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Calories:</span>{' '}
                      <span className="font-medium">{Math.round(totalNutrition.calories)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Protein:</span>{' '}
                      <span className="font-medium">{Math.round(totalNutrition.protein)}g</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Carbs:</span>{' '}
                      <span className="font-medium">{Math.round(totalNutrition.carbs)}g</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Fats:</span>{' '}
                      <span className="font-medium">{Math.round(totalNutrition.fats)}g</span>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                className="w-full gap-2 bg-secondary hover:bg-secondary/90"
                onClick={generateWhatsAppMessage}
                data-testid="button-send-whatsapp"
              >
                <SiWhatsapp className="h-5 w-5" />
                Send Order via WhatsApp
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-4 bg-background border-t">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="w-full gap-2 relative bg-secondary hover:bg-secondary/90"
              data-testid="button-view-order-mobile"
            >
              <ShoppingCart className="h-5 w-5" />
              View Order ({totalItems})
              <span className="ml-auto font-bold">৳{totalPrice}</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md" data-testid="dialog-order-summary-mobile">
            <DialogHeader>
              <DialogTitle>Your Order Summary</DialogTitle>
              <DialogDescription>Review your order before sending to WhatsApp</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="max-h-60 overflow-y-auto space-y-3">
                {items.map((orderItem, index) => {
                  const priceOption = orderItem.item.prices.find(p => p.pieces === orderItem.pieces);
                  const price = priceOption?.price || 0;
                  const label = priceOption?.label || `${orderItem.pieces}`;
                  return (
                    <div key={index} className="flex justify-between items-start pb-3 border-b gap-2">
                      <div className="flex-1">
                        <p className="font-medium">{orderItem.item.name}</p>
                        <p className="text-sm text-muted-foreground capitalize">
                          {label} • Qty: {orderItem.quantity}
                        </p>
                      </div>
                      <p className="font-semibold">৳{price * orderItem.quantity}</p>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 flex-shrink-0"
                        onClick={() => onRemoveItem?.(index)}
                        data-testid={`button-remove-item-mobile-${index}`}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-2">
                <Button
                  className="flex-1 text-xs bg-muted hover:bg-muted/80 text-foreground"
                  onClick={() => {
                    onClearCart?.();
                    setOpen(false);
                  }}
                  data-testid="button-clear-cart-mobile"
                >
                  Clear Cart
                </Button>
              </div>

              <div className="pt-3 border-t">
                <div className="flex justify-between items-center mb-4">
                  <p className="font-bold text-lg">Total</p>
                  <p className="font-bold text-lg text-primary">৳{totalPrice}</p>
                </div>

                <div className="bg-muted rounded-lg p-4 space-y-2">
                  <p className="font-semibold text-sm mb-2">Nutritional Totals:</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Calories:</span>{' '}
                      <span className="font-medium">{Math.round(totalNutrition.calories)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Protein:</span>{' '}
                      <span className="font-medium">{Math.round(totalNutrition.protein)}g</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Carbs:</span>{' '}
                      <span className="font-medium">{Math.round(totalNutrition.carbs)}g</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Fats:</span>{' '}
                      <span className="font-medium">{Math.round(totalNutrition.fats)}g</span>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                className="w-full gap-2 bg-secondary hover:bg-secondary/90"
                onClick={generateWhatsAppMessage}
                data-testid="button-send-whatsapp-mobile"
              >
                <SiWhatsapp className="h-5 w-5" />
                Send Order via WhatsApp
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

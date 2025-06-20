import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { CartItem } from '@/store/cartStore';

interface OrderSummaryProps {
  items: CartItem[];
  total: number;
  currentStep: number;
  canFinishOrder: boolean | string;
  isProcessing: boolean;
  onFinishOrder: () => void;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  total,
  currentStep,
  canFinishOrder,
  isProcessing,
  onFinishOrder
}) => {
  return (
    <Card className="sticky top-4  w-[350px]">
      <CardHeader>
        <CardTitle>Resumo do Pedido</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 w-full">
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div className="flex-1">
                <p className="font-medium text-sm">{item.name}</p>
                <p className="text-xs text-gray-500">Qtd: {item.quantity}</p>
              </div>
              <p className="font-medium">R$ {(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Frete:</span>
            <span className="text-green-600">Grátis</span>
          </div>
          <Separator />
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>
        </div>

        {currentStep === 3 && canFinishOrder && (
          <Button 
            onClick={onFinishOrder}
            disabled={isProcessing}
            className="w-full"
            size="lg"
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processando...
              </div>
            ) : (
              'Finalizar Pedido'
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
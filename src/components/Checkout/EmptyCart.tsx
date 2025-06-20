import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Package } from 'lucide-react';

interface EmptyCartProps {
  onContinueShopping: () => void;
}

export const EmptyCart: React.FC<EmptyCartProps> = ({ onContinueShopping }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6 text-center">
          <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Carrinho vazio</h2>
          <p className="text-gray-600 mb-4">Adicione produtos ao carrinho para continuar</p>
          <Button onClick={onContinueShopping} className="w-full">
            Continuar comprando
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
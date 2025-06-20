import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard } from 'lucide-react';
import type { CheckoutStepProps } from '@/types/checkout';

interface PaymentStepProps extends CheckoutStepProps {
  formatCardNumber: (value: string) => string;
  formatExpiryDate: (value: string) => string;
}

export const PaymentStep: React.FC<PaymentStepProps> = ({ 
  formData, 
  onInputChange,
  formatCardNumber,
  formatExpiryDate
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">3</div>
          Dados do Cartão
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="cardNumber">Número do Cartão</Label>
          <Input
            id="cardNumber"
            value={formData.cardNumber}
            onChange={(e) => onInputChange('cardNumber', formatCardNumber(e.target.value))}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
          />
        </div>
        <div>
          <Label htmlFor="cardName">Nome no Cartão</Label>
          <Input
            id="cardName"
            value={formData.cardName}
            onChange={(e) => onInputChange('cardName', e.target.value.toUpperCase())}
            placeholder="NOME COMO NO CARTÃO"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="expiryDate">Validade</Label>
            <Input
              id="expiryDate"
              value={formData.expiryDate}
              onChange={(e) => onInputChange('expiryDate', formatExpiryDate(e.target.value))}
              placeholder="MM/AA"
              maxLength={5}
            />
          </div>
          <div>
            <Label htmlFor="cvv">CVV</Label>
            <Input
              id="cvv"
              value={formData.cvv}
              onChange={(e) => onInputChange('cvv', e.target.value.replace(/\D/g, ''))}
              placeholder="123"
              maxLength={3}
            />
          </div>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>⚠️ Pagamento Simulado:</strong> Este é um ambiente de teste. 
            Nenhum pagamento real será processado.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
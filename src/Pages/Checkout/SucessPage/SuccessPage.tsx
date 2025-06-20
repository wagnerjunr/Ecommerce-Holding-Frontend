import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Package, Home } from 'lucide-react';

interface OrderState {
  orderId: string;
  total: number;
  items: number;
}export interface CheckoutForm {
  // Dados pessoais
  fullName: string;
  email: string;
  phone: string;
  
  // Endereço
  zipCode: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  
  // Pagamento
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

export interface CheckoutStepProps {
  formData: CheckoutForm;
  onInputChange: (field: keyof CheckoutForm, value: string) => void;
  onNext?: () => void;
}

export const OrderSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state as OrderState;

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Pedido não encontrado</h2>
            <p className="text-gray-600 mb-4">Não foi possível encontrar os dados do pedido</p>
            <Button onClick={() => navigate('/')} className="w-full">
              Voltar ao início
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <Card className="text-center">
          <CardHeader className="pb-4">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-600">Pedido Realizado com Sucesso!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-4">Detalhes do Pedido</h3>
              <div className="space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-gray-600">Número do pedido:</span>
                  <span className="font-mono font-semibold">{orderData.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total de itens:</span>
                  <span className="font-semibold">{orderData.items}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Valor total:</span>
                  <span className="font-semibold text-green-600">R$ {orderData.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>📧 Confirmação enviada:</strong> Você receberá um e-mail com os detalhes do pedido e informações de acompanhamento.
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>🚚 Prazo de entrega:</strong> Seu pedido será entregue em até 7 dias úteis.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                onClick={() => navigate('/')}
                variant="outline"
                className="flex-1"
              >
                <Home className="w-4 h-4 mr-2" />
                Continuar Comprando
              </Button>
              <Button 
                onClick={() => navigate('/orders')}
                className="flex-1"
              >
                <Package className="w-4 h-4 mr-2" />
                Meus Pedidos
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
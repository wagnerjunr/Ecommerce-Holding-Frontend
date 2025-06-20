import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ShoppingBag, Calendar, MapPin, Package, RotateCcw } from 'lucide-react';
import { useGetAllOrdersByUserId } from '@/hooks/Order/UseGetOrderByUserId';
import useUserStore from '@/store/userStore';
import useCartStore from '@/store/cartStore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import type { Order, OrderItem } from '@/types';

export const OrderHistoryPage = () => {
  const { isAuthenticated } = useUserStore();
  const { addToCart } = useCartStore();
  const navigate = useNavigate();
  const {user} = useUserStore()
  const { data: orders, isLoading, error } = useGetAllOrdersByUserId();

  const handleReorder = (order: Order) => {
    if (!order.items || order.items.length === 0) {
      toast.error('Não é possível refazer este pedido', {
        description: 'Os itens do pedido não estão disponíveis.'
      });
      return;
    }

    order.items.forEach((item: OrderItem) => {
      const cartItem = {
        id: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        externalId: item.productId,
        provider: 'unknown', 
        available: true,
        image: '',
        description: '',
        material: ''
      };
      
      addToCart(cartItem);
    });

    toast.success('Itens adicionados ao carrinho!', {
      description: `R${order.items.length} R${order.items.length === 1 ? 'item adicionado' : 'itens adicionados'} ao carrinho.`,
      action: {
        label: 'Ver Carrinho',
        onClick: () => {
          navigate('/checkout');
        }
      }
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
      case 'confirmado':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
      case 'enviado':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
      case 'entregue':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
      case 'cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'Pendente';
      case 'confirmed': return 'Confirmado';
      case 'shipped': return 'Enviado';
      case 'delivered': return 'Entregue';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Histórico de Pedidos</h1>
          <p className="text-gray-600 mb-8">Você precisa estar logado para ver seu histórico de pedidos.</p>
          <Button onClick={() => navigate('/login')}>Fazer Login</Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Histórico de Pedidos</h1>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Histórico de Pedidos</h1>
          <p className="text-red-600 mb-8">Erro ao carregar histórico de pedidos.</p>
          <Button onClick={() => window.location.reload()}>Tentar Novamente</Button>
        </div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-screen py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Histórico de Pedidos</h1>
          <div className="flex flex-col items-center justify-center py-12">
            <ShoppingBag className="h-16 w-16 text-gray-400 mb-4" />
            <p className="text-gray-600 mb-8">Você ainda não fez nenhum pedido.</p>
            <Button onClick={() => navigate('/')}>Começar a Comprar</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 mt-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Histórico de Pedidos</h1>
          <p className="text-gray-600 mt-2">
            {orders.length} {orders.length === 1 ? 'pedido encontrado' : 'pedidos encontrados'}
          </p>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <CardHeader className="bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Package className="h-5 w-5 text-gray-600" />
                    <div>
                      <CardTitle className="text-lg">Pedido #{order.id.slice(-8).toUpperCase()}</CardTitle>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(order.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusText(order.status)}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Informações do Cliente</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><strong>Nome:</strong> {user?.name}</p>
                      <p><strong>Email:</strong> {user?.email}</p>
                    </div>
                  </div>

                  {order.address && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        Endereço de Entrega
                      </h4>
                      <div className="text-sm text-gray-600">
                        <p>{order.address.street}, {order.address.number}</p>
                        {order.address.complement && <p>{order.address.complement}</p>}
                        <p>{order.address.neighborhood} - {order.address.city}/{order.address.state}</p>
                        <p>CEP: {order.address.zipCode}</p>
                      </div>
                    </div>
                  )}

                  <Separator />

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Itens do Pedido</h4>
                    <div className="space-y-3">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-600">Quantidade: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              R$ {(item.price * item.quantity)}
                            </p>
                            <p className="text-sm text-gray-600">
                              R$ {(item.price)} cada
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center pt-2 gap-4">
                    <div className="text-lg font-semibold">
                      Total: R$ {order.total}
                    </div>
                    <Button 
                      onClick={() => handleReorder(order)}
                      variant="outline"
                      className="flex items-center space-x-2"
                    >
                      <RotateCcw className="h-4 w-4" />
                      <span>Pedir Novamente</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
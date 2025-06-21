import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { MapPin, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { useGetUserAddresses } from '@/hooks/Address/useGetUserAddresses';
import { CreateAddressForm } from './CreateAddressForm';
import type { CheckoutStepProps } from '@/types/checkout';
import type { Address } from '@/types';

interface AddressStepProps extends CheckoutStepProps {
  onAddressSelect?: (addressId: string) => void;
}

export const AddressStep: React.FC<AddressStepProps> = ({ 
  onInputChange, 
  onNext,
  onAddressSelect
}) => {
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  const { data: addressesData, isLoading, refetch } = useGetUserAddresses();
  
  const addresses = addressesData || [];

  useEffect(() => {
    console.log('addresses', addresses);
    if (addresses.length > 0 && !selectedAddressId) {
      setSelectedAddressId(addresses[0].id);
      updateFormWithAddress(addresses[0]);
      onAddressSelect?.(addresses[0].id);
    }
  }, [addresses, selectedAddressId, onAddressSelect]);

  const updateFormWithAddress = (address: Address) => {
    onInputChange('street', address.street);
    onInputChange('city', address.city);
    onInputChange('state', address.state);
    onInputChange('neighborhood', address.neighborhood);
    onInputChange('number', address.number);
    onInputChange('complement', address.complement || '');
    onInputChange('zipCode', address.zipCode);
  };

  const handleAddressSelect = (addressId: string) => {
    setSelectedAddressId(addressId);
    const selectedAddress = addresses.find(addr => addr.id === addressId);
    if (selectedAddress) {
      updateFormWithAddress(selectedAddress);
      onAddressSelect?.(addressId);
    }
  };

  const handleAddressCreated = (newAddress: Address) => {
    setShowCreateForm(false);
    refetch(); 
    setSelectedAddressId(newAddress.id);
    updateFormWithAddress(newAddress);
  };

  const handleNext = () => {
    if (!selectedAddressId && addresses.length > 0) {
      toast.error('Selecione um endereço para continuar');
      return;
    }
    
    if (onNext) {
      onNext();
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p>Carregando endereços...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (showCreateForm) {
    return (
      <CreateAddressForm
        onAddressCreated={handleAddressCreated}
        onCancel={() => setShowCreateForm(false)}
        setSelectedAddressId={setSelectedAddressId}
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">2</div>
          Endereço de Entrega
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {addresses.length > 0 ? (
          <>
            <div className="space-y-3">
              <Label className="text-base font-medium">Selecione um endereço:</Label>
              <RadioGroup value={selectedAddressId} onValueChange={handleAddressSelect}>
                {addresses.map((address) => (
                  <div key={address.id} className="flex items-start space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value={address.id} id={address.id} className="mt-1" />
                    <Label htmlFor={address.id} className="flex-1 cursor-pointer">
                      <div className="space-y-1">
                        <div className="font-medium">
                          {address.street}, {address.number}
                          {address.complement && ` - ${address.complement}`}
                        </div>
                        <div className="text-sm text-gray-600">
                          {address.neighborhood}, {address.city} - {address.state}
                        </div>
                        <div className="text-sm text-gray-500">
                          CEP: {address.zipCode}
                        </div>
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            <div className="border-t pt-4">
              <Button
                variant="outline"
                onClick={() => setShowCreateForm(true)}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Novo Endereço
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-6">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum endereço cadastrado
            </h3>
            <p className="text-gray-600 mb-4">
              Adicione um endereço para continuar com o pedido
            </p>
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Endereço
            </Button>
          </div>
        )}
        
        {addresses.length > 0 && selectedAddressId && (
          <Button onClick={handleNext} className="w-full">
            Continuar para Pagamento
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, X } from 'lucide-react';
import { toast } from 'sonner';
import InputMask from '@mona-health/react-input-mask';
import { useCreateAddress } from '@/hooks/Address/useCreateAddress';
import type { Address } from '@/types';

interface CreateAddressFormProps {
  onAddressCreated: (address: Address) => void;
  onCancel: () => void;
}

interface AddressFormData {
  street: string;
  city: string;
  state: string;
  neighborhood: string;
  number: string;
  complement: string;
  zipCode: string;
}

export const CreateAddressForm: React.FC<CreateAddressFormProps> = ({
  onAddressCreated,
  onCancel
}) => {
  const [formData, setFormData] = useState<AddressFormData>({
    street: '',
    city: '',
    state: '',
    neighborhood: '',
    number: '',
    complement: '',
    zipCode: ''
  });

  const createAddress = useCreateAddress();

  const handleInputChange = (field: keyof AddressFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const errors: string[] = [];
    
    const cepRegex = /^\d{5}-\d{3}$/;
    if (!formData.zipCode) {
      errors.push('CEP é obrigatório');
    } else if (!cepRegex.test(formData.zipCode)) {
      errors.push('CEP deve ter o formato 00000-000');
    }
    
    if (!formData.street || formData.street.trim().length < 3) {
      errors.push('Rua deve ter pelo menos 3 caracteres');
    }
    
    const numberRegex = /^\d+$/;
    if (!formData.number) {
      errors.push('Número é obrigatório');
    } else if (!numberRegex.test(formData.number)) {
      errors.push('Número deve conter apenas dígitos');
    }
    
    if (!formData.neighborhood || formData.neighborhood.trim().length < 2) {
      errors.push('Bairro deve ter pelo menos 2 caracteres');
    }
    
    if (!formData.city || formData.city.trim().length < 2) {
      errors.push('Cidade deve ter pelo menos 2 caracteres');
    }
    
    const stateRegex = /^[A-Z]{2}$/;
    if (!formData.state) {
      errors.push('Estado é obrigatório');
    } else if (!stateRegex.test(formData.state.toUpperCase())) {
      errors.push('Estado deve ter exatamente 2 letras (ex: SP, RJ)');
    }
    
    return errors;
  };

  const handleSubmit = async () => {
    const errors = validateForm();
    
    if (errors.length > 0) {
      errors.forEach(error => {
        toast.error(error);
      });
      return;
    }

    try {
      const result = await createAddress.mutateAsync({ data: formData });
      onAddressCreated(result);
      toast.success('Endereço criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar endereço:', error);
    }
  };

  const isFormValid = validateForm().length === 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Novo Endereço
          </div>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="w-4 h-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="zipCode">CEP</Label>
            <InputMask
              mask="99999-999"
              placeholder="00000-000"
              value={formData.zipCode}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onChange={(e: any) => handleInputChange('zipCode', e.target.value)}
            >
              <Input id="zipCode" type="text" placeholder="00000-000" />
            </InputMask>
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="street">Rua</Label>
            <Input
              id="street"
              value={formData.street}
              onChange={(e) => handleInputChange('street', e.target.value)}
              placeholder="Nome da rua"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="number">Número</Label>
            <InputMask
              mask="999999"
              placeholder="123"
              value={formData.number}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onChange={(e: any) => handleInputChange('number', e.target.value)}
            >
              <Input id="number" type="text" placeholder="123" />
            </InputMask>
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="complement">Complemento</Label>
            <Input
              id="complement"
              value={formData.complement}
              onChange={(e) => handleInputChange('complement', e.target.value)}
              placeholder="Apto, bloco, etc. (opcional)"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="neighborhood">Bairro</Label>
            <Input
              id="neighborhood"
              value={formData.neighborhood}
              onChange={(e) => handleInputChange('neighborhood', e.target.value)}
              placeholder="Bairro"
            />
          </div>
          <div>
            <Label htmlFor="city">Cidade</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              placeholder="Cidade"
            />
          </div>
          <div>
            <Label htmlFor="state">Estado</Label>
            <InputMask
              mask="aa"
              placeholder="SP"
              value={formData.state}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onChange={(e: any) => handleInputChange('state', e.target.value.toUpperCase())}
            >
              <Input
                id="state"
                type="text"
                placeholder="SP"
                style={{ textTransform: 'uppercase' }}
              />
            </InputMask>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={handleSubmit}
            className={`flex-1 ${!isFormValid ? 'opacity-50' : ''}`}
            disabled={!isFormValid || createAddress.isPending}
          >
            {createAddress.isPending ? 'Criando...' : 'Criar Endereço'}
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
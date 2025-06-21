import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import type { CheckoutStepProps } from "@/types/checkout";
import InputMask from "@mona-health/react-input-mask";
import useUserStore from "@/store/userStore";

export const PersonalDataStep: React.FC<CheckoutStepProps> = ({
  formData,
  onInputChange,
  onNext,
}) => {
  const {user} = useUserStore()
  const validateStep = () => {
    const errors: string[] = [];
    
    const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    const phoneDigitsOnly = formData.phone.replace(/\D/g, '');
    if (!formData.phone) {
      errors.push('Telefone é obrigatório');
    } else if (phoneDigitsOnly.length !== 11) {
      errors.push('Telefone deve ter 11 dígitos (DDD + número)');
    } else if (!phoneRegex.test(formData.phone)) {
      errors.push('Telefone deve estar no formato (11) 99999-9999');
    }
    
    return errors;
  };

  const handleNext = () => {
    const errors = validateStep();
    
    if (errors.length > 0) {
      errors.forEach(error => {
        toast.error(error);
      });
      return;
    }
    
    if (onNext) {
      onNext();
    }
  };

  const isFormValid = validateStep().length === 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">
            1
          </div>
          Dados Pessoais
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="fullName">Nome Completo</Label>
          <Input
            id="fullName"
            type="text"
            value={user?.name}
            disabled
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              value={user?.email}
              disabled
            />
          </div>
          <div>
            <Label htmlFor="phone">Telefone</Label>
            <InputMask
              mask="(99) 99999-9999"
              placeholder="(11) 99999-9999"
              value={formData.phone}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onChange={(e: any) => onInputChange("phone", e.target.value)}
            >
              <Input 
                id="phone" 
                type="text" 
                placeholder="(11) 99999-9999" 
              />
            </InputMask>
          </div>
        </div>
        <Button 
          onClick={handleNext}
          className={`w-full ${!isFormValid ? 'opacity-50' : ''}`}
          disabled={!isFormValid}
        >
          Continuar para Endereço
        </Button>
      </CardContent>
    </Card>
  );
};

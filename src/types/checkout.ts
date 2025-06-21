export interface CheckoutForm {
  fullName: string;
  email: string;
  phone: string;
  
  zipCode: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  
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
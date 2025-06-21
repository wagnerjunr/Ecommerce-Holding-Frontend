import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useCartStore from "@/store/cartStore";
import { useCreateOrder } from "@/hooks/Order/useCreateOrder";
import type { CheckoutForm } from "@/types/checkout";
import type { OrderItem } from "@/types";

export const useCheckout = () => {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");

  const { mutate: createOrder } = useCreateOrder();

  const [formData, setFormData] = useState<CheckoutForm>({
    fullName: "",
    email: "",
    phone: "",
    zipCode: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const handleInputChange = (field: keyof CheckoutForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const setAddressId = (addressId: string) => {
    setSelectedAddressId(addressId);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const validateStep3 = () => {
    return (
      formData.cardNumber.replace(/\s/g, "").length === 16 &&
      formData.cardName &&
      formData.expiryDate.length === 5 &&
      formData.cvv.length === 3
    );
  };

  const simulatePayment = async (): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return Math.random() > 0.05;
  };

  const handleFinishOrder = async () => {
    if (!validateStep3()) {
      toast.error("Por favor, preencha todos os dados do cartão");
      return;
    }

    if (!selectedAddressId) {
      toast.error("Por favor, selecione um endereço de entrega");
      return;
    }

    setIsProcessing(true);

    try {
      const paymentSuccess = await simulatePayment();

      if (paymentSuccess) {
        const orderItems: OrderItem[] = items.map((item) => ({
          productId: item.id,
          name: item.name,
          price: Number(item.price),
          quantity: item.quantity,
          available: item.available,
          discountValue: item.discountValue ? Number(item.discountValue) : undefined,
          description: item.description,
          material: item.material,
          provider: item.provider,
          image: item.image,
        }));

        createOrder(
          {
            data: {
              addressId: selectedAddressId,
              total: total,
              items: orderItems,
            },
          },
          {
            onSuccess: (response) => {
              const orderId = response.id;

              clearCart();
              navigate("/order-success", {
                state: {
                  orderId,
                  total,
                  items: items.length,
                  orderData: response,
                },
              });
            },
            onError: (error) => {
              console.error("Erro ao criar pedido:", error);
              toast.error("Erro ao processar pedido. Tente novamente.");
            },
          }
        );
      } else {
        toast.error("Falha no pagamento. Tente novamente.");
      }
    } catch (error) {
      toast.error("Erro ao processar pedido. Tente novamente.");
      console.log(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    items,
    total,
    isProcessing,
    currentStep,
    formData,
    selectedAddressId,
    setCurrentStep,
    handleInputChange,
    setAddressId,
    formatCardNumber,
    formatExpiryDate,
    validateStep3,
    handleFinishOrder,
    navigate,
  };
};

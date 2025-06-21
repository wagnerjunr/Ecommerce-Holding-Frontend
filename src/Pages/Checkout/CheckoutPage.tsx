import { useEffect } from "react";
import { CheckoutProgress } from "@/components/Checkout/CheckoutProgress";
import { PersonalDataStep } from "@/components/Checkout/PersonalDataStep";
import { AddressStep } from "@/components/Checkout/AddressStep";
import { PaymentStep } from "@/components/Checkout/PaymentStep";
import { OrderSummary } from "@/components/Checkout/OrderSummary";
import { EmptyCart } from "@/components/Checkout/EmptyCart";
import { useCheckout } from "@/lib/useCheckout";

export const CheckoutPage = () => {
  const {
    items,
    total,
    isProcessing,
    currentStep,
    formData,
    setCurrentStep,
    handleInputChange,
    setAddressId,
    formatCardNumber,
    formatExpiryDate,
    validateStep3,
    handleFinishOrder,
    navigate,
  } = useCheckout();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (items.length === 0) {
    return <EmptyCart onContinueShopping={() => navigate("/")} />;
  }

  return (
    <div className="min-h-screen py-8 mt-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Finalizar Compra</h1>
          <CheckoutProgress
            currentStep={currentStep}
            totalSteps={3}
            onStepClick={(step) => setCurrentStep(step)}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {currentStep === 1 && (
              <PersonalDataStep
                formData={formData}
                onInputChange={handleInputChange}
                onNext={() => setCurrentStep(2)}
              />
            )}

            {currentStep === 2 && (
              <AddressStep
                formData={formData}
                onInputChange={handleInputChange}
                onNext={() => setCurrentStep(3)}
                onAddressSelect={setAddressId}
              />
            )}

            {currentStep === 3 && (
              <PaymentStep
                formData={formData}
                onInputChange={handleInputChange}
                formatCardNumber={formatCardNumber}
                formatExpiryDate={formatExpiryDate}
              />
            )}
          </div>

          <div>
            <OrderSummary
              items={items}
              total={total}
              currentStep={currentStep}
              canFinishOrder={validateStep3()}
              isProcessing={isProcessing}
              onFinishOrder={handleFinishOrder}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

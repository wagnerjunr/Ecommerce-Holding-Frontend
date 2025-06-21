import React from 'react';

interface CheckoutProgressProps {
  currentStep: number;
  totalSteps: number;
  onStepClick?: (step: number) => void;
}

export const CheckoutProgress: React.FC<CheckoutProgressProps> = ({ 
  currentStep, 
  totalSteps = 3,
  onStepClick
}) => {
  const handleStepClick = (step: number) => {
    if (step <= currentStep && onStepClick) {
      onStepClick(step);
    }
  };

  return (
    <div className="flex items-center mt-4 space-x-4">
      {Array.from({ length: totalSteps }, (_, index) => {
        const step = index + 1;
        const isClickable = step <= currentStep;
        const isCompleted = currentStep > step;
        const isCurrent = currentStep === step;
        
        return (
          <div key={step} className="flex items-center">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                isCompleted 
                  ? 'bg-green-600 text-white' 
                  : isCurrent 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
              } ${
                isClickable && onStepClick 
                  ? 'cursor-pointer hover:scale-110 hover:shadow-md' 
                  : 'cursor-default'
              }`}
              onClick={() => handleStepClick(step)}
              title={isClickable ? `Ir para step ${step}` : `Step ${step}`}
            >
              {isCompleted ? '✓' : step}
            </div>
            {step < totalSteps && (
              <div className={`w-12 h-0.5 mx-2 ${
                currentStep > step ? 'bg-green-600' : 'bg-gray-200'
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );
};
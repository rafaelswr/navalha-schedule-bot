
import { Check } from "lucide-react";

type MultiStepProgressProps = {
  currentStep: number;
  steps: string[];
};

export const MultiStepProgress = ({
  currentStep,
  steps,
}: MultiStepProgressProps) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                index < currentStep
                  ? "bg-navalha-gold border-navalha-gold text-white"
                  : index === currentStep
                  ? "border-navalha-gold bg-white text-navalha-gold"
                  : "border-gray-300 text-gray-300"
              }`}
            >
              {index < currentStep ? (
                <Check size={20} />
              ) : (
                <span className="text-sm font-medium">{index + 1}</span>
              )}
            </div>
            <span
              className={`mt-2 text-xs text-center ${
                index <= currentStep ? "font-medium" : "text-gray-500"
              }`}
            >
              {step}
            </span>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-2">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`flex-1 h-1 ${
              index < steps.length - 1
                ? index < currentStep - 1
                  ? "bg-primary"
                  : "bg-muted"
                : "bg-transparent"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

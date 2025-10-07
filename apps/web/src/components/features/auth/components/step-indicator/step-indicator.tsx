import { AuthStep } from '../../auth.types';

interface StepIndicatorProps {
  currentStep: AuthStep;
  isNewUser?: boolean;
}

export function StepIndicator({ currentStep, isNewUser }: StepIndicatorProps) {
  const steps = isNewUser
    ? ['login', 'verification', 'signup', 'profile-selection']
    : ['login', 'verification', 'profile-selection'];

  const currentIndex = steps.indexOf(currentStep);

  return (
    <div className="flex justify-center mb-8">
      <div className="flex items-center gap-2">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center">
            <div
              className={`
                w-2 h-2 rounded-full transition-all duration-300
                ${
                  index <= currentIndex
                    ? 'bg-primary scale-125'
                    : 'bg-border scale-100'
                }
              `}
            />
            {index < steps.length - 1 && (
              <div
                className={`
                  w-8 h-0.5 mx-1 transition-all duration-300
                  ${index < currentIndex ? 'bg-primary' : 'bg-border'}
                `}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

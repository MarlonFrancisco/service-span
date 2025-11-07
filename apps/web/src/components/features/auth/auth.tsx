'use client';
import { useAuthStore } from '@/store/auth/auth.store';
import { Dialog, DialogContent } from '@repo/ui';
import { useState } from 'react';
import { AuthStep } from './auth.types';
import { LoginStep } from './components/login-step';
import { ProfileSelectionStep } from './components/profile-selection';
import { SignupStep } from './components/signup-step';
import { StepIndicator } from './components/step-indicator';
import { VerificationStep } from './components/verification-step';

export function AuthModal() {
  const [currentStep, setCurrentStep] = useState<AuthStep>('login');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [userData, setUserData] = useState({
    email: '',
    phone: '',
    name: '',
    isNewUser: false,
  });
  const isOpen = useAuthStore((state) => state.isOpen);
  const closeAuthAction = useAuthStore((state) => state.closeAuthAction);

  const isProfileSelection = currentStep === 'profile-selection';

  const handleStepChange = async (step: AuthStep, data?: any) => {
    setIsTransitioning(true);

    await new Promise((resolve) => setTimeout(resolve, 150));

    if (data) {
      setUserData((prev) => ({ ...prev, ...data }));
    }
    setCurrentStep(step);

    setTimeout(() => setIsTransitioning(false), 100);
  };

  const handleClose = () => {
    setCurrentStep('login');
    closeAuthAction();
    setUserData({ email: '', phone: '', name: '', isNewUser: false });
  };

  const renderStep = () => {
    const stepComponent = (() => {
      switch (currentStep) {
        case 'login':
          return <LoginStep onNext={handleStepChange} onClose={handleClose} />;
        case 'verification':
          return (
            <VerificationStep
              contact={userData.email || userData.phone}
              onNext={handleStepChange}
              onBack={() => handleStepChange('login')}
            />
          );
        case 'signup':
          return (
            <SignupStep
              userData={userData}
              onNext={handleStepChange}
              onBack={() => handleStepChange('verification')}
            />
          );
        case 'profile-selection':
          return <ProfileSelectionStep />;
        default:
          return null;
      }
    })();

    return (
      <div className="auth-step-enter">
        {/* Progress Indicator - subtle and only for multi-step flows */}
        {currentStep !== 'login' && (
          <div className="px-8 pt-6">
            <StepIndicator currentStep={currentStep} />
          </div>
        )}
        {stepComponent}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className={`max-w-lg p-0 border-0 shadow-xl bg-transparent ${isProfileSelection ? 'max-w-5xl!' : 'max-w-lg'}`}
      >
        <div className="bg-card rounded-3xl overflow-hidden border border-border/20 shadow-2xl backdrop-blur-xl">
          <div
            className={`transition-all duration-300 ${isTransitioning ? 'opacity-50 scale-[0.98]' : 'opacity-100 scale-100'}`}
          >
            {renderStep()}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

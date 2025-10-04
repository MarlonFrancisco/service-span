import { useState } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { LoginStep } from "./auth/LoginStep";
import { VerificationStep } from "./auth/VerificationStep";
import { SignupStep } from "./auth/SignupStep";
import { ProfileSelectionStep } from "./auth/ProfileSelectionStep";

export type AuthStep = 'login' | 'verification' | 'signup' | 'profile-selection';
export type UserType = 'client' | 'provider';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (userType: UserType) => void;
}

export function AuthModal({ isOpen, onClose, onLoginSuccess }: AuthModalProps) {
  const [currentStep, setCurrentStep] = useState<AuthStep>('login');
  const [userData, setUserData] = useState({
    email: '',
    phone: '',
    name: '',
    isNewUser: false
  });

  const handleStepChange = (step: AuthStep, data?: any) => {
    if (data) {
      setUserData(prev => ({ ...prev, ...data }));
    }
    setCurrentStep(step);
  };

  const handleClose = () => {
    setCurrentStep('login');
    setUserData({ email: '', phone: '', name: '', isNewUser: false });
    onClose();
  };

  const handleAuthComplete = (userType: UserType) => {
    onLoginSuccess(userType);
    handleClose();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'login':
        return (
          <LoginStep 
            onNext={handleStepChange}
            onClose={handleClose}
          />
        );
      case 'verification':
        return (
          <VerificationStep 
            contact={userData.email || userData.phone}
            onNext={handleStepChange}
            onBack={() => setCurrentStep('login')}
          />
        );
      case 'signup':
        return (
          <SignupStep 
            userData={userData}
            onNext={handleStepChange}
            onBack={() => setCurrentStep('verification')}
          />
        );
      case 'profile-selection':
        return (
          <ProfileSelectionStep 
            onSelect={handleAuthComplete}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md p-0 border-0 shadow-2xl">
        {renderStep()}
      </DialogContent>
    </Dialog>
  );
}
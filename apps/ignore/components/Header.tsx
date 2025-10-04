import { useState } from "react";
import { UserMenuSimple } from "./UserMenuSimple";
import { AuthModal, UserType } from "./AuthModal";

interface HeaderProps {
  onGoToDashboard?: () => void;
  onGoToProfile?: () => void;
}

export function Header({ onGoToDashboard, onGoToProfile }: HeaderProps) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<UserType | null>(null);

  const handleLoginSuccess = (selectedUserType: UserType) => {
    setUserType(selectedUserType);
    setIsLoggedIn(true);
    
    // Se for prestador, redirecionar para dashboard
    if (selectedUserType === 'provider' && onGoToDashboard) {
      onGoToDashboard();
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType(null);
  };

  return (
    <>
      <header className="w-full px-6 py-4 flex justify-between items-center relative z-20">
        <div className="flex items-center">
          <h1 className="text-gray-900 tracking-wide">ServiceSnap</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <UserMenuSimple 
            isLoggedIn={isLoggedIn}
            userType={userType}
            onLogin={() => setIsAuthModalOpen(true)}
            onLogout={handleLogout}
            onGoToDashboard={onGoToDashboard}
            onGoToProfile={onGoToProfile}
          />
        </div>
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}
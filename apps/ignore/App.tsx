import { useState } from "react";
import { NewHomepage } from "./components/NewHomepage";
import { SearchResultsNew } from "./components/SearchResultsNew";
import { NewBookingFlow } from "./components/NewBookingFlow";
import { AdminDashboard } from "./components/AdminDashboard";
import { ClientProfile } from "./components/ClientProfile";
import { TermsPage } from "./components/pages/TermsPage";
import { PrivacyPage } from "./components/pages/PrivacyPage";
import { HelpPage } from "./components/pages/HelpPage";
import { ContactPage } from "./components/pages/ContactPage";

interface Service {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  location: string;
  price: string;
  imageUrl: string;
  images?: string[];
  description: string;
  phone: string;
  address: string;
}

export default function App() {
  const [currentView, setCurrentView] = useState<
    | "home"
    | "results"
    | "booking"
    | "dashboard"
    | "profile"
    | "terms"
    | "privacy"
    | "help"
    | "contact"
  >("home");
  const [selectedService, setSelectedService] =
    useState<Service | null>(null);

  const handleSearch = () => {
    setCurrentView("results");
  };

  const handleBackToHome = () => {
    setCurrentView("home");
    setSelectedService(null);
  };

  const handleStartBooking = (service: Service) => {
    setSelectedService(service);
    setCurrentView("booking");
  };

  const handleBackToResults = () => {
    setCurrentView("results");
  };

  const handleGoToDashboard = () => {
    setCurrentView("dashboard");
  };

  const handleGoToProfile = () => {
    setCurrentView("profile");
  };

  const handleNavigateToPage = (
    page: "terms" | "privacy" | "help" | "contact",
  ) => {
    setCurrentView(page);
  };

  if (currentView === "dashboard") {
    return <AdminDashboard onBack={handleBackToHome} />;
  }

  if (currentView === "profile") {
    return <ClientProfile onBack={handleBackToHome} />;
  }

  if (currentView === "terms") {
    return <TermsPage onBack={handleBackToHome} />;
  }

  if (currentView === "privacy") {
    return <PrivacyPage onBack={handleBackToHome} />;
  }

  if (currentView === "help") {
    return <HelpPage onBack={handleBackToHome} />;
  }

  if (currentView === "contact") {
    return <ContactPage onBack={handleBackToHome} />;
  }

  if (currentView === "booking" && selectedService) {
    return (
      <NewBookingFlow
        businessName={selectedService.name}
        businessAddress={selectedService.address}
        businessPhone={selectedService.phone}
        businessImages={selectedService.images}
        businessImageUrl={selectedService.imageUrl}
        businessRating={selectedService.rating}
        businessReviewCount={selectedService.reviewCount}
        businessCategory={selectedService.category}
        businessDescription={selectedService.description}
        onBack={handleBackToResults}
      />
    );
  }

  if (currentView === "results") {
    return (
      <SearchResultsNew
        onBackToHome={handleBackToHome}
        onStartBooking={handleStartBooking}
        onGoToDashboard={handleGoToDashboard}
        onGoToProfile={handleGoToProfile}
        onNavigate={handleNavigateToPage}
      />
    );
  }

  return (
    <NewHomepage
      onGoToDashboard={handleGoToDashboard}
      onGoToProfile={handleGoToProfile}
      onSearch={handleSearch}
      onNavigate={handleNavigateToPage}
    />
  );
}
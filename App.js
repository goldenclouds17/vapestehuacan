import React, { useState } from 'react';
import LayoutHeader from './components/LayoutHeader';
import VapeList from './components/VapeList';
import FlavorSelection from './components/FlavorSelection';
import DeliveryForm from './components/DeliveryForm';
import PaymentOptions from './components/PaymentOptions';
import ConfirmationScreen from './components/ConfirmationScreen';

const App = () => {
  const [currentPage, setCurrentPage] = useState('list'); // 'list', 'flavors', 'delivery', 'payment', 'confirmation'
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedVape, setSelectedVape] = useState(null); // This will now include model and selectedFlavor
  const [deliveryDetails, setDeliveryDetails] = useState(null);

  const handleSelectModel = (model) => {
    setSelectedModel(model);
    setCurrentPage('flavors');
  };

  const handleSelectFlavor = (vapeWithFlavor) => {
    setSelectedVape(vapeWithFlavor);
    setCurrentPage('delivery');
  };

  const handleConfirmDelivery = (details) => {
    setDeliveryDetails(details);
    setCurrentPage('payment');
  };

  const handleConfirmPayment = () => {
    setCurrentPage('confirmation');
  };

  const handleStartNewOrder = () => {
    setCurrentPage('list');
    setSelectedModel(null);
    setSelectedVape(null);
    setDeliveryDetails(null);
  };

  const handleNavigate = (page) => {
    if (page === 'back') {
      if (currentPage === 'flavors') setCurrentPage('list');
      if (currentPage === 'delivery') setCurrentPage('flavors');
      if (currentPage === 'payment') setCurrentPage('delivery');
    } else {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <LayoutHeader onNavigate={handleNavigate} currentPage={currentPage} />
      <main className="container mx-auto py-8">
        {currentPage === 'list' && <VapeList onSelectModel={handleSelectModel} />}
        {currentPage === 'flavors' && selectedModel && (
          <FlavorSelection model={selectedModel} onSelectFlavor={handleSelectFlavor} />
        )}
        {currentPage === 'delivery' && selectedVape && (
          <DeliveryForm onConfirmDelivery={handleConfirmDelivery} />
        )}
        {currentPage === 'payment' && selectedVape && deliveryDetails && (
          <PaymentOptions
            selectedVape={selectedVape}
            deliveryDetails={deliveryDetails}
            onConfirmPayment={handleConfirmPayment}
          />
        )}
        {currentPage === 'confirmation' && (
          <ConfirmationScreen onStartNewOrder={handleStartNewOrder} />
        )}
      </main>
    </div>
  );
};

export default App;
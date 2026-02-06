
import React, { useState, useEffect } from 'react';
import { AppConfig, AppView } from './types';
import BookingFlow from './components/BookingFlow';
import AdminPanel from './components/AdminPanel';
import { Settings, Utensils } from 'lucide-react';

const DEFAULT_CONFIG: AppConfig = {
  restaurantName: 'The Golden Bistro',
  primaryColor: '#ec4913',
};

const App: React.FC = () => {
  const [config, setConfig] = useState<AppConfig>(() => {
    const saved = localStorage.getItem('app-config');
    return saved ? JSON.parse(saved) : DEFAULT_CONFIG;
  });

  const [view, setView] = useState<AppView>('booking');

  useEffect(() => {
    localStorage.setItem('app-config', JSON.stringify(config));
    // Update CSS variables for dynamic coloring
    document.documentElement.style.setProperty('--primary-color', config.primaryColor);
    document.documentElement.style.setProperty('--primary-color-muted', `${config.primaryColor}33`); // 20% opacity
  }, [config]);

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-white shadow-xl relative overflow-hidden">
      {/* View Switcher (Admin Button) */}
      <button 
        onClick={() => setView(v => v === 'booking' ? 'admin' : 'booking')}
        className="fixed bottom-24 right-6 z-50 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-gray-100 hover:scale-110 transition-transform"
      >
        {view === 'booking' ? (
          <Settings className="w-6 h-6 text-gray-600" />
        ) : (
          <Utensils className="w-6 h-6 text-gray-600" />
        )}
      </button>

      {view === 'booking' ? (
        <BookingFlow config={config} />
      ) : (
        <AdminPanel config={config} setConfig={setConfig} />
      )}
      
      {/* Bottom Home Indicator Bar (Aesthetic) */}
      <div className="h-2 w-full flex justify-center pb-2 bg-white sticky bottom-0">
        <div className="h-1 w-32 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
};

export default App;


import React from 'react';
import { AppConfig } from '../types';
import { Palette, Type, Save, ArrowLeft } from 'lucide-react';

interface AdminPanelProps {
  config: AppConfig;
  setConfig: (config: AppConfig) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ config, setConfig }) => {
  const handleChange = (key: keyof AppConfig, value: string) => {
    setConfig({ ...config, [key]: value });
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 animate-in fade-in duration-300">
      <header className="p-6 bg-white border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">Admin Panel</h2>
        <p className="text-gray-500 text-sm mt-1">Customize your booking app branding</p>
      </header>

      <main className="flex-1 p-6 space-y-6">
        {/* Restaurant Name */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-4">
          <div className="flex items-center gap-2 text-gray-900 font-bold">
            <Type className="w-5 h-5 text-gray-400" />
            <h3>Restaurant Name</h3>
          </div>
          <input 
            type="text" 
            value={config.restaurantName}
            onChange={(e) => handleChange('restaurantName', e.target.value)}
            className="w-full p-4 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-lg font-medium"
            placeholder="Enter restaurant name"
          />
        </section>

        {/* Primary Color */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-4">
          <div className="flex items-center gap-2 text-gray-900 font-bold">
            <Palette className="w-5 h-5 text-gray-400" />
            <h3>Branding Color</h3>
          </div>
          <div className="flex items-center gap-4">
            <input 
              type="color" 
              value={config.primaryColor}
              onChange={(e) => handleChange('primaryColor', e.target.value)}
              className="h-14 w-20 rounded-lg cursor-pointer border-0 p-1 shadow-inner bg-gray-100"
            />
            <div className="flex-1">
              <input 
                type="text" 
                value={config.primaryColor}
                onChange={(e) => handleChange('primaryColor', e.target.value)}
                className="w-full p-4 bg-gray-50 border-gray-200 rounded-xl font-mono"
              />
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            {['#ec4913', '#3b82f6', '#10b981', '#8b5cf6', '#ef4444', '#1f2937'].map(color => (
              <button
                key={color}
                onClick={() => handleChange('primaryColor', color)}
                className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 ${config.primaryColor === color ? 'border-gray-900 scale-110' : 'border-transparent'}`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </section>

        {/* Live Preview Sample */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-4">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Preview</h4>
          <div className="space-y-4">
            <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full" style={{ width: '60%', backgroundColor: config.primaryColor }}></div>
            </div>
            <button 
              className="w-full h-12 rounded-xl text-white font-bold shadow-md"
              style={{ backgroundColor: config.primaryColor }}
            >
              Continue
            </button>
          </div>
        </section>
      </main>

      <footer className="p-6 bg-white border-t border-gray-200">
        <p className="text-xs text-gray-400 text-center italic">Changes are saved automatically to local storage.</p>
      </footer>
    </div>
  );
};

export default AdminPanel;

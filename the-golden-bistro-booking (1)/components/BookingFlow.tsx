
import React, { useState, useRef } from 'react';
import { AppConfig, BookingData } from '../types';
import { Calendar, Clock, Info, CheckCircle2, ChevronRight } from 'lucide-react';

interface BookingFlowProps {
  config: AppConfig;
}

const BookingFlow: React.FC<BookingFlowProps> = ({ config }) => {
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState<BookingData>({
    guests: '',
    date: '',
    time: ''
  });

  const dateInputRef = useRef<HTMLInputElement>(null);

  const timeSlots = ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'];

  const handleNext = () => {
    if (step < 2) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const isStep1Valid = booking.guests !== '' && booking.date !== '' && booking.time !== '';

  const renderStep1 = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Guests */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#181311] text-lg font-bold">Number of Guests</h3>
          <span className="text-xs text-gray-400 font-medium italic">Required</span>
        </div>
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
          {['1', '2', '3', '4', '5+'].map((num) => (
            <button
              key={num}
              onClick={() => setBooking({ ...booking, guests: num })}
              className={`flex min-w-[56px] h-14 items-center justify-center rounded-xl font-semibold transition-all border-2 ${
                booking.guests === num 
                  ? 'bg-white border-[var(--primary-color)] text-[var(--primary-color)]' 
                  : 'bg-white border-transparent shadow-sm text-[#181311] hover:border-gray-200'
              }`}
              style={{ borderColor: booking.guests === num ? config.primaryColor : undefined }}
            >
              {num}
            </button>
          ))}
        </div>
      </section>

      {/* Date */}
      <section>
        <h3 className="text-[#181311] text-lg font-bold mb-4">Choose Date</h3>
        <div className="relative group p-5 rounded-[2rem] bg-white border-2 border-dashed border-gray-200 hover:border-gray-300 transition-all active:scale-[0.99] overflow-hidden">
          {/* 
            Invisible overlay input. 
            By covering the entire parent and having no pointer-events: none, 
            it intercepts all clicks and triggers the native date picker.
          */}
          <input
            ref={dateInputRef}
            type="date"
            className="absolute inset-0 w-full h-full opacity-0 z-20 cursor-pointer appearance-none"
            onChange={(e) => setBooking({ ...booking, date: e.target.value })}
            onClick={(e) => {
              // Modern API to trigger picker programmatically on top of native behavior
              if ('showPicker' in HTMLInputElement.prototype) {
                try {
                  e.currentTarget.showPicker();
                } catch (err) {}
              }
            }}
            min={new Date().toISOString().split('T')[0]}
            required
          />
          
          {/* Visual UI elements underneath the invisible input */}
          <div className="flex items-center gap-4 relative z-10 pointer-events-none">
            <div 
              className="flex size-14 items-center justify-center rounded-2xl bg-[#f8f6f6] text-gray-400 group-hover:bg-gray-100 transition-colors"
              style={{ color: booking.date ? config.primaryColor : undefined }}
            >
              <Calendar className="w-7 h-7" />
            </div>
            
            <div className="flex flex-col flex-1">
              <span className="text-gray-400 text-base font-medium">When are you visiting?</span>
              <span className="text-[#181311] text-xl font-bold leading-tight">
                {booking.date ? new Date(booking.date).toLocaleDateString('en-US', { dateStyle: 'long' }) : 'Select a date'}
              </span>
            </div>
            
            <ChevronRight className="w-6 h-6 text-gray-300 group-hover:text-gray-400 transition-colors" />
          </div>
        </div>
      </section>

      {/* Time */}
      <section>
        <h3 className="text-[#181311] text-lg font-bold mb-4">Choose Time</h3>
        {!booking.date ? (
          <div className="flex flex-col items-center justify-center py-10 px-6 rounded-3xl bg-gray-50 border border-gray-100 text-center">
            <Clock className="w-10 h-10 text-gray-300 mb-2" />
            <p className="text-sm text-gray-400">Select a date first to view available time slots for your party.</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
            {timeSlots.map((t) => (
              <button
                key={t}
                onClick={() => setBooking({ ...booking, time: t })}
                className={`h-11 flex items-center justify-center rounded-lg font-medium transition-all ${
                  booking.time === t 
                  ? 'text-white' 
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
                style={{ backgroundColor: booking.time === t ? config.primaryColor : undefined }}
              >
                {t}
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <section className="text-center py-6">
        <div className="inline-flex p-3 rounded-full bg-green-50 mb-4">
          <CheckCircle2 className="w-12 h-12 text-green-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Finalize Booking</h3>
        <p className="text-gray-500 mt-2">Almost there! Please provide your details.</p>
      </section>

      <section className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
          <input 
            type="text" 
            placeholder="John Doe"
            className="w-full p-4 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] transition-all"
            onChange={(e) => setBooking({...booking, customerName: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
          <input 
            type="tel" 
            placeholder="+1 (555) 000-0000"
            className="w-full p-4 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] transition-all"
            onChange={(e) => setBooking({...booking, customerPhone: e.target.value})}
          />
        </div>
      </section>

      <section className="bg-gray-50 p-6 rounded-2xl space-y-3">
        <h4 className="font-bold text-gray-900 border-b border-gray-200 pb-2 mb-2">Reservation Summary</h4>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Guests</span>
          <span className="font-semibold text-gray-900">{booking.guests} People</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Date</span>
          <span className="font-semibold text-gray-900">{booking.date}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Time</span>
          <span className="font-semibold text-gray-900">{booking.time}</span>
        </div>
      </section>
      
      <button 
        onClick={handleBack}
        className="w-full text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors"
      >
        Change reservation details
      </button>
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100">
        <div className="flex items-center p-4">
          <h2 className="text-[#181311] text-lg font-bold flex-1 text-center">{config.restaurantName}</h2>
        </div>
        
        {/* Progress Bar */}
        <div className="px-6 pb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: config.primaryColor }}>
              Step {step} of 2
            </span>
            <span className="text-xs text-gray-500 font-medium">
              {step === 1 ? 'Table Details' : 'Contact Information'}
            </span>
          </div>
          <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
            <div 
              className="h-full transition-all duration-500 ease-out" 
              style={{ 
                width: step === 1 ? '50%' : '100%',
                backgroundColor: config.primaryColor 
              }}
            ></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-6 py-8">
        {step === 1 ? renderStep1() : renderStep2()}
      </main>

      {/* Footer */}
      <footer className="p-6 bg-white border-t border-gray-100">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <Info className="w-4 h-4" />
            <p className="text-xs">Final price depends on menu selection</p>
          </div>
          
          <button 
            onClick={handleNext}
            disabled={step === 1 ? !isStep1Valid : (!booking.customerName || !booking.customerPhone)}
            className="w-full h-14 flex items-center justify-center rounded-2xl font-bold text-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-white shadow-lg"
            style={{ 
              backgroundColor: config.primaryColor,
              boxShadow: `0 8px 24px -6px ${config.primaryColor}66`
            }}
          >
            {step === 1 ? 'Continue' : 'Confirm Reservation'}
          </button>
        </div>
      </footer>
    </div>
  );
};

export default BookingFlow;

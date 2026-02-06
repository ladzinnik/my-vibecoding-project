
export interface AppConfig {
  restaurantName: string;
  primaryColor: string;
}

export interface BookingData {
  guests: string;
  date: string;
  time: string;
  customerName?: string;
  customerPhone?: string;
}

export type AppView = 'booking' | 'admin';

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CHECKED_IN' | 'CHECKED_OUT' | 'CANCELLED' | 'NO_SHOW';
export type PaymentMethod = 'CASH' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'BANK_TRANSFER' | 'PAYPAL' | 'OTHER';
export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED' | 'PARTIAL';
export type HousekeepingStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'SKIPPED';
export type MaintenanceType = 'REPAIR' | 'REPLACEMENT' | 'INSPECTION' | 'ROUTINE' | 'EMERGENCY';
export type MaintenanceStatus = 'REPORTED' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface Guest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface RoomType {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  capacity: number;
}

export interface Room {
  id: string;
  number: string;
  roomType: RoomType;
  status: 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE';
}

export interface Booking {
  id: string;
  guest: Guest;
  room: Room;
  checkIn: Date;
  checkOut: Date;
  status: 'CONFIRMED' | 'CHECKED_IN' | 'CHECKED_OUT' | 'CANCELLED';
  adults: number;
  children: number;
  specialRequests?: string;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Payment {
  id: string;
  booking: Booking;
  amount: number;
  method: 'CASH' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'BANK_TRANSFER';
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
  transactionId?: string;
  createdAt: Date;
}

export interface Housekeeping {
  id: string;
  room: Room;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  notes?: string;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Maintenance {
  id: string;
  room: Room;
  type: 'REPAIR' | 'CLEANING' | 'INSPECTION';
  description: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: 'BOOKING' | 'MAINTENANCE' | 'HOUSEKEEPING';
  description?: string;
} 
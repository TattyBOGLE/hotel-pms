import axios from 'axios';
import { Booking, Payment, Housekeeping, Maintenance, CalendarEvent } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Booking API calls
export const bookingApi = {
  create: async (data: Partial<Booking>) => {
    const response = await api.post<{ status: string; data: Booking }>('/bookings', data);
    return response.data;
  },
  getAll: async () => {
    const response = await api.get<{ status: string; data: Booking[] }>('/bookings');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get<{ status: string; data: Booking }>(`/bookings/${id}`);
    return response.data;
  },
};

// Payment API calls
export const paymentApi = {
  create: async (data: Partial<Payment>) => {
    const response = await api.post<{ status: string; data: Payment }>('/payments', data);
    return response.data;
  },
  getByBookingId: async (bookingId: string) => {
    const response = await api.get<{ status: string; data: Payment[] }>(`/payments/booking/${bookingId}`);
    return response.data;
  },
};

// Calendar API calls
export const calendarApi = {
  getEvents: async (startDate: Date, endDate: Date) => {
    const response = await api.get<{ status: string; data: CalendarEvent[] }>('/calendar', {
      params: { startDate, endDate },
    });
    return response.data;
  },
};

// Housekeeping API calls
export const housekeepingApi = {
  create: async (data: Partial<Housekeeping>) => {
    const response = await api.post<{ status: string; data: Housekeeping }>('/housekeeping', data);
    return response.data;
  },
  getAll: async () => {
    const response = await api.get<{ status: string; data: Housekeeping[] }>('/housekeeping');
    return response.data;
  },
  updateStatus: async (id: string, status: Housekeeping['status']) => {
    const response = await api.patch<{ status: string; data: Housekeeping }>(`/housekeeping/${id}/status`, { status });
    return response.data;
  },
};

// Maintenance API calls
export const maintenanceApi = {
  create: async (data: Partial<Maintenance>) => {
    const response = await api.post<{ status: string; data: Maintenance }>('/maintenance', data);
    return response.data;
  },
  getAll: async () => {
    const response = await api.get<{ status: string; data: Maintenance[] }>('/maintenance');
    return response.data;
  },
  updateStatus: async (id: string, status: Maintenance['status']) => {
    const response = await api.patch<{ status: string; data: Maintenance }>(`/maintenance/${id}/status`, { status });
    return response.data;
  },
}; 
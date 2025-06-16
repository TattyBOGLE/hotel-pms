import React, { useState, useEffect } from 'react';
import { Booking } from '../../types';
import { bookingApi } from '../../lib/api';
import BookingForm from '../../components/BookingForm';
import BookingList from '../../components/BookingList';
import Layout from '../../components/Layout';

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const response = await bookingApi.getAll();
      setBookings(response.data);
    } catch (error) {
      console.error('Failed to load bookings:', error);
    }
  };

  const handleCreateBooking = async (data: Partial<Booking>) => {
    try {
      await bookingApi.create(data);
      setIsCreating(false);
      loadBookings();
    } catch (error) {
      console.error('Failed to create booking:', error);
    }
  };

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Bookings</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all bookings in the system including guest name, room, status, and check-in/out dates.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              onClick={() => setIsCreating(true)}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Add Booking
            </button>
          </div>
        </div>

        {isCreating && (
          <div className="mt-8">
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Create New Booking</h3>
                <div className="mt-5">
                  <BookingForm onSubmit={handleCreateBooking} />
                </div>
              </div>
            </div>
          </div>
        )}

        <BookingList
          bookings={bookings}
          onViewBooking={setSelectedBooking}
        />
      </div>
    </Layout>
  );
} 
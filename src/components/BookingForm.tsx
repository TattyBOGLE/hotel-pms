import { useState } from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Booking } from '../types';
import { bookingApi } from '../lib/api';

interface BookingFormProps {
  onSubmit: (data: Partial<Booking>) => void;
  initialData?: Partial<Booking>;
}

export default function BookingForm({ onSubmit, initialData }: BookingFormProps) {
  const [checkIn, setCheckIn] = useState<Date | null>(initialData?.checkIn ? new Date(initialData.checkIn) : null);
  const [checkOut, setCheckOut] = useState<Date | null>(initialData?.checkOut ? new Date(initialData.checkOut) : null);
  const { register, handleSubmit, formState: { errors } } = useForm<Partial<Booking>>({
    defaultValues: initialData,
  });

  const handleFormSubmit = async (data: Partial<Booking>) => {
    if (!checkIn || !checkOut) {
      return;
    }

    const bookingData = {
      ...data,
      checkIn,
      checkOut,
    };

    onSubmit(bookingData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Guest Information */}
        <div className="col-span-2">
          <h3 className="text-lg font-medium text-gray-900">Guest Information</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="guest.firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                {...register('guest.firstName', { required: 'First name is required' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {errors.guest?.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.guest.firstName.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="guest.lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                {...register('guest.lastName', { required: 'Last name is required' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {errors.guest?.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.guest.lastName.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Booking Details */}
        <div className="col-span-2">
          <h3 className="text-lg font-medium text-gray-900">Booking Details</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700">
                Check-in Date
              </label>
              <DatePicker
                selected={checkIn}
                onChange={(date) => setCheckIn(date)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                minDate={new Date()}
                required
              />
            </div>
            <div>
              <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700">
                Check-out Date
              </label>
              <DatePicker
                selected={checkOut}
                onChange={(date) => setCheckOut(date)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                minDate={checkIn || new Date()}
                required
              />
            </div>
            <div>
              <label htmlFor="adults" className="block text-sm font-medium text-gray-700">
                Adults
              </label>
              <input
                type="number"
                {...register('adults', { required: 'Number of adults is required', min: 1 })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {errors.adults && (
                <p className="mt-1 text-sm text-red-600">{errors.adults.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="children" className="block text-sm font-medium text-gray-700">
                Children
              </label>
              <input
                type="number"
                {...register('children', { min: 0 })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Special Requests */}
        <div className="col-span-2">
          <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700">
            Special Requests
          </label>
          <textarea
            {...register('specialRequests')}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {initialData ? 'Update Booking' : 'Create Booking'}
        </button>
      </div>
    </form>
  );
} 
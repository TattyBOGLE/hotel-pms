import React from 'react';
import { useForm } from 'react-hook-form';
import { Payment } from '../types';

interface PaymentFormProps {
  bookingId: string;
  totalAmount: number;
  onSubmit: (data: Partial<Payment>) => void;
}

export default function PaymentForm({ bookingId, totalAmount, onSubmit }: PaymentFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<Partial<Payment>>({
    defaultValues: {
      booking: { id: bookingId } as any,
      method: 'CREDIT_CARD',
    },
  });

  const handleFormSubmit = async (data: Partial<Payment>) => {
    if (data.amount && data.amount > totalAmount) {
      alert('Payment amount cannot exceed the total amount');
      return;
    }
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Record Payment</h3>
          <div className="mt-5">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                  Amount
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    step="0.01"
                    {...register('amount', {
                      required: 'Amount is required',
                      min: { value: 0, message: 'Amount must be positive' },
                      max: { value: totalAmount, message: 'Amount cannot exceed total' },
                    })}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  {errors.amount && (
                    <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="method" className="block text-sm font-medium text-gray-700">
                  Payment Method
                </label>
                <div className="mt-1">
                  <select
                    {...register('method', { required: 'Payment method is required' })}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="CASH">Cash</option>
                    <option value="CREDIT_CARD">Credit Card</option>
                    <option value="DEBIT_CARD">Debit Card</option>
                    <option value="BANK_TRANSFER">Bank Transfer</option>
                  </select>
                  {errors.method && (
                    <p className="mt-1 text-sm text-red-600">{errors.method.message}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="transactionId" className="block text-sm font-medium text-gray-700">
                  Transaction ID (Optional)
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    {...register('transactionId')}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Record Payment
          </button>
        </div>
      </div>
    </form>
  );
} 
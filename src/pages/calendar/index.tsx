import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';
import { CalendarEvent } from '../../types';
import { calendarApi } from '../../lib/api';
import Layout from '../../components/Layout';

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    loadEvents();
  }, [currentDate]);

  const loadEvents = async () => {
    try {
      const startDate = startOfMonth(currentDate);
      const endDate = endOfMonth(currentDate);
      const response = await calendarApi.getEvents(startDate, endDate);
      setEvents(response.data);
    } catch (error) {
      console.error('Failed to load events:', error);
    }
  };

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  const getEventsForDay = (date: Date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Calendar</h1>
            <p className="mt-2 text-sm text-gray-700">
              View and manage all bookings and events in the calendar.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              onClick={() => setCurrentDate(new Date())}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Today
            </button>
          </div>
        </div>

        <div className="mt-8">
          <div className="bg-white shadow">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">
                  {format(currentDate, 'MMMM yyyy')}
                </h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
                    className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
                    className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="bg-white py-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200">
                {days.map((day, dayIdx) => {
                  const dayEvents = getEventsForDay(day);
                  return (
                    <div
                      key={day.toString()}
                      className={`min-h-[100px] bg-white px-3 py-2 ${
                        !isSameMonth(day, currentDate) ? 'text-gray-400' : ''
                      }`}
                    >
                      <time
                        dateTime={format(day, 'yyyy-MM-dd')}
                        className={`${
                          isToday(day) ? 'flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white' : ''
                        }`}
                      >
                        {format(day, 'd')}
                      </time>
                      <div className="mt-2 space-y-1">
                        {dayEvents.map((event) => (
                          <div
                            key={event.id}
                            className={`rounded px-2 py-1 text-xs ${
                              event.type === 'BOOKING'
                                ? 'bg-blue-100 text-blue-800'
                                : event.type === 'MAINTENANCE'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                            }`}
                          >
                            {event.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 

import React from 'react';
import { Star, Phone, MapPin, Clock, DollarSign, Mail, CheckCircle2 } from 'lucide-react';

const FinishRide = () => {
  return (
    <div className="flex min-h-screen items-start justify-center bg-linear-to-br from-gray-100 via-white to-emerald-50 px-4 py-4 sm:items-center sm:py-6">
      <div className="flex max-h-[calc(100vh-2rem)] w-full max-w-sm flex-col overflow-y-auto rounded-2xl border border-gray-200/80 bg-white p-4 shadow-xl shadow-gray-200/60 sm:max-w-md sm:rounded-3xl sm:p-5">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-green-600">
              Ride completion
            </p>
            <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">Trip Summary</h2>
            <p className="mt-1 text-sm leading-5 text-gray-500">
              Review the ride details and complete the trip.
            </p>
          </div>

          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200">
            <CheckCircle2 className="h-3.5 w-3.5" />
            In progress
          </span>
        </div>
        

        <div className="mb-4 rounded-2xl border border-gray-200 bg-linear-to-br from-gray-50 to-gray-100 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="shrink-0">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
                alt="Customer"
                className="h-14 w-14 rounded-full border-2 border-green-500 object-cover sm:h-16 sm:w-16"
              />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="truncate text-base font-bold text-gray-900 sm:text-lg">John Doe</h3>
              <div className="mt-1 flex flex-wrap items-center gap-1.5">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-600 sm:text-sm">(4.8) • 324 trips</span>
              </div>
              <p className="mt-1 text-[11px] text-gray-600 sm:text-xs">Regular Customer • Joined 2 years ago</p>
            </div>
          </div>
        </div>

        <div className="mb-4 overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-sm">
          <div className="grid grid-cols-1 divide-y divide-gray-200 text-sm sm:grid-cols-2 sm:divide-x sm:divide-y-0">
            <div className="p-3 transition-colors hover:bg-white/70">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <p className="text-[11px] font-medium uppercase tracking-wide text-gray-500">Phone</p>
              </div>
              <p className="mt-1 font-semibold text-gray-900">+1 234 567 890</p>
            </div>

            <div className="p-3 transition-colors hover:bg-white/70">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <p className="text-[11px] font-medium uppercase tracking-wide text-gray-500">Email</p>
              </div>
              <p className="mt-1 font-semibold text-gray-900">john.doe@email.com</p>
            </div>

            <div className="p-3 transition-colors hover:bg-white/70">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <p className="text-[11px] font-medium uppercase tracking-wide text-gray-500">Pickup</p>
              </div>
              <p className="mt-1 font-semibold text-gray-900">123 Main Street</p>
            </div>

            <div className="p-3 transition-colors hover:bg-white/70">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <p className="text-[11px] font-medium uppercase tracking-wide text-gray-500">Drop-off</p>
              </div>
              <p className="mt-1 font-semibold text-gray-900">456 Market Avenue</p>
            </div>

            <div className="p-3 transition-colors hover:bg-white/70">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <p className="text-[11px] font-medium uppercase tracking-wide text-gray-500">Duration</p>
              </div>
              <p className="mt-1 font-semibold text-gray-900">32 minutes</p>
            </div>

            <div className="p-3 transition-colors hover:bg-white/70">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <p className="text-[11px] font-medium uppercase tracking-wide text-gray-500">Distance</p>
              </div>
              <p className="mt-1 font-semibold text-gray-900">12.5 km</p>
            </div>
          </div>

          <div className="border-t border-gray-200 bg-linear-to-r from-green-50 to-emerald-50 p-4 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wide text-green-700">Total Fare</p>
              <p className="mt-1 text-xs text-green-700/80">Includes final trip total</p>
            </div>
            <p className="mt-2 text-xl font-bold tracking-tight text-green-700 sm:mt-0">$24.50</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            type="button"
            className="w-full rounded-2xl bg-green-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 active:scale-[0.99]"
          >
            Mark as Finished
          </button>
          <button
            type="button"
            className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            Keep Ride Open
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinishRide;
// ...existing code...
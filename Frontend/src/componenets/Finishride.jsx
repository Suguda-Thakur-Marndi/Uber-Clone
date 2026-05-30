import React from 'react';

const Finishride = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl shadow-gray-200/70 ring-1 ring-gray-200/80">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-green-600">
              Ride completion
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Trip Summary</h2>
            <p className="mt-1 text-sm leading-6 text-gray-500">
              Review the ride details and complete the trip.
            </p>
          </div>
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200">
            In progress
          </span>
        </div>

        <div className="mb-6 overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
          <div className="grid grid-cols-1 divide-y divide-gray-200 text-sm sm:grid-cols-2 sm:divide-x sm:divide-y-0">
            <div className="p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Customer</p>
              <p className="mt-1 font-semibold text-gray-900">John Doe</p>
            </div>
            <div className="p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Phone</p>
              <p className="mt-1 font-semibold text-gray-900">+1 234 567 890</p>
            </div>
            <div className="p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Pickup</p>
              <p className="mt-1 font-semibold text-gray-900">123 Main Street</p>
            </div>
            <div className="p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Drop-off</p>
              <p className="mt-1 font-semibold text-gray-900">456 Market Avenue</p>
            </div>
          </div>

          <div className="border-t border-gray-200 bg-linear-to-r from-green-50 to-emerald-50 p-4 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-green-700">Fare</p>
              <p className="mt-1 text-sm text-green-700/80">Includes final trip total</p>
            </div>
            <p className="mt-2 text-2xl font-bold tracking-tight text-green-700 sm:mt-0">$24.50</p>
          </div>
        </div>

        <div className="space-y-3">
          <button
            type="button"
            className="w-full rounded-2xl bg-green-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 active:scale-[0.99]"
          >
            Mark as Finished
          </button>
          <button
            type="button"
            className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            Keep Ride Open
          </button>
        </div>
      </div>
    </div>
  );
};

export default Finishride;
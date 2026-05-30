import React from 'react';

const Finishride = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Customer Information</h2>

      <div className="space-y-2 text-sm text-gray-700 mb-4">
        <p><span className="font-medium">Name:</span> John Doe</p>
        <p><span className="font-medium">Phone:</span> +1 234 567 890</p>
        <p><span className="font-medium">Pickup:</span> 123 Main Street</p>
        <p><span className="font-medium">Dropoff:</span> 456 Market Avenue</p>
        <p><span className="font-medium">Fare:</span> $24.50</p>
      </div>

      <button
        type="button"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded"
      >
        Finished
      </button>
    </div>
  );
};

export default Finishride;
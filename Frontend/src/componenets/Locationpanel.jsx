import React from 'react';

const Locationpanel = ({ suggestions = [], onSelectSuggestion, setPanel, activeField }) => {
  const defaultLocations = [
    'KIIT University, Patia, Bhubaneswar',
    'Bhubaneswar Railway Station, Master Canteen',
    'Biju Patnaik International Airport (BBI)',
    'Esplanade One Mall, Rasulgarh, Bhubaneswar',
    'Infocity Road, Chandrasekharpur, Bhubaneswar'
  ];

  const displayList = (suggestions && suggestions.length > 0) ? suggestions : defaultLocations;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          Select {activeField === 'pickup' ? 'Pickup Location' : 'Destination'}
        </p>
        <button
          type="button"
          onClick={() => setPanel(false)}
          className="text-gray-400 hover:text-gray-700 text-sm font-medium flex items-center gap-1"
        >
          <span>Done</span>
          <i className="ri-arrow-down-s-line text-lg"></i>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-2 space-y-2">
        {displayList.map((location, index) => (
          <div
            key={index}
            onClick={() => onSelectSuggestion && onSelectSuggestion(location)}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 active:bg-gray-200 cursor-pointer transition border border-transparent hover:border-gray-200"
          >
            <div className="h-10 w-10 shrink-0 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 shadow-xs">
              <i className="ri-map-pin-2-fill text-lg text-emerald-600"></i>
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-semibold text-gray-900 truncate">
                {location.split(',')[0]}
              </h4>
              <p className="text-xs text-gray-500 truncate">
                {location.split(',').slice(1).join(',').trim() || location}
              </p>
            </div>
            <i className="ri-arrow-right-s-line text-gray-400 text-lg"></i>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Locationpanel;
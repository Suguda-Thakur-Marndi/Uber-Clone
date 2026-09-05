import React from 'react';

const Vichelpanel = ({ fares, onSelectVehicle, setvichelpanel, vichelpanelref }) => {
  const options = [
    {
      id: 'car',
      name: 'Uber Go',
      capacity: 4,
      tag: 'Affordable, compact rides',
      time: fares?.duration?.text || '3 mins away',
      price: fares?.car ? `₹${fares.car}` : '₹160',
      img: 'https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png'
    },
    {
      id: 'moto',
      name: 'Uber Moto',
      capacity: 1,
      tag: 'Fastest through traffic',
      time: '1 min away',
      price: fares?.moto ? `₹${fares.moto}` : '₹45',
      img: 'https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=1344/height=896/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85NTM4NTEyZC1mZGUxLTRmNzMtYmQ1MS05Y2VmZjRlMjU0ZjEucG5n'
    },
    {
      id: 'auto',
      name: 'Uber Auto',
      capacity: 3,
      tag: 'No bargaining, doorstep pickup',
      time: '2 mins away',
      price: fares?.auto ? `₹${fares.auto}` : '₹85',
      img: 'https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png'
    }
  ];

  return (
    <div
      ref={vichelpanelref}
      className="fixed bottom-0 left-0 right-0 z-30 bg-white rounded-t-3xl shadow-2xl border-t border-gray-100 max-h-[85vh] overflow-hidden transition-transform duration-300"
      style={{ transform: 'translateY(100%)' }}
    >
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Choose a ride</h3>
          {fares?.distance && (
            <p className="text-xs text-gray-500">
              Trip distance: <span className="font-semibold text-gray-800">{fares.distance.text}</span> • <span className="font-semibold text-gray-800">{fares.duration.text}</span>
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={() => setvichelpanel(false)}
          className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition"
          aria-label="Close"
        >
          <i className="ri-close-line text-lg"></i>
        </button>
      </div>

      <div className="p-4 space-y-3 overflow-y-auto max-h-[60vh]">
        {options.map(opt => (
          <div
            key={opt.id}
            onClick={() => onSelectVehicle && onSelectVehicle(opt.id, opt)}
            className="group flex items-center justify-between p-3.5 rounded-2xl border-2 border-gray-200 hover:border-black active:scale-[0.99] cursor-pointer transition-all bg-white hover:shadow-md"
          >
            <div className="flex items-center gap-3.5">
              <img src={opt.img} alt={opt.name} className="h-16 w-16 object-contain rounded" />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-base text-gray-900">{opt.name}</h4>
                  <span className="text-xs text-gray-500 flex items-center gap-0.5">
                    <i className="ri-user-fill text-[11px]"></i> {opt.capacity}
                  </span>
                </div>
                <p className="text-xs text-emerald-600 font-semibold">{opt.time}</p>
                <p className="text-xs text-gray-500">{opt.tag}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold text-gray-900">{opt.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vichelpanel;

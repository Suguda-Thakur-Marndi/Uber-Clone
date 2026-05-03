import React from 'react'

const Locationpanel = () => {
    const Location = [
        'Sample location address',
        'Lorem ipsum dolor sit amet.',
        'Lorem ipsum dolor sit amet.',
        'Lorem ipsum dolor sit amet.'
    ]
  return (
    <div className='flex pt-11 flex-col gap-10'>
      {Location.map((location, index) => (
        <div
          key={index}
          className='flex items-center border-2 active:border-black rounded-lg gap-4 justify-start'
        >
          <h2 className='bg-[#eee] h-10 w-10 items-center flex justify-center rounded-4xl'>
            <i className="ri-map-pin-line"></i>
          </h2>
          <h4 className='font-medium'>{location}</h4>
        </div>
      ))}
    </div>
  )
}

export default Locationpanel
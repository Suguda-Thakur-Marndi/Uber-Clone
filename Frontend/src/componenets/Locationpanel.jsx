import React from 'react'
const Locationsearchpanel=(props)=>{
  console.log(props)
}

const Locationpanel = (props) => {
    const Location = [
        'Sample location address',
        'Lorem ipsum dolor sit amet.',
        'Lorem ipsum dolor sit amet.',
        'Lorem ipsum dolor sit amet.'
    ]
  return (
    <div className='flex flex-col gap-10'>
      <button 
        type="button"
        onClick={()=>{
          props.setPanel(false)
        }}
        className="text-gray-600 hover:text-gray-900 transition mb-2"
        aria-label="Close"
      >
        <i className="ri-arrow-down-line text-xl" aria-hidden="true"></i>
      </button>
      <div className='flex pt-11 flex-col gap-10'>
      {Location.map((location, index) => (
        <div onClick={()=>{
          props.setPanel(false)
          props.setvichelpanel(true)
        }}
          key={index}
          className='flex items-center active:border-2 active:border-black rounded-lg gap-4 justify-start'
        >
          <h2 className='bg-[#eee] h-10 w-10 items-center flex justify-center rounded-4xl'>
            <i className="ri-map-pin-line"></i>
          </h2>
          <h4 className='font-medium'>{location}</h4>
        </div>
      ))}
      </div>
    </div>
  )
}

export default Locationpanel
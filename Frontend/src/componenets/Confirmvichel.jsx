import React from 'react'

const Confirmvichel = (props) => {
  return (
    <div>
        <h5 className='p-1 text-start w-[93%] absolute top-0' onClick={()=>{
            props.setConfirmVichelpanel?.(false)
        }}>
         <i className="ri-arrow-down-line" aria-hidden="true"></i></h5>
        <h3 className="text-2xl font-bold mb-4">Conform your Ride</h3>
        <div className='flex item-center'>
             <img className="h-20 mb-4" src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="Uber Go vehicle" /> 
        </div>
        <div> Conform</div>
    </div>
  )
}

export default Confirmvichel
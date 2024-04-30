import React from 'react'

export default function singleDeliveryperson(props) {
    let data=props.SingleDeliveryPersonData
    function hide(){
        props.setactiveSinglePage(false)
    }

  return (
    <>
    <div className="rounded-sm absolute top-[30%]  border border-stroke bg-black text-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
              
        <div className="max-w-full overflow-x-auto">
        <div className='flex flex-col gap-2 mt-2'>
            <p><b>Dark Store</b> </p>
            <p><b> Delivery Person  Id</b> :{data.id} </p>
            <p><b>Deliver Person Name</b> :{data.name} </p>
            <p><b>First Mobile Number</b> :{data.firstMobileNumber} </p>
            <p><b>Sdecond Mobile Number</b> :{data.secondMobileNumber} </p>
            <p><b>Status</b> :{data.status} </p>
            <p><b>Last Active Time</b> :{data.lastActiveTime} </p>
            <p><b>City</b> :{data.city} </p>
            <p><b>Pincode</b> :{data.pincode} </p>
            <p><b>Email</b> :{data.email} </p>
            <p><b>Latitude</b> :{data.latitude} </p>
            <p><b>Longitute</b> :{data.longitude} </p>
        </div>
        </div>
        <button onClick={hide}  className='shadow-black left-[100%] bottom-[100%] bg-white shadow text-black  p-4 rounded font-bold mt-1 absolute'>X</button>
        
    </div>
    </>
    
  )
}

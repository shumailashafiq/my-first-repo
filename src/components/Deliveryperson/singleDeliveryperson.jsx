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
            <p><b>Delivery Person Detail</b> </p>
            <p><b>Delivery Person  Id</b> :{data.deliveryPersonId} </p>
            <p><b>Deliver Person Name</b> :{data.name} </p>
            <p><b>First Mobile Number</b> :{data.firstMobileNumber} </p>
            <p><b>Second Mobile Number</b> :{data.secondMobileNumber} </p>
            <p><b>Status</b> :{data.status} </p>
            <p><b>Last Active Time</b> :{data.lastActiveTime} </p>
            {
              data.city!==null && data.city.countryId !==null
              ? 
              <div>
  
                <p><b>City Id</b> :{data.city.cityId!==null ? data.city.cityId: "null"} </p>
                <p><b>City Name</b> :{data.city.cityName!==null ? data.city.cityName: "null"} </p>
                </div>
                 :  <div>
                 <p><b>City Id</b> : ---  </p>
                 <p><b>City Name</b> : --- </p>
                 </div>
                 }
            {
              data.city!==null && data.city.countryId !==null
              ? 
                <div>
                <p><b>Country id</b> :{data.city.countryId.countryId!==null ? data.city.countryId.countryId: "null"} </p>
                <p><b> Country Name </b> :{data.city.countryId.countryName!==null ? data.city.countryId.countryName: "null"} </p>
                <p><b> Currency Code</b> :{data.city.countryId.currencyCode !==null ? data.city.countryId.currencyCode: "null"} </p>
                <p><b> telephonePrefix</b> :{data.city.countryId.telephonePrefix!==null ? data.city.countryId.telephonePrefix: "null"} </p>
              </div> : <div>
                <p><b>Country id</b> : --- </p>
                <p><b> Country Name </b> : --- </p>
                <p><b> Currency Code</b> : --- </p>
                <p><b> telephonePrefix</b> : --- </p>
              </div>              
            }
            <p><b>Pincode</b> :{data.pincode} </p>
            <p><b>Email</b> :{data.email} </p>
            <p><b>Latitude</b> :{data.latitude} </p>
            <p><b>Longitude</b> :{data.longitude} </p>
        </div>
        </div>
        <button onClick={hide}  className='shadow-black left-[100%] bottom-[100%] bg-white shadow text-black  p-4 rounded font-bold mt-1 absolute'>X</button>
        
    </div>
    </>
    
  )
}

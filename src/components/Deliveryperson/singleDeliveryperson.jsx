import React from 'react'

export default function singleDeliveryperson(props) {
    let data=props.SingleDeliveryPersonData
    function hide(){
        props.setactiveSinglePage(false)
    }

  return (
    <>
    <div className="flex flex-col">
    <div className={`rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 relative `}>
    <h1 className='text-center pt-5 text-2xl'><b>Delivery Person Detail</b> </h1><br/><br/><hr/><br/><br/>
              
        <div className="max-w-full  bg-white ml-0 items-center overflow-x-auto pb-11">
        <div className='flex flex-row gap-2 flex  mt-2'>
            <div className='w-full flex flex-col justify-center align-item-center pl-6'>
            <p><b>Delivery Person  Id</b> :{data.deliveryPersonId} </p>
            <p><b>Deliver Person Name</b> :{data.name} </p>
            <p><b>First Mobile Number</b> :{data.firstMobileNumber} </p>
            <p><b>Second Mobile Number</b> :{data.secondMobileNumber} </p>
            <p><b>Email</b> :{data.email} </p>
            <p><b>Status</b> :{data.status} </p>
            <p><b>Last Active Time</b> :{data.lastActiveTime} </p>
            <p><b>Pincode</b> :{data.pincode} </p>
            </div>
            <div className='w-full justify-center'>
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
            <p><b>Latitude</b> :{data.latitude} </p>
            <p><b>Longitude</b> :{data.longitude} </p>
        </div>
        </div>
        </div>
        <button onClick={hide}  className='shadow-black top-[3%] right-[2%] bg-white shadow text-black  p-4 rounded font-bold mt-1 absolute'>X</button>
       
        
    </div>
    </div>
    </>
    
  )
}

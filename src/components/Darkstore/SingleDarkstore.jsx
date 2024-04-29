import React from 'react'

const SingleVendor = (props) => {

    // console.log(props)
    let {SingleDarkData,setaddSingleDarkstore} = props
    console.log(SingleDarkData)
    function hide(){
      setaddSingleDarkstore(false)
    }

  

  return (
    <>
  <div className="rounded-sm  absolute top-[30%]  border border-stroke bg-black text-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
              
  <div className="max-w-full overflow-x-auto">
                
  {SingleDarkData.map((element,key)=>{

    return (
      <div>
      { SingleDarkData !== null ?
      
        <div className='flex flex-col gap-2 mt-2'>
            <p><b>Dark Store</b> </p>
            <p><b> Store id</b> :{element.storeId} </p>
            <p><b>Store Name</b> :{element.storeName} </p>
            <p><b>Latitude</b> :{element.latitude} </p>
            <p><b>Longitute</b> :{element.longitude} </p>
            {
              element.cityId!==null && element.cityId.countryId !==null
              ? 
              <div>
  
                <p><b>City Id</b> :{element.cityId.cityId!==null ? element.cityId.cityId: "null"} </p>
                <p><b>City Name</b> :{element.cityId.cityName!==null ? element.cityId.cityName: "null"} </p>
                </div>
                 :  <div>
                 <p><b>City Id</b> : ---  </p>
                 <p><b>City Name</b> : --- </p>
                 </div>
                 }
            {
              element.cityId!==null && element.cityId.countryId !==null
              ? 
                <div>
                <p><b>Country id</b> :{element.cityId.countryId.countryId!==null ? element.cityId.countryId.countryId: "null"} </p>
                <p><b> Country Name </b> :{element.cityId.countryId.countryName!==null ? element.cityId.countryId.countryName: "null"} </p>
                <p><b> Currency Code</b> :{element.cityId.countryId.currencyCode !==null ? element.cityId.countryId.currencyCode: "null"} </p>
                <p><b> telephonePrefix</b> :{element.cityId.countryId.telephonePrefix!==null ? element.cityId.countryId.telephonePrefix: "null"} </p>
              </div> : <div>
                <p><b>Country id</b> : --- </p>
                <p><b> Country Name </b> : --- </p>
                <p><b> Currency Code</b> : --- </p>
                <p><b> telephonePrefix</b> : --- </p>
              </div>              
            }
            {
            element.vendorFranchiseeId!==null && element.vendorFranchiseeId.franchiseeId !==null
            ?
            <>
              <p><b>Vendor Franchisee id</b> :{element.vendorFranchiseeId.vfid !==null ?element.vendorFranchiseeId.vfid: "null"} </p>
            <p><b>franchiseeId</b> :{element.vendorFranchiseeId.franchiseeId.franchisee_id!==null ?element.vendorFranchiseeId.franchiseeId.franchisee_id: "null"} </p>
            <p><b> franchisee Name</b> :{element.vendorFranchiseeId.franchiseeId.franchisee_name!==null ?element.vendorFranchiseeId.franchiseeId.franchisee_name: "null"} </p>
            <p><b>email</b> :{element.vendorFranchiseeId.franchiseeId.email!==null ?element.vendorFranchiseeId.franchiseeId.email: "null"} </p>
            <p><b> Phone no</b> :{element.vendorFranchiseeId.franchiseeId.phone_no!==null ?element.vendorFranchiseeId.franchiseeId.phone_no: "null"} </p>
            </>
            :             <div>
            <p><b>Vendor Franchisee id</b> : --- </p>
          <p><b>franchiseeId</b> : --- </p>
          <p><b> franchisee Name</b> : --- </p>
          <p><b>email</b> : --- </p>
          <p><b> Phone no</b> : ---</p>
          </div>
          }


            {element.vendorFranchiseeId!==null && element.vendorFranchiseeId.vendorId !==null
              ?<div>

            <p><b>Vendor Id</b> :{element.vendorFranchiseeId.vendorId.vendorId!==null ?element.vendorFranchiseeId.vendorId.vendorId: "null"} </p>
            <p><b> Vendor Namr</b> :{element.element.vendorFranchiseeId.vendorId.vendor_name!==null ?element.vendorFranchiseeId.vendorId.vendor_name: "null"} </p>
            <p><b> Vendor Email</b> :{element.vendorFranchiseeId.vendorId.email!==null ?element.vendorFranchiseeId.vendorId.email: "null"} </p>
            <p><b>Vendor Phone no</b> :{element.vendorFranchiseeId.vendorId.phone_no!==null ?element.vendorFranchiseeId.vendorId.phone_no: "null"} </p>
            </div> :
            <div>

            <p><b>Vendor Id</b> : --- </p>
            <p><b> Vendor Namr</b> : --- </p>
            <p><b> Vendor Email</b> : --- </p>
            <p><b>Vendor Phone no</b> : --- </p>
            </div> }
            
        </div>
      : "loading..."}
      </div>
  )})}
              </div>
            <button onClick={hide}  className='shadow-black left-[100%] bottom-[100%] bg-white shadow text-black  p-4 rounded font-bold mt-1 absolute'>X</button>
  
            </div>

    </>
  )
}

export default SingleVendor
import React from 'react'
import { useEffect } from 'react';
function AssignOrderDetails(props) {
    const { allDetails, selectedId, veiwMore, allOrders } = props
    const allData = allOrders.find(element => element.order.orderId === selectedId) || {};
    useEffect(() => {
        if (veiwMore && selectedId !== null) {
            console.log(allData)

        }
    }, [selectedId, veiwMore, allData])
    return (
        <>
        {veiwMore && (
          <div className="flex flex-col">
            <div className={`rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 relative `}>
              <h1 className='text-center pt-5 text-2xl'><b>Order Detailes</b> </h1><br /><br /><hr /><br /><br />
              <div className="max-w-full  bg-white ml-0 items-center overflow-x-auto pb-11">
                <div className='flex flex-row gap-2 flex  mt-2'>
                  <div className='w-full flex flex-col justify-center align-item-center pl-6'>
                      {Object.keys(allData).length > 0 ?(
                        <>
                         <p><b>Order Assignment Id :  </b>{allData.orderAssignmentId || "N/A"}</p>
                         <p><b>Assignment Time  :  </b>{allData.assignmentTime || "N/A"}</p>
                          <p><b>Assignment Type  :  </b>{allData.assignmentType || "N/A"}</p>
                          <p><b>Delivery Time  :  </b>{allData.deliveryTime || "N/A"}</p>
                          <p><b>Completion Time  :  </b>{allData.completionTime || "N/A"}</p>
                          <p><b>Status  :  </b>{allData.status || "N/A"}</p>
                          <p><b>Admin Remark  :  </b>{allData.adminRemark || "N/A"}</p>
                          <p><b>Delivery Person Remark  :  </b>{allData.deliveryPersonRemark || "N/A"}</p>
                          <h3 className='text-center my-5'><b>Order</b></h3>
                          <p><b>Order Id :  </b>{allData.order?.orderId || "N/A"}</p>
                          <p><b>Order Date  :  </b>{allData.order?.orderDate || "N/A"}</p>
                          <p><b>Total Amount  :  </b>{allData.order?.totalAmount || "N/A"}</p>
                          <h3 className='text-center my-5'><b>Customer</b></h3>
                          <p><b>Customer Id  :  </b>{allData.order?.customer?.customerId || "N/A"}</p>
                          <p><b>Phone No  :  </b>{allData.order?.customer?.phoneNo || "N/A"}</p>
                          <p><b>Email  :  </b>{allData.order?.customer?.email || "N/A"}</p>
                          <h3 className='text-center my-5'><b>Customer Address</b></h3>
                          <p><b>Customer Address  :  </b>{allData.order?.customerAddress?.id || "N/A"}</p>
                          <p><b>Address Line1  :  </b>{allData.order?.customerAddress?.addressLine1 || "N/A"}</p>
                          <p><b>Address Type  :  </b>{allData.order?.customerAddress?.addressType || "N/A"}</p>
                          <p><b>Flat No  :  </b>{allData.order?.customerAddress?.flatNo || "N/A"}</p>
                          <p><b>House No  :  </b>{allData.order?.customerAddress?.houseNo || "N/A"}</p>
                          <p><b>Email  :  </b>{allData.order?.customerAddress?.pocEmail || "N/A"}</p>
                          <p><b>Name  :  </b>{allData.order?.customerAddress?.pocName || "N/A"}</p>
                          <p><b>Phone No  :  </b>{allData.order?.customerAddress?.pocPhoneNo || "N/A"}</p>
                          <h3 className='text-center my-5'><b>city</b></h3>
                          <p><b>City Id  :  </b>{allData.order?.customerAddress?.city?.cityId || "N/A"}</p>
                          <p><b>City Name  :  </b>{allData.order?.customerAddress?.city?.cityName || "N/A"}</p>
                          <h3 className='text-center my-5'><b>Country</b></h3>
                          <p><b>Country Id  :  </b>{allData.order?.customerAddress?.city?.countryId?.countryId || "N/A"}</p>
                          <p><b>Country Code  :  </b>{allData.order?.customerAddress?.city?.countryId?.countryCode || "N/A"}</p>
                          <p><b>Country Name  :  </b>{allData.order?.customerAddress?.city?.countryId?.countryName || "N/A"}</p>
                          <p><b>Currency Code  :  </b>{allData.order?.customerAddress?.city?.countryId?.currencyCode || "N/A"}</p>
                          <p><b>Telephone Prefix  :  </b>{allData.order?.customerAddress?.city?.countryId?.telephonePrefix || "N/A"}</p>
                          <h3 className='text-center my-5'><b>Billing Address</b></h3>
                          <p><b>Id  :  </b>{allData.order?.billingAddress?.id || "N/A"}</p>
                          <p><b>Address Line1 :  </b>{allData.order?.billingAddress?.addressLine1 || "N/A"}</p>
                          <p><b>Address Type  :  </b>{allData.order?.billingAddress?.addressType || "N/A"}</p>
                          <p><b>Flat No  :  </b>{allData.order?.billingAddress?.flatNo || "N/A"}</p>
                          <p><b>House No  :  </b>{allData.order?.billingAddress?.houseNo || "N/A"}</p>
                          <p><b>poc Email  :  </b>{allData.order?.billingAddress?.pocEmail || "N/A"}</p>
                          <p><b>poc Name  :  </b>{allData.order?.billingAddress?.pocName || "N/A"}</p>
                          <p><b>poc Phone No  :  </b>{allData.order?.billingAddress?.pocPhoneNo || "N/A"}</p>
                          <h3 className='text-center my-5'><b>city</b></h3>
                          <p><b>City Id  :  </b>{allData.order?.billingAddress?.city?.cityId || "N/A"}</p>
                          <p><b>City Name  :  </b>{allData.order?.billingAddress?.city?.cityName || "N/A"}</p>
                          <h3 className='text-center my-5'><b>Country</b></h3>
                          <p><b>Country Id  :  </b>{allData.order?.billingAddress?.city?.countryId?.countryId || "N/A"}</p>
                          <p><b>Country Code  :  </b>{allData.order?.billingAddress?.city?.countryId?.countryCode || "N/A"}</p>
                          <p><b>Country Name  :  </b>{allData.order?.billingAddress?.city?.countryId?.countryName || "N/A"}</p>
                          <p><b>Currency Code  :  </b>{allData.order?.billingAddress?.city?.countryId?.currencyCode || "N/A"}</p>
                          <p><b>Telephone Prefix  :  </b>{allData.order?.billingAddress?.city?.countryId?.telephonePrefix || "N/A"}</p>
                          <h3 className='text-center my-5'><b>Delivery Person</b></h3>
                          <p><b>City Id  :  </b>{allData.deliveryPerson?.deliveryPersonId || "N/A"}</p>
                          <p><b>Name  :  </b>{allData.deliveryPerson?.name || "N/A"}</p>
                          <p><b>First Mobile Number :  </b>{allData.deliveryPerson?.firstMobileNumber || "N/A"}</p>
                          <p><b>Second Mobile Number  :  </b>{allData.deliveryPerson?.secondMobileNumber || "N/A"}</p>
                          <p><b>Status  :  </b>{allData.deliveryPerson?.status || "N/A"}</p>
                          <p><b>Last Active Time  :  </b>{allData.deliveryPerson?.lastActiveTime || "N/A"}</p>
                          <p><b>Pincode  :  </b>{allData.deliveryPerson?.pincode || "N/A"}</p>
                          <p><b>Email  :  </b>{allData.deliveryPerson?.email || "N/A"}</p>
                          <p><b>Latitude  :  </b>{allData.deliveryPerson?.latitude || "N/A"}</p>
                          <p><b>Longitude  :  </b>{allData.deliveryPerson?.longitude || "N/A"}</p>
                          <p><b>isVarified  :  </b>{allData.deliveryPerson?.isVarified || "N/A"}</p>
                          <p><b>House No  :  </b>{allData.deliveryPerson?.houseNo || "N/A"}</p>
                          <p><b>FlatNo  :  </b>{allData.deliveryPerson?.FlatNo || "N/A"}</p>
                          <p><b>Address Line  :  </b>{allData.deliveryPerson?.addressLine || "N/A"}</p>
                          <h3 className='text-center my-5'><b>city</b></h3>
                          <p><b>City Id  :  </b>{allData.deliveryPerson?.city?.cityId || "N/A"}</p>
                          <p><b>City Name  :  </b>{allData.deliveryPerson?.city?.cityName || "N/A"}</p>
                          <h3 className='text-center my-5'><b>Country</b></h3>
                          <p><b>Country Id  :  </b>{allData.deliveryPerson?.city?.countryId?.countryId || "N/A"}</p>
                          <p><b>Country Code  :  </b>{allData.deliveryPerson?.city?.countryId?.countryCode || "N/A"}</p>
                          <p><b>Country Name  :  </b>{allData.deliveryPerson?.city?.countryId?.countryName || "N/A"}</p>
                          <p><b>Currency Code  :  </b>{allData.deliveryPerson?.city?.countryId?.currencyCode || "N/A"}</p>
                          <p><b>Telephone Prefix  :  </b>{allData.deliveryPerson?.city?.countryId?.telephonePrefix || "N/A"}</p>
                          
                         
                        </>
                    ):(
                      <p>Loading...</p>
                    )}
                      
                  </div>
                </div>
              </div>
            </div>
            <button onClick={allDetails} className=" flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 mx-auto">Go Back</button>
          </div>
        )}
      </>)
    }

export default AssignOrderDetails
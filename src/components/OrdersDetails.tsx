import axios from 'axios'
import React, {  useEffect, useState } from 'react'
import  baseURL from '../utils/axios'


const OrdersDetails = (props) => {
    const [ShippingAddress, setShippingAddress] = useState([])
    const [activeAddress, setactiveAddress] = useState(null)

    let {AllOrders, setactive, OrderIndex} = props
    console.log(OrderIndex)
    console.log(AllOrders)


    const hide = ()=>{
        setactive(false)
      }
      

    //   const getShippingAddress = ()=>{
    //     axios.get(baseURL+'customerAddress/findById/'+OrderIndex.shipping_id)
    //    .then(res=>{
    //     console.log(res.data.object)
    //     setShippingAddress(res.data.object)
    //   })
    //   setactiveAddress(true)
    // }


    const getShippingAddress = ()=>{
        setactiveAddress("Shipping")
        axios.get(baseURL+'customerAddress/findById/'+OrderIndex.customer_Address_id)
       .then(res=>{
        setShippingAddress(res.data.object)
      }).catch(err => {
        console.log(err)
      })
    }


    const getBillingAddress = ()=>{
      setactiveAddress("Billing")
      axios.get(baseURL+'billingAddress/findById/'+OrderIndex.billing_address_id)
      .then(res=>{
       setShippingAddress(res.data.object)
     }).catch(err => {
       console.log(err)
     })
    }


    return (
    
        <div className="rounded-sm border relative border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                  <button onClick={hide} className='text-5xl absolute right-[15px] top-0 text-black'>x</button>

          <div className="max-w-full overflow-x-auto pt-4 px-8">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Item ID
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Item Name
                  </th>
                  <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                    Quantity
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {OrderIndex.order_details.map((packageItem, key) => (
                  <tr key={key}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                        <p className="text-black dark:text-white">
                            {packageItem.item_id}
                        </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">

                      <h5 className="font-medium text-black dark:text-white">
                        {packageItem.item_name}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                            {packageItem.quantity}
                        </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                            ${packageItem.price}
                        </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className=' flex w-full justify-between p-8 '>
                <div>
                    Costomer ID : {OrderIndex.customer_id}
                </div>
                <div className='pr-5'>
                    Total Amount : ${OrderIndex.total_amount}
                </div>
            </div>
            <hr />
            <div className=' flex w-full justify-between p-8 '>
                    <div onClick={getShippingAddress} className={` pr-5 inline-flex items-center cursor-pointer justify-center gap-2.5 py-4 px-10 text-center font-medium border-2 border-meta-3  ${activeAddress === "Shipping" ? 'bg-meta-3 text-white': 'bg-white text-meta-3'} hover:bg-opacity-90 lg:px-8 xl:px-10`}>
                        Shipping Address
                    </div>
                    <div onClick={getBillingAddress} className={` pr-5 inline-flex items-center cursor-pointer justify-center gap-2.5 py-4 px-10 text-center font-medium border-2 border-meta-3 ${activeAddress === "Billing" ? 'bg-meta-3 text-white': 'bg-white text-meta-3'} hover:text-opacity-90 lg:px-8 xl:px-10`}>
                        Billing Address
                    </div>
            </div>

    { ShippingAddress.length === 0 ? 
    null
    :
    <div className={` ${activeAddress !== null ? "flex" : "hidden"} flex-col w-full justify-between px-8 gap-4  mb-5`}>
        <h3 className='font-bold text-black text-xl'>{activeAddress} Address &#40;{ShippingAddress.addressType}&#41;</h3>
        <p><span className='font-bold'>House No.:</span> {ShippingAddress.houseNo}</p>
        <p><span className='font-bold'>Flat No.:</span> {ShippingAddress.flatNo}</p>
        <p><span className='font-bold'>Landmark:</span> {ShippingAddress.landmark}</p>
        <p><span className='font-bold'>Address Line:</span> {ShippingAddress.addressLine1}</p>
        <p><span className='font-bold'>City:</span> {ShippingAddress.cityId.cityName}, &#40;{ShippingAddress.cityId.countryId.countryName}&#41;</p>
    </div>
}


          </div>
        </div>

      )
}

export default OrdersDetails
import React, { useEffect, useState } from 'react'
import baseURL from '../utils/axios'
import axios from 'axios'

const UpdateVendor = (props) => {

    const {vendorData, setVendorData , email, name, phone, setphone, setemail, setname, Id,  setBgColor, setDisplay2, setevents} = props


    const update = (e)=>{
        e.preventDefault()

        for(let i of vendorData){
            if(i.vendorId == Id){
                let index = vendorData.indexOf(i)
                // console.log(i)
                vendorData.splice(index, 1 , {
                    vendorId: Id,
                    email: email,
                    vendor_name: name,
                    phone_no: phone
                } )
            }
        }


        axios.put(baseURL+'vendor/update', {
            vendorId: Id,
            email: email,
            vendor_name: name,
            phone_no: phone
        })
     .then(res => {
        console.log(res.status)
      })

      
      
      setBgColor("blur-none")
      setDisplay2("hidden") 
      setevents("pointer-events-auto")
     }

     const hide = ()=>{
        setBgColor("blur-none")
         setDisplay2("hidden") 
         setevents("pointer-events-auto")
      }
    

  return (
    <>
        <div className="rounded-sm h-full absolute w-full z-20 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark bg-white">
            <h3 className="font-medium text-black dark:text-white">
            Update Vendor
            </h3>
            </div>
            <form action="#"  onSubmit={update} className='bg-white shadow-6 shadow-black'>
            <div className="p-6.5">
            <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                Name
                </label>
                <input
                    onChange={(event)=>setname(event.target.value)}
                type="text"
                value={name}
                placeholder="Enter your full name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
            </div>

            <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                Email
                </label>
                <input
                    onChange={(event)=>setemail(event.target.value)}
                type="email"
                value={email}
                placeholder="Enter your email address"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
            </div>

            <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                Contact
                </label>
                <input
                    onChange={(event)=>setphone(event.target.value)}
                    type="contact"
                    value={phone}
                    placeholder="Enter contact"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
            </div>

            <div className='flex gap-10'>
                <button type='submit' className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                    Update Vendor
                </button>
               
            </div>

            </div>
            </form>
            <button onClick={hide} className="flex w-full justify-center rounded bg-red-500 p-3 font-medium text-gray hover:bg-opacity-90">
                    Cancle
                </button>
        </div>
    </>
  )
}

export default UpdateVendor
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from "axios"
import baseUrl from '../../utils/axios';

export default function addDeliveryPerson() {
    let[name,setname]=useState("")
    let[firstMobileNumber,setfirstMobileNumber]=useState("")
    let[secondMobileNumber,setsecondMobileNumber]=useState("")
    let[status,setstatus]=useState("")
    let[lastActiveTime,setlastActiveTime]=useState("")
    let[city,setcity]=useState("")
    let[pincode,setpincode]=useState("")
    let[email,setemail]=useState("")
    let[latitude,setlatitude]=useState("")
    let[longitude,setlongitude]=useState("")
    const {register,handleSubmit,reset}=useForm();
  return (
    <>
     <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Add Delivery Person
          </h3>
        </div>
        <form onSubmit={handleSubmit((data) =>{
            console.log(data)
            let val=
              {
              "name": name,
              "firstMobileNumber": firstMobileNumber,
              "secondMobileNumber": secondMobileNumber,
              "status": status,
              "lastActiveTime": lastActiveTime,
              "city": city,
              "pincode": pincode,
              "email": email,
              "latitude": Number(latitude),
              "longitude": Number(longitude),
            }

            axios.post(baseUrl + 'deliveryPeople/' ,val,{
              headers: {
                'Content-Type': 'Application/json' // Set the content type to multipart/form-dat
              }
            }).then((res) => {
              console.log(res.data);
            }).catch((err)=>{
              console.log("error",err)
            });

            reset();
          }
      )} >
          <div className="p-6.5">
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
              Name
              </label>
              <input
                type="text" id="name" onChange={(e) => setname(e.target.value)}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
              First Mobile Number
              </label>
              <input type="text" class="form-control" onChange={(e) => setfirstMobileNumber(e.target.value)} id="longitute" 
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
              Second Mobile Number
              </label>
              <input
                 type="text" class="form-control" onChange={(e) => setsecondMobileNumber(e.target.value)} id="secondMobileNumber"
                placeholder="Enter number"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
    
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
             Status
              </label>
              <input
                type="text" class="form-control" onChange={(e) => setstatus(e.target.value)} id="vfid" 
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
              lastActiveTime
              </label>
              <input
                type="datetime-local" class="form-control" onChange={(e) => setlastActiveTime(e.target.value)} id="vfid" 
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
              City
              </label>
              <input
                type="text" class="form-control" onChange={(e) => setcity(e.target.value)} id="vfid" 
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
              Pincode
              </label>
              <input
                type="text" class="form-control" onChange={(e) => setpincode(e.target.value)} id="vfid" 
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
              Email
              </label>
              <input
                type="text" class="form-control" onChange={(e) => setemail(e.target.value)} id="vfid" 
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
              Latitude
              </label>
              <input
                type="text" class="form-control" onChange={(e) => setlatitude(e.target.value)} id="vfid" 
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
              Longitude
              </label>
              <input
                type="text" class="form-control" onChange={(e) => setlongitude(e.target.value)} id="vfid" 
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
            >
              Add DarkStore
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

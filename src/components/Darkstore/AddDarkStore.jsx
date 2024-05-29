import React, { useState,useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from "axios"
import baseUrl from '../../utils/axios';

export default function addDarkStore() {
const {register,handleSubmit,reset}=useForm();
let [latitude,setlatitude]=useState("")
let [longitute,setlongitute]=useState("")
let [storeName,setstoreName]=useState("")
let [vendorFranchiseeId,setvendorFranchiseeId]=useState("")
let [cityId,setcityId]=useState("")
let [cityData,setcityData]=useState([])


useEffect(()=>{
  GetData()
},[])

function GetData(){
  axios.defaults.headers.common['ngrok-skip-browser-warning'] = 'any value';
  axios
    .get(baseUrl + 'city/' )
    .then((res) => {
      setcityData(res.data.object)
      // console.log(res.data.object)
      // console.log(cityData)
    })
    .catch((err) => {
      console.log(err);
    });
}
console.log(cityData)

  return (
<>
<div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Add Store</h3>
        </div>
        <form onSubmit={handleSubmit((data) =>{
            console.log(data)
            // GetData()
            let val=
              {"latitude": Number(latitude)
              , "longitute": Number(longitute),
               "storeName": storeName, 
               "cityId": Number(cityId), 
               "vendorFranchiseeId": Number(vendorFranchiseeId)}

            // let val={"latitude": 11.0,
            // "longitude": 44.0,
            // "storeName": "dark store 8",
            // "cityId": 1,
            // "vendorFranchiseeId": 1}
            
            console.log(Number(cityId))
            axios.post(baseUrl + 'darkStore/' ,val,{
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
              Latitute
              </label>
              <input
                type="text" {...register("latitude")}  id="latitute" onChange={(e) => setlatitude(e.target.value)}
                // value="vendor_name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Longitute
              </label>
              <input type="text" class="form-control" {...register("longitute")} onChange={(e) => setlongitute(e.target.value)} id="longitute" 
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
               Store Name
              </label>
              <input
                // value="number"
                 type="text" class="form-control" {...register("storeName")} onChange={(e) => setstoreName(e.target.value)} id="storename"
                placeholder="Enter number"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
             City Name
              </label>
             <select {...register("cityId")} onChange={(e) => setcityId(e.target.value)}
                               className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
             >
             <option value={cityId}>Select a city</option>
             {
                cityData.map((element,key)=>{
                  return <option onChange={(e) => setcityId(e.target.value)} key={key} value={element.cityId}>{element.cityId}</option>
                })
                // cityData.map((element, key) => (
                //     <div div className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                //       <p className="text-black dark:text-white">
                //         {element.cityId}
                //       </p></div>
                //     )
                //     )
              }
              
             </select>
            </div>
           
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
             Vendor Franchisee Id
              </label>
              <input
                // value="number"
                type="text" class="form-control" {...register("vendorFranchiseeId")} onChange={(e) => setvendorFranchiseeId(e.target.value)} id="vfid" 
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
      </div></>
  )
}


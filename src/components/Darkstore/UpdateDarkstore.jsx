import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import baseURL from '../../utils/axios';

const UpdateVendor = (props) => {
    const {register,handleSubmit,reset}=useForm();
    let [cityData,setcityData]=useState([])


useEffect(()=>{
  GetData()
},[])

function GetData(){
  axios.defaults.headers.common['ngrok-skip-browser-warning'] = 'any value';
  axios
    .get(baseURL + 'city/' )
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

    let {list,setList,latitute,setlatitute,longitute,setlongitute,cityId,setcityId,storeName,setstoreName,vendorFranchiseeId,setvendorFranchiseeId,setupdatevalue,storeId,setstoreId}=props
    function updateOff(){
        setupdatevalue(false)
    }
    const UpdateHandler = (e)=>{
        //console.log(e.target.value)
        setlatitute(e.target.value)
      }

  return (
    <>
        <div className="rounded-sm h-full absolute w-full z-20 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark bg-white">
            <h3 className="font-medium text-black dark:text-white">
            Update Dark Store
            </h3>
            </div>
            <form action="#" onSubmit={handleSubmit(() =>{
        let val=
          {
            latitute: latitute,
            longitute: longitute,
            storeName: storeName,
            cityId: Number(cityId),
            vendorFranchiseeId: vendorFranchiseeId,
            storeId:storeId
          }
        
        console.log()
        axios.put(baseURL + 'darkStore/' +storeId,val,{
          headers: {
            'Content-Type': 'Application/json' // Set the content type to multipart/form-dat
          }
        }).then((res) => {
          console.log(res.data);
        });

        props.setupdatevalue(false)
        reset();})} className='bg-white shadow-6 shadow-black'>
            <div className="p-6.5">
            <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                Latitute
                </label>
                <input
                   type="text" class="form-control" {...register("latitute")}  value={latitute} id="latitute" 
                   onChange={(e)=>{UpdateHandler(e)}}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
            </div>

            <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                Longitute
                </label>
                <input type="text" class="form-control" {...register("longitute")} value={longitute} id="longitute"
        onChange={(e)=>{setlongitute(e.target.value)}}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
            </div>

            <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                Store Name
                </label>
                <input type="text" class="form-control" {...register("storename")} value={storeName} id="storename"
        onChange={(e)=>{setstoreName(e.target.value)}}
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
                  return <option onChange={(e) => setcityId(e.target.value)} key={key} value={element.cityId}>{element.cityName}</option>
                })
              }
              
             </select>
            </div>

            <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                vendor franchisee
                </label>
                <input type="text" class="form-control" {...register("vendorfranchiseeId")} value={vendorFranchiseeId} 
        onChange={(e)=>{setvendorFranchiseeId(e.target.value)}}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
            </div>


            <div className='flex gap-10'>
                <button type='submit' className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                    Update Dark Store
                </button>
               
            </div>

            </div>
            </form>
            <button onClick={updateOff} className="flex w-full justify-center rounded bg-red-500 p-3 font-medium text-gray hover:bg-opacity-90">
                    Cancel
                </button>
        </div>
    </>
  )
}

export default UpdateVendor
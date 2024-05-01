import React, { useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import baseURL from '../../utils/axios';

export default function updateDeliveryPerson(props) {
    const {register,handleSubmit,reset}=useForm();
    let data=props.updataDeliveryPersonData
    function hide(){
        console.log(data)
        props.setisUpdate(false)
    }
  return (
    <>
     <div className="rounded-sm h-full absolute w-full z-20 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark bg-white">
            <h3 className="font-medium text-black dark:text-white">
            Update Delivery Person Data
            </h3>
            </div>
        <form onSubmit={handleSubmit((val) =>{
        console.log(val)
        val.latitude=Number(val.latitude)
        val.longitude=Number(val.longitude)
        axios.put(baseURL + 'deliveryPeople/'+data.id,val,{
          headers: {
            'Content-Type': 'Application/json'
          }
        }).then((res) => {
          console.log(res.data);
        });

        props.setisUpdate(false)
        reset();})}
         className='bg-white shadow-6 shadow-black'>
            <div className="p-6.5">
            <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                Name
                </label>
                <input
                   type="text" class="form-control" {...register("name")}  defaultValue={data.name} id="name" 
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
            </div>

            <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                First Mobile Number
                </label>
                <input type="text" class="form-control" {...register("firstMobileNumber")} defaultValue={data.firstMobileNumber} id="firstMobileNumber"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
            </div>
            <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                Second Mobile Number
                </label>
                <input type="text" class="form-control" {...register("secondMobileNumber")} defaultValue={data.secondMobileNumber} id="secondMobileNumber"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
            </div>
            <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                Status
                </label>
                <input type="text" class="form-control" {...register("status")} defaultValue={data.status} id="status"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
            </div>
            <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                Last Active Time
                </label>
                <input type="datetime-local" class="form-control" {...register("lastActiveTime")} defaultValue={data.lastActiveTime} id="lastActiveTime"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
            </div>
            <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                City
                </label>
                <input type="text" class="form-control" {...register("city")} defaultValue={data.city} id="city"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
            </div>
            <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                Pincode
                </label>
                <input type="text" class="form-control" {...register("pincode")} defaultValue={data.pincode} id="pincode"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
            </div>
            <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                Email
                </label>
                <input type="text" class="form-control" {...register("email")} defaultValue={data.email} id="email"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
            </div>
            <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                Latitude
                </label>
                <input type="text" class="form-control" {...register("latitude")} defaultValue={data.latitude} id=""
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
            </div>
            <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                Longitute
                </label>
                <input type="text" class="form-control" {...register("longitude")} defaultValue={data.longitude} id=""
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
            </div>


            <div className='flex gap-10'>
                <button type='submit' className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                    Update Delivery Person
                </button>
               
            </div>

            </div>
            </form>
            <button onClick={hide} className="flex w-full justify-center rounded bg-red-500 p-3 font-medium text-gray hover:bg-opacity-90">
                    Cancel
            </button>
        </div>
    </>
  )
}

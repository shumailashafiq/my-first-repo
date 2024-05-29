import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import baseURL from '../../utils/axios'

function AddStock() {
    const navigat=useNavigate()
const [data,setData]=useState({
   stock:'',
   stockItemId:'',
   darkStoreId:''
})

function handleSubmit(event){
 event.preventDefault()
 axios.post(baseURL+'')
 .then(res=>{
    console.log(res.data)
    navigat('/')
 })
}

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
      <h3 className="font-medium text-black dark:text-white">Add Stock</h3>
    </div>
    <form action="#" 
    onSubmit={handleSubmit}
    >
      <div className="p-6.5">
        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            stock
          </label>
          <input
            type="text"
            onChange={(e) =>setData({...data,stock:e.target.value})}
            // value="vendor_name"
            
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>

        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
           Product Item Id
          </label>
          <input
            onChange={(e) => setData({...data,productItemId:e.target.value})}
            // value="vendor_email"
            type="text"
            
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>

        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            DarkStore Id
          </label>
          <input
            // value="number"
            onChange={(e) => setData({...data,darkStoreId:e.target.value})}
            type="text"
           
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>


        <button
          type="submit"
          className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
        >
          Add Stock
        </button>
      </div>
    </form>
  </div>
  )
}

export default AddStock
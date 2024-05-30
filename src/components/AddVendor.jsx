import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate, useOutletContext, useRouteLoaderData } from 'react-router-dom';
import baseURL from '../utils/axios';

const CreateVendorForm = () => {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [phone, setphone] = useState('');

  const navigate = useNavigate();

  const Add = (event) => {
    event.preventDefault()
    console.log(name, email, phone);
    navigate('/vendor');
    
    axios
    .post(baseURL + 'vendor/', {
      email: email,
      vendor_name: name,
      phone_no: phone,
    })
    .then((res) => {
      console.log(res.status);
      // window.location.reload();
    });
    // navigate('/vendor');
    
  };

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Add Vendor</h3>
        </div>
        <form action="#" onSubmit={Add}>
          <div className="p-6.5">
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Name
              </label>
              <input
                type="text"
                onChange={(e) => setname(e.target.value)}
                // value="vendor_name"
                placeholder="Enter your full name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div> 

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Email
              </label>
              <input
                onChange={(e) => setemail(e.target.value)}
                // value="vendor_email"
                type="email"
                placeholder="Enter your email address"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Contact Number
              </label>
              <input
                // value="number"
                onChange={(e) => setphone(e.target.value)}
                type="contact"
                placeholder="Enter number"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
            >
              Add Vendor
            </button>
            
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateVendorForm;

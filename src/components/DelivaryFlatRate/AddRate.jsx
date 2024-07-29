import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import axios from 'axios';
import baseURL from '../../utils/axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function AddRate() {
  const [date, setDate] = useState(null)
  const [rate, setRate] = useState(0)
  const navigate=useNavigate()

  const handleDate = (date) => {
    setDate(date)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const formatted = moment(date).format('YYYY-MM-DDTHH:mm:ss')
    axios.post(`${baseURL}standardRates/`, {
      "flatRatePerDelivery": Number(rate),
      "effectiveDate": formatted
    })
      .then((res) => {
        console.log(res.data)
        Swal.fire({
          title: 'Success!',
          text: 'Rate is successfully added!',
          icon: 'success',
          confirmButtonText: 'OK'
        })
        .then(()=>{
          navigate('/standardRates')
          window.location.reload()
        })
      }).catch((err) => {
        console.log(err)
        Swal.fire({
          title: 'Error!',
          text: 'Sorry, Rate is not added. Try again later.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      })
  }
  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Add Standard Rate
          </h3>
        </div>
        <form action="#"
          onSubmit={handleSubmit}
        >
          <div className="p-6.5">
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Flat Rate
              </label>
              <input
                type="number"
                onChange={(e) => setRate(e.target.value)}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Effective Date
              </label>
              <DatePicker
                className="text-black text-center p-1 border-2 w-90 border-black rounded focus:outline-none focus:border-black-500 hover:border-black transition duration-200 ease-in-out"
                placeholderText="Start Date"
                selected={date}
                onChange={handleDate}
                showTimeSelect
                timeFormat="HH:mm:ss.SSS"
                timeIntervals={15}
                dateFormat="dd/MM/yyyy HH:mm:ss"
                isClearable
              />
            </div>
            <button
              type='submit'
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
            >
              Add Rate
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddRate
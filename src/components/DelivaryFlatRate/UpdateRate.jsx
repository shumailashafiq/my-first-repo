import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import axios from 'axios';
import Swal from 'sweetalert2';
import baseURL from '../../utils/axios';

function UpdateRate(props) {
  const { id, forUpdate, setId, allData, setAllData } = props;
  const [flatRatePerDelivery, setFlatRatePerDelivery] = useState(forUpdate.flatRatePerDelivery);
  const [effectiveDate, setEffectiveDate] = useState(new Date(forUpdate.effectiveDate));

  useEffect(() => {
    setFlatRatePerDelivery(forUpdate.flatRatePerDelivery);
    setEffectiveDate(new Date(forUpdate.effectiveDate));
  }, [forUpdate]);

  const hide = () => {
    setId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedDate = moment(effectiveDate).format('YYYY-MM-DDTHH:mm:ss.SSS');
    const updateData= {
        "flatRatePerDelivery": Number(flatRatePerDelivery),
        "effectiveDate": formattedDate
      }
    axios.put(`${baseURL}standardRates/updateRates/${id}`,updateData)
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          title: 'Success!',
          text: 'Rate is successfully updated!',
          icon: 'success',
          confirmButtonText: 'OK'
        })
        .then(() => {
          hide();
        });
         const updatedData = allData.map(e =>
                    e.standardRateId=== id ? { ...e, ...updateData} : e
                  );
                  setAllData([...updatedData])
      }).catch((err) => {
        console.log(err);
        Swal.fire({
          title: 'Error!',
          text: 'Sorry, Rate is not updated. Try again later.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  };

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Update Standard Rate
          </h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6.5">
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Flat Rate
              </label>
              <input
                type="number"
                value={flatRatePerDelivery}
                onChange={(e) => setFlatRatePerDelivery(e.target.value)}
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
                selected={effectiveDate}
                onChange={(date) => setEffectiveDate(date)}
                showTimeSelect
                timeFormat="HH:mm:ss.SSS"
                timeIntervals={15}
                dateFormat="dd/MM/yyyy HH:mm:ss.SSS"
                isClearable
              />
            </div>
            <button
              type="submit"
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
            >
              Update Rate
            </button>
            <button onClick={hide} className="mt-5 flex w-full justify-center rounded bg-red-500 p-3 font-medium text-gray hover:bg-opacity-90">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdateRate;

import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import baseURL from '../../utils/axios';
import Swal from 'sweetalert2';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

const AddBannerForm = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const navigate = useNavigate();
  const mainImageRef = useRef<HTMLInputElement>(null);
  const [bannerData, setBannerData] = useState({
    bannerTitle: '',
    date: '',
    imageUrl: '',
    targetUrl: '',
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!startDate) {
      Swal.fire({
        title: 'Error!',
        text: 'Please select a date.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    const formattedStartDate = moment(startDate).format('YYYY-MM-DD');

    const formData = new FormData();
    formData.append('bannerTitle', bannerData.bannerTitle);
    formData.append('date', formattedStartDate);
    formData.append('targetUrl', bannerData.targetUrl);

    if (mainImageRef.current && mainImageRef.current.files && mainImageRef.current.files.length > 0) {
      formData.append('imageUrl', mainImageRef.current.files[0]);
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Please select an image.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    axios
      .post(`${baseURL}/banner/saveImage`, formData)
      .then((res) => {
        setBannerData(res.data);
        console.log(res.data);

        Swal.fire({
          title: 'Success!',
          text: 'Banner is successfully added!',
          icon: 'success',
          confirmButtonText: 'OK',
        });

        navigate('../');
      })
      .catch((err) => {
        console.log(err);

        Swal.fire({
          title: 'Error!',
          text: 'Sorry, Banner is not added. Try again later.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      });
  };

  const handleDateChange = (date: Date | null) => {
    setStartDate(date);
    setBannerData((prevData) => ({
      ...prevData,
      date: date ? moment(date).format('YYYY-MM-DD') : '',
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBannerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">Add Banner</h3>
      </div>
      <form onSubmit={handleFormSubmit}>
        <div className="p-6.5">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Date
            </label>
            <DatePicker
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              placeholderText="Enter your Date"
              dateFormat="yyyy-MM-dd"
              selected={startDate}
              onChange={handleDateChange}
              isClearable
            />
          </div>

          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Images
            </label>
            <input
              type="file"
              ref={mainImageRef}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Target Url
            </label>
            <input
              type="text"
              name="targetUrl"
              value={bannerData.targetUrl}
              onChange={handleInputChange}
              placeholder="Enter your Url"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Title
            </label>
            <input
              type="text"
              name="bannerTitle"
              value={bannerData.bannerTitle}
              onChange={handleInputChange}
              placeholder="Enter your Title"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <button
            type="submit"
            className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
          >
            Add Banner
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBannerForm;

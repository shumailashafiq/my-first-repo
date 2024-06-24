import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import baseURL from '../../utils/axios';
import Swal from 'sweetalert2';

const AddBannerForm = () => {
  const navigate = useNavigate();
  const mainImageRef = useRef(null);
  const [bannerData, setBannerData] = useState({
    bannerTitle: '',
    targetUrl: '',
  });

  const handleFormSubmit = (e:any) => {
    e.preventDefault();

    const formData = new FormData();

    if (mainImageRef.current && mainImageRef.current.files && mainImageRef.current.files.length > 0) {
      formData.append('image', mainImageRef.current.files[0]);
    }

    const infoDetails = JSON.stringify({
      bannerTitle: bannerData.bannerTitle,
      targetUrl: bannerData.targetUrl,
    });
    formData.append('infoDetails', infoDetails);

    axios.post(`${baseURL}banner/saveImage`, formData , {
      headers: {
        'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
      },
    })
      .then((res) => {
        console.log(res.data)
        setBannerData({
          bannerTitle: '',
          targetUrl: '',
        });

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

  const handleInputChange = (e:any) => {
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
            <label className="mb-2.5 block text-black dark:text-white">Image</label>
            <input
              type="file"
              ref={mainImageRef}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">Target Url</label>
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
            <label className="mb-2.5 block text-black dark:text-white">Title</label>
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

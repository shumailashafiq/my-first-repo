import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import baseURL from '../../utils/axios';
import Swal from 'sweetalert2';

const AddBannerForm = () => {
  const navigate = useNavigate();
  const mainImageRef = useRef(null);
  const [image, setImage] = useState([]);
  const [bannerData, setBannerData] = useState({
    bannerTitle: '',
    targetUrl: '',
    imageUrl: '',
  });

  const handleFormSubmit = (e: any) => {
    e.preventDefault();

    const formData = new FormData();

    if (
      mainImageRef.current &&
      mainImageRef.current.files &&
      mainImageRef.current.files.length > 0
    ) {
      formData.append('image', mainImageRef.current.files[0]);
    }

    const infoDetails = JSON.stringify({
      bannerTitle: bannerData.bannerTitle,
      targetUrl: bannerData.targetUrl,
    });

    formData.append('infoDetails', infoDetails),{ type: 'application/json' };
   
    axios.defaults.headers.common['ngrok-skip-browser-warning'] = 'any value';
    axios
      .post(`${baseURL}banner/saveImage`, formData)
      .then((res) => {
        console.log('uploaded successfully:', res.data);

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

    if (mainImageRef.current) {
      mainImageRef.current.value = '';
    }
    setImage([]);
    setBannerData({
      bannerTitle: '',
      targetUrl: '',
      imageUrl: '',
    });
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setBannerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImage = (event: any) => {
    const files = event.target.files;

    if (files) {
      const imagesArray = Array.from(files);
      setImage(imagesArray);
      console.log(imagesArray);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">Add Banner</h3>
      </div>
      <form onSubmit={handleFormSubmit}>
        <div className="p-6.5">
          <div>
            <div>
              {image.map((img, index) => (
                <div
                  key={index}
                  className="h-[50px] w-[70px] relative overflow-hidden rounded"
                >
                  <img
                    className="h-[50px] w-[70px] object-cover"
                    src={URL.createObjectURL(img)} //  display the uploaded image
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="mb-4.5">
            <div>
              <label className="mb-2.5 block text-black dark:text-white">
                Image
              </label>
              <input
                type="file"
                ref={mainImageRef}
                multiple
                onChange={handleImage}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
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

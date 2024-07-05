import { useState, useEffect, useRef } from 'react';
import baseURL from '../../utils/axios';
import Swal from 'sweetalert2';
import axios from 'axios';

const UpdateBanner = (props: any) => {
  const { bannerData, setDisplay2, setBgColor, setevents, setBannerData } = props;
  const [updatedBanner, setUpdatedBanner] = useState({
    id: bannerData.id,
    bannerTitle: bannerData.bannerTitle,
    targetUrl: bannerData.targetUrl,
    imageUrl: bannerData.imageUrl,
  });
  const [image, setImage] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setUpdatedBanner({
      id: bannerData.id,
      bannerTitle: bannerData.bannerTitle,
      targetUrl: bannerData.targetUrl,
      imageUrl: bannerData.imageUrl,
    });
  }, [bannerData]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setUpdatedBanner((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImage = (event: any) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const update = (e: any) => {
    e.preventDefault();

    const formData = new FormData();

    if (
      fileInputRef.current &&
      fileInputRef.current.files &&
      fileInputRef.current.files.length > 0
    ) {
      formData.append('image', fileInputRef.current.files[0]);
    }

    const infoDetails = JSON.stringify({
      bannerTitle: updatedBanner.bannerTitle,
      targetUrl: updatedBanner.targetUrl,
    });

    formData.append(
      'infoDetails',
      new Blob([infoDetails], { type: 'application/json' }),
    );

    axios.defaults.headers.common['ngrok-skip-browser-warning'] = 'any value';
    axios
      .put(`${baseURL}banner/update/${updatedBanner.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log('Updated successfully:', res.data);
        Swal.fire({
          title: 'Success!',
          text: 'Banner is successfully updated!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        setBannerData((prevBanners) =>
          prevBanners.map((banner) =>
            banner.id === updatedBanner.id ? res.data : banner
          )
        );
        hide();
      })
      .catch((error) => {
        console.error('Error updating banner:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Sorry, banner is not updated. Try again later.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      });
  };

  const hide = () => {
    setBgColor('blur-none');
    setDisplay2('hidden');
    setevents('pointer-events-auto');
  };

  return (
    <div className=" mt-10 fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto w-full ">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <div className="justify-between flex">
            <h3 className="font-medium text-black dark:text-white">
              Update Banner
            </h3>
            <button
              onClick={hide}
              className="p-1 text-gray hover:bg-gray-200 hover:rounded-md hover:p-1"
            >
              Close
            </button>
          </div>
        </div>

        <form onSubmit={update}>
          <div className="p-6.5">
            <div className="col-span-6 mb-4.5">
              <label className="mb-3 block text-black dark:text-white">
                Title:
              </label>
              <input
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-6 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:active:border-primary"
                type="text"
                placeholder="Title"
                name="bannerTitle"
                value={updatedBanner.bannerTitle}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="col-span-6 mb-4.5">
              <label className="mb-3 block text-black dark:text-white">
                Target URL:
              </label>
              <input
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-6 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:active:border-primary"
                type="text"
                placeholder="URL"
                name="targetUrl"
                value={updatedBanner.targetUrl}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="col-span-6 mb-4.5">
              <label className="mb-3 block text-black dark:text-white">
                Image:
              </label>
              <input
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-6 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:active:border-primary"
                type="file"
                accept="image/*"
                onChange={handleImage}
                ref={fileInputRef}
              />
            </div>

            <div className="col-span-6">
              <button
                className="inline-flex items-center justify-center rounded-md border border-primary py-4 px-8 text-center font-medium text-white hover:bg-opacity-90 lg:px-10 xl:px-8 2xl:px-10 bg-blue-500"
                type="submit"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBanner;

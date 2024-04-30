import baseURL from '../../utils/axios';
import DefaultLayout from '../../layout/DefaultLayout';
import { Outlet, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import axios from 'axios';
import TableLoader from '../../components/Loaders/TableLoader'

const ProductItemImage = () => {
  const [image, setImage] = useState('');
  const [Id, setId] = useState(null);
  const [productItem, setProductItem] = useState([null]);
  // const [isLoading, setIsLoading] = useState(true); // Track loading state

  const navigate = useNavigate();

  const handleImage = (event) => {
    setImage(event.target.files[0]);
    console.log(event.target.file[0]);
  };

  const handleClick = () => {
    const formDataa = new FormData();
    formDataa.append('image', image);

    axios
      .post(baseURL + 'saveImage/', formDataa, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
        },
      })
      .then((res) => {
        console.log(res.data);
      });

    navigate('../');
  };

  const getProductItem = () => {
    axios
      .get(baseURL + 'productItem/')
      .then((res) => {
        setProductItem(res.data.object);
      })
      .catch((err) => {
        console.log(err);
      })

      // .finally(() => {
      //   setIsLoading(false); // Turn off loading indicator regardless of success or failure
      // });
  };

  useEffect(() => {
    getProductItem();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Product Item" />

      <Outlet />

      <div className="mb-4.5">
        <label className="mb-2.5 block text-black dark:text-white">
          Product Item Name
        </label>

        {productItem !==null ? (
             
               "loading...."
              ) : (

        <select
          onChange={(event) => setId(event.target.value)}
          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          
        >
          <option value={Id}>Select a Product Items </option>

          {productItem.map((Item) => (
            <option
              key={Item.item_id}
              value={Item.item_id}
            >
              {Item.items?.item_name}
            </option>
          ))}
        </select>
          )}
      </div>

      <div>
        <label className="mb-2.5 block text-black dark:text-white">
          Product Item Image
        </label>
        <input
          type="file"
          onChange={handleImage}
          className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
        <button
          onClick={handleClick}
          type="submit"
          className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
        >
          Submit
        </button>
      </div>
    </DefaultLayout>
  );
};

export default ProductItemImage;

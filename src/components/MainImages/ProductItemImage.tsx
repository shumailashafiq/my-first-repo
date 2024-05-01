import baseURL from '../../utils/axios';
import DefaultLayout from '../../layout/DefaultLayout';
import { Outlet } from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import axios from 'axios';

const ProductItemImage = () => {
  const [image, setImage] = useState('');
  const [Id, setId] = useState(null);
  const [productItem, setProductItem] = useState<any>(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    getProductItem();
  }, []);

  const getProductItem = () => {
    axios
      .get(baseURL + 'productItem/')
      .then((res) => {
        setProductItem(res.data.items);
        console.log(res)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleImage = (event: any) => {
    const file = event.target.files[0];
    if (file) {  
      setImage(file);
      console.log(file);
    }
  };

  const handleClick = () => { 

    // let data = {
    //   productItem : item_name,
    // }

    const formData = new FormData();
    formData.append('mainImage', image);
    formData.append('productName',JSON.stringify(Id)); 

    axios
      .post(baseURL + '/saveImage'+ Id, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res.data);
      });
  };
 
  const deleteHandler = () => { 
  
    axios
      .delete(baseURL + `/mainImage/${Id}`)
      .then((res) => {
        console.log('Image deleted successfully:', res.data);
        
      })
      .catch((error) => {
        console.error('Error deleting image:', error);
        
      });
  };


  return (
    <DefaultLayout>
      <Breadcrumb pageName="Product Item" />

      <Outlet />

      <div className="mb-4.5">
        <label className="mb-2.5 block text-black dark:text-white">
          Product Item Name
        </label>

        {!productItem ? (
          'loading....'
        ) : (
          <select
            onChange={(event: any) => setId(event.target.value)}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          >
            <option value={Id}>Select a Product Items </option>

            {productItem?.map((item: any) => (
              <option key={item.item_id} value={item.item_id}>
                {item.item_name}
               
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
          ref={fileInputRef}
          type="file"
          onChange={handleImage} 
          className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
        <button
          onClick={handleClick}
          type="submit"
          className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 mt-2"
        >
          Submit
        </button>

        <button
          onClick={deleteHandler}
          type="submit"
          className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 mt-2"
        >
          Delete
        </button>
      </div>
    </DefaultLayout>
  );
};

export default ProductItemImage;
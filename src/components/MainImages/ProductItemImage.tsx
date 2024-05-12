import baseURL from '../../utils/axios';
import DefaultLayout from '../../layout/DefaultLayout';
import { Outlet } from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import axios from 'axios';

const ProductItemImage = () => {
  const [image, setImage] = useState([]);
  const [Id, setId] = useState(null);
  const [productItem, setProductItem] = useState<any>(null);
  const fileInputRef = useRef(null);
  const [selectedVariationOptions, setSelectedVariationOptions] = useState([]);

  useEffect(() => {
    getProductItem();
  }, []);

  const getProductItem = () => {
    axios.defaults.headers.common['ngrok-skip-browser-warning'] = 'any value';
    axios
      .get(baseURL + 'productItem/')
      .then((res) => {
        setProductItem(res.data.items);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleImage = (event: any) => {
    const files = event.target.files;
    if (files) {
      const imagesArray = Array.from(files);

      imagesArray.forEach((file) => {
        setImage(imagesArray);
        console.log(imagesArray);
      });
    }
  };

  const handleSelectChange = (event) => {
    const selectedItemId = event.target.value;
    const selectedProductItem = productItem.find(
      (item) => item.item_id === parseInt(selectedItemId),
    );
    setImage(selectedProductItem.images);
    // console.log(selectedProductItem);
    setId(event.target.value);
    setSelectedVariationOptions(
      selectedProductItem.variations.flatMap((variation) => variation.options),
    );
    setId(selectedItemId);
  };


  //  const handleClick = () => {
  //   const formData = new FormData();
  //   image.forEach((image) => {
  //     formData.append(`MainImage`, image);
  //   });
  //   formData.append("MainImageData", JSON.stringify({'productItemId':Id}));

  //   axios
  //   .post(baseURL + `saveImage/`, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //     });
  // };

  const handleClick = () => {
    const formData = new FormData();
    // formData.append('VariationImage', image);
    // formData.append('VariationImageData', JSON.stringify(Id));
    formData.append('ProductItemId', Id);
    selectedVariationOptions.forEach((option) => {
      formData.append('VariationOptionIds', option.VOID);
    });
    image.forEach((image) => {
      formData.append(`VariationImage`, image);
    });

    axios
      .post(baseURL + `upload/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  // const handleClick = () => {
  //   const formData = new FormData();

  //   image.forEach((image) => {
  //     formData.append(`VariationImage`, image);
  //   });

  //   formData.append('productItemId', Id);
  //   // formData.append("variationOptionId", JSON.stringify(Id));

  //   formData.append(
  //     'VariationImageData',
  //     JSON.stringify({
  //       ProductItemId: Id,
  //       // variationOptionId: Id,
  //     }),
  //   );

  //   selectedVariationOptions.forEach((option) => {
  //     formData.append('variationOptionId', option.VOID);
  //   });

  //   axios
  //     .post(baseURL + `upload/`, formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //     });
  // };

  const deleteHandler = (Id: number) => {
    axios
      .delete(baseURL + `mainImage/${Id}`)
      .then((res) => {
        console.log('Image deleted successfully:', res.data);
      })
      .catch((error) => {
        console.error('Error deleting image:', error);
      });
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Upload Images" />

      <Outlet />

      <div>
        <div>
          <div>
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Product Item Name
              </label>

              {!productItem ? (
                'loading....'
              ) : (
                <select
                  onChange={handleSelectChange}
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
              <div>
                {/* {productItem?.map((item: any) => (
                  <div className="h-[50px] w-[70px] relative overflow-hidden rounded">
                    <img
                      className=" h-[50px] w-[70px] object-cover"
                      src={baseURL + item.images}
                      alt=""
                    />
                  </div>
                ))} */}

                {image.map((image, index) => (
                  <div
                    key={index}
                    className="h-[50px] w-[70px] relative overflow-hidden rounded"
                  >
                    <img
                      className="h-[50px] w-[70px] object-cover"
                      src={baseURL + image.url}
                      alt=""
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2.5 block text-black dark:text-white">
                Main Image
              </label>
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleImage}
                multiple
                className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>

          <div>
            <div className="mt-5 mb-10">
              <label className="mb-2.5 block text-black dark:text-white">
                Option Item Name
              </label>

              {!productItem ? (
                'loading....'
              ) : (

                <select
                  onChange={(event) => handleSelectChange(event)}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                >
                  <option value={Id}>Select an option Items </option>
                  

                  {selectedVariationOptions.map((option) => (
                    <option key={option.VOID} value={option.VOID}>
                      {option.value}
                    </option>
                  ))}
                </select>


              )}

              <label className="mb-2.5 block text-black dark:text-white mt-5">
                Option Image
              </label>
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleImage}
                multiple
                className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>

          <button
            onClick={handleClick}
            type="submit"
            className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 mt-2"
          >
            Submit
          </button>

          <button
            onClick={() => deleteHandler(Id)}
            type="submit"
            className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 mt-2"
          >
            Delete
          </button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ProductItemImage;

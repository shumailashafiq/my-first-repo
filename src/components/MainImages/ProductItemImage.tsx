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
  const [showImageInput, setShowImageInput] = useState(false);
  const [showOptionDropdown, setShowOptionDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

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

  const handleSelectChange = (event: any) => {
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
    setShowImageInput(true);
    setShowOptionDropdown(true);
    setShowDelete(true);
  };

  const handleOptionSelectChange = (event: any) => {
    setSelectedOption(event.target.value);
    setShowImageInput(true);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append(
      'VariationImagedata',
      JSON.stringify({
        productItemId: parseInt(Id),
        variationOptionId: parseInt(selectedOption),
      }),
    );

    // formData.append('ProductItemId', Id);

    // selectedVariationOptions.forEach((option) => {
    //   formData.append('VariationOptionIds', selectedOption);
    // });

    image.forEach((image) => {
      formData.append(`VariationImage`, image);
    });

    // Check if selectedOption is not null, indicating that an option has been selected

    if (selectedOption) {
      // Call the 'upload' API
      axios
        .post(baseURL + `upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.error('Error uploading image:', error);
        });
    } else {
      // Call the 'saveImage' API

      const formData = new FormData();
      image.forEach((image) => {
        formData.append(`MainImage`, image);
      });
      formData.append(
        'MainImageData',
        JSON.stringify({ productItemId: parseInt(Id) }),
      );

      axios
        .post(baseURL + `saveImage`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.error('Error saving image:', error);
        });
    }
  };

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



  // const deleteHandler = (id, index) => {

    
  //   const updatedProductItem = [
  //     ...productItem.slice(0, index),
  //     ...productItem.slice(index + 1),
  //   ];
  //   setProductItem(updatedProductItem);
  //   console.log(id)

  //   axios
  //     .delete(baseURL + `mainImage/${Id}`)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((error) => {
  //       console.error('Error deleting variation:', error);
  //     });

  // };


 

 

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Upload Images" />

      <Outlet />

      <div>
        <div>
          <form onSubmit={handleSubmit}>
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
                  {/* <div>
                    {showDelete && (
                      <button
                        onClick={() => deleteHandler(Id)}
                        className=" shadow bg-primary py-2 px-4 font-medium text-gray hover:bg-opacity-90 mt-2"
                      >
                        X
                      </button>
                    )}
                  </div> */}
                </div>
              </div>

              {showImageInput && (
                <div>
                  <label className="mb-2.5 mt-5 block text-black dark:text-white">
                    Product Main Image
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleImage}
                    multiple
                    className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              )}
            </div>

            <div>
              <div className="mt-5 mb-10">
                {showOptionDropdown && (
                  <div>
                    <label className="mb-2.5 block text-black dark:text-white">
                      Option Item Name
                    </label>

                    {!productItem ? (
                      'loading....'
                    ) : (
                      <select
                        // onChange={(event) => handleSelectChange(event)}
                        onChange={handleOptionSelectChange}
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
                  </div>
                )}
                {selectedOption && (
                  <div>
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
                )}
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 mt-2"
            >
              Submit
            </button>
          </form>

          <div className="mt-5">
            <h1 className='mb-2.5 block text-black dark:text-white">Delete Images'></h1>

            {showDelete && (
              <button
                onClick={() => deleteHandler(Id)}
                
                className=" shadow bg-primary py-2 px-4 font-medium text-gray hover:bg-opacity-90 mt-2"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ProductItemImage;

import baseURL from '../../utils/axios';
import DefaultLayout from '../../layout/DefaultLayout';
import { Outlet } from 'react-router-dom';
import React, {
  useEffect,
  useState,
  useRef,
  ChangeEvent,
  FormEvent,
} from 'react';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import axios from 'axios';

interface ProductItem {
  item_id: number;
  item_name: string;
  images: { url: string }[];
  variations: {
    options: VariationOption[];
    variation_Image: { url: string }[];
  }[];
}

interface VariationOption {
  VOID: number;
  value: string;
}

const ProductItemImage: React.FC = () => {
  const [productItem, setProductItem] = useState<ProductItem[] | null>(null);
  const [image, setImage] = useState<File[]>([]);
  const [OptionImage, setOptionImage] = useState<File[]>([]);

  const [Id, setId] = useState<number | null>(null);

  const mainImageRef = useRef<HTMLInputElement>(null);
  const optionImageRef = useRef<HTMLInputElement>(null);

  const [selectedVariationOptions, setSelectedVariationOptions] = useState<
    VariationOption[]
  >([]);

  const [showOptionDropdown, setShowOptionDropdown] = useState(false);
  const [selectedImage, setSelectedImage] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showButton, setShowButton] = useState(false);

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

  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      const imagesArray = Array.from(files);
      setImage(imagesArray);
      console.log(imagesArray);
    }
  };

  const handleOptionImage = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      const imagesArray = Array.from(files);
      setOptionImage(imagesArray);
      console.log(imagesArray);
    }
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedItemId = parseInt(event.target.value);
    const selectedProductItem = productItem?.find(
      (item) => item.item_id === selectedItemId,
    );

    if (selectedProductItem) {
      // setImage(
      //   selectedProductItem.images.map((img) => new File([img.url], img.url)),
      // ); // Placeholder to maintain the logic

      setOptionImage([]); // Reset OptionImage when selecting a new product item
      setId(selectedItemId);
      setSelectedVariationOptions(
        selectedProductItem.variations.flatMap(
          (variation) => variation.options,
        ),
      );
      // Check if variation has variation_Image and set them
      if (selectedProductItem.variations[0]?.variation_Image) {
        setOptionImage(
          selectedProductItem.variations[0].variation_Image.map(
            (img) => new File([img.url], img.url),
          ),
        );
      }
    }
    setSelectedImage(true);
    setShowOptionDropdown(true);
    setShowButton(true);
  };

  const handleOptionSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(parseInt(event.target.value));
    setSelectedImage(true);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!Id) {
      console.error('No product item selected');
      return;
    }

    const saveImage = async () => {
      if (image.length > 0) {
        const formData = new FormData();
        formData.append('MainImageData', JSON.stringify({ productItemId: Id }));
        image.forEach((img) => {
          formData.append('MainImage', img);
        });

        try {
          const res = await axios.post(baseURL + 'saveImage', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log('Main image saved successfully:', res.data);
        } catch (error) {
          console.error('Error saving main image:', error);
        }
      }
    };

    const uploadImage = async () => {
      if (selectedOption && OptionImage.length > 0) {
        const formData = new FormData();
        formData.append(
          'VariationImagedata',
          JSON.stringify({
            productItemId: Id,
            variationOptionId: selectedOption,
          }),
        );
        OptionImage.forEach((img) => {
          formData.append('VariationImage', img);
        });

        try {
          const res = await axios.post(baseURL + 'upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log('Option image uploaded successfully:', res.data);
        } catch (error) {
          console.error('Error uploading option image:', error);
        }
      }
    };

    // Condition 1: Only product item and main image selected
    if (image.length > 0 && !selectedOption && OptionImage.length === 0) {
      await saveImage();
    }

    // Condition 2: Only product item, option item, and option image selected
    if (image.length===0 && selectedOption && OptionImage.length > 0) {
      await uploadImage();
    }

    // Condition 3: Both product item, main image, option item, and option image selected
    if (image.length > 0 && selectedOption && OptionImage.length > 0) {
      await saveImage();
      await uploadImage();
    }
    // Clear the form fields after submission
    setImage([]);
    setOptionImage([]);
    setId(null);
    setSelectedVariationOptions([]);
    setSelectedImage(false);
    setShowOptionDropdown(false);
    setSelectedOption(null);
    setShowButton(false);
    setProductItem(null);
    getProductItem(); // Optionally, you can refresh the product items list
  };


  // const deleteHandler = async (Id: number) => {
  //   try {
  //     if (selectedOption) {
  //       // Get the specific variation image ID
  //       const selectedProductItem = productItem?.find(
  //         (item) => item.item_id === Id,
  //       );
  //       const variationImage =
  //         selectedProductItem?.variations[0].variation_Image.find(
  //           (img) =>
  //             img.variation_Image?.variation_image_id === selectedOption,
  //         );

  //       if (variationImage) {
  //         await axios.delete(
  //           `${baseURL}variationImage/${variationImage.variation_Image?.variation_image_id}`,
  //         );
  //         console.log(
  //           'Option image deleted successfully:',
  //           variationImage.variation_image_id,
  //         );
  //         // Clear state related to the option image
  //         setOptionImage([]);
  //         setSelectedOption(null);
  //       }
  //     } else {
  //       // Get the specific main image ID
  //       const selectedProductItem = productItem?.find(
  //         (item) => item.item_id === Id,
  //       );
  //       const mainImage = selectedProductItem?.images[0]; // Assuming there's at least one main image

  //       if (mainImage) {
  //         await axios.delete(`${baseURL}mainImage/${mainImage.id}`);
  //         console.log('Main image deleted successfully:', mainImage.id);
  //         // Clear state related to the main image
  //         setImage([]);
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error deleting image:', error);
  //   }
  // };

  const deleteHandler = async (Id: number) => {
    try {
      const selectedProductItem = productItem?.find((item) => item.item_id === Id);
  
      if (!selectedProductItem) {
        console.error('Product item not found');
        return;
      }
  
      if (selectedOption) {
        const variationImage = selectedProductItem.variation_Image.find(
          (img) => img.VOID === selectedOption
        );
  
        if (variationImage) {
          await axios.delete(`${baseURL}${variationImage.variation_image_id}`);
          console.log('Option image deleted successfully:', variationImage.variation_image_id);
          setOptionImage([]);
          setSelectedOption(null);
        }
      } else {
        const mainImage = selectedProductItem.images[0]; // Assuming there's at least one main image
  
        if (mainImage) {
          await axios.delete(`${baseURL}mainImage/${mainImage.id}`);
          console.log('Main image deleted successfully:', mainImage.id);
          setImage([]);
        }
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };
  

  const handleClear = () => {
    setImage([]);
    setOptionImage([]);
    setId(null);
    setProductItem(null);
    setSelectedVariationOptions([]);
    setSelectedImage(false);
    setShowOptionDropdown(false);
    setSelectedOption(null);
    setShowButton(false);
    getProductItem();
  };

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
                    <option value={Id ?? ''}>Select a Product Item</option>

                    {productItem?.map((item) => (
                      <option key={item.item_id} value={item.item_id}>
                        {item.item_name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div>
                <div>
                  {image.map((img, index) => (
                    <div
                      key={index}
                      className="h-[50px] w-[70px] relative overflow-hidden rounded"
                    >
                      <img
                        className="h-[50px] w-[70px] object-cover"
                        src={URL.createObjectURL(img)} // Temporarily display the uploaded image
                        alt=""
                      />
                    </div>
                  ))}
                </div>
              </div>

              {selectedImage && (
                <div>
                  <label className="mb-2.5 mt-5 block text-black dark:text-white">
                    Product Main Image
                  </label>
                  <input
                    ref={mainImageRef}
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
                        onChange={handleOptionSelectChange}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      >
                        <option value={selectedOption ?? ''}>
                          Select an option Item
                        </option>
                        {selectedVariationOptions.map((option) => (
                          <option key={option.VOID} value={option.VOID}>
                            {option.value}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                )}

                <div>
                  <div className="mt-5">
                    {OptionImage.map((img, index) => (
                      <div
                        key={index}
                        className="h-[50px] w-[70px] relative overflow-hidden rounded"
                      >
                        <img
                          className="h-[50px] w-[70px] object-cover"
                          src={URL.createObjectURL(img)} // Temporarily display the uploaded image
                          alt=""
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {selectedOption && (
                  <div>
                    <label className="mb-2.5 block text-black dark:text-white mt-5">
                      Option Image
                    </label>
                    <input
                      ref={optionImageRef}
                      type="file"
                      onChange={handleOptionImage}
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
            {showButton && (
              <div>
                <h1 className="mb-2.5 block text-black dark:text-white">
                  Delete Images
                </h1>
                <button
                  onClick={() => Id && deleteHandler(Id)}
                  className="shadow mr-10 bg-primary py-2 px-4 font-medium text-gray hover:bg-opacity-90 mt-2"
                >
                  Delete
                </button>
                <button
                  onClick={handleClear}
                  className="shadow bg-primary py-2 px-5 font-medium text-gray hover:bg-opacity-90 mt-2"
                >
                  Clear
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ProductItemImage;

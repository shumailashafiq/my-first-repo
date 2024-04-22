import axios from 'axios';
import React, { useEffect, useState } from 'react';
import baseUrl from '../../utils/axios';

const AddProduct = () => {
  const [sampleCategory, setSampleCategory] = useState([]);

  const [images, setImages] = useState([]);
  const [Productimages, setProductImages] = useState([]);

  const [AllData, setAllData] = useState({});

  const [varOptImg, setvarOptImg] = useState([])

  const [getVarOpt, setgetVarOpt] = useState(null)
  // options = AllData.variations.options

  const [varOpt, setvarOpt] = useState([])

  const [Category, setCategory] = useState([]);
  const [vendors, setvendors] = useState([]);
  const [franchisees, setfranchisees] = useState({});

  const [Variations, setVariations] = useState([]);
  const [vSelector, setvSelector] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState(['']);
  const [selectVariation, setSelectVariation] = useState(['']);

  // const [isChecked, setIsChecked] = useState(false);
  const [checkedStates, setCheckedStates] = useState({});

  console.log('All Data', AllData);
  // console.log(checkedStates);

  const getCategories = () => {
    axios.defaults.headers.common['ngrok-skip-browser-warning'] = 'any value';

    axios.get(baseUrl + 'categories/').then((res) => {
      setCategory(res.data.object);
      console.log(res.data.object);
    });
  };

  const getVendors = () => {
    axios.get(baseUrl + 'vendor/').then((res) => {
      setvendors(res.data.object);
      // console.log(res.data.object);
    });
  };
  const getFranchisee = () => {
    axios.get(baseUrl + 'franchisee/').then((res) => {
      setfranchisees(res.data.object);
      // console.log(res.data.object);
    });
  };

  useEffect(() => {
    getFranchisee();
    getCategories();
    getVendors();
  }, []);

  // Function to handle adding a new select element
  const handleAddSelect = () => {
    setSelectedCategories([...selectedCategories, '']);
  };

  // Function to handle changing the selected category

  const handleCategoryChange = (index, value) => {
    const newSelectedCategories = [...selectedCategories];
    newSelectedCategories[index] = value;
    setSelectedCategories(newSelectedCategories);

    let title;
    for (let x of Category) {
      if (x.category_id == value) {
        title = x.title;
      }
    }
    let newC = Category.filter((c)=>{
      return c.category_id != value
    })


    if (sampleCategory.length > 0) {
      let existingIndex = sampleCategory.findIndex(
        (item) => item.index === index,
      );
      // console.log(existingIndex);
      if (existingIndex === index) {
        sampleCategory[existingIndex] = {
          categoryId: parseInt(value),
          title: title,
          index: index,
        };
      } else {
        sampleCategory.push({
          categoryId: parseInt(value),
          title: title,
          index: index,
        });
      }
    } else {
      sampleCategory.push({
        categoryId: parseInt(value),
        title: title,
        index: index,
      });
    }

    setSampleCategory([...sampleCategory]);
    // console.log(sampleCategory);

    let newData = sampleCategory.map((e) => {
      let { categoryId, title, index } = e;
      return { categoryId, title };
    });

    // data.push({ categoryId: parseInt(value), title: title });
    // AllData.categories = newData;


    // if (AllData.categories) {
    //   let categoryExists = false;
    //   for (let x of AllData.categories) {
    //     if (x.categoryId == value) {
    //       console.log("Already available");
    //       console.log(x);
    //       categoryExists = true;
    //       break; // No need to continue the loop if category exists
    //     }
    //   }
    //   if (!categoryExists) {
    //     axios.get(baseUrl + 'variation/var/' + parseInt(value))
    //       .then((res) => {
    //         const newVariations = res.data.variation;
    //         setVariations((prevVariations) => [...prevVariations, ...newVariations]);
    //         console.log('Variation', res.data.variation);
    //       })
    //       .catch((error) => {
    //         console.error("Error fetching variations:", error);
    //       });
    //   }
    // } else {
    //   axios.get(baseUrl + 'variation/var/' + parseInt(value))
    //     .then((res) => {
    //       const newVariations = res.data.variation;
    //       setVariations((prevVariations) => [...prevVariations, ...newVariations]);
    //       console.log('Variation', res.data.variation);
    //     })
    //     .catch((error) => {
    //       console.error("Error fetching variations:", error);
    //     });
    // }
    


    AllData.categories = newData;

    
    // axios.get(baseUrl + 'variation/var/' + parseInt(value)).then((res) => {

    //   const newVariations = res.data.variation;
    //   // setVariations(newVariations);
    //   setVariations((prevVariations) => [...prevVariations, ...newVariations]);
    //   console.log(Variations);
    //   console.log('Variation', res.data.variation);

    // });

    // const uniqueVariations = Variations.reduce((acc, current) => {
    //   const existingIndex = acc.findIndex((item) => item.variation_id === current.variation_id);
    //   if (existingIndex === -1) {
    //     // Variation with unique variation_id doesn't exist in acc array, so add it
    //     acc.push(current);
    //   }
    //   return acc;
    // }, []);
    
    // console.log(uniqueVariations);

  };
  console.log(Variations)

  // // Function to handle adding a new select element
  // const handleAddSelectVariation = () => {
  //   setSelectVariation([...selectVariation, '']);
  // };

  // // Function to handle changing the selected category
  // const handleSelectVariationChange = (index, value) => {
  //   const newSelectVariation = [...selectVariation];
  //   newSelectVariation[index] = value;
  //   setSelectVariation(newSelectVariation);
  // };

  const getVariations = () => {

    setvSelector(true);
    console.log(Category)
    AllData.categories.map((category)=>{
          axios
            .get(baseUrl + 'variation/var/' + category.categoryId)
            .then((res) => {
              const newVariations = res.data.variation;
              // setVariations(newVariations);
              setVariations((prevVariations) => [
                ...prevVariations,
                ...newVariations,
              ])
              console.log(Variations);
              console.log('Variation', res.data.variation);
            }).catch((err) => {
              console.log(err);
            });
    })
    console.log(AllData.categories)

    // axios.get(baseUrl + 'variation/var/' + parseInt(value)).then((res) => {
    //   const newVariations = res.data.variation;
    //   // setVariations(newVariations);
    //   setVariations((prevVariations) => [...prevVariations, ...newVariations]);
    //   console.log(Variations);
    //   console.log('Variation', res.data.variation);
    // });
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    // Check if the number of selected files exceeds 2
    if (files.length > 2) {
      alert('You can only upload up to 2 images.');
      return;
    } else {
      // Convert FileList to an array
      const newImages = Array.from(files);
      AllData.mainImage = newImages;
      setImages(newImages);
      console.log(newImages);
    }
  };
  // console.log(images);
  // console.log(Productimages);

  const handleProductImageChange = (e) => {
    const filess = e.target.files;
    // Check if the number of selected files exceeds 2
    if (filess.length > 2) {
      alert('You can only upload up to 2 images.');
      return;
    } else {
      // Convert FileList to an array
      const newImagess = Array.from(filess);
      AllData.variation_Option_images = newImagess;
      setProductImages(newImagess);
      // console.log(newImages)
    }
  };

  const CreateProduct = (event) => {
    event.preventDefault();
  };

  
// ---------------------- Check box ----------------------
  const handleCheckboxChange = (varId, optionId, isChecked) => {
    // Update the checked state for the corresponding optionId
    setCheckedStates((prevState) => ({
      ...prevState,
      [optionId]: isChecked,
    }));
  
    const options = { VOID: optionId }; // Assuming VOID is a constant key
  
    // Initialize an empty array if getVarOpt is not set
    let updatedVarOpts = getVarOpt || [];
  
    // Check if there's any variation to update or remove options from
    if (updatedVarOpts.length > 0) {
      updatedVarOpts = updatedVarOpts.reduce((acc, v) => {
        if (v.variation_id === varId) {
          if (isChecked) {
            // Add the options when checked
            acc.push({ ...v, options: [...v.options, options] });
          } else {
            // Filter out the option when unchecked
            const filteredOptions = v.options.filter(opt => opt.VOID !== optionId);
            if (filteredOptions.length > 0) {
              // If there are still options left, keep the variation
              acc.push({ ...v, options: filteredOptions });
            } // If no options left, do not add the variation back to the array
          }
        } else {
          // If the variation_id does not match, keep the variation as is
          acc.push(v);
        }
        return acc;
      }, []);
    }
  
    // If checking and the variation doesn't exist, create a new variation
    if (isChecked && !updatedVarOpts.find(v => v.variation_id === varId)) {
      updatedVarOpts.push({ variation_id: varId, options: [options] });
    }
  
    // Update getVarOpt with the new or modified variations
    setgetVarOpt(updatedVarOpts);
    console.log('Update completed');
  };
  
  
  
  

  console.log("variation Options ",getVarOpt)



  // const handleCheckboxChange = (varId, optionId, isChecked) => {
  //   setCheckedStates((prevState) => ({
  //     ...prevState,
  //     [optionId]: isChecked, // Update the checked state for the corresponding optionId
  //   }));
    
  //   // Assuming AllData.variations is an array

  //   let updatedVariations = AllData.variations;

  //   if(AllData.variation){
  //    updatedVariations = AllData.variations.map(variation => {
  //     if (variation.variation_id === varId) {

  //       return {
  //         ...variation,
  //         options: [...variation.options, { VOID: optionId }]
  //       };
  //     }
  //     return variation;
  //   });
  // }
  
  //   AllData.variations = updatedVariations;
  
  //   console.log(varId, optionId);
  // };
  





  const optionsImages = (VOID , files)=>{
    console.log(VOID , files);
    let data  = [
      { VOID : [
        files
      ]}
    ]

    setvarOptImg(data)
  }
  console.log(varOptImg)



  return (
    <div className="flex flex-col gap-9">
      {/* <!------------------------------ Product Add Form ---------------------> */}

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Add Product
          </h3>
        </div>
        <form action="#" onSubmit={CreateProduct}>
          <div className="p-6.5">
            {/* ----------------------- Product name -- & -- Slug ---------------- */}
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Product name
                </label>
                <input
                  onChange={(event) =>
                    (AllData.Item_name = event?.target.value)
                  }
                  type="text"
                  placeholder="Enter product name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Slug
                </label>
                <input
                  onChange={(event) => (AllData.slug = event?.target.value)}
                  type="text"
                  placeholder="Enter slug"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>
            {/* ---------------------------- Reward Points ----------------------- */}
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Reward Points
                </label>
                <input
                  onChange={(event) =>
                    (AllData.rewardPoints = parseInt(event.target.value))
                  }
                  type="number"
                  placeholder="Enter Reward Points "
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Stock Keeping Unit
                </label>
                <input
                  onChange={(event) =>
                    (AllData.sku = parseInt(event.target.value))
                  }
                  type="number"
                  placeholder="Enter SKU"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>
            {/* -------------------------------- Price --------------------------- */}
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Price
                {/* <span className="text-meta-1">*</span> */}
              </label>
              <input
                onChange={(event) =>
                  (AllData.price = parseInt(event.target.value))
                }
                type="number"
                placeholder="Enter Price"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            {/* ------------------------------- Category ------------------------- */}
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                {' '}
                Category{' '}
              </label>

              <div className="relative z-20 bg-transparent dark:bg-form-input flex flex-col items-center justify-center">
                {selectedCategories.map((selectedCategory, index) => (
                  <select
                    key={index}
                    value={selectedCategory}
                    id={`select-${index}`}
                    onChange={(e) =>
                      handleCategoryChange(index, e.target.value)
                    }
                    className={`relative mb-4 z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary `}
                  >
                    <option value="" selected disabled>
                      Select category
                    </option>
                    {Category.map((category) => (
                      <option
                        key={category.category_id}
                        value={category.category_id}
                        className="text-body dark:text-bodydark"
                      >
                        {category.title}
                      </option>
                    ))}
                  </select>
                ))}

                {/* Add button to add a new select element */}
                <div className="mt-2 ">
                  <div
                    className="bg-zinc-300 border-1 border-zinc-500 px-3 py-1  text-black rounded text-3xl cursor-pointer"
                    onClick={handleAddSelect}
                  >
                    +
                  </div>
                </div>
              </div>
            </div>
            {/*  --------------- Variation -- & -- Variation Options ------------- */}
            
            <button className={`cursor-pointer bg-blue-400 text-white py-2 px-4 rounded-lg shadow-lg mr-2 ${vSelector == true ? 'hidden' : 'flex'} ${vSelector}`} onClick={getVariations}>Select Variation</button>

            <div className={`mb-4.5 mt-5 flex flex-col justify-center items-center ${vSelector == false ? 'hidden' : 'flex'} ${vSelector}`}>
              <div className="flex gap-6 w-full">
                <div className="w-1/2">
                  <label className="mb-2.5 w-full block text-black dark:text-white">
                    {' '}
                    Variations{' '}
                  </label>
                </div>
              </div>

              {Variations.map((Variation) => (
                <div
                  key={Variation.variation_id}
                  className="w-full p-5 flex flex-wrap gap-4 border-b"
                >
                  <span className="text-black dark:text-white font-bold">
                    {Variation.name} :-
                  </span>

                  {Variation.options.map((option) => (
                    <div key={option.VOID}>
                      <input
                        type="checkbox"
                        id={`checkbox-${option.VOID}`}
                        className="hidden"
                        checked={checkedStates[option.VOID] || false} // Ensure a default value if checkedStates[option.VOID] is undefined
                        onChange={(e) =>
                          handleCheckboxChange(Variation.variation_id, option.VOID, e.target.checked)
                        }
                      />
                      <label
                        htmlFor={`checkbox-${option.VOID}`}
                        className="flex items-center cursor-pointer border-r px-2"
                      >
                        <span className="h-5 w-5 border border-gray-400 rounded-sm flex items-center justify-center mr-2">
                          {checkedStates[option.VOID] && ( // Use checked state from state
                            <span className="rounded-full bg-blue-400 w-3 h-3"></span>
                          )}
                        </span>

                        <span className="text-black dark:text-white">
                          {option.value}
                        </span>
                        {checkedStates[option.VOID] && ( // Use checked state from state
                                          <input
                                          multiple
                                          type="file"
                                          // onChange={(event) => setimage(event.target.files[0])} // Use event.target.files to get the file object
                                          onChange={(event) => optionsImages(option.VOID, event.target.files)}
                                          // className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                          className='w-[110px] ml-2 '
                                        />
                          )}
                      </label>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* ------------------------------- Vandors -------------------------- */}
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                {' '}
                Vendor{' '}
              </label>

              <div className="relative z-20 bg-transparent dark:bg-form-input flex flex-col items-center justify-center">
                <select
                  onChange={(e) =>
                    (AllData.vendor_id = parseInt(e.target.value))
                  }
                  className={`relative mb-4 z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary `}
                >
                  <option value="" selected disabled>
                    Select category
                  </option>
                  {vendors.map((vendor) => (
                    <option
                      key={vendor.vendorId}
                      value={vendor.vendorId}
                      className="text-body dark:text-bodydark"
                    >
                      {vendor.vendor_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* ----------------------------- Franchisee ------------------------- */}
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                {' '}
                Franchisee{' '}
              </label>

              <div className="relative z-20 bg-transparent dark:bg-form-input flex flex-col items-center justify-center">
                {franchisees.length > 0 ? (
                  <select
                    onChange={(e) => (AllData.franchisee_id = e.target.value)}
                    className={`relative mb-4 z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                  >
                    <option value="" selected disabled>
                      Select Franchisee
                    </option>
                    {franchisees.map((franchisee) => (
                      <option
                        key={franchisee.franchisee_id}
                        value={franchisee.franchisee_id}
                        className="text-body dark:text-bodydark"
                      >
                        {franchisee.franchisee_name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p>Loading franchisee data...</p>
                )}
              </div>
            </div>
            <hr className="opacity-50" />

            {/* --------------------------- upload images ------------------------ */}
            <div className="mb-4 mt-10 flex w-full justify-between gap-5">
              {/* --------------------- for thhumbnail images ----------------------- */}
              <div className="mb-4 w-1/2 border-r">
                <label className="block text-black dark:text-white mb-2">
                  Upload Thumbnail
                </label>
                <div className="flex items-center">
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer bg-blue-400 text-white py-2 px-4 rounded-lg shadow-lg mr-2"
                  >
                    Choose Thumbnails
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <div className="flex flex-wrap gap-1">
                    {images.map((image, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(image)}
                        alt={`Image ${index}`}
                        className="w-16 h-16 object-cover rounded-lg mr-2 mb-2 shadow-lg"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* ----------------------- for Product images ----------------------- */}
              <div className="mb-4 w-1/2 ">
                <label className="block text-black dark:text-white mb-2">
                  Upload Product Images
                </label>
                <div className="flex items-center">
                  <label
                    htmlFor="product-image-upload"
                    className="cursor-pointer bg-blue-400 text-white py-2 px-4 rounded-lg shadow-lg mr-2"
                  >
                    Choose Images
                  </label>
                  <input
                    id="product-image-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleProductImageChange}
                  />
                  <div className="flex flex-wrap gap-1">
                    {Productimages.map((image, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(image)}
                        alt={`Image ${index}`}
                        className="w-16 h-16 object-cover rounded-lg mr-2 mb-2 shadow-lg"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ------------------------ Desciption Text Aria -------------------- */}
            <div className="mb-6">
              <label className="mb-2.5 block text-black dark:text-white">
                Product Description
              </label>
              <textarea
                onChange={(event) => (AllData.description = event.target.value)}
                rows={6}
                placeholder="Enter Product escription"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              ></textarea>
            </div>

            {/* --------------------------- Submit Button ------------------------ */}
            <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;

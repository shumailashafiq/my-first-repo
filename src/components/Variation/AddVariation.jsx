import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import baseURL from '../../utils/axios';
import Swal from 'sweetalert2';

const CreateVariationForm = () => {
  

  const [variation, setVariation] = useState({
    categoryId: '',
    name: '',
    options: [{ value: '' }]
  });
  const [Id, setId] = useState(null);
  const [Category, setCategory] = useState([]);
  console.log(Category)

    
  

  const navigate = useNavigate();

  const getVariation = () => {
    axios
      .get(baseURL + 'categories/') 
      .then((res) => {
        setCategory(res.data.object);
        console.log(res.data.object);
      })
      .catch((err) => {
        console.log(err);
      });  
  };

  const handleAddOption = () => {
    // This function will add a new empty option to the options array
    setVariation(prevVariation => ({
      ...prevVariation,
      options: [...prevVariation.options, { value: '' }]
    }));
  };

  const handleOptionChange = (index, value) => {
    // Update the specific option value in the options array
    const newOptions = variation.options.map((option, i) =>
      i === index ? { ...option, value } : option
    );

    setVariation({ ...variation, options: newOptions });
  };

  const handleFormSubmit = (event) => {  
    event.preventDefault();
    navigate("../")
    // API call to post data
    console.log('Submitting', variation);

    axios.post(baseURL +'variation/',variation)
      .then((res) => {
        console.log(res.status);
        Swal.fire({
          title: 'Success!',
          text: 'Variation is successfully added!',
          icon: 'success',
          confirmButtonText: 'OK'
        })
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: 'Error!',
          text: 'Sorry, Variation is not added. Try again later.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });



  };

  useEffect(() => {
    getVariation();
  }, []);
   

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Add Variation
          </h3>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="p-6.5">
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Name
              </label>
              <input
                type="text"
                onChange={(e) => setVariation({ ...variation, name: e.target.value })}
                placeholder="Enter your name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Category Name
              </label>
              {/* <input
                type="number"
                onChange={(e) => setVariation({ ...variation, category_Id: e.target.value })}
                placeholder="Enter Category ID"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              /> */}
              
              <select
                onChange={(event) => setVariation({ ...variation, categoryId: parseInt(event.target.value) })}


                // value={ParentId}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value={Id}>Select a category</option>

                {Category.map((category) =>(
                    <option
                      key={category.category_id}
                      value={category.category_id}
                    >
                      {category.title}
                    </option>
                  ) 
                )}


              </select>

            </div>

            {variation.options.map((option, index) => (
              <div key={index} className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Option Value
                </label>
                <input
                  type="text"
                  value={option.value}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder="Enter option value"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddOption}
              className=" mb-4.5 flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
            >
              Add Option
            </button>

            <button
              type="submit"
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
            >
              Add Variation
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateVariationForm;
import { useState, useEffect } from 'react';
import baseURL from '../../utils/axios';
import axios from 'axios';
import Swal from 'sweetalert2';

export const UpdateVariation = (props: any) => {
  const [variation, setVariation] = useState({
    categoryId: '',
    name: '',
    options: [{ value: '' }],
  });

  const [Category, setCategory] = useState([]);

  useEffect(() => {
    getCategories();
  }, [props]);

  const getCategories = () => {
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

  const handleOptionChange = (index: number, value: any) => {
    // Update the specific option value in the options array
    const newOptions = variation.options.map((option, i) =>
      i === index ? { ...option, value } : option,
    );

    setVariation({ ...variation, options: newOptions });
  };

  useEffect(() => {
    if (props.variationObj) {
      console.log(props.variationObj);
      setVariation({
        ...props.variationObj,
        categoryId: props.variationObj.category_id,
        options: props.variationObj.options.length
          ? props.variationObj.options.map((option: any) => ({
              value: option.value,
            }))
          : [{ value: '' }],
        // options: props.variationObj.options.length ? props.variationObj.options : [{ value: '' }]
      });
    }
  }, [props.variationObj]);

  const {
    variationObj,
    variationData,
    setVariationData,
    categoryId,
    setCategoryId,
    // variationId, setVariatonId,/
    variationName,
    setVariationName,
    categoryName,
    setCategoryName,
    title,
    setBgColor,
    setDisplay2,
    setevents,
    Id,
  } = props;

  const update = (e: any) => {
    e.preventDefault();

    setBgColor('blur-none');
    setDisplay2('hidden');
    setevents('pointer-events-auto');
    axios
      .put(baseURL + 'variation/update', {
        ...variation,
      })

      .then((res) => {
        console.log(res.status);
        Swal.fire({
          title: 'Success!',
          text: 'Variation is successfully update!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      })
      .catch((error) => {
        console.error('Error deleting variation:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Sorry, Variation is not Update. Try again later.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      });

    console.log(variation);
  };

  const hide = () => {
    setBgColor('blur-none');
    setDisplay2('hidden');
    setevents('pointer-events-auto');
  };

  return (
    <>
      <div>UpdateVariation</div>

      <div className="p-6.5 h-[450px] overflow-auto">
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
          <div
            className="relative w-full max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-4xl h-auto max-h-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark my-8 mx-auto"
            style={{ marginLeft: '300px' }}
          >
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark bg-white">
              <h3 className="font-medium text-black dark:text-white">
                Update Variation
              </h3>
            </div>
            <form
              action="#"
              onSubmit={update}
              className="bg-white shadow-6 shadow-black h-full"
            >
              <div className="p-6.5 h-full overflow-auto">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Name
                  </label>
                  <input
                    onChange={(e) =>
                      setVariation({ ...variation, name: e.target.value })
                    }
                    type="text"
                    value={variation.name}
                    placeholder="Enter your variation name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Categories Name
                  </label>
                  <select
                    onChange={(event) =>
                      setVariation({
                        ...variation,
                        categoryId: parseInt(event.target.value),
                      })
                    }
                    value={variation?.categoryId}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    <option value={Id}>Select a category</option>
                    {Category?.map((category: any) => (
                      <option
                        key={category.category_id}
                        value={category.category_id}
                      >
                        {category.categoryId}
                        {category.title}
                      </option>
                    ))}
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
                      onChange={(e) =>
                        handleOptionChange(index, e.target.value)
                      }
                      placeholder="Enter option value"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                ))}

                <div className="flex gap-4 justify-end mt-4">
                  <button
                    type="submit"
                    className="flex justify-center rounded bg-primary py-3 px-6 font-medium text-white hover:bg-opacity-90"
                  >
                    Update Variation
                  </button>
                  <button
                  
                    onClick={hide}
                    className="flex justify-center rounded bg-red-500 py-3 px-6 font-medium text-white hover:bg-opacity-90"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

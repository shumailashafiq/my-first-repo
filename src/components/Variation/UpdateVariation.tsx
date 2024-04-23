import { useState, useEffect } from 'react';
import baseURL from '../../utils/axios';
import axios from 'axios';

export const UpdateVariation = (props: any) => {
  const [Category, setCategory] = useState([]);

  const [variation, setVariation] = useState({
    categoryId: '',
    name: '',
    options: [{ value: '' }],
  });

  console.log(variation)
  // console.log(Category)

  useEffect(() => {
    getVariation();
  }, []);

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

  const handleOptionChange = (index: number, value: any) => {
    // Update the specific option value in the options array
    const newOptions = variation.options.map((option, i) =>
      i === index ? { ...option, value } : option,
    );

    setVariation({ ...variation, options: newOptions });
  };

  useEffect(() => {
    if (props.variationObj) {
      setVariation({
        ...props.variationObj,
        categoryId: props.categoryId.categoryId,
        options: props.variationObj.options.length 
        ? props.variationObj.options.map((option: any) => ({ value: option.value })) 
        : [{ value: '' }]
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
    axios
      .put(baseURL + 'variation/update', {
        ...variation
      })
      .then((res) => {
        console.log(res.status);
      });

    setBgColor('blur-none');
    setDisplay2('hidden');
    setevents('pointer-events-auto');
  };

  const hide = () => {
    setBgColor('blur-none');
    setDisplay2('hidden');
    setevents('pointer-events-auto');
  };

  return (
    <>
      <div>UpdateVariation</div>
      <div className="rounded-sm h-full absolute w-full z-20 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark bg-white">
          <h3 className="font-medium text-black dark:text-white">
            Update Variation
          </h3>
        </div>
        <form
          action="#"
          onSubmit={update}
          className="bg-white shadow-6 shadow-black"
        >
          <div className="p-6.5">
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Name
              </label>
              <input
                onChange={(e) => setVariation({ ...variation, name: e.target.value })}
                type="text"
                value={variation.name}
                placeholder="Enter your variation name "
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            {/* <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Variation Id

              </label>
              <input
                onChange={(event) => setVariatonId(event.target.value)}
                type="text"
                value={ Variation_id}
                placeholder="Enter your Variation Id"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div> */}

            {/* <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Variation Name

              </label>
              <input
                onChange={(event) => setVariationName(event.target.value)}
                type="text"
                value={name}
                placeholder="Enter your Variation Name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div> */}

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Categories Name
              </label>

              {/* <input
                onChange={(event) => setCategoryName(event.target.value)}
                type="text"
                value={title}
                placeholder="Enter your Categories Name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              /> */}

              <select
                onChange={(event) =>
                  setVariation({
                    ...variation,
                    categoryId: parseInt(event.target.value),
                  })
                }
                value={variation?.title}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value={Id}>Select a category</option>

                {Category.map((category: any) => (
                  <option key={category.id} value={category.id}>
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
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder="Enter option value"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            ))}

            <div className="flex gap-10">
              <button
                type="submit"
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              >
                Update Variation
              </button>
            </div>
          </div>
        </form>
        <button
          onClick={hide}
          className="flex w-full justify-center rounded bg-red-500 p-3 font-medium text-gray hover:bg-opacity-90"
        >
          Cancle
        </button>
      </div>
    </>
  );
};
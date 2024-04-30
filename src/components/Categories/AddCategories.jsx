import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import baseURL from '../../utils/axios';

const AddCategories = () => {
  const [title, settitle] = useState('');
  const [rewardPoints, setrewardPoints] = useState('');
  const [Id, setId] = useState(null);
  const [Category, setCategory] = useState([]);
  const [image, setimage] = useState('');


  const navigate = useNavigate();

  const getCategory = () => {
    axios
      .get(baseURL + 'categories/')
      .then((res) => {
        setCategory(res.data.object);
        // console.log(res.data.object);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Add = (event) => {
    event.preventDefault();

    let data = {
      title: title,
      parentId: Id,
      rewardPoints: rewardPoints,
    };

    const FormDataa = new FormData();
    FormDataa.append('infoDetails', JSON.stringify(data));
    FormDataa.append('image', image);

    axios
      .post(baseURL + 'categories/', FormDataa, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
        },
      })
      .then((res) => {
        console.log(res.data);
        window.location.reload(); 
      });
    navigate('../');
  };

  useEffect(() => {
    getCategory();
  }, []);

  console.log(Category);

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Add Category
          </h3>
        </div>
        <form action="#" onSubmit={Add}>
          <div className="p-6.5">
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Title
              </label>
              <input
                type="text"
                onChange={(e) => settitle(e.target.value)}
                // value="vendor_name"
                placeholder="Enter Category Title"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Reward Points
              </label>
              <input
                onChange={(e) => setrewardPoints(e.target.value)}
                // value="vendor_email"
                type="number"
                placeholder="Enter your Reward Points"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Contact Number
              </label>

              <select
                onChange={(event) => setId(event.target.value)}
                // value={ParentId}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value={Id}>Select a category</option>
                {Category.map((category) =>
                  // category.parent_id == null ? (
                    <option
                      onChange={(event) => setId(event.target.value)}
                      key={category.category_id}
                      value={category.category_id}
                    >
                      {category.title}
                    </option>
                  // ) : null,
                )}
              </select>
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Image
              </label>
              <input
                type="file"
                onChange={(event) => setimage(event.target.files[0])} // Use event.target.files to get the file object
                className="w-full border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddCategories;

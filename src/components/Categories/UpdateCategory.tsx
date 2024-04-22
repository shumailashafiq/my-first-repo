import React, { useEffect, useState } from 'react';
import baseURL from '../../utils/axios';
import axios from 'axios';

const UpdateCategory = (props) => {
  const {
    Category,
    CategoryData,
    setCategoryData,

    image,
    setimage,
    rewardPoints,
    setrewardPoints,
    title,
    settitle,
    ParentId,
    setParentId,

    Id,

    setBgColor,
    setDisplay2,
    setevents,
  } = props;

  // console.log(title , image, rewardPoints, ParentId, Id);
  console.log(parseInt(ParentId));
  console.log(image);
  console.log(rewardPoints);
  console.log(title);

  const update = (e) => {
    e.preventDefault();

    for (let i of Category) {
      if (i.category_id == Id) {
        console.log(i);
        let index = Category.indexOf(i);
        Category.splice(index, 1, {
          category_id: Id,
          title: title,
          parent_id: parseInt(ParentId),
          reward_points: rewardPoints,
          image: image,
        });
      }
    }

    let data = {
      categoryId: Id,
      title: title,
      parentId: ParentId,
      rewardPoints: rewardPoints,
    };

    const FormDataa = new FormData();
    FormDataa.append('info', JSON.stringify(data));
    FormDataa.append('image', image);

    axios
      .put(baseURL + 'categories/update', FormDataa, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    // setBgColor('blur-none');
    // setDisplay2('hidden');
    // setevents('pointer-events-auto');
  };

  const hide = () => {
    setBgColor('blur-none');
    setDisplay2('hidden');
    setevents('pointer-events-auto');
  };

  return (
    <>
      <div className="rounded-sm h-full   w-full z-20 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark bg-white">
          <h3 className="font-medium text-black dark:text-white">
            Update Category
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
                Title
              </label>
              <input
                onChange={(event) => settitle(event.target.value)}
                type="text"
                value={title}
                placeholder="Enter your full name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Reward Points
              </label>
              <input
                onChange={(event) => setrewardPoints(event.target.value)}
                type="number"
                value={rewardPoints}
                placeholder="Enter your email address"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            {ParentId !== null ? (
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Category
                </label>
                <select
                  onChange={(event) => setParentId(event.target.value)}
                  // value={ParentId}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                >
                  <option value={ParentId}>Select a category</option>
                  {Category.map((category) =>
                    category.parent_id == null ? (
                      <option
                        onChange={(event) => setParentId(event.target.value)}
                        key={category.category_id}
                        value={category.category_id}
                      >
                        {category.title}{' '}
                      </option>
                    ) : null,
                  )}
                </select>
              </div>
            ) : null}

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

            <div className="flex gap-10">
              <button
              onClick={hide}
                type="submit"
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              >
                Update Category
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

export default UpdateCategory;

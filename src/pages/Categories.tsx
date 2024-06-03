import React, { useEffect, useState } from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import axios from 'axios';
import baseUrl from '../utils/axios';
import SingleCategory from '../components/Categories/SingleCategory';
import UpdateCategory from '../components/Categories/UpdateCategory';
import { Outlet, useNavigate } from 'react-router-dom';
import TableLoader from '../components/Loaders/TableLoader';
import CategoryLoad from '../components/Loaders/CategoryLoad';
import Swal from 'sweetalert2';

const MainCategory = () => {
  const [Category, setCategory] = useState([]);
  const [bgColor, setBgColor] = useState('blur-none');
  const [display, setDisplay] = useState('hidden');
  const [events, setevents] = useState('pointer-events-auto');

  const [singleCategoryData, setSingleCategoryData] = useState([]);

  const [CategoryData, setCategoryData] = useState([]);

  const [display2, setDisplay2] = useState('hidden');

  const [title, settitle] = useState('');
  const [rewardPoints, setrewardPoints] = useState('');
  const [ParentId, setParentId] = useState('');
  const [Id, setId] = useState('');
  const [image, setimage] = useState('');

  const navigate = useNavigate();

  const getCategories = () => {
    axios.defaults.headers.common['ngrok-skip-browser-warning'] = 'any value';

    axios.get(baseUrl + 'categories/').then((res) => {
      setCategory(res.data.object);
    });
  };

  console.log(Category);

  const AddCategories = () => {
    navigate('add');

  };

  const singleCategory = (index) => {
    console.log(Category[index].parent_id);
    setSingleCategoryData(Category[index].parent_id);
    setDisplay('flex');
    setBgColor('blur');
    setevents('pointer-events-none');
    console.log(index);
  };



  const deleteHandler = (id, index) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(baseUrl + 'categories/' + id)
          .then((res) => {
            const updatedCategory = [
              ...Category.slice(0, index),
              ...Category.slice(index + 1),
            ];
            setCategory(updatedCategory);

            Swal.fire({
              title: 'Deleted!',
              text: 'Category has been deleted.',
              icon: 'success',
            });
          })
          .catch((error) => {
            console.error('Error deleting Category:', error);
            Swal.fire({
              title: 'Error!',
              text: 'There was an error deleting the Category.',
              icon: 'error',
            });
          });
      }
    });
  };

  const UpdateHandler = (category) => {
    console.log(category);

    settitle(category.title);
    setParentId(category.parent_id);
    setrewardPoints(category.reward_points);
    setId(category.category_id);
    setimage(category.image);

    setDisplay2('flex');
    setBgColor('blur-sm');
    setevents('pointer-events-none');
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Categories" />
      <div className="flex flex-col">
        {/* ------------- Single Category Pop Up------------ */}

        <div
          className={`h-full w-full flex justify-center items-center z-20 ${display} `}
        >
          <SingleCategory
            Category={Category}
            singleCategoryData={singleCategoryData}
            setDisplay={setDisplay}
            setBgColor={setBgColor}
            setevents={setevents}
          />
        </div>

        {/* ----------------- Update Categories ----------------- */}

        <div
          className={`h-1/2 w-1/2 flex justify-center  items-center fixed z-999 top-[10%] left-[30%] ${display2} `}
        >
          <UpdateCategory
            Category={Category}
            CategoryData={CategoryData}
            setCategoryData={setCategoryData}
            image={image}
            setimage={setimage}
            rewardPoints={rewardPoints}
            setrewardPoints={setrewardPoints}
            title={title}
            settitle={settitle}
            ParentId={ParentId}
            setParentId={setParentId}
            Id={Id}
            setDisplay2={setDisplay2}
            setBgColor={setBgColor}
            setevents={setevents}
          />
        </div>

        {/* ---------------- Outlet For Creating New Categories ------- */}

        <Outlet />

        <button
          onClick={AddCategories}
          className="p-3 px-4 shadow-md shadow-black  bg-blue-500 rounded fixed  text-white bottom-[35px] right-[35px] z-99 text-3xl"
        >
          +
        </button>
        <div
          className={`rounded-sm border  border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 ${bgColor} ${events}`}
        >
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Categories
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    ID
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Reward Points
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    Parent
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              {Category.length < 1 ? (
                <CategoryLoad />
              ) : (
                <tbody>
                  {Category.map((category, key) => (
                    <tr key={key}>
                      <td className="border-b border-[#eee] py-5 px-5  dark:border-strokedark xl:pl-11 flex gap-2 items-center">
                        <div className="h-[50px] w-[70px] relative overflow-hidden rounded">
                          <img
                            className=" h-[50px] w-[70px] object-cover"
                            src={baseUrl + category.image}
                            alt=""
                          />
                        </div>
                        <h5 className="font-medium text-black dark:text-white">
                          {category.title}
                        </h5>
                        {/* <p className="text-sm">${packageItem.price}</p> */}
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {category.category_id}
                        </p>
                      </td>

                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {category.reward_points}
                        </p>
                      </td>

                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark ">
                        {category.parent_id !== null ? (
                          <div className="flex items-center space-x-3.5">
                            <button
                              onClick={() => singleCategory(key)}
                              className="hover:text-primary"
                            >
                              <p className="text-primary">view </p>
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-3.5 opacity-[.4]">
                            <p>empty</p>
                          </div>
                        )}
                      </td>

                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <div className="flex items-center space-x-3.5">
                          <button
                            onClick={() =>
                              deleteHandler(category.category_id, key)
                            }
                            className="hover:text-primary"
                          >
                            <svg
                              className="fill-current"
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                                fill=""
                              />
                              <path
                                d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                                fill=""
                              />
                              <path
                                d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                                fill=""
                              />
                              <path
                                d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                                fill=""
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => UpdateHandler(category)}
                            className="hover:text-primary"
                          >
                            <svg
                              className="fill-current"
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M16.8754 11.6719C16.5379 11.6719 16.2285 11.9531 16.2285 12.3187V14.8219C16.2285 15.075 16.0316 15.2719 15.7785 15.2719H2.22227C1.96914 15.2719 1.77227 15.075 1.77227 14.8219V12.3187C1.77227 11.9812 1.49102 11.6719 1.12539 11.6719C0.759766 11.6719 0.478516 11.9531 0.478516 12.3187V14.8219C0.478516 15.7781 1.23789 16.5375 2.19414 16.5375H15.7785C16.7348 16.5375 17.4941 15.7781 17.4941 14.8219V12.3187C17.5223 11.9531 17.2129 11.6719 16.8754 11.6719Z"
                                fill=""
                              />
                              <path
                                d="M8.55074 12.3469C8.66324 12.4594 8.83199 12.5156 9.00074 12.5156C9.16949 12.5156 9.31012 12.4594 9.45074 12.3469L13.4726 8.43752C13.7257 8.1844 13.7257 7.79065 13.5007 7.53752C13.2476 7.2844 12.8539 7.2844 12.6007 7.5094L9.64762 10.4063V2.1094C9.64762 1.7719 9.36637 1.46252 9.00074 1.46252C8.66324 1.46252 8.35387 1.74377 8.35387 2.1094V10.4063L5.40074 7.53752C5.14762 7.2844 4.75387 7.31252 4.50074 7.53752C4.24762 7.79065 4.27574 8.1844 4.50074 8.43752L8.55074 12.3469Z"
                                fill=""
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default MainCategory;

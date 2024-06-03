import { useEffect, useState } from 'react';
import baseUrl from '../utils/axios';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SingleVariation from '../components/Variation/SingleVariation';
import { UpdateVariation } from '../components/Variation/UpdateVariation';
// import UpdateVariation from '../components/Variation/UpdateVariation';
import TableLoader from '../components/Loaders/TableLoader';
import Swal from 'sweetalert2';

export const Variation = () => {
  const [variationData, setVariationData] = useState([]);
  const [singleVariationData, setSingleVariationData] = useState([]);
  const [updateVariationObj, setUpdateVariationObj] = useState(null);
  const [bgColor, setBgColor] = useState('blur-none');
  const [display, setDisplay] = useState('hidden');
  const [events, setevents] = useState('pointer-events-auto');

  // update

  const [categoryId, setCategoryId] = useState('');
  // const [variationId, setVariatonId] = useState('');
  const [variationName, setVariationName] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [display2, setDisplay2] = useState('hidden');

  // pagination
  const [Page, setPage] = useState(0);
  const [pageSize, setpageSize] = useState(5);

  const navigate = useNavigate();

  useEffect(() => {
    getVariation();
  }, [Page, pageSize]);

  const getVariation = () => {
    axios.defaults.headers.common['ngrok-skip-browser-warning'] = 'any value';
    axios
      .get(baseUrl + `variation/?pageNumber=${Page}&pageSize=${pageSize}`)
      .then((res) => {
        console.log(res.data.object);
        setVariationData(res.data.object);
      });
  };

  const PrevPage = () => {
    if (Page >= 1) {
      setPage(Page - 1);
    } else {
      alert('You are on the First Page');
    }
    console.log('prevPage', Page);
  };

  const NextPage = () => {
    setPage(Page + 1);
    console.log('nextPage', Page);
  };

  const itemsPerPage = (event) => {
    setpageSize(parseInt(event.target.value));
    setPage(0);
    console.log('itemsPerPage', event.target.value);
  };

  const AddVariation = () => {
    navigate('add');
  };

  const deleteHandler = (id, index) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(baseUrl + 'variation/' + id)
          .then((res) => {
            const updatedVariationData = [
              ...variationData.slice(0, index),
              ...variationData.slice(index + 1),
            ];
            setVariationData(updatedVariationData);

            Swal.fire({
              title: 'Deleted!',
              text: 'Variation has been deleted.',
              icon: 'success'
            });
          })
          .catch((error) => {
            console.error('Error deleting variation:', error);
            Swal.fire({
              title: 'Error!',
              text: 'There was an error deleting the variation.',
              icon: 'error'
            });
          });
      }
    });
  };

  const singleVariation = (index) => {
    console.log(variationData[index]);
    setSingleVariationData([variationData[index]]);
    setDisplay('flex');
    setBgColor('blur-sm');
    setevents('pointer-events-none');
  };

  const UpdateHandler = (variation) => {
    setUpdateVariationObj(variation);
    console.log(variation)

    setDisplay2('flex');
    setBgColor('blur-sm');
    setevents('pointer-events-none');
  };

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Variation" />

        {/* ------------- Single Variation Pop Up------------ */}

        <div
          className={`h-full w-full  justify-center items-center z-99 ${display} `}
        >
          <SingleVariation
            singleVariationData={singleVariationData}
            setDisplay={setDisplay}
            setBgColor={setBgColor}
            setevents={setevents}
          />
        </div>

        {/* ----------------- Update Vaiation----------------- */}

        <div
          className={`h-full w-full flex justify-center  items-center relative ${display2} `}
        >
          <UpdateVariation
            variationObj={updateVariationObj}
            variationData={singleVariationData}
            setVariationData={setVariationData}
            categoryId={categoryId}
            setCategoryId={setCategoryId}
            // variationId={variationId}
            // setVariatonId={setVariatonId}

            variationName={variationName}
            setVariationName={setVariationName}
            categoryName={categoryName}
            setCategoryName={setCategoryName}
            setDisplay2={setDisplay2}
            setBgColor={setBgColor}
            setevents={setevents}
          />
        </div>

        {/* ------------ Outlet for Creating new Vendor -------------- */}

        <Outlet />

        <button
          onClick={AddVariation}
          className="p-3 px-4 shadow-md shadow-black  bg-blue-500 rounded fixed  text-white bottom-[35px] right-[35px] z-99 text-3xl"
        >
          +
        </button>

        <div
          className={`rounded-sm border  ${bgColor} ${events}  border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1`}
        >
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Categories ID
                  </th>
                  <th className="min-w-[150px] py-5 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Variation Id
                  </th>

                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    Variation Name
                  </th>

                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    Categories Name
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>

              {variationData.length < 1 ? (
                <>
                  <TableLoader />
                </>
              ) : (
                <tbody>
                  {variationData?.map((variation, key) => (
                    <tr key={key}>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {variation?.category_id}
                        </p>
                      </td>
                      <td className="border-b border-[#eee]  py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                        <p className="font-medium text-black dark:text-white">
                          {variation?.variationId}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p>{variation.name}</p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p>{variation?.title}</p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <div className="flex items-center space-x-3.5">
                          <button
                            onClick={() => singleVariation(key)}
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
                                d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.29061L0.374805 8.91186L0.562305 8.53311C0.674805 8.31749 3.43106 3.00183 8.99981 3.00183C14.5686 3.00183 17.3248 8.31749 17.4373 8.53311L17.6248 8.91186L17.4373 9.29061C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM2.01856 8.91186C2.73356 10.1331 5.37356 13.3225 8.99981 13.3225C12.6261 13.3225 15.2661 10.1331 15.9811 8.91186C15.2661 7.69061 12.6261 4.50124 8.99981 4.50124C5.37356 4.50124 2.73356 7.69061 2.01856 8.91186Z"
                                fill=""
                              />
                              <path
                                d="M9 11.4587C7.43375 11.4587 6.16625 10.1912 6.16625 8.625C6.16625 7.05875 7.43375 5.79126 9 5.79126C10.5662 5.79126 11.8337 7.05875 11.8337 8.625C11.8337 10.1912 10.5662 11.4587 9 11.4587ZM9 7.29126C8.22875 7.29126 7.66625 7.85376 7.66625 8.625C7.66625 9.39626 8.22875 9.95875 9 9.95875C9.77125 9.95875 10.3337 9.39626 10.3337 8.625C10.3337 7.85376 9.77125 7.29126 9 7.29126Z"
                                fill=""
                              />
                            </svg>
                          </button>

                         

                          <button
                            onClick={() => deleteHandler(variation.variationId, key)}
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
                                d="M2.25 4.5H3.375H15.75"
                                stroke=""
                                strokeWidth="1.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M6.375 4.5V3.375C6.375 3.04239 6.51317 2.72324 6.76322 2.47319C7.01327 2.22314 7.33239 2.085 7.665 2.085H10.335C10.6676 2.085 10.9867 2.22314 11.2368 2.47319C11.4868 2.72324 11.625 3.04239 11.625 3.375V4.5M14.625 4.5V14.625C14.625 14.9576 14.4868 15.2768 14.2368 15.5268C13.9867 15.7768 13.6676 15.915 13.335 15.915H4.665C4.33239 15.915 4.01327 15.7768 3.76322 15.5268C3.51317 15.2768 3.375 14.9576 3.375 14.625V4.5H14.625Z"
                                stroke=""
                                strokeWidth="1.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M7.66406 8.25V12.375"
                                stroke=""
                                strokeWidth="1.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M10.3359 8.25V12.375"
                                stroke=""
                                strokeWidth="1.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                          
                          <button
                            onClick={() => UpdateHandler(variation)}
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
                                d="M2.625 13.7812H3.375V15.2812H14.625V13.7812H15.375V16.0312H2.625V13.7812ZM13.0837 2.19155C13.2975 1.9778 13.5787 1.8584 13.8735 1.8584C14.1682 1.8584 14.4495 1.9778 14.6632 2.19155L15.8087 3.33705C16.0225 3.5508 16.1419 3.83211 16.1419 4.12686C16.1419 4.42161 16.0225 4.70293 15.8087 4.91668L6.94375 13.7816H5.625V12.4623L13.0837 5.00355L13.0837 2.19155ZM12.6937 4.39155L6.375 10.7093V12.2816H7.94725L14.265 5.9628L12.6937 4.39155ZM13.8737 3.21155L12.705 4.3803L13.6237 5.29855L14.7925 4.1298L13.8737 3.21155Z"
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
          <div className="flex items-center justify-end bg-gray mt-5 mb-5 dark:bg-meta-4 bottom-0 right-0 gap-2 text-3xl px-12 p-2">
            <div className="flex items-center space-x-2">
              <button
                onClick={PrevPage}
                className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Previous
              </button>
              <button
                onClick={NextPage}
                className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Next
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <label htmlFor="itemsPerPage" className="text-sm text-gray-700">
                Items per page:
              </label>
              <select
                id="itemsPerPage"
                value={pageSize}
                onChange={itemsPerPage}
                className="px-4 py-2 text-sm text-gray-700 bg-white border rounded"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default Variation;

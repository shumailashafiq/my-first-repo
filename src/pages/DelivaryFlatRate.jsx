import React, { useEffect, useState } from 'react'
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import baseURL from '../utils/axios';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { Outlet, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UpdateRate from '../components/DelivaryFlatRate/UpdateRate';

function DelivaryFlatRate() {
  const [allData, setAllData] = useState([])
  const [pageSize, setpageSize] = useState(2)
  const [page, setPage] = useState(0)
  const [sortDir, setsortDir] = useState('asc');
  const [totalPages, setTotalPages] = useState(Number)
  const [id, setId] = useState(null)
  const [forUpdate, setForUpdate] = useState([])
  const navigate = useNavigate()
  const getAll = () => {
    axios.get(`${baseURL}standardRates/?pageSize=${pageSize}&pageNumber=${page}&sortBy=standardRateId&sortDir=${sortDir}`)
      .then((res) => {
        setAllData(res.data.rateResponseList)
        setTotalPages(res.data.totalPages)
      })
  }
  useEffect(() => {
    getAll()
  }, [page, pageSize, sortDir])
  const handlePageSizeChange = (event) => {
    setpageSize(Number(event.target.value))
    setPage(0)
    console.log(event.target.value)
  }
  const handlePageClick = (data) => {
    console.log(data.selected)
    setPage(data.selected)
    console.log(page)
  }
  const SortingHandler = () => {
    setsortDir((prevSortDir) => (prevSortDir === 'asc' ? 'desc' : 'asc'));
    console.log(sortDir)
  }
  const Add = () => { navigate('add') }
  const deleteHandler = (id, index) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
      .then((result) => {
        if (result.isConfirmed) {
          axios.delete(baseURL + 'standardRates/delete/' + id)
            .then((res) => {
              console.log(res);
              const updatedData = [
                ...allData.slice(0, index),
                ...allData.slice(index + 1),
              ];
              setAllData(updatedData)
              Swal.fire({
                title: 'Deleted!',
                text: 'Data has been deleted.',
                icon: 'success'
              });
            })
            .catch((error) => {
              console.error('Error deleting Data:', error);
              Swal.fire({
                title: 'Error!',
                text: 'There was an error deleting the Data.',
                icon: 'error'
              });
            });
        }
      })
  }

  const UpdateHandler = (id, index) => {
    setId(id)
    console.log(allData[index]);
    setForUpdate(allData[index]);
    console.log(id)
  }
  const activeHandle = (id) => {
    // const updatedStatus = allData.find((e) => e.standardRateId === id)
    // console.log(updatedStatus)
    console.log(id)
    axios.get(baseURL + 'standardRates/activateStandardRates/' + id)
      .then((res) => {
        console.log(res)
        setAllData(prev =>
          prev.map(e =>
            e.standardRateId === id ? { ...e, active: !e.active } : e
          )
        );
      })
      .catch((err) => {
        console.log(err)
      })
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName='Delivary Flat Rate' />
      {id !== null ?
        <UpdateRate id={id} forUpdate={forUpdate} setId={setId} setAllData={setAllData} allData={allData} />
        :
        <div className="flex flex-col">
          <Outlet />
          <button onClick={Add} className={`p-2 px-4 shadow-md shadow-black  bg-blue-400 rounded fixed z-10 text-white bottom-[30px] right-[50px] text-4xl`}>
            +
          </button>
          <div className={`rounded-sm border  border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1`}>
            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Standard Rate Id
                      <span><button className='ml-5' onClick={SortingHandler}>
                        {console.log(sortDir)}
                        {
                          sortDir === 'asc' ?
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M9.00054 3L9 11H7V5.41L5 5.9485V3.61978L7.31304 3H9.00054ZM19 3V16H22L18 21L14 16H17V3H19ZM11 15.5C11 16.0645 10.8441 16.5926 10.5729 17.0436L8.28871 21H5.97931L7.45156 18.45C6.05661 18.1923 5 16.9695 5 15.5C5 13.8431 6.34315 12.5 8 12.5C9.65685 12.5 11 13.8431 11 15.5ZM8 16.5C8.55228 16.5 9 16.0523 9 15.5C9 14.9477 8.55228 14.5 8 14.5C7.44772 14.5 7 14.9477 7 15.5C7 16.0523 7.44772 16.5 8 16.5Z"></path></svg> :
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M9 11L9.00054 3H7.31304L5 3.61978V5.9485L7 5.41V11H9ZM22 8L18 3L14 8H17V21H19V8H22ZM8 16.5C7.44772 16.5 7 16.0523 7 15.5C7 14.9477 7.44772 14.5 8 14.5C8.55228 14.5 9 14.9477 9 15.5C9 16.0523 8.55228 16.5 8 16.5ZM10.5729 17.0436C10.8441 16.5926 11 16.0645 11 15.5C11 13.8431 9.65685 12.5 8 12.5C6.34315 12.5 5 13.8431 5 15.5C5 16.9695 6.05661 18.1923 7.45156 18.45L5.97931 21H8.28871L10.5729 17.0436Z"></path></svg>
                        }
                      </button></span>
                    </th>
                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Flat Rate Per Delivery</th>
                    <th className="min-w-[150px] py-4 px-4 text-center font-medium text-black dark:text-white">Effective Date</th>
                    <th className="min-w-[150px] px-4 pl-8 font-medium text-black dark:text-white">Active</th>
                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allData?.map((element, index) => (
                    <tr key={index}>
                      <td className="border-b border-[#eee]  py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                        <p className="font-medium text-black dark:text-white">{element.standardRateId}</p>
                      </td>
                      <td className="border-b border-[#eee]  py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                        <p className="font-medium text-black dark:text-white">{element.flatRatePerDelivery}</p>
                      </td>
                      <td className="border-b border-[#eee] dark:border-strokedark xl:pl-11">
                        <p className="font-medium text-black dark:text-white">{element.effectiveDate?.split('T')[0]}</p>
                      </td>
                      <td className="border-b border-[#eee]  py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                        <label
                          className={`relative m-0 block h-7.5 w-14 rounded-full ${element.active ? 'bg-green-500' : 'bg-black'
                            }`}>
                          <input
                            type="checkbox"
                            checked={element.active}
                            onChange={() => activeHandle(element.standardRateId)}
                            className="dur absolute top-0 z-50 m-0 h-full w-full cursor-pointer opacity-0"
                          />
                          <span
                            className={`absolute top-1/2 left-1 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-white transition-transform duration-300 ${element.active ? 'translate-x-7' : ''
                              }`}
                          ></span>
                        </label>
                        {/* <p className="font-medium text-black dark:text-white">{element.active?'true':'false'}</p> */}
                      </td>
                      <td>
                        <div className="flex items-center space-x-3.5">
                          {/* <button
                            // onClick={() => singleFlatRate(key)}
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
                          </button> */}
                          <button
                            onClick={() => deleteHandler(element.standardRateId, index)}
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
                            onClick={() => UpdateHandler(element.standardRateId, index)}
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
              </table>
              {/* ----------------------------pagination---------------------------- */}
              <div className="flex items-center justify-end bg-white p-2 text-xl">
                <div className="flex items-center">
                  <span className="text-sm bg-gray-200 px-3 py-1 rounded-lg mr-2">
                    Items Per Page:
                  </span>
                  <select
                    onChange={handlePageSizeChange}
                    className="text-sm bg-transparent border-b-2 border-gray-400 outline-none appearance-none mr-5 px-2 py-1"
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                  </select>
                </div>
                <ReactPaginate
                  previousLabel="&#8249;"
                  nextLabel="&#8250;"
                  breakLabel="..."
                  pageCount={totalPages}
                  pageRangeDisplayed={5}
                  marginPagesDisplayed={2}
                  onPageChange={handlePageClick}
                  containerClassName="flex items-center justify-center space-x-1" // Tailwind classes for the pagination container
                  activeClassName="bg-blue-500 text-white" // Active page styling
                  disabledClassName="text-gray-500 cursor-not-allowed" // Disabled button styling
                  breakClassName="hidden md:flex" // Responsive visibility for breaks
                  breakLinkClassName="px-3 py-1" // Styling for break elements
                  pageClassName="hidden md:flex" // Responsive visibility for page numbers
                  pageLinkClassName="px-3 py-1 hover:bg-blue-200 rounded" // Styling for page links
                  previousClassName="flex" // Container for the previous button
                  previousLinkClassName="px-3 py-1 hover:bg-blue-200 rounded" // Styling for the previous button link
                  nextClassName="flex" // Container for the next button
                  nextLinkClassName="px-3 py-1 hover:bg-blue-200 rounded" // Styling for the next button link
                />
              </div>
            </div>
          </div>
        </div>
      }
    </DefaultLayout>
  )
}

export default DelivaryFlatRate
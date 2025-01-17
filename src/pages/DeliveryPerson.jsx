import React from 'react';
import baseUrl from '../utils/axios';
import axios from 'axios';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import TableLoader from '../components/Loaders/TableLoader';
import SingleDeliverPerson from "./../components/Deliveryperson/singleDeliveryperson"
import UpdateDeliveryPerson from "./../components/Deliveryperson/updateDeliveryPerson"
import ReactPaginate from 'react-paginate'; 

export default function DeliveryPerson() {
  let [activeSinglePage, setactiveSinglePage] = useState(false);
  let [DeliveryPersonData, setDeliveryPersonData] = useState('');
  let [SingleDeliveryPersonData, setSingleDeliveryPersonData] = useState('');
  let [updataDeliveryPersonData, setupdataDeliveryPersonData] = useState('');
  let [pageSize, setpageSize] = useState(5);
  let [Page, setPage] = useState(0);
  let [isUpdate, setisUpdate] = useState(false);
  let [sortDir, setsortDir] = useState('asc');
  const totalPages=10;

  console.log(pageSize , Page)

  const handlePageClick=(data)=>{
    console.log(data.selected)
    setPage(data.selected)
    console.log(Page)
  }

  const handlePageSizeChange=(data)=>{
    setpageSize(data.target.value)
    // console.log(data.target.value)
  }

  let navigate=useNavigate()
  useEffect(() => {
    GetData();

  }, [Page,pageSize,sortDir]);
  function addDeliveryPerson(){
    navigate('add');
  }
  function GetData() {
    axios.defaults.headers.common['ngrok-skip-browser-warning'] = 'any value';
 axios
      .get(baseUrl + `api/v1/delivery/findAll?pageNumber=${Page}&pageSize=${pageSize}&sortBy=deliveryPersonId&sortDir=${sortDir}`)
      .then((res) => {
        console.log(res.data);
        setDeliveryPersonData(res.data.deliveryPeople);
        console.log(DeliveryPersonData)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //delete a record
  function deleteHandler(id,key){

    console.log(id,key)
    const updateRecord=[
      ...DeliveryPersonData.slice(0,key) ,
      ...DeliveryPersonData.slice(key+1)
    ]

    setDeliveryPersonData(updateRecord)

    axios.delete(baseUrl+ 'api/v1/delivery/' + id)
    .then((res)=>res.data)
    .catch((err)=>err)
  }
  function singleDelivery(element){
    setSingleDeliveryPersonData(element)
    console.log(SingleDeliveryPersonData)
    setactiveSinglePage(true)
  }
  function UpdateHandler(element){
    setisUpdate(true)
    setupdataDeliveryPersonData(element)
  }
  // sorting of delivery person
  const SortingHandler=()=>{
    if(sortDir==='asc'){
      setsortDir('dec')
    }else{
      setsortDir('asc')
    }
    
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Delivery Person" />

      { activeSinglePage ?
      
      <SingleDeliverPerson setactiveSinglePage={setactiveSinglePage} SingleDeliveryPersonData={SingleDeliveryPersonData}/>
    
      
        :

      <div className="flex flex-col">
        {/* for updating delivery person window */}
        <div
          className={`h-full w-full flex justify-center  items-center relative `}
        >
          {isUpdate && <UpdateDeliveryPerson updataDeliveryPersonData={updataDeliveryPersonData} DeliveryPersonData={DeliveryPersonData} setDeliveryPersonData={setDeliveryPersonData} setisUpdate={setisUpdate} GetData={GetData}/>}
        </div>
        {/* for adding delivery person window */}
        <Outlet />
        <button
          onClick={addDeliveryPerson}
          className={`p-2 px-4 shadow-md shadow-black  bg-blue-400 rounded fixed z-10 text-white bottom-[30px] right-[50px] text-4xl`}
        >
          +
        </button>
        {/* {table for showing all the delivery person} */}
        <div
          className={`rounded-sm border  border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1`}
        >
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Delivery person ID
                    <span><button className='ml-5' onClick={SortingHandler}>
                      {console.log(sortDir)}
                      {
                        sortDir==='asc' ? 
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M9.00054 3L9 11H7V5.41L5 5.9485V3.61978L7.31304 3H9.00054ZM19 3V16H22L18 21L14 16H17V3H19ZM11 15.5C11 16.0645 10.8441 16.5926 10.5729 17.0436L8.28871 21H5.97931L7.45156 18.45C6.05661 18.1923 5 16.9695 5 15.5C5 13.8431 6.34315 12.5 8 12.5C9.65685 12.5 11 13.8431 11 15.5ZM8 16.5C8.55228 16.5 9 16.0523 9 15.5C9 14.9477 8.55228 14.5 8 14.5C7.44772 14.5 7 14.9477 7 15.5C7 16.0523 7.44772 16.5 8 16.5Z"></path></svg> :
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M9 11L9.00054 3H7.31304L5 3.61978V5.9485L7 5.41V11H9ZM22 8L18 3L14 8H17V21H19V8H22ZM8 16.5C7.44772 16.5 7 16.0523 7 15.5C7 14.9477 7.44772 14.5 8 14.5C8.55228 14.5 9 14.9477 9 15.5C9 16.0523 8.55228 16.5 8 16.5ZM10.5729 17.0436C10.8441 16.5926 11 16.0645 11 15.5C11 13.8431 9.65685 12.5 8 12.5C6.34315 12.5 5 13.8431 5 15.5C5 16.9695 6.05661 18.1923 7.45156 18.45L5.97931 21H8.28871L10.5729 17.0436Z"></path></svg>
                      }
                      </button></span>
                  </th>
                  <th className="min-w-[220px] py-5 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Name
                  </th>
                  <th className="min-w-[220px] py-5 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Status
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              {console.log(DeliveryPersonData)}
              {DeliveryPersonData.length < 1 ? (
                <>
                  <TableLoader />
                </>
              ) : (
                <tbody>
                  {DeliveryPersonData.map((element, key) => (
                    <tr key={key}>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {element.deliveryPersonId}
                        </p>
                      </td>
                      <td className="border-b border-[#eee]  py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                        <p className="font-medium text-black dark:text-white">
                          {element.name}
                        </p>
                      </td>
                      <td className="border-b border-[#eee]  py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                        <p className="font-medium text-black dark:text-white">
                          {element.status}
                        </p>
                      </td>

                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <div className="flex items-center space-x-3.5">
                          <button
                            onClick={() => singleDelivery(element)}
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
                                d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                                fill=""
                              />
                              <path
                                d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                                fill=""
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => deleteHandler(element.deliveryPersonId, key)}
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
                            onClick={() => UpdateHandler(element)}
                            className="hover:text-primary"
                          >
                            <svg
                              className="fill-current"
                              width="18"
                              height="18"
                              viewBox="0 0 22 22"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M15.7279 9.57627L14.3137 8.16206L5 17.4758V18.89H6.41421L15.7279 9.57627ZM17.1421 8.16206L18.5563 6.74785L17.1421 5.33363L15.7279 6.74785L17.1421 8.16206ZM7.24264 20.89H3V16.6473L16.435 3.21231C16.8256 2.82179 17.4587 2.82179 17.8492 3.21231L20.6777 6.04074C21.0682 6.43126 21.0682 7.06443 20.6777 7.45495L7.24264 20.89Z"
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

            {/* pagination  */}
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
                    pageCount={totalPages} // Total number of pages
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
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
  );
}

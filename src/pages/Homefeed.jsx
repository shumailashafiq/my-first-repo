import React, { useEffect, useState } from 'react';
import baseUrl from '../utils/axios';
import axios from 'axios';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import TableLoader from '../components/Loaders/TableLoader';
import SingleHomefeed from '../components/HomeFeed/SingleHomefeed';
import ReactPaginate from 'react-paginate'; 
import { Link, Outlet, useNavigate } from 'react-router-dom';



export default function Homefeed() {
    let [homefeed,sethomefeed]=useState([])
    let [isActive,setisActive]=useState(false)
    let [SingleHomeFeed,setSingleHomeFeed]=useState(false)

    let [totalPages,settotalPages]=useState()
    let [pageSize,setpageSize]=useState(10)
    let [pageNumber,setpageNumber]=useState(0)
    let navigate=useNavigate()
  function addHomeFeed(){
    navigate("add")
  }

    const handlePageSizeChange=(data)=>{
      setpageSize(data.target.value)
      // console.log(data.target.value)
    }
    const handlePageClick=(data)=>{
      console.log(data.selected)
      setpageNumber(data.selected)
      console.log(Page)
    }
  

    useEffect(()=>{
        GetData()
    },[pageNumber,pageSize])
    function GetData() {
        axios.defaults.headers.common['ngrok-skip-browser-warning'] = 'any value';
     axios
          .get(baseUrl+`homefeed/getAll/?pageNumber=${pageNumber}&pageSize=${pageSize}`)
          .then((res) => {
            console.log(res.data.object[0])
            settotalPages(res.data.object[0].totalPages)
            // setpageNumber(res.data.object[0].pageNumber)
            // setpageSize(res.data.object[0].pageSize)

            res.data.object.shift();
            sethomefeed(res.data.object)
          })
          .catch((error) => {
            console.log(error);
          });
      }

      async function singleDelivery(id){
        await axios.get(baseUrl+ "homefeed/"+id)
        .then((res)=>{
          console.log(res.data)
          setSingleHomeFeed(res.data)
          setisActive(true);
        })      
      }
  return (
    <>
     <DefaultLayout>
      <Breadcrumb pageName="Home Feed" />
        { isActive ?
        < SingleHomefeed SingleHomeFeed={SingleHomeFeed} setisActive={setisActive}/>
        :
          <>
        <Outlet />
        <button
          onClick={addHomeFeed}
          className={`p-2 px-4 shadow-md shadow-black  bg-blue-400 rounded fixed z-10 text-white bottom-[30px] right-[50px] text-4xl`}
        >
          +
        </button>

        <div
        className={`rounded-sm border  border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1`}
      >
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-5 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Id
                </th>
                <th className="min-w-[220px] py-5 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Date
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            {homefeed.length < 1 ? (
              <>
                <TableLoader />
              </>
            ) : (
              <tbody>
                {homefeed.map((element, key) => (
                  <tr key={key}>
                    <td className="border-b border-[#eee]  py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <p className="font-medium text-black dark:text-white">
                        {element?.homefeedId}
                      </p>
                    </td>
                    <td className="border-b border-[#eee]  py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <p className="font-medium text-black dark:text-white">
                        {element?.homefeed_date?.split("T")[0]}
                      </p>
                    </td>

                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <button
                          // onClick={() => singleDelivery(element.homefeedId)}
                          className="hover:text-primary"
                        ><Link to={`${element.homefeedId}`}>
                        show home feed
                      </Link>
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
                    <select defaultValue={10}
                      onChange={handlePageSizeChange}
                      className="text-sm bg-transparent border-b-2 border-gray-400 outline-none appearance-none mr-5 px-2 py-1"
                    >
                      <option value="5">5</option>
                      <option value="10" selected>10</option>
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
      </>}
        
      
      </DefaultLayout>

      
    </>
  )
}

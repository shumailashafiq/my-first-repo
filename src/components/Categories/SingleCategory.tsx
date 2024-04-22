import React, { useEffect, useState } from 'react'
import baseUrl from '../../utils/axios'


const SingleCategory = (props) => {
    const [data, setdata] = useState([])

    let {Category, singleCategoryData, setBgColor, setDisplay, setevents} = props


    const hide = ()=>{
        setBgColor("blur-none")
         setDisplay("hidden") 
         setevents("pointer-events-auto")
      }

  return (
    <>
                    <div className="rounded-sm fixed top-[30%]  border border-stroke bg-black text-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
              
              <div className="max-w-full overflow-x-auto">

                {/* <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                      <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                         Category ID
                      </th>
                      <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                          Category Name
                      </th>
                      <th className="min-w-[160px] py-4 px-4 font-medium text-black dark:text-white">
                        Contact
                      </th>
                      <th className="py-4 px-4 font-medium text-black dark:text-white">
                        Email
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {singleCategoryData.map((category, key) => (
                      <tr key={key}>
                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                          <h5 className="font-medium text-white dark:text-white">
                            {category.category_id}
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-white dark:text-white">
                            {category.category_name}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p
                            className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium`}
                          >
                            {category.phone_no}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <div className="flex items-center space-x-3.5">
                          <p
                            className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium`}
                          >
                            {category.email}
                          </p>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table> */}
                <h1 className='pl-4 text-lg font-bold'>Parent Category</h1>
                {Category.map((category) => {
                    if (category.category_id === singleCategoryData) {
                        return (
                            <div className='p-4 flex gap-4' key={category.category_id}>
                                <div className='h-[150px] w-[150px] rounded overflow-hidden'>
                                    <img className='h-[150px] w-[150px] object-cover bg-white' src={baseUrl+category.image} alt="" />
                                </div>
                                <div className='flex flex-col gap-2 mt-2'>
                                    <p><b>Category</b> : {category.title}</p>
                                    <p><b>ID</b> : {category.category_id}</p>
                                    <p><b>Reward Point</b> : {category.reward_points}</p>
                                </div>
                            </div>
                        );
                    }
                })}



              </div>
            <button onClick={hide}  className='shadow-black left-[100%] bottom-[100%] shadow text-black  p-4 rounded font-bold mt-1 absolute'>X</button>
  
            </div>
    </>
  )
}

export default SingleCategory
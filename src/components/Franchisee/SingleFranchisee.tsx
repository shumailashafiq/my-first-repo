import React from 'react'

const SingleFranchisee = (props) => {

    // console.log(props)
    let {singleFranchiseeData, setBgColor, setDisplay3, setevents} = props

    const hide = ()=>{
        setBgColor("blur-none")
         setDisplay3("hidden") 
         setevents("pointer-events-auto")
      }

  return (
    <>
                    <div className="rounded-sm absolute top-[30%]  border border-stroke bg-black text-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
              
              <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                      <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                         Franchisee ID
                      </th>
                      <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                          Franchisee Name
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
                    {singleFranchiseeData.map((franchisee, key) => (
                      <tr key={key}>
                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                          <h5 className="font-medium text-white dark:text-white">
                            {franchisee.franchisee_id}
                          </h5>
                          {/* <p className="text-sm">${packageItem.price}</p> */}
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-white dark:text-white">
                            {franchisee.franchisee_name}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p
                            className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium`}
                          >
                            {franchisee.phone_no}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <div className="flex items-center space-x-3.5">
                          <p
                            className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium`}
                          >
                            {franchisee.email}
                          </p>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            <button onClick={hide}  className='shadow-black left-[100%] bottom-[100%] shadow bg-white text-black  p-4 rounded font-bold mt-1 absolute'>X</button>
  
            </div>
    </>
  )
}

export default SingleFranchisee
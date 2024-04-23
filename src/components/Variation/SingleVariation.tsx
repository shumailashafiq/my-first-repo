import React from 'react'

const SingleVariation = (props) => {
  
  // const [variationData, setVariationData] = useState([]);

  let { 
    singleVariationData, 
    setBgColor, 
    setDisplay, 
    setevents } = props

  const hide = () => {
    setBgColor("blur-none")
    setDisplay("hidden")
    setevents("pointer-events-auto")
  }

  return (
    <>

      <div className="rounded-sm absolute top-[30%] z-20 border border-stroke bg-black text-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Category ID
                </th>
                <th className="py-4 [100px] px-4 font-medium text-black dark:text-white">
                  Variation  ID
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Variation Name
                </th>
                <th className="min-w-[200px] py-4 px-4 font-medium text-black dark:text-white">
                  Category Name
                </th>
              </tr>
            </thead>
          </table>
          <tbody>
            {singleVariationData.map((variation, key) => (
              <tr key={key}>

                <td className="border-b min-w-[150px]  border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-white dark:text-white">
                  {variation?.categoryId?.categoryId}
                  </h5>
                </td>

                <td className="border-b min-w-[100px] border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-white dark:text-white">
                    {variation?.variationId}
                  </p>
                </td>

                <td className="border-b min-w-[150px]  border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium`}
                  >
                    {variation.name}
                  </p>
                </td>

                <td className="border-b  min-w-[190px]  border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <p
                      className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium`}
                    >
                     {variation?.categoryId?.title}
                    </p>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </div>
        <button onClick={hide} className='shadow-black left-[100%] bottom-[100%] shadow text-black  p-4 rounded font-bold mt-1 absolute'>X</button>

      </div>
    </>
  )
}
export default SingleVariation;

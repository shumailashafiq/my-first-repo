import React from 'react'
import baseURL from '../../utils/axios';

const SingleItemDiscount = ({ singleItemDis, setBgColor, setDisplay, setevents }) => {

  const hide = () => {
    setBgColor('blur-none');
    setDisplay('hidden');
    setevents('pointer-events-auto');
  };

  return (
    <div className="  fixed top-50 rounded-sm  z-20 border border-stroke bg-black text-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 custom-right-shift ">
    <div className="max-w-3xl overflow-x-auto">
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-2 text-left dark:bg-meta-4">
            <th className="w-[150px] py-4 px-10 font-medium text-black dark:text-white">ID</th>
            <th className="w-[150px] py-4 px-10 font-medium text-black dark:text-white">ProductItem Title</th>
            <th className="w-[150px] py-4 px-10 font-medium text-black dark:text-white">Discount Code</th>
            <th className="w-[150px] py-4 px-10 font-medium text-black dark:text-white">Discount Name</th>
            <th className="w-[150px] py-4 px-10 font-medium text-black dark:text-white">Discount Value</th>
            <th className="w-[150px] py-4 px-10 font-medium text-black dark:text-white">Discount Unit</th>
            <th className="w-[150px] py-4 px-10 font-medium text-black dark:text-white">Valid From</th>
            <th className="w-[150px] py-4 px-10 font-medium text-black dark:text-white">Valid Till</th>
            <th className="w-[150px] py-4 px-10 font-medium text-black dark:text-white">Minimum Order Count</th>
            <th className="w-[150px] py-4 px-10 font-medium text-black dark:text-white">Active</th>
            <th className="w-[150px] py-4 px-10 font-medium text-black dark:text-white">Limited</th>
            <th className="w-[150px] py-4 px-10 font-medium text-black dark:text-white">Discount Text</th>
          </tr>
        </thead>
        <tbody>
          {singleItemDis.map((element, key) => (
            <tr key={key}>
              <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                <p className="font-medium text-black dark:text-white">{element.id}</p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                <p className="font-medium text-black dark:text-white">{element.productItem?.itemName}</p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                <p className="font-medium text-black dark:text-white">{element.discountCode}</p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                <p className="font-medium text-black dark:text-white">{element.discountName}</p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                <p className="font-medium text-black dark:text-white">{element.discountValue}</p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                <p className="font-medium text-black dark:text-white">{element.discountUnit}</p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                <p className="font-medium text-black dark:text-white">{element.validFrom?.split('T')[0]}</p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                <p className="font-medium text-black dark:text-white">{element.validTill?.split('T')[0]}</p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                <p className="font-medium text-black dark:text-white">{element.minimumOrderCount}</p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                <p className="font-medium text-black dark:text-white">{element.isActive ? 'Yes' : 'No'}</p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                <p className="font-medium text-black dark:text-white">{element.isLimited ? 'Yes' : 'No'}</p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                <p className="font-medium text-black dark:text-white">{element.discountText}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  
    <button
      onClick={hide}
      className="shadow-black left-[100%] bottom-[100%] bg-white shadow text-black p-4 rounded font-bold mt-1 absolute"
    >
      X
    </button>
  </div>
  )
}

export default SingleItemDiscount
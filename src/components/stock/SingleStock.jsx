
import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import baseURL from '../../utils/axios';
function SingleStock() {
    const [singleStock, setSingleStock] = useState([])
    useEffect(() => {
        axios.get(baseURL+'/itemstock/')
            .then(res => {
                setSingleStock(res.data.object)
                console.log(res.data.object)
            })
            .catch(err => console.log(err))
    }, [])



    return (
        <div className="rounded-sm absolute top-[30%]  border border-stroke bg-black text-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto table border">
                    <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                Item ID
                            </th>
                            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                Item Name
                            </th>
                            <th className="min-w-[160px] py-4 px-4 font-medium text-black dark:text-white">
                                Stock ID
                            </th>
                            <th className="py-4 px-4 font-medium text-black dark:text-white">
                                Stock
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {singleStock.map((stock, index) => (
                            <tr key={index}>
                                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                    <h5 className="font-medium text-white dark:text-white">
                                        {stock.productItems.ItemId}
                                    </h5>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-white dark:text-white">
                                        {stock.productItems.ItemName}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p
                                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium`}
                                    >
                                        {stock.stockId}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p
                                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium`}
                                    >
                                        {stock.stock}
                                    </p>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            
            </div>
            <button onClick={hide}  className='shadow-black left-[100%] bottom-[100%] bg-white shadow text-black  p-4 rounded font-bold mt-1 absolute'>X</button>
        </div>
    )
}

export default SingleStock
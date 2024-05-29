import React, { useEffect } from 'react'
import baseURL from '../utils/axios';
import axios from 'axios';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import { useState } from 'react';
import AssignOrderDetails from './AssignOrderDetails';
function OrderAssignment() {
    const [allOrders, setAllOrders] = useState([])
    const [veiwMore, setVeiwMore] = useState(false)
    const [selectedId, setSelectedId] = useState(null);
    const getOrders = () => {
        // axios.get('http://localhost:3000/orderAssignmentResponseList')
        axios.defaults.headers.common['ngrok-skip-browser-warning'] = 'any value';
        axios.get(baseURL + 'orderAssignments/')
            .then((res) => {
                console.log(res.data.orderAssignmentResponseList)
                setAllOrders(res.data.orderAssignmentResponseList)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        getOrders()
    }, [])
    function allDetails(id) {
        setVeiwMore(!veiwMore)
        console.log(veiwMore)
        setSelectedId(id)
    }
    return (
        <DefaultLayout>
            {veiwMore == false ?
                <Breadcrumb pageName='Assign Orders' /> :
                <Breadcrumb pageName='All Details' />
            }
            {veiwMore == false ?
                <div className="flex flex-col">
                    <div className={`rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1`}>
                        <div className="max-w-full overflow-x-auto">
                            <table className="w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                        <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                            Order ID
                                        </th>
                                        <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                            Order Date
                                        </th>
                                        <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                            Delivery Person ID
                                        </th>
                                        <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                            Delivery Person Name
                                        </th>
                                        <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allOrders.length > 0 ? (allOrders.map((order, index) => (
                                        <tr key={index}>
                                            <td className="border-b border-[#eee]  py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                                <p className="font-medium text-black dark:text-white">{order.order.orderId}</p>
                                            </td>
                                            <td className="border-b border-[#eee]  py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                                <p className="font-medium text-black dark:text-white">{order.order.orderDate}</p>
                                            </td>
                                            <td className="border-b border-[#eee]  py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                                <p className="font-medium text-black dark:text-white">{order.deliveryPerson.deliveryPersonId}</p>
                                            </td>
                                            <td className="border-b border-[#eee]  py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                                <p className="font-medium text-black dark:text-white">{order.deliveryPerson.name}</p>
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => allDetails(order.order.orderId)}
                                                    className=' flex w-full justify-center rounded bg-primary font-medium text-gray hover:bg-opacity-90 mx-auto'>Veiw More</button>
                                            </td>
                                        </tr>
                                    ))) : '...loading'}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div> :
                <div>
                    {selectedId == null ? "loading..." :
                        <AssignOrderDetails allDetails={allDetails} selectedId={selectedId} veiwMore={veiwMore} allOrders={allOrders} setAllOrders={setAllOrders} />
                    }
                </div>
            }
        </DefaultLayout>
    )
}

export default OrderAssignment
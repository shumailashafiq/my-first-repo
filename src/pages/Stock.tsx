import React,{useContext} from 'react'
import baseURL from '../utils/axios';
import axios from 'axios';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'
import UpdateStock from '../components/stock/UpdateStock';
import DetailedStock from '../components/stock/DetailedStock';
import { StockContext } from './../pages/StockContext.jsx';

function Stock() {
    const [stockData, setStockData] = useState([])
    const [display, setDisplay] = useState('hidden');
    const [bgColor, setBgColor] = useState('blur-none');
    const [events, setevents] = useState('pointer-events-auto');
    const [Id, setId] = useState('')
    const [veiwMore, setVeiwMore] = useState(false)
    const [selectedId, setSelectedId] = useState(null);
    const navigate = useNavigate()
    const { stockData: lallu } = useContext(StockContext); // Access stockData and setStockData from context
    console.log(lallu)
    const getData = () => {
        axios.defaults.headers.common['ngrok-skip-browser-warning'] = 'any value';
        axios.get(baseURL + 'itemstock/')
            .then((res) => {
                setStockData(res.data.object)
                console.log(res.data.object)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getData()
    }, [lallu])

    
    const addStock=()=>navigate('add')
    
    function updateStock(data) {
        console.log(data)
        setDisplay('flex');
        setId(data.stockId)
        console.log(data.stockId)
    }

    function allDetails(id) {
        setVeiwMore(!veiwMore)
        console.log(veiwMore)
        setSelectedId(id)
    }

    const deleteHandler = (id,index) => {
        const updatedStockData = [
            ...stockData.slice(0, index),
            ...stockData.slice(index + 1),
          ];
        setStockData(updatedStockData);
        console.log('deleted id' + id)
        axios
            .delete(baseURL + 'itemstock/' + id)
            .then((res) => {
                console.log(res);
                [...stockData]
            })
            .catch((error) => {
                console.error('there is error', error);
            });
    };

    return (
        <DefaultLayout>
            {veiwMore == false ?
                <Breadcrumb pageName='Stock' /> :
                <Breadcrumb pageName='All Details' />
            }

            {veiwMore == false ?
                <div className="flex flex-col">
                    {/* ---------------updateStock------------ */}
                    <div className={`h-full w-full flex justify-center  items-center relative ${display}`}>
                        <UpdateStock Id={Id} stockData={stockData} setStockData={setStockData} setBgColor={setBgColor} setevents={setevents} setDisplay={setDisplay} updateStock={updateStock}/>
                    </div>
                    {/* ------------outlet for creating stock------------ */}
                    <Outlet />
                    {/* ----------------- Addstock Form button --------------------- */}

                    <button onClick={addStock}
                        className={`p-2 px-4 shadow-md shadow-black  bg-blue-400 rounded fixed z-10 text-white bottom-[30px] right-[50px] text-4xl`}
                    >
                        +
                    </button>
                    <div
                        className={`rounded-sm border ${bgColor} ${events} border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1`}
                    >
                        <div className="max-w-full overflow-x-auto">
                            <table className="w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                        <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Item Name</th>
                                        <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Item Id</th>
                                        <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Stock</th>
                                        <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Stock Id</th>
                                        <th className="min-w-[5px] py-4 px-4 font-medium text-black dark:text-white">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stockData.length > 0 ? (stockData.map((data, index) => (
                                        <tr key={index}>
                                            <td className="border-b border-[#eee]  py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                                <p className="font-medium text-black dark:text-white">{data.productItems?.ItemName}</p>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <p className="text-black dark:text-white">{data.productItems?.itemId}</p>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <p className="text-black dark:text-white">{data.stock}</p>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <p className="text-black dark:text-white">{data.stockId}</p>
                                            </td>
                                            <td>
                                                <div className="flex items-center space-x-3.5">
                                                    <button
                                                        onClick={() => deleteHandler(data.stockId,index)}
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
                                                        onClick={() => updateStock(data)}
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
                                            <td>
                                                <button onClick={() => allDetails(data.stockId)} className=' flex w-full justify-center rounded bg-primary font-medium text-gray hover:bg-opacity-90 mx-auto'>Veiw More</button>
                                            </td>
                                        </tr>

                                    ))) : "..loading"}
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div> :


                <div>
                    {selectedId == null ? "loading..." :
                        <DetailedStock allDetails={allDetails} selectedId={selectedId} veiwMore={veiwMore} stockData={stockData} setStockData={setStockData}/>
                    }
                </div>
            }
        </DefaultLayout>
    )
}

export default Stock
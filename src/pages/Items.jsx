import React, { useEffect, useState } from 'react'
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import baseURL from '../utils/axios';
import axios from 'axios';
import ItemsDetails from './ItemsDetails';
import ItemReview from './ItemReview';
import ReactPaginate from 'react-paginate';
import Swal from 'sweetalert2'

function Items() {
    const [allItems, setAllItems] = useState([])
    const [veiwMore, setVeiwMore] = useState(false)
    const [selectedId, setSelectedId] = useState(null);
    const [pageSize, setpageSize] = useState(2)
    const [page, setPage] = useState(0)
    let [sortDir, setsortDir] = useState('asc');
    const [veiwReview, setVeiwReview] = useState(false)
    const [reveiwId, setReveiwId] = useState(null)

    const totalPages = 34
    const getAllItems = () => {
        axios.defaults.headers.common['ngrok-skip-browser-warning'] = 'any value';
        // axios.get(baseURL + `productItem/?pageSize=${pageSize}&pageNumber=${page}&sortBy=itemId&sortDir=${sortDir}`)
        axios.get(baseURL + `productItem/`)    // 
            .then((res) => {
                console.log(res.data.items)
                setAllItems(res.data.items)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        getAllItems()
    }, [page, pageSize])

    function allDetails(id) {
        setVeiwMore(!veiwMore)
        console.log(veiwMore)
        setSelectedId(id)
    }

    const activeHandle = (id) => {
        const updatedStatus = allItems.find((item) => item.item_id === id)
        console.log(updatedStatus)
        console.log(id)
        axios.put(baseURL + 'productItem/update/status/' + id)
            .then((res) => {
                console.log(res)
                setAllItems(prevItems =>
                    prevItems.map(item =>
                        item.item_id === id ? { ...item, is_active: !item.is_active } : item
                    )
                );
            })
            .catch((err) => {
                console.log(err)
            })
    };
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
        if (sortDir === 'asc') {
            setsortDir('dec')
        } else {
            setsortDir('asc')
        }
    }
    function showCategories(id) {
        const selectedItem = allItems.find(item => item.item_id === id);
        console.log(selectedItem?.categories);
        const category = selectedItem.categories
        Swal.fire({
            title: "The Categories",
            html: `<table id="table" class="min-w-full divide-y">
                <thead class="bg-gray">
                    <tr>
                        <th class="py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th class="py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    </tr>
                </thead>
                <tbody>
                    ${category.length > 0 ? category.map((data, index) => (
                `<tr key=${index}>
                            <td class="px-6 py-4 text-sm text-gray-900">${data.categoryid}</td>
                            <td class="px-6 py-4 text-sm text-gray-900">${data.title}</td>
                        </tr>`
            )).join('') : ''}
                </tbody>
            </table>`
        });

    }

    const reveiw = (id) => {
        setVeiwReview(!veiwReview)
        setReveiwId(id)
    }

    return (
        <DefaultLayout>
            {veiwReview === false ? (
                veiwMore === false ?
                    <Breadcrumb pageName='All Items' /> :
                    <Breadcrumb pageName='All Details' />
            ) : <Breadcrumb pageName='Review Page' />}

            {veiwReview === false ? (
                veiwMore == false ?
                    <div className="flex flex-col">
                        <button className={`p-2 px-4 shadow-md shadow-black  bg-blue-400 rounded fixed z-10 text-white bottom-[30px] right-[50px] text-4xl`}>
                            +
                        </button>
                        <div className={`rounded-sm border  border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1`}>
                            <div className="max-w-full overflow-x-auto">
                                <table className="w-full table-auto">
                                    <thead>
                                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Item ID
                                                <span><button className='ml-5' onClick={SortingHandler}>
                                                    {console.log(sortDir)}
                                                    {
                                                        sortDir === 'asc' ?
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M9.00054 3L9 11H7V5.41L5 5.9485V3.61978L7.31304 3H9.00054ZM19 3V16H22L18 21L14 16H17V3H19ZM11 15.5C11 16.0645 10.8441 16.5926 10.5729 17.0436L8.28871 21H5.97931L7.45156 18.45C6.05661 18.1923 5 16.9695 5 15.5C5 13.8431 6.34315 12.5 8 12.5C9.65685 12.5 11 13.8431 11 15.5ZM8 16.5C8.55228 16.5 9 16.0523 9 15.5C9 14.9477 8.55228 14.5 8 14.5C7.44772 14.5 7 14.9477 7 15.5C7 16.0523 7.44772 16.5 8 16.5Z"></path></svg> :
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M9 11L9.00054 3H7.31304L5 3.61978V5.9485L7 5.41V11H9ZM22 8L18 3L14 8H17V21H19V8H22ZM8 16.5C7.44772 16.5 7 16.0523 7 15.5C7 14.9477 7.44772 14.5 8 14.5C8.55228 14.5 9 14.9477 9 15.5C9 16.0523 8.55228 16.5 8 16.5ZM10.5729 17.0436C10.8441 16.5926 11 16.0645 11 15.5C11 13.8431 9.65685 12.5 8 12.5C6.34315 12.5 5 13.8431 5 15.5C5 16.9695 6.05661 18.1923 7.45156 18.45L5.97931 21H8.28871L10.5729 17.0436Z"></path></svg>
                                                    }
                                                </button></span>
                                            </th>
                                            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Item Name</th>
                                            <th className="min-w-[150px] py-4 font-medium text-black dark:text-white pl-5">Category</th>
                                            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white pl-10">Price</th>
                                            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">SKU</th>
                                            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Status</th>
                                            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Action</th>
                                            <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Review</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allItems.length > 0 ? (allItems.map((item, index) => {
                                            const categories = item.categories || [];
                                            const zeroIndex = categories[0] ? categories[0].title : '';
                                            const remainIndex = categories.slice(1)
                                            console.log(zeroIndex);
                                            console.log(remainIndex.length)

                                            return (
                                                <tr key={index}>
                                                    <td className="border-b border-[#eee]  py-5 px-4  dark:border-strokedark">
                                                        <p className="font-medium text-black dark:text-white">{item.item_id}</p>
                                                    </td>
                                                    <td className="border-b border-[#eee]  py-5 px-4  dark:border-strokedark">
                                                        <p className="font-medium text-black dark:text-white">{item.item_name}</p>
                                                    </td>
                                                    <td className="border-b border-[#eee]  py-5 pl-5  dark:border-strokedark">
                                                        <div className='flex gap-2 items-center '>

                                                            {remainIndex.length > 0 ?
                                                                <button onClick={() => showCategories(item.item_id)}
                                                                    className=' flex w-fit-content p-1 h-fit-content underline underline-offset-1 align-items-center rounded text-primary font-medium hover:bg-opacity-90 btn-xs'>
                                                                    <p className="font-medium text-primary dark:text-white">
                                                                        {zeroIndex}
                                                                    </p>
                                                                    {remainIndex.length > 0 ? `+${remainIndex.length}` : '+'}
                                                                </button>
                                                                : <p className="font-medium  dark:text-white">
                                                                    {zeroIndex}
                                                                </p>
                                                            }

                                                        </div>
                                                    </td>
                                                    <td className="border-b border-[#eee]  py-5 px-4  dark:border-strokedark pl-10">
                                                        <p className="font-medium text-black dark:text-white">{item.price}</p>
                                                    </td>
                                                    <td className="border-b border-[#eee]  py-5 px-4  dark:border-strokedark">
                                                        <p className="font-medium text-black dark:text-white">{item.sku}</p>
                                                    </td>
                                                    <td className="border-b border-[#eee]  py-5 px-4  dark:border-strokedark ">
                                                        <label
                                                            className={`relative m-0 block h-7.5 w-14 rounded-full ${item.is_active ? 'bg-green-500' : 'bg-black'
                                                                }`}>
                                                            <input
                                                                type="checkbox"
                                                                checked={item.is_active}
                                                                onChange={() => activeHandle(item.item_id)}
                                                                className="dur absolute top-0 z-50 m-0 h-full w-full cursor-pointer opacity-0"
                                                            />
                                                            <span
                                                                className={`absolute top-1/2 left-1 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-white transition-transform duration-300 ${item.is_active ? 'translate-x-7' : ''
                                                                    }`}
                                                            ></span>
                                                        </label>
                                                    </td>
                                                    <td className="border-b border-[#eee]  py-5 px-4  dark:border-strokedark ">
                                                        <button
                                                            onClick={() => allDetails(item.item_id)}
                                                            className=' flex w-full justify-center rounded bg-primary font-medium text-gray hover:bg-opacity-90 mx-auto btn-xs'>Veiw More
                                                        </button>
                                                    </td>
                                                    <td className="border-b border-[#eee]  py-5 px-4  dark:border-strokedark ">
                                                        <button
                                                            onClick={() => reveiw(item.item_id)}
                                                            className=' flex w-full justify-center rounded bg-primary font-medium text-gray hover:bg-opacity-90 mx-auto btn-xs'>Veiw Review
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })) : '...loading'}
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
                    </div> :
                    <div>
                        {selectedId == null ? "loading..." :
                            <ItemsDetails allDetails={allDetails} selectedId={selectedId} veiwMore={veiwMore} allItems={allItems} setAllItems={setAllItems} />
                        }
                    </div>

            ) : <div>
                {reveiwId == null ? "loading..." :
                    <ItemReview reveiw={reveiw} reveiwId={reveiwId} veiwReview={veiwReview} />
                }
            </div>}
        </DefaultLayout>
    )
}

export default Items
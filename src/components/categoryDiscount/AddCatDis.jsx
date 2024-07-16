import React, { useEffect, useState } from 'react'
import axios from 'axios'
import baseURL from '../../utils/axios'
import Swal from 'sweetalert2'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

function AddCatDis() {
    const [categories, setCategories] = useState([])
    const [catId,setCatId]=useState(null)
    const [discountName,setDiscountName]=useState('')
    const [discountCode,setDiscountCode]=useState('')
    const [discountUnit,setdiscountUnit]=useState('')
    const [discountValue,setdiscountValue]=useState('')
    const [maximumDiscountAmount,setmaximumDiscountAmount]=useState('')
    const [discountText,setdiscountText]=useState('')
    const [minimumOrderCount,setminimumOrderCount]=useState('')
    const [validFrom,setvalidFrom]=useState('')
    const [validTill,setvalidTill]=useState('')
    const [isActive,setIsActive]=useState('')
    const [isLimited,setIsLimited]=useState(' ')
    const navigate=useNavigate()
    console.log(catId)

    const getCategory = () => {
        axios.defaults.headers.common['ngrok-skip-browser-warning'] = 'any value';
        axios.get(baseURL + 'categories/')
            .then((res) => {
                setCategories(res.data.object)
                console.log(res.data.object)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        getCategory()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const tillFormatted = moment(validTill).format('YYYY-MM-DD HH:mm')
        const FromFormatted = moment(validFrom).format('YYYY-MM-DD HH:mm')
        axios.post(baseURL+'categoryDiscount/',{
                "discountName":discountName,
                "discountCode": discountCode,
                "discountUnit": discountUnit,
                "discountValue": parseInt(discountValue),
                "maximumDiscountAmount": parseInt(maximumDiscountAmount),
                "discountText": discountText,
                "minimumOrderCount": parseInt(minimumOrderCount),
                "validFrom": FromFormatted,
                "validTill": tillFormatted,
                "isActive": isActive,
                "isLimited":isLimited,
                "categoryId": catId
        })
        .then((res)=>{
            console.log(res.data.object)
            // setData(prevData => [...prevData,res.data.object]);
            Swal.fire({
                title: 'Success!',
                text: 'Category Discount is successfully added!',
                icon: 'success',
                confirmButtonText: 'OK'
              }).then(() => {
                navigate('/categoryDiscount');
              });
        }).catch((err)=>{
            console.log(err)
            Swal.fire({
                title: 'Error!',
                text: 'Sorry, Category Discount is not added. Try again later.',
                icon: 'error',
                confirmButtonText: 'OK'
              });
        })
    }
    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">Add Category</h3>
            </div>
            <form action="#"
                onSubmit={handleSubmit}
            >
                <div className="p-6.5">
                    <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Category
                        </label>
                        {!categories ? ('...loading') : (
                            <select 
                            onChange={(event) => setCatId(event.target.value)}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
                                <option value="">Select a Category</option>
                                {categories.length > 0 ? (
                                    categories?.map((item) => (
                                        <option key={item.category_id} value={item.category_id}>
                                            {item.title}
                                        </option>
                                    ))
                                ) : ("loading")}
                            </select>
                        )}
                    </div>

                    <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Discount Name
                        </label>
                        <input
                            type="text"
                            onChange={(e) => setDiscountName(e.target.value )}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                    <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Discount code
                        </label>
                        <input
                            type="text"
                            onChange={(e) => setDiscountCode(e.target.value )}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                    <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Discount Unit
                        </label>
                        <select
                            type="number"
                            onChange={(e) => setdiscountUnit(e.target.value )}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            >
                                <option value="">Select Discount Unit</option>
                                <option value='percentage'>
                                            Percentage
                                        </option>
                                <option value='fixedAmount'>
                                            Fixed Amount
                                        </option>
                                
                            </select>
                    </div>
                    <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Discount Value
                        </label>
                        <input
                            type="number"
                            onChange={(e) => setdiscountValue(e.target.value )}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                    <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Maximum Discount Amount
                        </label>
                        <input
                            type="number"
                            onChange={(e) => setmaximumDiscountAmount(e.target.value )}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                    <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Discount Text
                        </label>
                        <input
                            type="text"
                            onChange={(e) => setdiscountText(e.target.value )}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                    <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Minimum order Count
                        </label>
                        <input
                            type="number"
                            onChange={(e) => setminimumOrderCount( e.target.value )}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                    <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Valid From
                        </label>
                        <input
                            type="datetime-local"
                            onChange={(e) => setvalidFrom(e.target.value )}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                    <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Valid Till
                        </label>
                        <input
                            type="datetime-local"
                            onChange={(e) => setvalidTill (e.target.value )}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                    <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Status
                        </label>
                        <select
                            type="text"
                            onChange={(e) => setIsActive(e.target.value )}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            >
                                <option value="">Select Status</option>
                                <option value='true'>
                                            Yes
                                        </option>
                                <option value='false'>
                                            No
                                        </option>
                                
                            </select>
                    </div>
                    <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Limited
                        </label>
                        <select
                            type="text"
                            onChange={(e) => setIsLimited(e.target.value )}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            >
                                <option value="">Select Limit</option>
                                <option value='true'>
                                            Yes
                                        </option>
                                <option value='false'>
                                            No
                                        </option>
                                
                            </select>
                    </div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                    >
                        Add Category Discount
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddCatDis
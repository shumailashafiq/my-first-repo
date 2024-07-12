import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';
import baseURL from '../../utils/axios';
import moment from 'moment';
import Swal from 'sweetalert2';

function UpdateDiscount(props) {
    const { setDisplay1, setBgColor, setevents, id, data, setData } = props
    const [categories, setCategories] = useState([])
    const [catId, setCatId] = useState(null)
    const [discountName, setDiscountName] = useState('')
    const [discountCode, setDiscountCode] = useState('')
    const [discountUnit, setdiscountUnit] = useState('')
    const [discountValue, setdiscountValue] = useState('')
    const [maximumDiscountAmount, setmaximumDiscountAmount] = useState('')
    const [discountText, setdiscountText] = useState('')
    const [minimumOrderCount, setminimumOrderCount] = useState('')
    const [validFrom, setvalidFrom] = useState('')
    const [validTill, setvalidTill] = useState('')
    const [isActive, setIsActive] = useState('')
    const [isLimited, setIsLimited] = useState('')
    // ------------getting categories--------------
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
// --------------data for updation----------------
    useEffect(() => {
        if (data && data.length > 0) {
            const singleData = data.find(single => single.id === id);

            if (singleData) {
                console.log(singleData)
                const { discountName, discountCode, discountUnit, discountValue, maximumDiscountAmount, discountText, minimumOrderCount, validFrom, validTill, isActive, isLimited, categoryId } = singleData
                setDiscountName(discountName || '');
                setDiscountCode(discountCode || '')
                setdiscountUnit(discountUnit || '')
                setdiscountValue(discountValue || '')
                setmaximumDiscountAmount(maximumDiscountAmount || '')
                setdiscountText(discountText || '')
                setminimumOrderCount(minimumOrderCount || '')
                setvalidFrom(validFrom || '')
                setvalidTill(validTill || '')
                setIsActive(isActive ? 'true' : 'false')
                setIsLimited(isLimited ? 'true' : 'false')
                setCatId(+categoryId.categoryId)
            }
        }
    }, [id, data]);

    const hide = () => {
        setBgColor("blur-none");
        setDisplay1("hidden");
        setevents("pointer-events-auto");
    };

    const updateHandle = (e) => {
        e.preventDefault()
        const tillFormatted = moment(validTill).format('YYYY-MM-DD HH:mm')
        const FromFormatted = moment(validFrom).format('YYYY-MM-DD HH:mm')
        const updateData = {
            "discountName": discountName,
            "discountCode": discountCode,
            "discountUnit": discountUnit,
            "discountValue": parseInt(discountValue),
            "maximumDiscountAmount": parseInt(maximumDiscountAmount),
            "discountText": discountText,
            "minimumOrderCount": parseInt(minimumOrderCount),
            "validFrom": FromFormatted,
            "validTill": tillFormatted,
            "isActive": isActive === 'true',
            "isLimited": isLimited === 'true',
            "categoryId": +catId
        }
        console.log(updateData)
        axios.put(`${baseURL}categoryDiscount/${id}`, updateData)
            .then(res => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Category Discount is successfully update!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
                const updatedCategory = categories.find(cat => cat.category_id === catId);
                const updatedCategoryTitle = updatedCategory ? updatedCategory.title : '';
                console.log(updatedCategoryTitle)
                const updatedData = data.map(e =>
                    e.id === id ? { ...e, ...updateData, categoryTitle: updatedCategoryTitle } : e
                );
                setData([...updatedData]);
                console.log([...updatedData]);
                // const updatedData = data.map(e =>
                //     e.id === id ? { ...e, ...updateData} : e
                //   );
                //   setData([...updatedData]) 
            })
            .catch((error) => {
                console.error('Error updating Category Discount:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Sorry, Category Discount is not Update. Try again later.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });

        setBgColor("blur-none");
        setDisplay1("hidden");
        setevents("pointer-events-auto");
    };



    return (
        <div className="rounded-sm h-full absolute  w-full z-20 border border-stroke bg-white shadow-default dark:border-strokedark z:99 ">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark bg-white">
                <h3 className="font-medium text-black dark:text-white">
                    Update Category Discount
                </h3>
            </div>
            <form
                onSubmit={updateHandle}
                className='bg-white'>
                <div className="p-6.5">
                    <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Category
                        </label>
                        {!categories ? ('...loading') : (
                            <select
                                value={+catId}
                                onChange={(event) => setCatId(+event.target.value)}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
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
                            value={discountName}
                            type="text"
                            onChange={(e) => setDiscountName(e.target.value)}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                    <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Discount code
                        </label>
                        <input
                            type="text"
                            value={discountCode}
                            onChange={(e) => setDiscountCode(e.target.value)}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                    <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Discount Unit
                        </label>
                        <select
                            type="number"
                            value={discountUnit}
                            onChange={(e) => setdiscountUnit(e.target.value)}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        >
                            <option value="">Select a Category</option>
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
                            value={discountValue}
                            onChange={(e) => setdiscountValue(e.target.value)}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                    <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Maximum Discount Amount
                        </label>
                        <input
                            type="number"
                            value={maximumDiscountAmount}
                            onChange={(e) => setmaximumDiscountAmount(e.target.value)}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                    <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Discount Text
                        </label>
                        <input
                            type="text"
                            value={discountText}
                            onChange={(e) => setdiscountText(e.target.value)}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                    <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Minimum order Count
                        </label>
                        <input
                            value={minimumOrderCount}
                            type="number"
                            onChange={(e) => setminimumOrderCount(e.target.value)}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                    <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Valid From
                        </label>
                        <input
                            type="datetime-local"
                            value={validFrom}
                            onChange={(e) => setvalidFrom(e.target.value)}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                    <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Valid Till
                        </label>
                        <input
                            type="datetime-local"
                            value={validTill}
                            onChange={(e) => setvalidTill(e.target.value)}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                    <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Status
                        </label>
                        <select
                            type="text"
                            value={isActive}
                            onChange={(e) => setIsActive(e.target.value)}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        >
                            <option value="">Select Status</option>
                            <option value='true'>Yes</option>
                            <option value='false'>No</option>
                        </select>
                    </div>
                    <div className="mb-4.5">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Limited
                        </label>
                        <select
                            type="text"
                            value={isLimited}
                            onChange={(e) => setIsLimited(e.target.value)}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        >
                            <option value="">Select Limit</option>
                            <option value='true'>Yes</option>
                            <option value='false'>No</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                    >
                        Update Catetgory Discount
                    </button>
                </div>
            </form>
            <button
                onClick={hide}
                className="flex w-full justify-center rounded bg-red-500 p-3 font-medium text-gray hover:bg-opacity-90 ">
                Cancel
            </button>
        </div>
    )
}

export default UpdateDiscount
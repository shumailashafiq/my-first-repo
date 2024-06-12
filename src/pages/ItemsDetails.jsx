import React from 'react'
import { useEffect } from 'react';
import baseURL from '../utils/axios';
function ItemsDetails(props) {
    const { allDetails, selectedId, veiwMore, allItems } = props
    const allData = allItems.find(element => element.item_id === selectedId) || {};
    const selectedItem = allItems.find(item => item.item_id === selectedId);
    const { discounts } = selectedItem;
    const discount = discounts?.[0];
    const { variations } = selectedItem;
    const variation = variations?.[0]
    const option = variation?.options?.[0];
    const { categories } = selectedItem;
    const category = categories?.[0]
    useEffect(() => {
        if (veiwMore && selectedId !== null) {
            console.log(allData)

        }
    }, [selectedId, veiwMore, allData])
    return (
        <>
            {veiwMore && (
                <div className="flex flex-col">
                    <div className={`rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 relative `}>
                        <h1 className='text-center pt-5 text-2xl'><b>Item Detailes</b> </h1><br /><br /><hr /><br /><br />
                        <div className="max-w-full  bg-white ml-0 items-center overflow-x-auto pb-11">
                            <div className='flex flex-row gap-2 flex  mt-2'>
                                <div className='w-full flex flex-col justify-center align-item-center pl-6'>
                                    {Object.keys(allData).length > 0 ? (
                                        <>
                                            {/* <p><b>Status :  </b>{allData.is_active || "N/A"}</p> */}
                                            <p><b>Item ID :  </b>{allData.item_id || "N/A"}</p>
                                            <p><b>Description :  </b>{allData.description || "N/A"}</p>
                                            <p><b>Item Name :  </b>{allData.item_name || "N/A"}</p>
                                            <p><b>Reward Points :  </b>{allData.reward_points || "N/A"}</p>
                                            <p><b>Price :  </b>{allData.price || "N/A"}</p>
                                            <p><b>sku :  </b>{allData.sku || "N/A"}</p>
                                            <p><b>slug :  </b>{allData.slug || "N/A"}</p>

                                            <h3 className='text-center my-5'><b>Discount Details</b></h3>
                                            <p>Valid Till: {new Date(discount.valid_till).toLocaleString()}</p>
                                            <p>Discount Unit: {discount.discount_unit}</p>
                                            <p>Discount Name: {discount.discount_name}</p>
                                            <p>Discount Value: {discount.discount_value}</p>
                                            <p>Valid From: {new Date(discount.valid_from).toLocaleString()}</p>
                                            <p>Maximum Discount Amount: {discount.maximum_discount_amount}</p>

                                            <h3 className='text-center my-5'><b>Variation Details</b></h3>
                                            <p>Variation Id: {variation.variation_id}</p>
                                            <p>Variation Name: {variation.name}</p>
                                            <p>VOID: {option?.VOID}</p>
                                            <p>Value: {option?.value}</p>

                                            <h3 className='text-center my-5'><b>Vendor</b></h3>
                                            <p><b>Vendor Id :  </b>{allData.vendor?.vendorId || "N/A"}</p>
                                            <p><b>Vendor Name :  </b>{allData.vendor?.vendor_name || "N/A"}</p>
                                            <p><b>email :  </b>{allData.vendor?.email || "N/A"}</p>
                                            <p><b>phone_no :  </b>{allData.vendor?.phone_no || "N/A"}</p>

                                            <h3 className='text-center my-5'><b>Franchisee</b></h3>
                                            <p><b>Franchisee ID :  </b>{allData.franchisee?.franchisee_id || "N/A"}</p>
                                            <p><b>Franchisee Name :  </b>{allData.franchisee?.franchisee_name || "N/A"}</p>
                                            <p><b>email :  </b>{allData.franchisee?.email || "N/A"}</p>
                                            <p><b>phone_no :  </b>{allData.franchisee?.phone_no || "N/A"}</p>

                                            <h3 className='text-center my-5'><b>Categories</b></h3>
                                            <p><b>Title :  </b>{category?.title || "N/A"}</p>
                                            <p><b>Category Id :  </b>{category?.categoryid || "N/A"}</p>

                                            <h1 className='text-center my-5'><b>Images</b></h1>
                                            <b>Thumbnail Images</b>
                                            <div className='mx-5 flex flex-row justify-center align-item-center'>
                                                <div className='flex flex-row gap-4 overflow-x-scroll '>
                                                    {allData.images.map((e) => (
                                                        // console.log(e.id)
                                                        // console.log(e.url)
                                                        <div className='flex flex-col'>
                                                            <div className='flex justify-between'>
                                                                <p><b>ID:</b></p>
                                                                <p>{e.id}</p>
                                                            </div>
                                                            <div className='h-40 w-50 overflow-hidden rounded bg-gray' key={e.id}>
                                                                <img className=' object-cover h-full w-full' src={baseURL + e.url.slice(1)} alt="" />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <b className='my-5'>Variation Images</b>
                                            <div className='mx-5 flex flex-row justify-center align-item-center'>
                                                <div className='flex flex-row gap-4 overflow-x-scroll'>
                                                    {allData.variation_Image.map((e) => (
                                                        <div className='flex flex-col'>
                                                            <div className='flex justify-between'>
                                                            <p><b>ID:</b></p>
                                                            <p>{e.variation_image_id}</p>
                                                            </div>
                                                            <div className='h-40 w-50 overflow-hidden rounded bg-gray' key={e.variation_image_id}>
                                                                <img className='h-full w-full object-cover' src={baseURL + e.url.slice(1)} alt="" />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            {/* <div className='w-70 inline-flex mx-5 justify-center align-item-center'><b>Variation Images</b></div> */}
                                        </>
                                    ) : (
                                        <p>Loading...</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <button onClick={allDetails} className=" flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 mx-auto">Go Back</button>
                </div>
            )}
        </>)
}

export default ItemsDetails
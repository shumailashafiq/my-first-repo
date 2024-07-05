import axios from 'axios'
import React, { useEffect, useState } from 'react'
import baseURL from '../utils/axios'
import Sidebar from './ItemSideBar'
import { Rating, ThinStar } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css';
import ProgressBar from 'react-progressbar'
import ShowMoreText from 'react-show-more-text';

const myStyles = {
    itemShapes: ThinStar,
    activeFillColor: '#ffb700',
    inactiveFillColor: '#fbf1a9',
    itemSize: 12
}

export default function ItemReview(props) {
    const { reveiw, reveiwId, veiwReview } = props
    const [reviewData, setReviewData] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [rId, setRId] = useState(null)
    const [rating, setRating] = useState({})
    const [averageRating, setAverageRating] = useState(Number)

    const getReview = () => {
        axios.get(`${baseURL}itemReview/ReviewByItemId/${reveiwId}`)
            .then((res) => {
                console.log(res.data)
                console.log(res.data.reviews)
                setReviewData(res.data.reviews)
                setRating(res.data.ratingCount)
                setAverageRating(res.data.averageRating)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        getReview()
    }, [])
    const toggleSidebar = (id) => {
        setIsOpen(!isOpen)
        console.log(isOpen)
        setRId(id)
        console.log(id)
    }
    console.log(rating)
    console.log(averageRating)

    const totalRating = Object.values(rating).reduce((acc, current) => acc + current, 0)
    console.log(totalRating)

    return (
        <>
            {veiwReview && (
                <div className="flex flex-col">
                    <div className={`h-fit overflow-auto rounded-sm border border-stroke bg-white px-5 pt-4 pb-2 shadow-default dark:border-strokedark dark:bg-boxdark flex flex-row `}>
                        <div className='flex flex-col w-max'>
                            <div>
                                <Rating
                                    value={averageRating}
                                    readOnly={true}
                                    max={5}
                                    itemStyles={myStyles}
                                    style={{ width: '150%' }}
                                />
                            </div>
                                <b><h1 className='font-black text-2xl'>{averageRating}</h1></b>
                               <div>
                                 <h3 className='w-max'> of {totalRating} reviews</h3>
                                </div>
                        </div>
                        <div className=" bg-gray-200">
                            <div className=' text-sm pl-44'>1star</div>
                            <div className=' text-sm pl-44'>2star</div>
                            <div className=' text-sm pl-44'>3star</div>
                            <div className=' text-sm pl-44'>4star</div>
                            <div className=' text-sm pl-44'>5star</div>
                        </div>
                        <div className="pr-2">
                            {Object.keys(rating).map((value) => {
                                const percentage = (rating[value] / totalRating) * 100
                                console.log(percentage)
                                return (
                                    <div className='mb-3 rounded-full pl-5 w-150'>
                                        <ProgressBar completed={percentage}
                                            style={{ backgroundColor:'#D0D0D0', width:'99%', height:'2%'}}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                        <div>
                            {Object.keys(rating).map((key) => (

                                <div className=' text-sm'>{rating[key]}</div>
                            )
                            )}
                        </div>
                    </div>
                    <div className={`rounded-sm border  border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1`}>
                        <div className="max-w-full overflow-x-auto">
                            <table className="w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                        <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Product</th>
                                        <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Reviewer</th>
                                        <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Review</th>
                                        <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Date</th>
                                        <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Helpful</th>
                                        <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">Not Helpful</th>
                                        <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white pl-15">View Image</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reviewData?.map((element, index) => (
                                        <tr key={index}>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <p className="text-black dark:text-white">
                                                    {element.productItem?.itemName}
                                                </p>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <p className="text-black dark:text-white">
                                                    {element.customer?.email}
                                                </p>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <div className='flex flex-col'>
                                                    <div className="text-black dark:text-white h-10 flex flex-row gap-2">
                                                        <Rating
                                                            value={element.rating}
                                                            readOnly={true}
                                                            max={5}
                                                            color={{ filled: '#ffd700', unfilled: '#d3d3d3' }}
                                                            size={24}
                                                            itemStyles={myStyles}
                                                            style={{ width: '70%' }}
                                                        />
                                                        <div className='mt-3 text-xs'>{element.rating}</div>
                                                    </div>
                                                    <div className="text-black dark:text-white">
                                                        <ShowMoreText
                                                            lines={1}
                                                            more="Show more"
                                                            less="Show less"
                                                            anchorClass="my-anchor-css-class"
                                                            expanded={false}
                                                            width={180}
                                                        >
                                                            {element.reviewText}
                                                        </ShowMoreText>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <p className="text-black dark:text-white">
                                                    {element.reviewDate}
                                                </p>
                                            </td>

                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark pl-10">
                                                <p className="text-black dark:text-white">
                                                    {element.helpfulCount}
                                                </p>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark pl-10">
                                                <p className="text-black dark:text-white">
                                                    {element.notHelpfulCount}
                                                </p>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <button
                                                    onClick={() => toggleSidebar(element.reviewId)}
                                                    className=' flex w-full justify-center rounded bg-primary font-medium text-gray hover:bg-opacity-90 mx-auto btn-xs'>Veiw Image
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <button onClick={reveiw} className=" flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 mx-auto mt-5">Go Back</button>

                    <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} rId={rId} reviewData={reviewData} />

                </div>
            )}

        </>
    )
}

import axios from 'axios'
import React, { useState } from 'react'
import baseURL from '../utils/axios'

export default function ItemReply(props) {
    const { isOpen, replies, reviewId, itemId, reviewText, rating } = props
    const [replyText, setReplyText] = useState('')


    const submitReply = () => {
        let itemReviewData = {
            "productItem": {
                "itemId": itemId
            },

            "reviewText": reviewText,
            "rating": rating,
            "parentReviewId": {
                "reviewId": reviewId
            }
        };

        const formData = new FormData();
        formData.append('itemReview', JSON.stringify(itemReviewData));
        axios.post(`${baseURL}itemReview/`,formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
              },
        }
        )
        console.log('Submitting reply:', replyText)
        setReplyText('')
        replies()
    }

    return (
        <>
            {isOpen && (
                <div className="px-4 py-2">
                    <div className="mt-2 flex-row items-center justify-center gap-5 float-end">
                        <div>
                            <textarea
                                className="w-70 px-3 py-2 text-sm text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                                rows="3"
                                placeholder="Type your reply..."
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                            ></textarea>
                        </div>
                        <div>
                            <button
                                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded text-sm"
                                onClick={submitReply}
                            >
                                Submit
                            </button>
                            <button
                                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 ml-2 px-3 rounded text-sm"
                                onClick={replies}
                            >
                               Close
                            </button>

                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

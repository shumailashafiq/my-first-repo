// src/components/Sidebar.js
import React, { useEffect, useState } from 'react';
import '../pages/item.css';
import baseURL from '../utils/axios';

const Sidebar = ({ isOpen, toggleSidebar, reviewData, rId}) => {
    const [imageData,setImageData]=useState([])
    useEffect(()=>{
        const allData = reviewData.find(element => element.reviewId === rId) || {};
        setImageData(allData.reviewImages)
    },[reviewData, rId])
    return (
        <div className={`sidebar ${isOpen ? 'open' : 'closed'} overflow-auto bg-blue-gray-50`}>
            <button onClick={toggleSidebar}>X</button>
             
                {imageData?.map((image)=>(
                    <>
                    <div className='h-fit w-50 border-black my-7 m-auto text-black'>

                        <img
                          src={baseURL + image.url.substring(1)}
                          alt={`No image Available`}
                          className="overFlow-hidden object-cover"
                          />

                    </div>
                          </>
                ))
}
        </div>
    );
};

export default Sidebar;

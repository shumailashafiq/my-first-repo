// import React from 'react'
// import baseUrl from '../utils/axios';
// import axios from 'axios';
// import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
// import DefaultLayout from '../layout/DefaultLayout';
// import { useEffect, useState } from 'react';
// import { Outlet } from 'react-router-dom'
// import SingleStock from '../components/stock/SingleStock'
// import UpdateStock from '../components/stock/UpdateStock'


// function stock() {
//     return (
//         <DefaultLayout>
//             <Breadcrumb pageName='Stock' />
//             <div className="flex flex-col">
//                 {/* -----------singleStock------------ */}
//                 <div className={`h-full w-full flex justify-center items-center z-20 ${display} `}>
//                     <SingleStock />
//                 </div>
//                 {/* ---------------updateStock------------ */}
//                 <div className={`h-full w-full flex justify-center  items-center relative ${display2} `}>
//                     <UpdateStock />
//                 </div>
//                 {/* ------------outlet for creating stock------------ */}
//                 <Outlet />
//                 {/* ----------------- Addstock Form button --------------------- */}

//                 <button
//                     className={`p-2 px-4 shadow-md shadow-black  bg-blue-400 rounded fixed z-10 text-white bottom-[30px] right-[50px] text-4xl`}
//                 >
//                     +
//                 </button>
//             </div>
//         </DefaultLayout>
//     )
// }

// export default stock
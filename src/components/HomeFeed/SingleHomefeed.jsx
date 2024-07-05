import React, { useState,useEffect } from 'react'
import baseUrl from '../../utils/axios';
import {Carousel} from '@material-tailwind/react'
import HomefeedDetail from "./HomefeedDetail"
import { useParams } from 'react-router-dom';
import axios from 'axios';
import baseURL from '../../utils/axios';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';



export default function SingleHomefeed(props) {

  let params = useParams();
  const id = params.id;
  // console.log(id)
  let [detail,setdetail]=useState(false)
  let [singleBestDeal,setsingleBestDeal]=useState(false)
  let [SingleHomeFeed,setSingleHomeFeed]=useState([])

    useEffect(()=>{
     
      singleDelivery()
    },[])
    
    async function singleDelivery(){
      await axios.get(baseURL+ "homefeed/"+id)
      .then((res)=>{
        console.log(res.data)
        setSingleHomeFeed(res.data)
        
      })      
    }


    // console.log(props.SingleHomeFeed)
    // let explore=SingleHomeFeed[0].explore
    // let bestDeals=SingleHomeFeed[0].bestDeals
    // let categories=SingleHomeFeed[0].categories
    // let bestSellers=SingleHomeFeed[0].bestSellers
    // let feturedItem=SingleHomeFeed[0].feturedItem
    // let recommendations=SingleHomeFeed[0].recommendations
    

   const imagearr=[];
  //  console.log(SingleHomeFeed.Banner)

  //  SingleHomeFeed.Banner.map((element)=>{
  //   let ti=element.imageUrl.substring(1)
  //   imagearr.push(baseUrl+ti)
  // })

  function detailShow(element){
    setdetail(true)
    console.log("best deal")
    console.log(element)
    setsingleBestDeal(element)
  }
  return (
<>
<DefaultLayout>
      <Breadcrumb pageName="Home Feed" />
  { detail ?
    <HomefeedDetail singleBestDeal={singleBestDeal} setdetail={setdetail}/>
    :
   SingleHomeFeed.length<=0 ? <>loading...</> :
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
<div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
<div><p className='text-2xl mb-10 font-medium  text-black dark:text-white'>Carosel</p></div>
<Carousel className="rounded-xl mb-15 h-[400px]">
    {SingleHomeFeed[0].Banner.map((element)=>(
      <img
        src={baseURL + element.imageUrl.substring(1)}
        alt="image 1"
        className="h-[400px] w-full object-cover"
      />
    ))}
    </Carousel>
    <hr/><br/>
{/* ------------------------------Categories----------- */}
     
    <div className="w-full m-5 pr-6">
    <h2 className="text-3xl mt-5 mb-5 text-black  dark:text-white">Categories</h2>
    <div className="image-items flex h-[250px] mt-5 overflow-x-auto w-full  ml-0 mb-5 rounded bg-slate-200">
      {
        SingleHomeFeed[0]?.categories?.map((element)=>(
          <div className="image-item m-5 bg-slate-700 ml-0  min-w-[250px] ">
            <img className="w-[250px] h-[150px]  rounded mb-3 object-cover" src={baseUrl+element.imageUrl[0].substring(1)} alt="Item Image" />
            <span><p className='text-center text-gray-700 font-medium'>Category Name: {element.name}</p></span>
            <span><p className='text-center text-gray-700 font-medium'>Category Id: { element.category_id}</p></span>
        </div>
        ))
      } 
     
    </div>
</div>
     
{/* ------------------------------Explore----------- */}
<br/><br/><hr/><br/>
     <div className="w-full m-5 pr-6">
    <h2 className="text-3xl mt-5 mb-5 text-black  dark:text-white">Explore</h2>
    <div className="image-items flex h-[250px] mt-5 overflow-x-auto w-full  ml-0 mb-5 rounded bg-slate-200">
      {
       SingleHomeFeed[0].explore.map((element)=>(
          <div className="image-item m-5 ml-0 bg-slate-700 ml-0  min-w-[250px] "  onClick={()=>detailShow(element)}>
            <img className="w-[250px] h-[150px]  rounded mb-3 object-cover" src={baseUrl+element.images[0].url.substring(1)} alt="Item Image" />
            <span><p className='text-center text-gray-700 font-medium'>Item Name:{element.item_name}</p></span>
            <span><p className='text-center text-gray-700 font-medium'>Price: $ {element.price}</p></span>
        </div>
        ))
      } 
     
    </div>
</div>

{/* ------------------------------best deal----------- */}
<br/><br/><hr/><br/>
<div className="w-full m-5  pr-6">
    <h2 className="text-3xl mt-5  mb-5 text-black bg  dark:text-white">Best Deal</h2>
    <div className="image-items flex h-[250px] mt-5 overflow-x-auto w-full  ml-0 mb-5 rounded bg-slate-200">

      {
       SingleHomeFeed[0].bestDeals.map((element)=>(
          <div className="image-item m-5 bg-slate-700  ml-0  min-w-[250px]  mb-15 " onClick={()=>detailShow(element)} >
            <img className="w-[250px] h-[150px]  rounded mb-3 object-cover" src={baseUrl+element.images[0].url.substring(1)} alt="Item Image" />
            <span><p className='text-center text-gray-700 font-medium'>Item Name: {element.item_name}</p></span>
            <span><p className='text-center text-gray-700 font-medium'>Price: $ { element.price}</p></span>
        </div>
        ))
      }
    </div>
</div>
{/* ------------------------------bestSellers----------- */}
<br/><br/><hr/><br/>
     <div className="w-full m-5 pr-6">
    <h2 className="text-3xl mt-5 mb-5 text-black  dark:text-white">Best Sellers</h2>
    <div className="image-items flex h-[250px] mt-5 overflow-x-auto w-full  ml-0 mb-5 rounded bg-slate-200">
      {
       SingleHomeFeed[0].bestSellers.map((element)=>(
          <div className="image-item m-5 bg-slate-700 ml-0  min-w-[250px] " onClick={()=>detailShow(element)} >
            <img className="w-[250px] h-[150px]  rounded mb-3 object-cover" src={baseUrl+element.images[0].url.substring(1)} alt="Item Image" />
            <span><p className='text-center text-gray-700 font-medium'>Item Name: {element.item_name}</p></span>
            <span><p className='text-center text-gray-700 font-medium'>Price: $ { element.price}</p></span>
        </div>
        ))
      } 
     
    </div>
</div>
{/* ------------------------------feturedItem----------- */}
<br/><br/><hr/><br/>
     <div className="w-full m-5 pr-6">
    <h2 className="text-3xl mt-5 mb-5 text-black  dark:text-white">Featured Item</h2>
    <div className="image-items  flex h-[250px] mt-5 overflow-x-auto w-full  ml-0 mb-5 rounded bg-slate-200">
      {
       SingleHomeFeed[0].feturedItem.map((element)=>(
          <div className="image-item m-5 bg-slate-700  ml-0  min-w-[250px] " onClick={()=>detailShow(element)} >
            <img className="w-[250px] h-[150px]  rounded mb-3 object-cover" src={baseUrl+element.images[0].url.substring(1)} alt="Item Image" />
            <span><p className='text-center text-gray-700 font-medium'>Item Name: {element.item_name}</p></span>
            <span><p className='text-center text-gray-700 font-medium'>Price: $ { element.price}</p></span>
        </div>
        ))
      } 
     
    </div>
</div>
{/* ------------------------------recommendations----------- */}
<br/><br/><hr/><br/>
     <div className="w-full m-5 pr-6">
    <h2 className="text-3xl mt-5 mb-5 text-black dark:text-white ">Recommendations</h2>
    <div className="image-items flex h-[250px] mt-5 overflow-x-auto w-full  ml-0 mb-5 rounded bg-slate-200">
      {
       SingleHomeFeed[0].recommendations.map((element)=>(
          <div className="image-item m-5 bg-slate-700 ml-0 min-w-[250px] "onClick={()=>detailShow(element)} s>
            <img className="w-[250px] h-[150px] rounded mb-3 object-cover" src={baseUrl+element.images[0].url.substring(1)} alt="Item Image" />
            <span><p className='text-center text-gray-700 font-medium'>Item Name: {element.item_name}</p></span>
            <span><p className='text-center text-gray-700 font-medium'>Price: $ { element.price}</p></span>
        </div>
        ))
      } 
     
    </div>
</div>
</div>
</div>
}

</DefaultLayout>
    </>
  )
}

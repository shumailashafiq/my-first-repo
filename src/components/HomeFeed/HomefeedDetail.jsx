import React from 'react'
import baseURL from '../../utils/axios'
import moment from 'moment'



export default function HomefeedDetail(props) {
  let {singleBestDeal}=props
  console.log(singleBestDeal)
  console.log(singleBestDeal.categories)
  console.log(singleBestDeal.variations)
  console.log(singleBestDeal.variations)
  const variation_Image=[]
  const Image=[]

  function hide(){
    props.setdetail(false)
}
  return (
    <>
    <div className="flex flex-col">
    <div className={`rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 relative overflow-hidden`}>
    <h1 className='pt-5 text-black text-4xl font-medium'><b>{singleBestDeal.item_name} </b></h1><br/><br/>
    <hr/><br/>
        	<div>
          <h2 className="text-3xl mt-5 mb-5 text-black font-medium  ">Item Details :</h2>
        <div className='flex flex-row gap-2 flex  mt-2'>
            <div className='w-full flex flex-col justify-center align-item-center pl-6'>
            <p><b>Item id : </b> {singleBestDeal.item_id} </p>
            <p><b>Item Name : </b>{singleBestDeal.item_name} </p>
            <p><b>Slug : </b>{singleBestDeal.slug} </p>
            <p><b>description : </b>{singleBestDeal.description} </p>
           
           
            </div>
            <br/><br/><hr/>
            

            
            <div className='w-full flex flex-col justify-center align-item-center pl-6 '>
            <p><b>Sku : </b>{singleBestDeal.sku} </p>
            <p><b>price :</b> {singleBestDeal.price} </p>
            <p><b>reward_points :</b> {singleBestDeal.reward_points} </p>
            <p><b>is_active:</b> {singleBestDeal.is_active ? "True" : "False"} </p>
           
            </div>
        </div>
        </div>
      

        <br/><br/><hr/><br/>
        	<div>
          <h2 className="text-3xl mt-5 mb-5 text-black font-medium  ">Franchisee And Vendor Details :</h2>
        <div className='flex flex-row gap-2 flex  mt-5'>
            <div className='w-full flex flex-col justify-center align-item-center pl-6'>
            <p><b>franchisee_id:</b> {singleBestDeal.franchisee.franchisee_id} </p>
            <p><b>Franchisee Name :</b> {singleBestDeal.franchisee.franchisee_name} </p>
            <p><b>email :</b> {singleBestDeal.franchisee.email} </p>
            <p><b>phone_no : </b>{singleBestDeal.franchisee.phone_no} </p>
           
            </div>
            <div className='w-full flex flex-col justify-center align-item-center pl-6'>
            <p><b>vendorId:</b> {singleBestDeal.vendor.vendorId} </p>
            <p><b> vendor_name :</b> {singleBestDeal.vendor.vendor_name} </p>
            <p><b>email : </b>{singleBestDeal.vendor.email} </p>
            <p><b>phone_no : </b>{singleBestDeal.vendor.phone_no} </p>
           
            </div>
            </div>
          </div>

          <br/><br/><hr/><br/>
        	<div>
          <h2 className="text-3xl mt-5 mb-5 text-black font-medium  ">Categories Details:</h2>
          <div className='grid grid-cols-2 gap-3'>
          { singleBestDeal.categories.map((element,index)=>(
          <div className='w-full flex flex-col justify-center align-item-center pl-6'>
          <p><b className='text-2xl text-center font-medium text-black mb-2'>Category {index+1} :</b> </p><br/>
          <p><b>Category_id:</b> {element.category_id} </p>
          <p><b>Title : </b>{element.title} </p>
          <br/>
         
          </div>
          ))}
            </div>
          </div>
          <br/><br/><hr/>

          <div>
          <h2 className="text-3xl mt-5 mb-5 text-black font-medium ">Variations Details:</h2>
          <div className='grid grid-cols-2 gap-3'>
          { singleBestDeal.variations.map((element,index)=>(
          <div className='w-full flex flex-col   pl-6'>
          <p><b className='text-2xl text-center font-medium text-black mb-2'>Variations {index+1} :</b> </p><br/>
          <p><b>variation_id: </b>{element.variation_id} </p>
          <p><b>name : </b>{element.name} </p><br/>
          <div>
          {element.options.map((elementop,index)=>(
            
            <div>
            <p className='text-black text-xl font-medium'>option  : {index + 1} </p>
            <p><b>VOID : </b>{elementop.VOID} </p>
            <p><b>value : </b>{elementop.value} </p>
            <br/>
            </div>
           ))}
            </div>
            <br/>
          </div>
          
          ))}
            </div>
          </div>
          <br/><br/><hr/>

          <div>
          <h2 className="text-3xl mt-5 mb-5 text-black font-medium  ">Discount Details:</h2>
          <div className='grid grid-cols-2 gap-3'>
          { singleBestDeal.discounts.map((element,index)=>(
          <div className='w-full flex flex-col justify-center align-item-center pl-6'>
          <p><b className='text-2xl text-center font-medium text-black mb-2'>Discount {index+1} :</b> </p><br/>
          <p><b>Discount id :</b> {element.Discount_id} </p>
            <p><b>Discount name :</b> {element.discount_name} </p>
            <p><b>Discount Unit :</b> {element.discount_unit} </p>
            <p><b>Discount Vvalue :</b> {element.discount_value} </p>
            <p><b>Maximum Discount Amount :</b> {element.maximum_discount_amount} </p>
            <p><b>Valid From :</b> {moment(element.valid_from).format('LLLL')} </p>
            <p><b>Valid till :</b> {moment(element.valid_till).format('LLLL')} </p>
            <br/>
         
          </div>
          ))}
            </div>
          </div>
          <br/><br/><hr/>

            {/* ----------------------------------------------images */}
            <div className="w-full m-5  pr-6">
    <h2 className="text-3xl mt-5 mb-5 text-black font-medium  ">Item Images</h2>
    <div className="image-items flex h-[250px] mt-5 overflow-x-auto w-full  ml-0 mb-5 rounded bg-slate-200">

      {
        singleBestDeal.images.map((element)=>(
          <div className="image-item m-5 ml-0 bg-slate-700 rounded min-w-[250px]  mb-15 " onClick={()=>detailShow(element)} >
            <img className="w-[250px] h-[150px] rounded mb-3 object-cover" src={baseURL+element.url.substring(1)} alt="Item Image" />
            <p className='text-center text-gray-700 font-medium'><b>Id :</b> {element.id} </p>
        </div>
        ))
      }
    </div>
</div>
<br/><br/><hr/><br/>
        
            {/* ---------------------------------------------- variation images */}
            <div className="w-full m-5  pr-6">
    <h2 className="text-3xl mt-5 mb-5 text-black font-medium  ">Variation Images</h2>
    <div className="image-items flex h-[250px] mt-5 overflow-x-auto w-full  ml-0 mb-5 rounded bg-slate-200">

      {
        singleBestDeal.variation_Image.map((element)=>(
          <div className="image-item m-5 ml-0 bg-slate-700  min-w-[250px]  mb-15 " onClick={()=>detailShow(element)} >
            <img className="w-[250px] h-[150px] rounded mb-3  object-cover " src={baseURL+element.url.substring(1)} alt="Item Image" />
            <p className='text-center text-gray-700 font-medium'><b>Id :</b> {element.VOID} </p>
            <p className='text-center text-gray-700 font-medium'><b>variation_image_id :</b> {element.variation_image_id} </p>
        </div>
        ))
      }
    </div>
</div>
        
        
        <button onClick={hide}  className='shadow-black top-[0.3%] right-[2%] bg-white shadow text-black  p-4 rounded font-bold mt-1 absolute'>X</button>
       
        
    </div>
    </div>
    </>
  )
}

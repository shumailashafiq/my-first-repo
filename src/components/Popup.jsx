import React, { useEffect, useState } from 'react'
import axios from 'axios';
import baseURL from '../utils/axios';



function Popup({ showPopup,togglePopup,selectedId}) { 
  
console.log(selectedId)
 

  const [popupData, setPopupData] = useState(null);
  useEffect(() => {
    // /darkStore/vendor/vendorid
    axios.get(baseURL + `darkStore/vendor/${selectedId}`)//+selectedId
      .then((res) => {
        setPopupData(res.data.object)
        console.log(res.data.object)

      })
      .catch((err) => {
        console.log(err)
      })
  }, [selectedId])// include id in dependencies array to re-fetch data when id changes   ,selectedId
  // console.log(popupData)

  
  return (
    <>

      {showPopup && (
        // <div className="position-fixed top-50 start-50 translate-middle bg-dark bg-opacity-50 p-1 w-60 h-60">
          // <div className="bg-white p-4 h-100 w-100 overflow-auto">

          <div className={`rounded-sm h-full w-full z-20 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark position-relative`}>
            <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark bg-white flex flex-row flex-wrap'>
              {/* <h2 className='font-medium text-black dark:text-white'>Dark Stores</h2> */}
            

            {/* <table className='table'>
              <thead>
                <tr>
                  <th>Store ID</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                  <th>Store Name</th>
                  <th>City Name</th>
                  <th>Country Code</th>
                  <th>Franchisee Name</th>
                  <th>Vendor Name</th>
                </tr>
              </thead>
              <tbody>
                {popupData.map((store, index) => (
                  <tr key={index}>
                    <td>{store.storeId}</td>
                    <td>{store.latitude}</td>
                    <td>{store.longitude}</td>
                    <td>{store.storeName}</td>
                    <td>{store.cityId.cityName}</td>
                    <td>{store.cityId.countryCode}</td>
                    <td>{store.vendorFranchiseeId.franchiseeId.franchisee_name}</td>
                    <td>{store.vendorFranchiseeId.vendorId.vendor_name}</td>
                  </tr>
                ))}
              </tbody>
            </table> */}
            <ul style={{ listStyle: 'none', textAlign: 'left' }}>
              {popupData !== null ? 
              popupData.map((store,index) => (
                <div key={index} className='border border-solid-black-200 mb-10 p-5 space-y-5 drop-shadow-2' >
                  <li><strong>Store ID  :  </strong>{store.object?.storeId}</li>
                  <li><strong>Latitude  :  </strong>{store.latitude}</li>
                  <li><strong>Longitude  :  </strong>{store.longitude}</li>
                  <li><strong>Store Name  :  </strong>{store.storeName}</li>
                  <li><strong>City ID  :  </strong>{store.cityId.cityId}</li>
                  <li><strong>City Name  :  </strong>{store.cityId.cityName}</li>
                  <li><strong>Country Id  :  </strong>{store.cityId.countryId}</li>
                  <li><strong>Vendor Franchisee ID  :  </strong>{store.vendorFranchiseeId.vfid}</li>
                  <li><strong>Franchisee  ID  :  </strong>{store.vendorFranchiseeId.franchiseeId.franchisee_id}</li>
                  <li><strong>Franchisee  Name  :  </strong>{store.vendorFranchiseeId.franchiseeId.franchisee_name}</li>
                  <li><strong>Franchisee  Email  :  </strong>{store.vendorFranchiseeId.franchiseeId.email}</li>
                  <li><strong>Franchisee  Phone No.  :  </strong>{store.vendorFranchiseeId.franchiseeId.phone_no}</li>
                  <li><strong>Vendor ID  :  </strong>{store.vendorFranchiseeId.vendorId.vendorId}</li>
                  <li><strong>Vendor Name  :  </strong>{store.vendorFranchiseeId.vendorId.vendor_name}</li>
                  <li><strong>Vendor email  :  </strong>{store.vendorFranchiseeId.vendorId.email}</li>
                  <li><strong>Vendor phone no.  :  </strong>{store.vendorFranchiseeId.vendorId.phone_no}</li>
                  
                </div>
              ))
              : 'loading...'}
            </ul>
                  <button onClick={togglePopup} className=" flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 mx-auto">Go Back</button>
          </div>
            {/* <button className='position-absolute z-100 top-0 end-0 mt-2 me-2 cursor-pointer shadow-black shadow text-white bg-dark p-4 rounded font-bold' onClick={togglePopup}><h1 className='fs-4'>X</h1></button> */}
                  
        </div>

      )
      }
   
    </>
  );
}

export default Popup
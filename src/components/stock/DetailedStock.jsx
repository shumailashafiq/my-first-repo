import React from 'react'
import { useEffect} from 'react'
function DetailedStock(props) {
  const { allDetails, selectedId, veiwMore, stockData} = props
  const allData = stockData.find(item => item.stockId === selectedId) || {};
  useEffect(() => {
    if (veiwMore && selectedId !== null) {
        console.log(allData)
      
    }
  }, [selectedId, veiwMore,allData])
  return (
    <>
      {veiwMore && (
        <div className="flex flex-col">
          <div className={`rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 relative `}>
            <h1 className='text-center pt-5 text-2xl'><b>Stock Detail</b> </h1><br /><br /><hr /><br /><br />
            <div className="max-w-full  bg-white ml-0 items-center overflow-x-auto pb-11">
              <div className='flex flex-row gap-2 flex  mt-2'>
                <div className='w-full flex flex-col justify-center align-item-center pl-6'>
                    {Object.keys(allData).length > 0 ?(
                      <>
                        <h3 className='text-center my-5'><b>Stock</b></h3>
                        <p><b>Item ID :  </b>{allData.productItems?.itemId || "N/A"}</p>
                        <p><b>Item Name  :  </b>{allData.productItems?.ItemName || "N/A"}</p>
                        <p><b>Stock  :  </b>{allData.stock || "N/A"}</p>
                        <p><b>Stock ID  :  </b>{allData.stockId || "N/A"}</p>
                        <h3 className='text-center my-5'><b>Variation</b></h3>
                        <p><b>Variation Name  :  </b>{allData.variationOption?.variationName || "N/A"}</p>
                        <p><b>Variation ID  :  </b>{allData.variationOption?.variationOption_Id || "N/A"}</p>
                        <h3 className='text-center my-5'><b>DarkStore</b></h3>
                        <p><b>Vendor Name  :  </b>{allData.darkStore?.VendorFranchisee?.Vendor_name || "N/A"}</p>
                        <p><b>Franchisee Name  :  </b>{allData.darkStore?.VendorFranchisee?.Franchisee_name || "N/A"}</p>
                        <p><b>Store name  :  </b>{allData.darkStore?.storeName || "N/A"}</p>
                        <p><b>Store ID  :  </b>{allData.darkStore?.darkStoreId || "N/A"}</p>
                      </>
                  ):(
                    <p>Loading...</p>
                  )}
                    
                </div>
              </div>
            </div>
          </div>
          <button onClick={allDetails} className=" flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 mx-auto">Go Back</button>
        </div>
      )}
    </>
  )
}

export default DetailedStock
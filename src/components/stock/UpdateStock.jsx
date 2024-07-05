import React, { useEffect, useState } from 'react'
import axios from 'axios'
import baseURL from '../../utils/axios'

function UpdateStock(props) {
  const { setDisplay, setBgColor, setevents, Id, stockData,setStockData } = props;
  const [stock, setStock] = useState('');
  const [stockId, setStockId] = useState('');
  const [selectedProductId, setSelectedProductId] = useState('');
  const [selectedDarkStoreId, setSelectedDarkStoreId] = useState('');
  const [selectedVariationOptionId, setSelectedVariationOptionId] = useState('');

  useEffect(() => {
    if (stockData && stockData.length > 0) {
      const stockItem = stockData.find(item => item.stockId === Id);

      if (stockItem) {
        const { stock, stockId, productItems, darkStore, variationOption } = stockItem;

        setStock(stock || '');
        setStockId(stockId || '');
        setSelectedProductId(productItems ? productItems.itemId : '');
        setSelectedDarkStoreId(darkStore?darkStore.darkStoreId:'');
        setSelectedVariationOptionId(variationOption ? variationOption.variationOption_Id : '');
      } else {
        console.log("No stock item found with stockId:", Id);
      }
    } else {
      console.log("No stock data received or data empty.");
    }
  }, [Id, stockData]);

  const updateHandle = (e) => {
    e.preventDefault();

    if (!stock) {
      console.log('Missing required fields');
      return;
    }

    const updateData = {
      stockId,
      stock: parseInt(stock),
      productItem: parseInt(selectedProductId),
      darkStoreId: parseInt(selectedDarkStoreId),
      variationOption: parseInt(selectedVariationOptionId),
    }

    console.log('Update Payload:', updateData);
    axios.put(baseURL + 'itemstock/update', updateData)
      .then(res => {
        console.log(res.data.object);
        const updatedStockData = stockData.map(item =>
          item.stockId === stockId ? { ...item, ...updateData } : item
        );
        setStockData(updatedStockData) 
      })
      .catch(err => {
        if (err.response) {
          console.log('Error Response:', err.response.data);
        } else {
          console.log(err);
        }
      });

    setBgColor("blur-none");
    setDisplay("hidden");
    setevents("pointer-events-auto");
  };

  const hide = () => {
    setBgColor("blur-none");
    setDisplay("hidden");
    setevents("pointer-events-auto");
  };

  return (
    <div className="rounded-sm h-full absolute w-full z-20 border border-stroke bg-white shadow-default dark:border-strokedark z:99">
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark bg-white">
        <h3 className="font-medium text-black dark:text-white">
          Update Stock
        </h3>
      </div>
      <form onSubmit={updateHandle} className='bg-white'>
        <div className="p-6.5">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Stock
            </label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <button
            type="submit"
            className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
          >
            Update Stock
          </button>
        </div>
      </form>
      <button onClick={hide} className="flex w-full justify-center rounded bg-red-500 p-3 font-medium text-gray hover:bg-opacity-90">
        Cancel
      </button>
    </div>
  );
}

export default UpdateStock;


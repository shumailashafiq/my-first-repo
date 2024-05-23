import axios from 'axios'
import React, { useState, useEffect,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import baseURL from '../../utils/axios'
import { StockContext } from './../../pages/StockContext';


function AddStock() {
  const navigat = useNavigate()
  const [productItem, setProductItem] = useState([])
  const [variationOption, setVariationOption] = useState([])
  const [selectedProductId, setSelectedProductId] = useState('');
  const [darkStore, setDarkStore] = useState(null)
  const [Id, setId] = useState(null);
  const [stock, setStock] = useState('')
  const {setStockData } = useContext(StockContext); // Access stockData and setStockData from context
0
  
  function handleSubmit(event) {
    event.preventDefault()
    const stockValue=parseInt(stock)
    const productItemId=parseInt(selectedProductId)
    const darkStore=parseInt(Id)
    const voidId = variationOption.length > 0 ? parseInt(variationOption[0].VOID) : null;
    axios.post(baseURL + 'itemstock/',
    {
      stock:stockValue,
      darkStoreId:darkStore,                      
      productItem:productItemId, 
      variationOption: voidId, 
    }
  )

      .then(res => {
        console.log(res.data.object);
        setStockData(true);
        navigat('/stock')
        // window.location.reload()
      })
  }
  useEffect(() => {
    getDarkStore()
  }, [])

  const getDarkStore = () => {
    axios.defaults.headers.common['ngrok-skip-browser-warning'] = 'any value';
    axios.get(baseURL + 'darkStore/')
      .then((res) => {
        setDarkStore(res.data)
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const handleProductItemChange = (event) => {
    const productId = event.target.value;
    setSelectedProductId(productId);
    // Find selected product item
    const selectedProduct = productItem.find(item => item.item_id === parseInt(productId));
    if (selectedProduct) {
      // Extract variation options from the selected product item
      const options = selectedProduct.variations.flatMap(variation => variation.options);
      setVariationOption(options);
    }
  };

  useEffect(() => {
    getProductItem();
  }, []);

  const getProductItem = () => {
    axios.defaults.headers.common['ngrok-skip-browser-warning'] = 'any value';
    axios
      .get(baseURL + 'productItem/')
      .then((res) => {
        setProductItem(res.data.items);
        setVariationOption(res.data.items)
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">Add Stock</h3>
      </div>
      <form action="#"
        onSubmit={handleSubmit}
      >
        <div className="p-6.5">


          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              stock
            </label>
            <input
              type="number"
              onChange={(e) => setStock(e.target.value)}
                
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              DarkStore ID
            </label>
            {!darkStore ? ('...loading') : (
              <select onChange={(event) => setId(event.target.value)}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
                <option value="">Select a DarkStore</option>
                {darkStore !== null ? (
                  darkStore.map((item) => (
                    <option key={item.storeId} value={item.storeId}>
                      {item.storeName}
                    </option>
                  ))
                ) : ("loading")}
              </select>
            )}
          </div>
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Product Item
            </label>

            {!productItem ? (
              'loading....'
            ) : (
              <select
                value={selectedProductId}
                onChange={handleProductItemChange}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value={Id}>Select a Product Items </option>

                {productItem?.map((item) => (
                  <option key={item.item_id} value={item.item_id}>
                    {item.item_name}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Variation Option
            </label>
            {!variationOption ? ('...loading') : (
              <select
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
                <option value="">Select a Variation</option>
                {variationOption.map(option => (
                  <option key={option.VOID} value={option.VOID}>
                    {option.value}
                  </option>
                ))}
              </select>
            )}
          </div>
          <button
            type="submit"
            className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
          >
            Add Stock
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddStock
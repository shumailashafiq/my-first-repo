import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import baseURL from '../../utils/axios';
import Swal from 'sweetalert2';
import moment from 'moment';

const UpdateItemDiscount = ({
  id,
  data,
  setData,
  setevents,
  setBgColor,
  setDisplay1,
}) => {
  console.log(id);
  const navigate = useNavigate();
  const [productItem, setProductItem] = useState<[] | null>(null);
  const [productItemId, setProductItemId] = useState(null);
  const [discountName, setDiscountName] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [discountUnit, setdiscountUnit] = useState('');
  const [discountValue, setdiscountValue] = useState('');
  const [maximumDiscountAmount, setmaximumDiscountAmount] = useState('');
  const [discountText, setdiscountText] = useState('');
  const [minimumOrderCount, setminimumOrderCount] = useState('');
  const [validFrom, setvalidFrom] = useState('');
  const [validTill, setvalidTill] = useState('');
  const [statusDiscount, setStatusDiscount] = useState('');
  const [limitedDiscount, setLimitedDiscount] = useState('');

  useEffect(() => {
    getProductItem();
  }, []);

  const getProductItem = () => {
    axios.defaults.headers.common['ngrok-skip-browser-warning'] = 'any value';
    axios
      .get(baseURL + 'productItem/getAll')
      .then((res) => {
        setProductItem(res.data.items);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (data && data.length > 0) {
      const singleData = data.find((single) => single.id === id);

      if (singleData) {
        console.log(singleData);
        const {
          discountName,
          discountCode,
          discountUnit,
          discountValue,
          maximumDiscountAmount,
          discountText,
          minimumOrderCount,
          validFrom,
          validTill,
          isActive,
          isLimited,
          productItem,
        } = singleData;
        setDiscountName(discountName || '');
        setDiscountCode(discountCode || '');
        setdiscountUnit(discountUnit || '');
        setdiscountValue(discountValue ? discountValue.toString() : '');
        setmaximumDiscountAmount(
          maximumDiscountAmount ? maximumDiscountAmount.toString() : '',
        );
        setdiscountText(discountText || '');
        setminimumOrderCount(
          minimumOrderCount ? minimumOrderCount.toString() : '',
        );
        setvalidFrom(validFrom ? moment(validFrom).format('YYYY-MM-DD') : '');
        setvalidTill(validTill ? moment(validTill).format('YYYY-MM-DD') : '');
        setStatusDiscount(isActive ? 'true' : 'false');
        setLimitedDiscount(isLimited ? 'true' : 'false');
        setProductItemId(productItem || null);
      }
    }
  }, [id, data]);

  const handleUpdate = (e: any) => {
    e.preventDefault();
    const tillFormatted = moment(validTill).format('YYYY-MM-DD');
    const fromFormatted = moment(validFrom).format('YYYY-MM-DD');
    const updateData = {
      discountName: discountName,
      discountCode: discountCode,
      discountUnit: discountUnit,
      discountValue: parseInt(discountValue),
      maximumDiscountAmount: parseInt(maximumDiscountAmount),
      discountText: discountText,
      minimumOrderCount: parseInt(minimumOrderCount),
      validFrom: fromFormatted,
      validTill: tillFormatted,
      isActive: statusDiscount === 'true',
      isLimited: limitedDiscount === 'true',
      productItem: productItemId,
    };
    console.log(updateData);
    axios
      .put(`${baseURL}api/prodDis/${id}`, updateData)
      .then((res) => {
        console.log(res.data.object);
        Swal.fire({
          title: 'Success!',
          text: 'Item Discount is successfully update!',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          navigate('/itemsdiscount');
        });
        const updatedStockData = data.map((item) =>
          item.id === id ? { ...item, ...updateData } : item,
        );
        setData([...updatedStockData]);
      })
      .catch((error) => {
        console.error('Error updating Item Discount:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Sorry, Item Discount is not Update. Try again later.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      });

    // setBgColor('blur-none');
    // setDisplay1('hidden');
    // setevents('pointer-events-auto');
  };

  const hide = () => {
    setBgColor('blur-none');
    setDisplay1('hidden');
    setevents('pointer-events-auto');
  };

  return (
    <div className="container">
      <div className="form-container max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Update Item discount
          </h3>
        </div>
        <form action="#" onSubmit={handleUpdate}>
          <div className="p-6.5">
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Product Item
              </label>
              {/* <select
                onChange={(e) => setProductItemId(e.target.value)}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value="">Select a Product Item</option>
                {productItem?.map((item) => (
                  <option key={item.item_id} value={item.item_id}>
                    {item.item_name}
                  </option>
                ))}
              </select> */}
              <select
                value={productItemId || ''}
                onChange={(e) => setProductItemId(e.target.value)}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value="">Select a Product Item</option>
                {productItem?.map((item) => (
                  <option key={item.item_id} value={item.item_id}>
                    {item.item_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Discount Name
              </label>
              <input
                type="text"
                value={discountName}
                onChange={(e) => setDiscountName(e.target.value)}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Discount code
              </label>
              <input
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Discount Unit
              </label>
              <select
                type="number"
                value={discountUnit}
                onChange={(e) => setdiscountUnit(e.target.value)}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value="">Select an unit</option>
                <option value="percentage">Percentage</option>
                <option value="fixedAmount">Fixed Amount</option>
              </select>
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Status
              </label>
              <select
                type="text"
                value={statusDiscount}
                onChange={(e) => setStatusDiscount(e.target.value)}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value="">Select an Status</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Define limit
              </label>
              <select
                type="text"
                value={limitedDiscount}
                onChange={(e) => setLimitedDiscount(e.target.value)}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value="">Select an unit</option>
                <option value="true">Yes</option>
                <option value="false"> No</option>
              </select>
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Discount Value
              </label>
              <input
                type="number"
                value={discountValue}
                onChange={(e) => setdiscountValue(e.target.value)}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Maximum Discount Amount
              </label>
              <input
                type="number"
                value={maximumDiscountAmount}
                onChange={(e) => setmaximumDiscountAmount(e.target.value)}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Discount Text
              </label>
              <input
                type="text"
                value={discountText}
                onChange={(e) => setdiscountText(e.target.value)}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Minimum order Count
              </label>
              <input
                type="number"
                value={minimumOrderCount}
                onChange={(e) => setminimumOrderCount(e.target.value)}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Valid From
              </label>
              <input
                type="date"
                value={validFrom}
                onChange={(e) => setvalidFrom(e.target.value)}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Valid Till
              </label>
              <input
                type="date"
                value={validTill}
                onChange={(e) => setvalidTill(e.target.value)}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <button
              type="submit"
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
            >
              Add Item Discount
            </button>
            <button
              type="button"
              onClick={hide}
              className="flex w-full justify-center rounded bg-red-500 p-3 font-medium text-gray hover:bg-opacity-90"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default UpdateItemDiscount;

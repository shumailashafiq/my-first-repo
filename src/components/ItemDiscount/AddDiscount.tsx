import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import baseURL from '../../utils/axios';
import Swal from 'sweetalert2';
import moment from 'moment';

const AddDiscount = () => {
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

  console.log(productItemId);

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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const tillFormatted = moment(validTill).format('YYYY-MM-DD');
    const FromFormatted = moment(validFrom).format('YYYY-MM-DD');
    axios
      .post(baseURL + 'api/prodDis', {
        discountName: discountName,
        discountCode: discountCode,
        discountUnit: discountUnit,
        discountValue: parseInt(discountValue),
        maximumDiscountAmount: parseInt(maximumDiscountAmount),
        discountText: discountText,
        minimumOrderCount: parseInt(minimumOrderCount),
        validFrom: FromFormatted,
        validTill: tillFormatted,
        isActive: statusDiscount,
        isLimited: limitedDiscount,
        productItem: {
          itemId: parseInt(productItemId),
        },
      })
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          title: 'Success!',
          text: 'Item Discount is successfully added!',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          navigate('/itemsdiscount');
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: 'Error!',
          text: 'Sorry, Item Discount is not added. Try again later.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      });
  };
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">Add Category</h3>
      </div>
      <form action="#" onSubmit={handleSubmit}>
        <div className="p-6.5">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Product Item
            </label>

            <select
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
              Discount Unit
            </label>
            <select
              type="text"
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
        </div>
      </form>
    </div>
  );
};

export default AddDiscount;

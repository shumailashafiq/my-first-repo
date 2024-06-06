import { useEffect, useState } from 'react';
import axios from 'axios';
import baseURL from '../../utils/axios';

const OrderStatus = ({ OrderIndex, setactive }) => {
  const [orderStatusData, setOrderStatusData] = useState([]);
  const [completedSteps, setCompletedSteps] = useState(0);
  const [isCancelled, setIsCancelled] = useState(false);

  useEffect(() => {
    if (OrderIndex) {
      getOrderStatusData();
    }
  }, [OrderIndex]);

  useEffect(() => {
    if (!isCancelled && completedSteps < orderStatusData.length) {
      const currentStatus = orderStatusData[completedSteps]?.OrderStatus;

      if (currentStatus === 'cancelled') {
        const timer = setTimeout(() => {
          setIsCancelled(true);
          setOrderStatusData((prevData) => {
            return prevData.map((order, index) => {
              if (index === completedSteps) {
                return {
                  ...order,
                  currentStep: 'cancelled',
                  previousStep: index - 1,
                };
              }
              return order;
            });
          });
        }, 2000);

        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setCompletedSteps((prev) => prev + 1);
        }, 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [completedSteps, orderStatusData, isCancelled]);

  const getOrderStatusData = () => {
    axios
      .get(`${baseURL}orderLogs/findByOrder/${OrderIndex?.order_id}`)
      .then((res) => {
        setOrderStatusData(res.data.object);
        console.log(res.data.object);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const hide = () => {
    setactive(false);
  };

  return (
    <div className="rounded-sm border relative border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <button
        onClick={hide}
        className="text-5xl absolute right-[15px] top-0 text-black"
      >
        x
      </button>
      <div>
        {!orderStatusData ? (
          'loading....'
        ) : (
          <div>
            <div className="mt-4">
              {orderStatusData.length > 0 && (
                <div className="flex  space-x-5">
                  <h1 className="text-[26px] text-black">Order Id :</h1>
                  <td className="text-[19px] text-black">
                    {orderStatusData[0]?.order_id}
                  </td>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="status-container mt-10 mb-20 flex items-center space-x-10 relative">
        {orderStatusData.map((order, key) => (
          <div className="flex flex-col items-center relative" key={key}>
            <div className="flex items-center justify-center w-20 h-20 bg-white border-2 border-gray-500 rounded-full">
              {order.currentStep === 'cancelled' ||
              (isCancelled && key === completedSteps + 1) ? (
                <svg
                  className="w-10 h-10 text-red-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : key < completedSteps ? (
                <svg
                  className="w-10 h-10 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <p className="text-gray-500">{order?.OrderStatus}</p>
              )}
            </div>
            <p className="mt-2 text-gray-500">{order?.OrderStatus}</p>


            {order.currentStep !== 'cancelled' &&
              key < orderStatusData.length - 1 && (
                <div
                  className={`absolute top-1/3 left-full transition-duration: 500 w-10 h-1 ${
                    key < completedSteps - 1 ? 'bg-green-500' : 'bg-gray-500'
                  }`}
                ></div>
              )}
            {order.currentStep === 'cancelled' && key > 0 &&(
              <div className="absolute top-1/3 left-full transition-duration: 500 w-10 h-1 bg-red-500"></div>
            )}
            {order.currentStep === 'cancelled' && key > 0 && (
              <div className="absolute top-1/3 left-full transition-duration: 500 w-10 h-1 bg-red-500"></div>
            )}
          </div>
        ))}
      </div>

      <div className="table-wrapper">
        {!orderStatusData ? (
          'loading....'
        ) : (
          <table className="w-full table-auto">
            <tbody>
              <div className="bg-gray-2 text-left dark:bg-meta-4">
                {orderStatusData.map((order, key) => (
                  <tr key={key}>
                    <td className="min-w-[150px] py-3 px-3 font-medium text-black dark:text-white">
                      {order?.orderLog_id}
                    </td>
                    <td className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                      {order?.OrderStatus}
                    </td>
                    <td className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                      {order?.Date}
                    </td>
                    <td className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                      {new Date(order?.Date).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </div>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OrderStatus;

import { useEffect, useState } from 'react';
import axios from 'axios';
import baseURL from '../../utils/axios';

const OrderStatus = ({ OrderIndex, setactive }) => {
  const [orderStatusData, setOrderStatusData] = useState([]);
  // console.log(orderStatusData);

  const [completedSteps, setCompletedSteps] = useState(0);

  useEffect(() => {
    if (completedSteps < orderStatusData.length) {
      const timer = setTimeout(() => {
        setCompletedSteps((prev) => prev + 1);
      }, 2000); // 3-second delay
      return () => clearTimeout(timer);
    }
  }, [completedSteps, orderStatusData.length]);

  useEffect(() => {
    if (OrderIndex) {
      getOrderStatusData();
    }
  }, [OrderIndex]);

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
            <h2 className="text-[25px] text-black text-bold">Order Status</h2>

            <div className="mt-4">
              {orderStatusData.length > 0 && (
                <div className="flex justify between space-x-5">
                  <h1 className="text-[26] text-black">Order Id :</h1>
                  <td>{orderStatusData[0]?.order_id}</td>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* <div className="status-container mt-10 mb-20 flex items-center space-x-10 relative">
      {orderStatusData.map((order, key) => (
        <div className="flex flex-col items-center relative" key={key}>
          <div className="flex items-center justify-center w-20 h-20 bg-white border-2 border-gray-500 rounded-full">
            {key < completedSteps ? (
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
          {key < orderStatusData.length - 1 && (
            <div
              className={`absolute top-1/2 left-full transform -translate-y-1/2 h-2 ${
                key < completedSteps ? 'bg-green-500' : 'bg-gray-500'
              }`}
              style={{ width: `${100 / orderStatusData.length}%` }}
            ></div>
          )}
        </div>
      ))}
      <div className="absolute top-1/2 transform -translate-y-1/2 left-10 w-[calc(100%-20px)] h-2 flex">
        {orderStatusData.map((_, index) => (
          index < orderStatusData.length - 1 && (
            <div
              key={index}
              className={`h-full ${
                index < completedSteps ? 'bg-green-500' : 'bg-gray-500'
              }`}
              style={{ width: `${100 / (orderStatusData.length - 1)}%` }}
            ></div>
          )
        ))}
      </div>
    </div> */}

      {/* <div className="status-container mt-10 mb-20 flex items-center space-x-10 relative">
        {orderStatusData.map((order, key) => (
          <div className="flex flex-col items-center relative" key={key}>
            <div className="flex items-center justify-center w-20 h-20 bg-white border-2 border-gray-500 rounded-full">
              {key < completedSteps ? (
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
            {key < orderStatusData.length - 1 && (
              <div
                className={`absolute top-1/2 left-full transform -translate-y-1/2 w-10 h-2 ${
                  key < completedSteps ? 'bg-green-500' : 'bg-gray-500'
                }`}
              ></div>
            )}
          </div>
        ))}
        <div className="absolute top-1/2 transform -translate-y-1/2 left-0 w-full h-2 flex">
          {orderStatusData.map((_, index) => (
            <div
              key={index}
              className={`h-full ${
                index < completedSteps ? 'bg-green-500' : 'bg-gray-500'
              }`}
              style={{ width: `${100 / (orderStatusData.length - 1)}%` }}
            ></div>
          ))}
        </div>
      </div> */}

      <div className="status-container mt-10 mb-20 flex items-center space-x-10 relative">
        {orderStatusData.map((order, key) => (
          <div className="flex flex-col items-center relative" key={key}>
            <div
              className={`flex items-center justify-center w-20 h-20 bg-white border-2 rounded-full ${
                key < completedSteps ? 'border-green-500' : 'border-gray-500'
              }`}
            >
              {key < completedSteps ? (
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
            {key < orderStatusData.length - 1 && (
              <div
                className={`absolute top-1/2 left-full transform -translate-y-1/2 h-2 ${
                  key < completedSteps ? 'bg-green-500' : 'bg-gray-500'
                }`}
                style={{ width: `${100 / orderStatusData.length}%` }}
              ></div>
            )}
          </div>
        ))}
        <div className="absolute top-1/2 transform -translate-y-1/2 left-10 w-[calc(100%-20px)] h-2 flex">
          {orderStatusData.map(
            (_, index) =>
              index < orderStatusData.length - 1 && (
                <div
                  key={index}
                  className={`h-full ${
                    index < completedSteps ? 'bg-green-500' : 'bg-gray-500'
                  }`}
                  style={{ width: `${100 / (orderStatusData.length - 1)}%` }}
                ></div>
              ),
          )}
        </div>
      </div>

      <div className="table-wrapper">
        {!orderStatusData ? (
          'loading....'
        ) : (
          <table className="w-full table-auto">
            {/* <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Order ID
              </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Order log Id
                </th>
                <th className="min-w-[10px] py-4 px-4 font-medium text-black dark:text-white">
                  Status
                </th>
                <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                  Date
                </th>
              </tr>
            </thead> */}
            <tbody>
              <div className="bg-gray-2 text-left dark:bg-meta-4">
                {orderStatusData.map((order, key) => (
                  <tr key={key}>
                    {/* <td>{order?.order_id}</td> */}
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

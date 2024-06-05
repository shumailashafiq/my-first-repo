import { useEffect, useState } from 'react';
import axios from 'axios';
import baseURL from '../../utils/axios';

const OrderStatus = ({ OrderIndex }) => {
  const [orderStatusData, setOrderStatusData] = useState([]);


  // console.log(orderStatusData);
  

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

 


  return (
    <div className="max-w-full overflow-x-auto pt-4 px-8">
      <div>
        {!orderStatusData ? (
          'loading....'
        ) : (
          <div>
            <h2 className="text-[25px] text-black text-bold">Order Status</h2>

            <div className="mt-4">
              {orderStatusData.length > 0 && (
                <div className="flex justify between space-x-5">
                  <h1 className='text-[16]'>Order Id :</h1>
                  <td>{orderStatusData[0]?.order_id}</td>
                </div>
              )}
            </div>
          </div>
        )}
      </div>




      <div className="status-container mt-10 mb-20 flex items-center space-x-10">
        {orderStatusData.map((order, key) => (
          <div className="flex items-center" key={key}>
            <div className="flex items-center justify-center w-20 h-20 bg-white text-gray-500 border-2 border-gray-500 rounded-full relative">
              <p>{order?.OrderStatus}</p>
            </div>
            {key < orderStatusData.length - 1 && (
              <div className="absolute top-1/2 left-full transform -translate-y-1/2 w-10 h-2 bg-gray-500"></div>
            )}
          </div>
        ))}
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
            <tbody >
              <div className="bg-gray-2 text-left dark:bg-meta-4" >
                {orderStatusData.map((order, key) => (
                  <tr key={key}>
                    {/* <td>{order?.order_id}</td> */}
                    <td className="min-w-[150px] py-3 px-3 font-medium text-black dark:text-white">{order?.orderLog_id}</td>
                    <td className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">{order?.OrderStatus}</td>

                    <td className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">{order?.Date}</td>
                    <td className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">{new Date(order?.Date).toLocaleString()}</td>
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

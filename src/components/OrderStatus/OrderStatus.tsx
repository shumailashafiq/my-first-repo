import { useEffect, useState } from 'react';
import axios from 'axios';
import baseURL from '../../utils/axios';

const OrderStatus = ({ OrderIndex }) => {
  const [orderStatusData, setOrderStatusData] = useState([{
    OrderStatus: '',
    orderLog_id: '',
    order_id: '',
    Date: '',
  }]);
  console.log(OrderIndex?.order_id);
  
  console.log(orderStatusData);
  
  const [orderStatus, setOrderStatus] = useState([]);

  useEffect(() => {
    getOrderStatusData();
  }, [OrderIndex]);

  // useEffect(() => {
  //   const fetchOrderStatusData = async () => {
  //     // console.log(fetchOrderStatusData)
  //     try {
  //       const response = await axios.get(
  //         `${baseURL}orderLogs/findByOrder/${OrderIndex?.order_id}`,
  //       );
  //       console.log('Fetched Data:', response.data.object);
  //       setOrderStatusData(response.data.object || []);
  //       // setOrderStatus(response.data.object || []);
  //       console.log(setOrderStatusData);
  //       // if (response.data.object && response.data.object.length > 0) {
  //       //   setOrderStatus(response.data.object[0].OrderStatus);
  //       // }
  //     } catch (error) {
  //       console.error('Error fetching order status data:', error);
  //     }
  //   };

  //   if (OrderIndex) {
  //     fetchOrderStatusData();
  //   }
  // }, [OrderIndex]);

  const getOrderStatusData = () => {
    axios
      .get(baseURL + `${baseURL}orderLogs/findByOrder/${OrderIndex?.order_id}`) 
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
      <h2>Order Status</h2>
      {/* <div className="status">
        <p>Status: {orderStatus}</p>
      </div> */}
      <div className="table-wrapper">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Order ID
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                Date
              </th>
            </tr>
          </thead>
          {/* <tbody>
                        {orderStatusData.map((status) => (
                            <tr key={status.orderLog_id}>
                                <td>{status.order_id}</td>
                                <td>{status.OrderStatus}</td>
                                <td>{new Date(status.Date).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody> */}

          {orderStatus.map((order, key) => (
            <tr key={key}>
              <td>{order?.orderLog_id}</td>

              <td>{order?.order_id}</td>
              <td>{order?.OrderStatus}</td>
              <td>{new Date(order?.Date).toLocaleString()}</td>
            </tr>
          ))}
        </table>
      </div>
      {/* <button onClick={() => setactive(false)}>Close</button> */}
    </div>
  );
};

export default OrderStatus;

import { useEffect, useState } from 'react';
import axios from 'axios';
import baseURL from '../../utils/axios';

const OrderStatus = ({ OrderIndex, setactive }) => {
    
  const [orderStatus, setOrderStatus] = useState('');
  const [orderStatusData, setOrderStatusData] = useState([]);
  console.log(OrderIndex?.order_id);

  console.log(orderStatusData)

  useEffect(() => {
    const fetchOrderStatusData = async () => {
      try {
        const response = await axios.get(
          `${baseURL}orderLogs/findByOrder/${OrderIndex?.order_id}`,
        );
        console.log('Fetched Data:', response.data.object);
        setOrderStatusData(response.data.object || []);
        if (response.data.object && response.data.object.length > 0) {
          setOrderStatus(response.data.object[0].OrderStatus);
        }
      } catch (error) {
        console.error('Error fetching order status data:', error);
      }
    };

    if (OrderIndex) {
      fetchOrderStatusData();
    }
  }, [OrderIndex]);

  return (
    <div>
      <h2>Order Status</h2>
      <div className="status">
        <p>Status: {orderStatus}</p>
      </div>
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Status</th>
              <th>Date</th>
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

          {orderStatusData.object.map((status) => (
            <tr key={status.orderLog_id}>
              <td>{status.order_id}</td>
              <td>{status.OrderStatus}</td>
              <td>{new Date(status.Date).toLocaleString()}</td>
            </tr>
          ))}
        </table>
      </div>
      <button onClick={() => setactive(false)}>Close</button>
    </div>
  );
};

export default OrderStatus;

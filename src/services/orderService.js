import axios from 'axios';
import baseURL from '../utils/axios';

const fetchOrdersByDateRange = async (startDate, endDate,orderIdFilter,customerIdFilter,shippingIdFilter, useApi, allOrders) => {
    if (`useApi`) {
      try {
        const response = await axios.get(baseURL+'api/orders/date-range', {
          params: { startDate, endDate }
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching orders by date range:', error);
        return [];
      }
    } else {
      const filteredOrders = allOrders.filter((packageItem) => {
        const orderDate = new Date(packageItem.order_date);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;
        const isDateInRange =
          (!start || orderDate >= start) && (!end || orderDate <= end);
        const isOrderIdMatch = !orderIdFilter || packageItem.order_id === Number(orderIdFilter);
        const isShippingIdMatch = !shippingIdFilter || packageItem.shipping_id === Number(shippingIdFilter);
        const isCustomerIdMatch = !customerIdFilter || packageItem.customer_id === Number(customerIdFilter);
    
        return isDateInRange && isOrderIdMatch && isShippingIdMatch && isCustomerIdMatch;
    });
    console.log(filteredOrders);
    return filteredOrders;
    }
  };
  

  const fetchOrdersByIDs = async (filter_type,filter_value, useApi, allOrders) => {
    if (useApi) {
      try {
        const response = await axios.get(baseURL+'api/orders/ids', {
          params: { orderId, customerId, shippingId }
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching orders by IDs:', error);
        return [];
      }
    } else {
      // Local filtering
      // Local filtering with early return
      switch(filter_type){
        case 'orderId':
          
          return allOrders.filter(order => order.order_id.toString() === filter_value.toString());
        case 'customerId':
          return allOrders.filter(order => order.customer_id.toString() === filter_value.toString());
        case'shippingId':
          return allOrders.filter(order => order.shipping_id.toString() === filter_value.toString());
        default:
          return [];
      }
    // if (orderId) {
    //   const filteredByOrderId = allOrders.filter(order => order.order_id.toString() === orderId.toString());
    //   if (filteredByOrderId.length > 0) return filteredByOrderId;
    // }
    // if (customerId) {
    //   const filteredByCustomerId = allOrders.filter(order => order.customer_id.toString() === customerId.toString());
    //   if (filteredByCustomerId.length > 0) return filteredByCustomerId;
    // }
    // if (shippingId) {
    //   const filteredByShippingId = allOrders.filter(order => order.shipping_id.toString() === shippingId.toString());
    //   if (filteredByShippingId.length > 0) return filteredByShippingId;
    // }
    // // If no ID matches, return empty array
    // return [];
  
    }
  };

// Function to fetch all orders with pagination
export const getAllOrders = async (Page, pageSize, dispatch) => {
    axios.defaults.headers.common['ngrok-skip-browser-warning'] = 'any value';
    try {
      const response = await axios.get(`${baseURL}order/?pageNumber=${Page}&pageSize=${pageSize}`);
      dispatch({
        type: 'SET_ALL_ORDERS',
        payload: response.data.orders.orders
      });
      dispatch({ type: 'SET_FILTER_ORDERS',  payload: response.data.orders.orders});

    } catch (error) {
      console.error('Failed to fetch orders:', error);
      dispatch({
        type: 'FETCH_ORDERS_ERROR',
        payload: 'Failed to fetch orders'
      });
    }
  };

  // Function to fetch order statuses from the server
export const getStatus = async (dispatch) => {
    try {
      const response = await axios.get(baseURL + "orderStatus/");
      dispatch({
        type: "SET_STATUS",
        payload: response.data.object.body,
      });
    } catch (error) {
      console.error("Failed to fetch statuses:", error);
      dispatch({
        type: "FETCH_STATUS_ERROR",
        payload: "Failed to fetch statuses",
      });
    }
  };

  export const updateOrderStatus = async (orderId, statusId, newStatus, dispatch) => {
    if (window.confirm("Are you sure you want to update the status?")) {
      try {
        // API call to update the status in the backend
        const response = await axios.put(baseURL + "order/update", { orderId, orderStatusId: statusId });
        console.log("Status updated:", response.status);
  
        // Dispatch action to update the status in the local state
        dispatch({
          type: "UPDATE_ORDER_STATUS",
          payload: { orderId, status: newStatus }
        });
      } catch (error) {
        console.error("Failed to update status:", error);
      }
    } else {
      console.log("Status update cancelled");
    }
  };

export { fetchOrdersByDateRange, fetchOrdersByIDs };

import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import { useEffect, useReducer, useState } from 'react';
import OrdersDetails from '../components/OrdersDetails';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { initialState, reducer } from '../reducers/orderReducer';
import moment from 'moment';
import ReactPaginate from 'react-paginate'; // Import react-paginate

import {
  fetchOrdersByDateRange,
  fetchOrdersByIDs,
  getAllOrders,
  getStatus,
  updateOrderStatus,
} from '../services/orderService';
const Orders = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  //   const totalPages = Math.ceil(totalItems / pageSize); // temporarily
  const totalPages = 100; // temporarily

  // Function to apply date range filter
  const handleApplyDateRangeFilter = async () => {
    if (state.startDate && state.endDate && state.startDate <= state.endDate) {
      const filteredOrders = await fetchOrdersByDateRange(
        state.startDate,
        state.endDate,
        state.orderIdFilter,
        state.customerIdFilter,
        state.shippingIdFilter,
        false,
        state.allOrders.length ? state.allOrders : state.filterOrders,
      );
      dispatch({ type: 'SET_ALL_ORDERS', payload: filteredOrders });
    } else {
      alert('End date should be greater than start date.');
    }
  };

  const applyFilter = async () => {
    try {
      setIsDropdownOpen(!isDropdownOpen);
      const response = await fetchOrdersByDateRange(
        state.startDate,
        state.endDate,
        state.orderIdFilter,
        state.customerIdFilter,
        state.shippingIdFilter,
        false,
        state.allOrders.length ? state.allOrders : state.filterOrders,
      );

      console.log(response);
      dispatch({ type: 'SET_ALL_ORDERS', payload: response });
    } catch (error) {
      console.error('Failed to apply filter:', error);
      dispatch({
        type: 'FETCH_ORDERS_ERROR',
        payload: 'Failed to fetch filtered orders',
      });
    }
  };

  const OrderDetails = (id) => {
    // Find the specific order from allOrders
    const specificOrder = state.allOrders.find(
      (order) => order.order_id === id,
    );

    if (specificOrder) {
      // Dispatch action to set the detailed order data
      dispatch({
        type: 'SELECT_ORDER',
        payload: id, // or pass the whole `specificOrder` if you want to avoid searching again in the reducer
      });

      // Optionally, activate a modal or some UI element to show the details
      dispatch({
        type: 'TOGGLE_ACTIVE',
        payload: true,
      });
    }
  };

  const handleUpdateStatus = (newStatus, index, orderId) => {
    const statusId = state.status.find((s) => s.status === newStatus);
    updateOrderStatus(orderId, statusId.orderStatusId, newStatus, dispatch);
  };

  const handleStartDateChange = (date) => {
    dispatch({
      type: 'SET_START_DATE',
      startDate: moment(date).format('YYYY-MM-DD'), // Formats date as 'YYYY-MM-DD'
    });
  };

  const handleEndDateChange = (date) => {
    dispatch({
      type: 'SET_END_DATE',
      endDate: moment(date).format('YYYY-MM-DD'), // Formats date as 'YYYY-MM-DD'
    });
  };

  const handlePageSizeChange = (event) => {
    dispatch({ type: 'SET_PAGE_SIZE', payload: event.target.value });
  };

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    dispatch({ type: 'SET_CURRENT_PAGE', payload: selectedPage }); // Adjusting page number to match your state management if necessary
  };

  useEffect(() => {
    // Assuming getAllOrders is adapted to handle pagination
    getAllOrders(state.currentPage, state.pageSize, dispatch);
    getStatus(dispatch);
  }, [state.currentPage, state.pageSize]);

  const [OrderIndex, setOrderIndex] = useState([]);
  const [active, setactive] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // const OrderDetails = (id, index) => {
  //   // console.log(vendorData[index])
  //   // setSingleVendorData([vendorData[index]])
  //   // setDisplay("flex")
  //   // setBgColor("blur-sm")
  //   // setevents("pointer-events-none")
  //   AllOrders.find((orders)=>{
  //     if(id == orders.order_id){
  //       // console.log(orders)
  //       setOrderIndex(orders);
  //     }
  //   });
  //   // console.log(id)
  //   setactive(true);
  // };

  return (
    <DefaultLayout>
      <Breadcrumb
        pageName={`${active === true ? 'Order Details' : 'Orders'}`}
      />

      {/* <div className="flex bg-white fixed bottom-0 right-0 gap-4 text-3xl p-4">
        <button>&#8249;</button>
        <button>&#8250;</button>
      </div> */}
      {/* --------------------- Order Details Component ---------------------- */}

      {active === true ? (
        <div className="flex flex-col bg-[#e5e7e px-8 relative">
          <OrdersDetails
            AllOrders={allOrders}
            OrderIndex={OrderIndex}
            setactive={setactive}
          />
        </div>
      ) : (
        <div>
          <div className="absolute right-18 top-50 z-99 ">
            {/* <button
              className="p-2 bg-blue-500 text-white rounded min-w-[200px] flex justify-center items-center gap-2"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                height="20"
                width="20"
              >
                <path d="M10 18H14V16H10V18ZM3 6V8H21V6H3ZM6 13H18V11H6V13Z"></path>
              </svg>
              Filter By
            </button> */}

            {/* {isDropdownOpen && (
              <div className="absolute mt-2 bg-white p-2 rounded shadow z-99">
                <input
                  type="number"
                  className="p-1 border-2 border-black rounded  mb-2 "
                  placeholder="Order ID"
                  value={orderIdFilter}
                  onChange={(e) => setOrderIdFilter(e.target.value)}
                />

                <input
                  type="number"
                  className="p-1 border-2 border-black rounded  mb-2 "
                  placeholder="Shipping ID"
                  value={shippingIdFilter}
                  onChange={(e) => setShippingIdFilter(e.target.value)}
                />

                <input
                  type="number"
                  className="p-1 border-2 border-black rounded "
                  placeholder="Customer ID"
                  value={customerIdFilter}
                  onChange={(e) => setCustomerIdFilter(e.target.value)}
                />
              </div>
            )} */}
          </div>
          {/* <div className="filter-controls">
          <select
            value={state.filterType}
            onChange={(e) =>
              dispatch({
                type: "SET_FILTERS",
                payload: { filterType: e.target.value },
              })
            }
          >
            <option value="">Select Filter Type</option>
            <option value="orderId">Order ID</option>
            <option value="customerId">Customer ID</option>
            <option value="shippingId">Shipping ID</option>
          </select>
          <input
            type="text"
            placeholder="Enter filter value"
            value={state.filterValue}
            onChange={(e) =>
              dispatch({
                type: "SET_FILTERS",
                payload: { filterValue: e.target.value },
              })
            }
          />
          <button onClick={applyFilter}>Apply Filter</button>
        </div> */}
          <div className="flex flex-col gap-5 ">
            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
              <div className="max-w-full overflow-x-auto">
                <div className="grid grid-cols-2 p-2 ">
                  {' '}
                  {/* Adjust the number of columns and the gap as needed */}
                  {/* Date pickers in the first grid column */}
                  <div className="flex  gap-1">
                    <DatePicker
                      className="text-black p-1 border-2 border-black rounded focus:outline-none focus:border-blue-500 hover:border-blue-300 transition duration-200 ease-in-out"
                      placeholderText="Start Date"
                      dateFormat="dd/MM/yyyy"
                      selected={
                        state.startDate
                          ? moment(state.startDate).toDate()
                          : null
                      }
                      onChange={handleStartDateChange}
                    />
                    <DatePicker
                      className="text-black p-1 border-2 border-black rounded focus:outline-none focus:border-blue-500 hover:border-blue-300 transition duration-200 ease-in-out"
                      placeholderText="End Date"
                      dateFormat="dd/MM/yyyy"
                      selected={
                        state.endDate ? moment(state.endDate).toDate() : null
                      }
                      onChange={handleEndDateChange}
                    />
                    <button
                      className="bg-primary text-white py-1 w-25  h-10  rounded hover:bg-primary-dark"
                      onClick={handleApplyDateRangeFilter}
                    >
                      Submit
                    </button>
                  </div>
                  {/* Filter controls in the third grid column */}
                  <div className="absolute right-18 top-48 z-99 ">
                    <button
                      className="p-2 bg-primary text-white rounded min-w-[200px] flex justify-center items-center gap-2"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        height="20"
                        width="20"
                      >
                        <path d="M10 18H14V16H10V18ZM3 6V8H21V6H3ZM6 13H18V11H6V13Z"></path>
                      </svg>
                      Filter By
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute mt-2 bg-white p-2 rounded shadow z-99">
                        <input
                          type="number"
                          className="p-1 border-2 border-black rounded  mb-2 "
                          placeholder="Order ID"
                          value={state.orderIdFilter}
                          onChange={(e) =>
                            dispatch({
                              type: 'SET_FILTERS',
                              payload: { orderIdFilter: e.target.value },
                            })
                          }
                        />

                        <input
                          type="number"
                          className="p-1 border-2 border-black rounded  mb-2 "
                          placeholder="Shipping ID"
                          value={state.shippingIdFilter}
                          onChange={(e) =>
                            dispatch({
                              type: 'SET_FILTERS',
                              payload: { shippingIdFilter: e.target.value },
                            })
                          }
                        />

                        <input
                          type="number"
                          className="p-1 border-2 border-black rounded "
                          placeholder="Customer ID"
                          value={state.customerIdFilter}
                          onChange={(e) =>
                            dispatch({
                              type: 'SET_FILTERS',
                              payload: { customerIdFilter: e.target.value },
                            })
                          }
                        />
                        <button
                          className="bg-primary text-white py-1 ms-8 mx-auto  w-25 mt-3  h-10 rounded hover:bg-primary-dark"
                          onClick={applyFilter}
                        >
                          Apply
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-1">
                    {/* <select
                      className="block  rounded-md border-0 py-1.5 h-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      value={state.filterType}
                      onChange={(e) =>
                        dispatch({
                          type: 'SET_FILTERS',
                          payload: { filterType: e.target.value },
                        })
                      }
                    >
                      <option value="">Filter Type</option>
                      <option value="orderId">Order ID</option>
                      <option value="customerId">Customer ID</option>
                      <option value="shippingId">Shipping ID</option>
                    </select> */}
                    {/* <input
                      type="text"
                      placeholder="Search..."
                      className=" p-1 border-2 border-gray-300 h-10 rounded"
                      value={state.filterValue}
                      onChange={(e) =>
                        dispatch({
                          type: 'SET_FILTERS',
                          payload: { filterValue: e.target.value },
                        })
                      }
                    /> */}
                  </div>
                </div>

                <table className="w-full table-auto mt-10">
                  <thead>
                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                      <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                        Order ID
                      </th>
                      <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                        Invoice date
                      </th>
                      <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                        shipping ID
                      </th>
                      <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                        Status
                      </th>
                      <th className="py-4 px-4 font-medium text-black dark:text-white">
                        See Details
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.allOrders.map((packageItem, key) => (
                      <tr key={key}>
                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                          <h5 className="font-medium text-black dark:text-white">
                            {packageItem.order_id}
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {moment(packageItem.order_date).format(
                              'ddd, DD/MM/YYYY HH:mm A',
                            )}
                          </p>
                        </td>
                        <td className="border-b border-[#eee]  pl-9 dark:border-strokedark xl:pl-11">
                          <h5 className="font-medium text-black dark:text-white">
                            {packageItem.shipping_id}
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] dark:border-strokedark">
                          <select
                            className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium outline-1 outline-slate-400 ${
                              packageItem.order_status === 'successfull'
                                ? 'bg-success text-success'
                                : packageItem.order_status === 'confirm'
                                ? 'bg-blue-400 text-blue-700'
                                : 'bg-warning text-warning'
                            }`}
                            value={packageItem.order_status}
                            onChange={(event) =>
                              handleUpdateStatus(
                                event.target.value,
                                key,
                                packageItem.order_id,
                              )
                            }
                          >
                            {state.status.map((status) => (
                              <option
                                key={status.orderStatusId}
                                value={status.status}
                              >
                                {status.status}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="border-b border-[#eee] dark:border-strokedark ">
                          <div className="bg-red-5 flex justify-center space-x-3.5">
                            <button
                              onClick={() =>
                                OrderDetails(packageItem.order_id, key)
                              }
                              className="hover:text-primary"
                            >
                              view
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* ------------------- Pagination ------------------- */}
                <div className="flex items-center justify-end bg-white p-2 text-xl">
                  <div className="flex items-center">
                    <span className="text-sm bg-gray-200 px-3 py-1 rounded-lg mr-2">
                      Items Per Page:
                    </span>
                    <select
                      onChange={handlePageSizeChange}
                      className="text-sm bg-transparent border-b-2 border-gray-400 outline-none appearance-none mr-5 px-2 py-1"
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="20">20</option>
                    </select>
                  </div>
                  <ReactPaginate
                    previousLabel="&#8249;"
                    nextLabel="&#8250;"
                    breakLabel="..."
                    pageCount={totalPages} // Total number of pages
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName="flex items-center justify-center space-x-1" // Tailwind classes for the pagination container
                    activeClassName="bg-blue-500 text-white" // Active page styling
                    disabledClassName="text-gray-500 cursor-not-allowed" // Disabled button styling
                    breakClassName="hidden md:flex" // Responsive visibility for breaks
                    breakLinkClassName="px-3 py-1" // Styling for break elements
                    pageClassName="hidden md:flex" // Responsive visibility for page numbers
                    pageLinkClassName="px-3 py-1 hover:bg-blue-200 rounded" // Styling for page links
                    previousClassName="flex" // Container for the previous button
                    previousLinkClassName="px-3 py-1 hover:bg-blue-200 rounded" // Styling for the previous button link
                    nextClassName="flex" // Container for the next button
                    nextLinkClassName="px-3 py-1 hover:bg-blue-200 rounded" // Styling for the next button link
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
};

export default Orders;

export const initialState = {
    allOrders: [],
    orderIndex: [],
    filterOrders:[],
    active: false,
    status: [],
    startDate: null,
    endDate: null,
    orderIdFilter: '',
    shippingIdFilter: '',
    customerIdFilter: '',
    isDropdownOpen: false,
    currentPage: 0,
    pageSize:5
  };

  export function reducer(state, action) {
    switch (action.type) {
      case 'SET_ALL_ORDERS':
        return { ...state, allOrders: action.payload };
      case 'SET_FILTER_ORDERS':
        return { ...state, filterOrders: action.payload };
      case 'FETCH_ORDERS_ERROR':
        return { ...state, error: action.payload };
      case 'SET_ORDER_INDEX':
        return { ...state, orderIndex: action.payload };
      case 'TOGGLE_ACTIVE':
        return { ...state, active: !state.active };
      case 'SET_STATUS':
        return { ...state, status: action.payload };
        case 'SET_START_DATE':
          return { ...state, startDate: action.startDate };
        
        case 'SET_END_DATE':
          return { ...state, endDate: action.endDate };
      case 'SET_FILTERS':
        return { ...state, ...action.payload };
      case 'TOGGLE_DROPDOWN':
        return { ...state, isDropdownOpen: !state.isDropdownOpen };
      case 'SET_CURRENT_PAGE':
        return { ...state, currentPage: action.payload };
      case 'SET_PAGE_SIZE':
        return { ...state, pageSize: action.payload };
      case 'UPDATE_ORDER_STATUS':
        console.log(action.payload)
        let or= state.allOrders.map((order, index) =>
        index === action.payload.index ? { ...order, order_status: action.payload.status } : order
    )
        return {
          ...state,
          allOrders: state.allOrders.map((order, index) =>
            order.order_id === action.payload.orderId ? { ...order, order_status: action.payload.status } : order
          )
        };
      case 'SELECT_ORDER':
        return {
          ...state,
          orderIndex: state.allOrders.find(order => order.order_id === action.payload)
        };
        case 'TOGGLE_ACTIVE':
            return {
              ...state,
              active: action.payload
            };
      default:
        return state;
        // throw new Error('Unhandled action type');
    }
  }
  
  
  
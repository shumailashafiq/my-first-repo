// StockContext.js
import React, { createContext, useState } from 'react';

const StockContext = createContext();

const StockProvider = ({ children }) => {
  const [stockData, setStockData] = useState([]);

  return (
    <StockContext.Provider value={{ stockData, setStockData }}>
      {children}
    </StockContext.Provider>
  );
};

export { StockContext, StockProvider };

import { createContext, useContext, useState } from 'react';

const DiscountContext = createContext();

export const useDiscount = () => {
  return useContext(DiscountContext);
};

export const DiscountProvider = ({ children }) => {
  const [refresh, setRefresh] = useState(false);

  const getAllData = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <DiscountContext.Provider value={{ getAllData, refresh }}>
      {children}
    </DiscountContext.Provider>
  );
};

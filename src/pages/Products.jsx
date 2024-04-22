import React, { useState } from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { Outlet } from 'react-router-dom';

const Products = () => {
  const [addProducts, setaddProducts] = useState(false);

  const addProduct = () => {
    console.log('addProduct');
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Products" />

      {addProducts ? (
        <div>
          {/* ----------------- Add  Form button --------------------- */}

          <button
            onClick={addProduct}
            className={`p-2 px-4 shadow-md shadow-black  bg-blue-400 rounded fixed z-10 text-white bottom-[30px] right-[50px] text-4xl`}
          >
            +
          </button>
        </div>
      ) : (
        <Outlet />
      )}
    </DefaultLayout>
  );
};

export default Products;

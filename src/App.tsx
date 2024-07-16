import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';

import Homefeed from './pages/Homefeed';
import SingleHomeFeed from './components/HomeFeed/SingleHomeFeed';

import Darkstore from './pages/Darkstore';
import AddDarkStore from './components/Darkstore/AddDarkStore';

import Delivery from './pages/DeliveryPerson';
import AddDelivery from './components/Deliveryperson/addDeliveryPerson.jsx';

import Vendor from './pages/Vendor';
import AddVendor from './components/AddVendor';

import Banner from './pages/Banner';
import AddBanner from './components/Banner/AddBanner';

import Franchisee from './pages/Franchisee';
import AddFranchisee from './components/Franchisee/AddFranchisee';

import Categories from './pages/Categories';
import AddCategories from './components/Categories/AddCategories';

import Products from './pages/Products';
// import AddProduct from './components/Products/AddProduct'

import Orders from './pages/Orders';
import OrderStatus from './components/OrderStatus/OrderStatus.js';
import Items from './pages/Items';

import { ProtectedRoutes } from './components/ProtectedRoutes';
import { IsAuthRoutes } from './components/IsAuthRoutes';
import AddProduct from './components/Products/AddProduct';
import AddStock from './components/stock/AddStock';
import Stock from './pages/Stock.tsx';
import {} from './pages/StockContext.jsx';

import ProductItemImage from './components/MainImages/ProductItemImage';
import OrderAssignment from './pages/OrderAssignment';

import { Variation } from './pages/Variation';
import AddVariation from './components/Variation/AddVariation';
import { UpdateVariation } from './components/Variation/UpdateVariation';
import CategoryDiscount from './pages/CategoryDiscount.jsx'
import AddCatDis from './components/categoryDiscount/AddCatDis'
import ItemDescount from './pages/ItemDiscount.tsx';
import AddDiscount from './components/ItemDiscount/AddDiscount.tsx';

// import MainCategory from './pages/Categories/MainCategory';
// import SubCategory from './pages/Categories/SubCategory';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      {/* <StockProvider> */}

      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route
            index
            element={
              <>
                <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <ECommerce />
              </>
            }
          />
          <Route
            path="/vendor/"
            element={
              <>
                <PageTitle title="Vendor | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Vendor />
              </>
            }
          >
            <Route path="add" element={<AddVendor />} />
          </Route>
          {/* ---------------------------- */}
          <Route
            path="/stock/"
            element={
              <>
                <PageTitle title="Vendor | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Stock />
              </>
            }
          >
            <Route path="add" element={<AddStock />} />
          </Route>


          {/* ---------------------------- */}
          <Route
            path="/franchisee/"
            element={
              <>
                <PageTitle title="Franchisee | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Franchisee />
              </>
            }
          >
            <Route path="add" element={<AddFranchisee />} />
          </Route>

          <Route
            path="/categories/"
            element={
              <>
                <PageTitle title="Categories | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Categories />
              </>
            }
          >
            <Route path="add" element={<AddCategories />} />
          </Route>

          <Route path='/categoryDiscount/' element={
            <>
              <PageTitle title='Category Discount | TailAdmin - Tailwind CSS Admin Dashboard Template' />
              <CategoryDiscount />
            </>
          }>
            <Route path="add" element={<AddCatDis />} />
          </Route>

            <Route
              path="/banner/"
              element={
                <>
                  <PageTitle title="Banner| TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <Banner />
                </>
              }
            >
              <Route path="add" element={<AddBanner />} />
            </Route>

            <Route
              path="/darkstore/"
              element={
                <>
                  <PageTitle title="Darkstore | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <Darkstore />
                </>
              }
            >
              <Route path="add" element={<AddDarkStore />} />
            </Route>

            <Route
              path="/orders/"
              element={
                <>
                  <PageTitle title="Orders | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <Orders />
                </>
              }
            />

            <Route path="homefeed/:id" element={<SingleHomeFeed />} />
            <Route
              path="/homefeed/"
              element={
                <>
                  <PageTitle title="Homefeed | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <Homefeed />
                </>
              }
            >
              <Route path="add" element={<AddDarkStore />} />

              {/* <Route path="add" element={<AddProduct />} /> */}
            </Route>

            <Route
              path="/delivery/"
              element={
                <>
                  <PageTitle title="delivery | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <Delivery />
                </>
              }
            >
              <Route path="add" element={<AddDelivery />} />
            </Route>

            {/* -----------------------------orderAssign------------------------ */}
            <Route
              path="/assignOrders/"
              element={
                <>
                  <PageTitle title="delivery | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <OrderAssignment />
                </>
              }
            ></Route>

            <Route
              path="/products/"
              element={
                <>
                  <PageTitle title="Products | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <Products />
                </>
              }
            >
              <Route path="add" element={<AddProduct />} />
            </Route>

            

            <Route
              path="/items/"
              element={
                <>
                  <PageTitle title="Items | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <Items />
                </>
              }
            ></Route>

            <Route
              path="/itemsdiscount/"
              element={
                <>
                  <PageTitle title="ItemsDiscount | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <ItemDescount />
                </>
              }
            >
              <Route path="add" element={<AddDiscount />} />
            </Route>

            <Route
              path="/mainimages/"
              element={
                <>
                  <PageTitle title="mainimages | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <ProductItemImage />
                </>
              }
            ></Route>

            <Route
              path="/variation"
              element={
                <>
                  <PageTitle title="Variation | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <Variation />
                </>
              }
            >
              <Route path="add" element={<AddVariation />} />
              <Route path=" Update " element={<UpdateVariation />} />
            </Route>

            <Route
              path="/profile"
              element={
                <>
                  <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <Profile />
                </>
              }
            />
            <Route
              path="/forms/form-elements"
              element={
                <>
                  <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <FormElements />
                </>
              }
            />
            <Route
              path="/forms/form-layout"
              element={
                <>
                  <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <FormLayout />
                </>
              }
            />
            <Route
              path="/tables"
              element={
                <>
                  <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <Tables />
                </>
              }
            />
            <Route
              path="/settings"
              element={
                <>
                  <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <Settings />
                </>
              }
            />
            <Route
              path="/chart"
              element={
                <>
                  <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <Chart />
                </>
              }
            />
            <Route
              path="/ui/alerts"
              element={
                <>
                  <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <Alerts />
                </>
              }
            />
            <Route
              path="/ui/buttons"
              element={
                <>
                  <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <Buttons />
                </>
              }
            />

          </Route>

          <Route element={<IsAuthRoutes />}>
            <Route
              path="/auth/signin"
              element={
                <>
                  <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <SignIn />
                </>
              }
            />
            <Route
              path="/auth/signup"
              element={
                <>
                  <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <SignUp />
                </>
              }
            />
          </Route>
        </Routes>
    

          {/* -----------------------------orderAssign------------------------ */}
          <Route
            path="/assignOrders/"
            element={
              <>
                <PageTitle title="delivery | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <OrderAssignment />
              </>
            }
          ></Route>

          <Route
            path="/products/"
            element={
              <>
                <PageTitle title="Products | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Products />
              </>
            }
          >
            <Route path="add" element={<AddProduct />} />
          </Route>

          <Route
            path="/items/"
            element={
              <>
                <PageTitle title="Items | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Items />
              </>
            }
          ></Route>


          <Route
            path="/categories/main-category"
            element={
              <>
                <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                {/* <MainCategory /> */}
              </>
            }


          />




          <Route
            path="/mainimages/"
            element={
              <>
                <PageTitle title="mainimages | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <ProductItemImage />
              </>
            }
          ></Route>

          <Route
            path="/variation"
            element={
              <>
                <PageTitle title="Variation | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Variation />
              </>
            }
          >
            <Route path="add" element={<AddVariation />} />
            <Route path=" Update " element={<UpdateVariation />} />
          </Route>

          <Route
            path="/profile"
            element={
              <>
                <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Profile />
              </>
            }
          />
          <Route
            path="/forms/form-elements"
            element={
              <>
                <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <FormElements />
              </>
            }
          />
          <Route
            path="/forms/form-layout"
            element={
              <>
                <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <FormLayout />
              </>
            }
          />
          <Route
            path="/tables"
            element={
              <>
                <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Tables />
              </>
            }
          />
          <Route
            path="/settings"
            element={
              <>
                <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Settings />
              </>
            }
          />
          <Route
            path="/chart"
            element={
              <>
                <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Chart />
              </>
            }
          />
          <Route
            path="/ui/alerts"
            element={
              <>
                <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Alerts />
              </>
            }
          />
          <Route
            path="/ui/buttons"
            element={
              <>
                <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Buttons />
              </>
            }
          />
        </Route>

        <Route element={<IsAuthRoutes />}>
          <Route
            path="/auth/signin"
            element={
              <>
                <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <SignIn />
              </>
            }
          />
          <Route
            path="/auth/signup"
            element={
              <>
                <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <SignUp />
              </>
            }
          />
        </Route>
      </Routes>


      {/* </StockProvider> */}




    </>
  );
}

export default App;

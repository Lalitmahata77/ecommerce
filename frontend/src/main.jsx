import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from "react-dom/client";
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'
import Home from "./pages/Home.jsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import AdminRoute from './pages/admin/AdminRoute.jsx';
import UserList from './pages/admin/UserList.jsx';
import Profile from './pages/user/Profile.jsx';
import Category from './pages/admin/Category.jsx';
import ProductList from './pages/admin/ProductList.jsx';
import AllProducts from './pages/admin/AllProducts.jsx';
import ProductUpdate from "./pages/admin/ProductUpdate.jsx";
import Favorites from './pages/Products/Favorites.jsx';
import ProductDetails from './pages/Products/ProductDetails.jsx';
import Cart from './pages/Cart.jsx';
import Shop from './pages/Shop.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Shipping from './pages/Orders/Shipping.jsx';
import PlaceOrder from './pages/Orders/PlaceOrder.jsx';
import Order from './pages/Orders/Order.jsx';
import OrderList from './pages/admin/OrderList.jsx';
import UserOrder from './pages/user/UserOrder.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route index={true} path="/" element={<Home />} />
<Route path='/favorite' element={<Favorites/>}/>
<Route path='/profile' element={<Profile/>}/>
<Route path='/product/:id' element={<ProductDetails/>}/>
<Route path="/cart" element={<Cart />} />
<Route path="/shop" element={<Shop />} />



  {/* Registered users */}
  <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path='/user-orders' element={<UserOrder/>}/>
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/order/:id" element={<Order />} />
      </Route>

      <Route path="/admin" element={<AdminRoute />}>
      <Route path="userlist" element={<UserList />} />
      <Route path='categorylist' element={<Category/>}/>
      <Route path='productlist' element={<ProductList/>}/>
      <Route path="allproductslist" element={<AllProducts />} />
      <Route path="product/update/:_id" element={<ProductUpdate />} />
      <Route path="orderlist" element={<OrderList />} />
      <Route path="dashboard" element={<AdminDashboard />} />
      </Route>
    
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PayPalScriptProvider>
      <RouterProvider router={router} />
    </PayPalScriptProvider>
  </Provider>
);
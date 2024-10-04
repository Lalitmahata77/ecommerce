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
import Home from './components/Home.jsx'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import AdminRoute from './pages/admin/AdminRoute.jsx';
import UserList from './pages/admin/UserList.jsx';
import Profile from './pages/user/Profile.jsx';
import Category from './pages/admin/Category.jsx';
import ProductList from './pages/admin/ProductList.jsx';
import AllProducts from './pages/admin/AllProducts.jsx';
import ProductUpdate from "./pages/admin/ProductUpdate.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route index={true} path="/" element={<Home />} />
<Route path='/profile' element={<Profile/>}/>


      <Route path="/admin" element={<AdminRoute />}>
      <Route path="userlist" element={<UserList />} />
      <Route path='categorylist' element={<Category/>}/>
      <Route path='productlist' element={<ProductList/>}/>
      <Route path="allproductslist" element={<AllProducts />} />
      <Route path="product/update/:_id" element={<ProductUpdate />} />
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
import {Toaster} from "react-hot-toast"
// import {BrowserRouter,Route,Routes} from "react-router-dom"
// import Navigation from "./pages/auth/Navigation"
// import Login from "./pages/auth/Login"
// import Register from "./pages/auth/Register"
// import PrivateRoute from "./components/PrivateRoute"
// import Profile from "./pages/user/Profile"
// import Home from "./components/Home"
// import AdminRoute from "./pages/admin/AdminRoute"
// import UserList from "./pages/admin/UserList"
// function App() {

//   return (
//    <BrowserRouter>
//    <Toaster/>
//    <Navigation/>
//    <Routes>
//     <Route path="/" index={true} element={<Home/>}/>
//     <Route path="/login" element={<Login/>}/>
//     <Route path="/register" element={<Register/>}/>
//   <Route path="" element={<PrivateRoute/>}>
//   <Route path="/profile" element={<Profile/>}/>
//   <Route path="/admin" element={<AdminRoute/>}> 
//   <Route path ="/userlist" element={<UserList/>}/>

//     </Route> 
//   </Route>
//    </Routes>
//    </BrowserRouter>
//   )
// }

// export default App


import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";

import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Toaster />
      <Navigation />
      <main className="py-3">
        <Outlet />
      </main>
    </>
  );
};

export default App;
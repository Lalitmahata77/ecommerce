import {Toaster} from "react-hot-toast"
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Navigation from "./pages/auth/Navigation"
import Login from "./pages/auth/Login"
function App() {

  return (
   <BrowserRouter>
   <Toaster/>
   <Navigation/>
   <Routes>
    <Route path="/" index={true} />
    <Route path="/login" element={<Login/>}/>
   </Routes>
   </BrowserRouter>
  )
}

export default App

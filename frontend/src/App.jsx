import {Toaster} from "react-hot-toast"
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Navigation from "./pages/auth/Navigation"
function App() {

  return (
   <BrowserRouter>
   <Toaster/>
   <Navigation/>
   <Routes>
    <Route path="/" index={true}/>
   </Routes>
   </BrowserRouter>
  )
}

export default App

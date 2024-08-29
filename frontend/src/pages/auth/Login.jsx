import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/api/userApiSlice";
import Loader from "../../components/Loder";
import { setCredentials } from "../../redux/feature/auth/authSlice";



const Login = () => {
    const [email, setEmail] = useState("")
    const [password,setPassword] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [login,{isLoading}] = useLoginMutation()
    const {userInfo} = useSelector((state)=>state.auth)
    const {search} = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get("redirect") || "/"
    useEffect(()=>{
        if (userInfo) {
            navigate(redirect)
        }
    },[navigate,userInfo,redirect])
    const submitHandler = async(e) =>{
e.preventDefault()
try {
    const res = await login({email,password}).unwrap()
    dispatch(setCredentials({...res}))
    navigate(redirect)
} catch (error) {
    toast.error(error?.data?.message || error.error)
}
    }
  return (
    <div className=" bg-gray-800 flex">
        <section className="pl-[10rem] flex flex-wrap">
    <div className="mr-[4rem] mt-[5rem]">
      <h1 className="text-2xl font-semibold mb-4">Sign In</h1>

      <form onSubmit={submitHandler}  className="container w-[40rem]">
        <div className="my-[2rem]">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-white"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 p-2 border rounded w-full"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 p-2 border rounded w-full"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>

        {isLoading && <Loader />}
      </form>
      <div className="mt-4">
            <p className="text-white">
              New Customer?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-pink-500 hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
          alt=""
          className="h-[65rem] w-[59%] xl:block md:hidden sm:hidden rounded-lg"
        />
</section>
</div>
  )
}

export default Login
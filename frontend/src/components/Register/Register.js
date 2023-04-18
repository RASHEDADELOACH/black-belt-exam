import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import axios from "axios";
import { baseUrl } from "../../helper/api";
import { toast } from "react-toastify";

export default function Register() {
    const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const data = {
      name,
      email,
      password,
    };
    console.log(data)
    await axios.post(baseUrl + "/user/register", data).then((res) => {
      if (res.data.status) {
        navigate("/");
        localStorage.setItem("token", res.data.token);
        setUser(res.data.result)
      } else {
        toast.error(res.data.message);
      }
    });
  };
  return (
    <>
      <div className="flex min-h-full items-center justify-center px-4 py-24 sm:px-6 lg:px-8 ">
        <div className="w-full max-w-md space-y-8 bg-zinc-100 p-4 rounded">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 ">
              Create a New Account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleRegister}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className=" rounded-md shadow-sm">
              <div className="mb-4">
                <label htmlFor="email-address" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="relative block w-full border-0 p-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Your Name"
                  
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full border-0 p-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Email address"
                />
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full  border-0 p-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

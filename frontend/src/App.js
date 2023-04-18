import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import AddProduct from "./components/AddProduct/AddProduct";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "./helper/api";
import MyProfile from "./components/MyProfile/MyProfile";
import RequireAuth from "./components/RequireAuth/RequireAuth";
export const UserContext = createContext();
function App() {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      axios.post(`${baseUrl}/user/autoLogin`, { token: token }).then((res) => {
        if (res.data.status) {
          setUser(res.data.result);
        }
      });
    }
  }, [token]);
  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route
            path="/products"
            element={
              <RequireAuth>
                <Products></Products>
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/add-products"
            element={
              <RequireAuth>
                <AddProduct></AddProduct>
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/my-profile"
            element={
              <RequireAuth>
                <MyProfile></MyProfile>
              </RequireAuth>
            }
          ></Route>
          <Route path="/sign-in" element={<Login></Login>}></Route>
          <Route path="/sign-up" element={<Register></Register>}></Route>
        </Routes>
        <ToastContainer />
      </UserContext.Provider>
    </div>
  );
}

export default App;

import React, {useState,useContext} from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";
import Dashboard from "./Components/Dashboard/Dashboard";
import Header from "./Components/Layout/Header/Header";
import Footer from "./Components/Layout/Footer/Footer";
import Routers from "./Routers/Routers";
import AuthContext from "./Store/auth-context";
import { ToastContainer } from "react-toastify";
import CartProvider from "./Store/CartProvider";

function App() {
  const [authstatus, setauthstatus] = useState(false);

  const loggedIn = () =>{
    setauthstatus(true);
  }

  const loggedOut = ()=>{
    setauthstatus(false);
  }

  const layoutClasses = `${authstatus ? 'dashboard-wrapper' : ''}`;

  return (
    <AuthContext.Provider value={{ status: authstatus,login: loggedIn, logout:loggedOut}}>
      <CartProvider>
        <div className="container-fluid p-0">
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <BrowserRouter>
          <Header />
          <div className={layoutClasses}>
            {authstatus &&  <Dashboard/>}
            <Routers className=""/>
          </div>
          <Footer />
        </BrowserRouter>
        </div>
      </CartProvider>
    </AuthContext.Provider>
  );
}

export default App;

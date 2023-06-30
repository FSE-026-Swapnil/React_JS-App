import React, { useState, useNavigate } from "react"
import { Routes,Route } from "react-router-dom";
import ActiveOrder from "../Components/ActiveOrder/ActiveOrder";
import CompletedOrders from "../Components/CompletedOrders/CompletedOrders";
import Dashboard from "../Components/Dashboard/Dashboard";
import Homepage from "../Components/Homepage/Homepage";
import ListMenu from "../Components/ListMenu/ListMenu";
import Login from "../Components/Login/Login";
import RestActiveOrders from "../Components/RestActiveOrders/RestActiveOrders";
import SearchRestaurant from "../Components/SearchRestaurant/SearchRestaurant";
import AddEditDetails from "../Components/AddEditDetails/AddEditDetails";

const Routers = () => {

  const [menu , setMenu] = useState();
  
  const chooseMenu = (menu) => {
    setMenu(menu);
  };

  return (
    <div style={{minHeight:'1300px'}}>      
    <Routes>
      <Route exact path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />}  />
      <Route path="/dashboard" element={<Dashboard />}  />
      <Route path="/search" element={<SearchRestaurant chooseMenu={chooseMenu}/>} />
      <Route path="/completedOrder" element={<CompletedOrders />} />
      <Route path="/activeOrder" element={<ActiveOrder />} />
      <Route path="/listMenu" element={<ListMenu menuList={menu}/>} />
      <Route path="/restActiveOrders" element={<RestActiveOrders />} />
      <Route path="/addEditDetails" element={<AddEditDetails />} />
      </Routes>

    </div>
  )
}

export default Routers;
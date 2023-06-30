import React, { Component, useState,useEffect } from 'react';
import {BrowserRouter,Route,Routes, Link} from 'react-router-dom';
import { getUser } from '../Common/Common';
import { BASE_URL } from '../../Constants/APIConstants'
import './AddEditDetails.css'

function AddEditDetails() {
  const [restData,setRestData] = useState();
  const user = getUser();  

  const fetchRestaurantDetails = () => {
    fetch(BASE_URL + 'restaurants?restaurantName=' + user.name, {
        method: "GET"
      }).then((response) => {
        return response.json();
      })
      .then((resp) => {
        if(resp.length > 0){
            setRestData(resp[0]);
        }
      });
  }

  useEffect(() => {
    fetchRestaurantDetails();
  },[])

  return (
    <div className='details'>
        {restData && <div className="header">
            <h4>Name : {restData.restaurantName}</h4>
            <h4>FSSAI No : {restData.fssaiNo}</h4>
            <h4>Address : {restData.restaurantAddr}</h4>
        </div>}
        {restData && restData.menu.length > 0 && <div className='menuItems'>
            <h4>Menu</h4>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col" style={{width:'5%'}}>#</th>
                    <th scope="col" style={{width:'20%'}}>Dish Name</th>
                    <th scope="col" style={{width:'10%'}}>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {restData && restData.menu.map((item,index)=>{
                        return(
                            <tr>
                                <th scope="row" key={item.id}>{item.id}</th>
                                <td>{item.dishName}</td>
                                <td>{item.price}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
        }

        {restData && restData.menu.length === 0 && <div className='menuItems'>
            <h4>No Menus Added Yet</h4>
        </div>}

        {restData && <button className='btn btn-info'>Add Menu</button>}
    </div>
  )
}

export default AddEditDetails
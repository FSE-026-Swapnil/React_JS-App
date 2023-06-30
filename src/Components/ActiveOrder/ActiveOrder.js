import React, { Component, useState,useEffect } from 'react';
import {BrowserRouter,Route,Routes, Link} from 'react-router-dom';
import { getUser } from '../Common/Common';
import { BASE_URL } from '../../Constants/APIConstants'


function ActiveOrder() {
  const [activeData,setActiveData] = useState([]);
  const user = getUser();

  const fetchActiveOrder = () => {
    fetch(BASE_URL + 'orders?orderedBy=' + user.id + '&status=placed&status=accepted', {
        method: "GET"
      }).then((response) => {
        return response.json();
      })
      .then((resp) => {
        if(resp.length > 0){
          setActiveData(resp);
        }
      });
  }

  useEffect(() => {
    fetchActiveOrder();
  },[])

  return (
    <div>
      <h1 style={{'marginLeft':'25px'}}>Active Order</h1>
      {activeData.length > 0 && <table className="table">
        <thead className="thead-dark">
            <tr>
            <th scope="col" style={{width:'5%'}}>#</th>
            <th scope="col" style={{width:'20%'}}>Fulfilled By</th>
            <th scope="col" style={{width:'10%'}}>Price</th>
            <th scope="col" style={{width:'10%'}}>Total Cart Items</th>
            </tr>
        </thead>
        <tbody>
            {activeData && activeData.map((item,index)=>{
                return(
                    <tr>
                        <th scope="row" key={item.id}>{item.id}</th>
                        <td>{item.fulfilledBy}</td>
                        <td>{item.totalAmount}</td>
                        <td>{item.items.length}</td>
                    </tr>
                );
            })}
        </tbody>
      </table>}
      {activeData.length == 0 && <h3 style={{margin:'25px'}}>No Active Order !!!</h3>}
    </div>
  )
}

export default ActiveOrder
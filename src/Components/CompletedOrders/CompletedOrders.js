import React, { Component, useState,useEffect } from 'react';
import {BrowserRouter,Route,Routes, Link} from 'react-router-dom';
import { getUser } from '../Common/Common';
import { BASE_URL } from '../../Constants/APIConstants'


function CompletedOrders() {
  const [compData,setCompData] = useState([]);
  const user = getUser();

  const fetchCompletedOrder = () => {
    fetch(BASE_URL + 'orders?orderedBy=' + user.id + '&status=completed', {
        method: "GET"
      }).then((response) => {
        return response.json();
      })
      .then((resp) => {
        if(resp.length > 0){
          setCompData(resp);
        }
      });
  }

  useEffect(() => {
    fetchCompletedOrder();
  },[])

  return (
    <div>
      <h1 style={{'marginLeft':'25px'}}>Completed Orders</h1>
      { compData.length > 0 && <table className="table">
        <thead className="thead-dark">
            <tr>
            <th scope="col" style={{width:'5%'}}>#</th>
            <th scope="col" style={{width:'20%'}}>Fulfilled By</th>
            <th scope="col" style={{width:'10%'}}>Price</th>
            <th scope="col" style={{width:'10%'}}>Total Cart Items</th>
            </tr>
        </thead>
        <tbody>
            {compData && compData.map((item,index)=>{
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
      { compData.length == 0 && <h3 style={{margin:'25px'}}>No Completed Orders !!!</h3>}
    </div>
  )
}

export default CompletedOrders


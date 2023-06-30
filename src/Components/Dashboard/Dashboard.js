import React, { Component, useState,useEffect } from 'react';
import {BrowserRouter,Route,Routes, Link} from 'react-router-dom';
import './Dashboard.css'
import { DashboardData } from './DashboardData';
import { DashboardDataRestOwner } from './DashboardData';
import { IconContext } from 'react-icons';
import { getUser } from '../Common/Common';
import { BASE_URL } from '../../Constants/APIConstants'


function Dashboard() {
  const [active, setActive] = useState();
  const [activeOrders, setActiveOrders] = useState(0);
  const [complOrders, setComplOrders] = useState(0);
  const [cancOrders, setCancOrders] = useState(0);
  const [restActiveOrders, setRestActiveOrders] = useState(0);
  const [restPendingOrders, setRestPendingOrders] = useState(0);
  const [undelivrOrders, setUndelivrOrders] = useState(0);
  const user = getUser();
  let activeOrd = 0;
  let compOrd = 0;
  let cancOrd = 0;
  let restActiveOrd = 0;
  let pendingOrd = 0;
  let undeliveredOrd = 0;
  let deliveredOrd = 0;
  let placedOrd = 0;

  const fetchOrdersCount = () => {
    activeOrd = 0;
    compOrd = 0;
    cancOrd = 0;

    fetch(BASE_URL + 'orders?orderedBy=' + user.id, {
        method: "GET"
    }).then((response) => {
        return response.json();
    })
    .then((resp) => {

        if(resp.length > 0){
            resp.forEach((item) => {
                if(item.status === 'placed'){
                    activeOrd += 1;
                    setActiveOrders(activeOrd);
                }else if(item.status === 'completed'){
                    compOrd += 1;
                    setComplOrders(compOrd);
                }else if(item.status === 'cancelled'){
                    cancOrd += 1;
                    setCancOrders(cancOrd);
                }
            })
        }
    });
  }

  const fetchRestOrdersCount = () => {
    restActiveOrd = 0;
    pendingOrd = 0;
    undeliveredOrd = 0;
    deliveredOrd = 0;
    placedOrd = 0;

    fetch(BASE_URL + 'orders?fulfilledBy=' + user.name, {
        method: "GET"
    }).then((response) => {
        return response.json();
    })
    .then((resp) => {
        //active ==> all accepted at rest
        //pending ==> all placed at rest 
        //not delivered ==> all accepted - all completed at rest 
        if(resp.length > 0){
            resp.forEach((item) => {
                if(item.status === 'accepted'){
                    restActiveOrd += 1;
                    setRestActiveOrders(restActiveOrd);
                }else if(item.status === 'completed'){
                    deliveredOrd += 1;
                }else if(item.status === 'placed'){
                    placedOrd += 1;
                }
            })
            setRestPendingOrders(placedOrd);
            setUndelivrOrders(restActiveOrd-deliveredOrd);
        }
    });
  }

  useEffect(() => {
    if(user.type === 'User'){
        fetchOrdersCount();
    }else if(user.type === 'Restaurant Owner'){
        fetchRestOrdersCount();
    }
  },[user])
  
  
  return (
    <div className='dasboard-container'>
        <IconContext.Provider value={{ color: '#fff' }}>
            <nav className={'nav-menu active'}>
                <ul className='nav-menu-items'>
                    { user.type === 'User' && DashboardData.map((item, index) => {
                    return (
                        <li key={index} className={`nav-text ${active == item && 'selected'}`} onClick={() => setActive(item)}>
                        <Link to={item.path}>
                            {item.icon}
                            <span>{item.title}</span>
                        </Link>
                        </li>
                    );
                    })}
                    { user.type === 'Restaurant Owner' && DashboardDataRestOwner.map((item, index) => {
                    return (
                        <li key={index} className={`nav-text ${active == item && 'selected'}`} onClick={() => setActive(item)}>
                        <Link to={item.path}>
                            {item.icon}
                            <span>{item.title}</span>
                        </Link>
                        </li>
                    );
                    })}
                </ul>
            </nav>
        </IconContext.Provider>
        <div>
            {user.type === 'User' && 
                <div>
                    <h1 className='greet-user'>Welcome, User</h1>
                    <div className='dash-data'>
                        <div className='activeBox'>
                            <span>ACTIVE ORDERS</span>
                            <div>{activeOrders}</div>
                        </div>
                        <div className='completedBox'>
                            <span>COMPLETED ORDERS</span>
                            <div>{complOrders}</div>
                        </div>
                        <div className='cancelledBox'>
                            <span>CANCELLED ORDERS</span>
                            <div>{cancOrders}</div>
                        </div>
                    </div>
                </div>
            }
            {user.type === 'Restaurant Owner' && 
                <div>
                    <h1 className='greet-user'>Welcome, Restaurant Owner</h1>
                    <div className='dash-data'>
                        <div className='activeBox'>
                            <span>ACTIVE ORDERS</span>
                            <div>{restActiveOrders}</div>
                        </div>
                        <div className='pendingBox'>
                            <span>UN-CONFIRMED</span>
                            <div>{restPendingOrders}</div>
                        </div>
                        <div className='awaitingBox'>
                            <span>NOT DELIVERED</span>
                            <div>{undelivrOrders}</div>
                        </div>
                    </div>
                </div>
            }
        </div>
    </div>
  );
}

export default Dashboard
import React, { Component, useState,useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { getUser } from '../Common/Common';
import { BASE_URL } from '../../Constants/APIConstants';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const RestActiveOrders = () =>{
    const navigate = useNavigate();
    const [orderData,setOrderData] = useState([]);
    const [allData,setAllData] = useState([]);
    const user = getUser();

    const fetchAllOrder = () => {
        fetch(BASE_URL + 'orders?fulfilledBy=' + user.name, {
            method: "GET"
        }).then((response) => {
            return response.json();
        })
        .then((resp) => {
            if(resp.length > 0){
            setAllData(resp);
            }
        });
    }

    const acceptRejectHandler = (ele,status) => {
        ele.status = status
        fetch(BASE_URL + 'orders/' + ele.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ele)
        }).then((resp) => {
            toast.success("Order "+ status +" successfully.");
            navigate(`/dashboard`);
        }).catch((err)=>{
            console.log(err.message)
        });
    }


    useEffect(() => {
        fetchAllOrder();
    },[])

    return(
        <div>
            {allData.length > 0 && 
            <div>
                <h1 style={{'marginLeft':'25px'}}>All Orders</h1>
                <table className="table">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col" style={{width:'5%'}}>#</th>
                    <th scope="col" style={{width:'25%'}}>Ordered By</th>
                    <th scope="col" style={{width:'20%'}}>Order Items</th>
                    <th scope="col" style={{width:'10%'}}>Price</th>
                    <th scope="col" style={{width:'10%'}}>status</th>
                    <th scope="col" style={{width:'30%'}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {allData.map((item,index)=>{
                        return(
                            <tr>
                                <th scope="row" key={item.id}>{item.id}</th>
                                <td>{item.customerName}</td>
                                <td>{item.items.length}</td>
                                <td>{item.totalAmount}</td>
                                <td>{item.status}</td>
                                { item.status === 'placed' && 
                                    <td className="mt-5 btn-grp">
                                        <button type="button" className="btn btn-sm btn-success" onClick={()=>acceptRejectHandler(item,'accepted')} >Accept</button>
                                        <button type="button" className="btn btn-sm btn-danger" onClick={()=>acceptRejectHandler(item,'rejected')} >Reject</button>
                                    </td>
                                }
                                { item.status !== 'placed' && 
                                    <td className="mt-5 btn-grp">
                                       N.A
                                    </td>
                                }
                            </tr>
                        );
                    })}
                </tbody>
                </table>
            </div>
            }

            {allData.length == 0 && <h3 style={{margin:'25px'}}>No Orders !!!</h3>}
        </div>
    );
}

export default RestActiveOrders;
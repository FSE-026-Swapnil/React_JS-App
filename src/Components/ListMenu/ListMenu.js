import React, { useState,useContext } from 'react'
import './ListMenu.css'
import CartProvider from '../../Store/CartProvider';
import CartContext from '../../Store/cart-context';
import { BASE_URL } from '../../Constants/APIConstants';
import { toast } from "react-toastify";
import { getUser } from '../Common/Common';
import { useNavigate } from "react-router-dom";

function ListMenu(props) {
    const user = getUser();
    const navigate = useNavigate();
    const cartCtx = useContext(CartContext);

    const totalAmount = `${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length>0;


    const addHandler = (ele) => {
        cartCtx.addItem({
            name:ele.dishName,
            id:ele.id,
            price:ele.price,
            totalAmount:totalAmount
        });
    }

    const deleteHandler = (ele) => {
        cartCtx.removeItem({
            name:ele.dishName,
            id:ele.id,
            price:ele.price,
            totalAmount:totalAmount
        });
    }

    const placeOrderHandler = () => {
         // Place order 
         cartCtx.orderedBy = Number(user.id);
         cartCtx.customerName = user.email;
         cartCtx.status = "placed";
         cartCtx.fulfilledBy = props.menuList.name +', '+ props.menuList.address;
         
         fetch(BASE_URL + 'orders', {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(cartCtx)
          }).then((response) => {
            if(response.status === 201){
                toast.success('Hurray!!! Order placed successfully.');
                setTimeout(()=>{
                    navigate(`/dashboard`);
                    cartCtx.items.map((item,index)=>{
                        cartCtx.removeItem(item);
                    })
                    cartCtx.totalAmount = 0;
                },1200);
            }else{
                toast.error(response.statusText)
            }
          });
    }

    const goBackHandler = () => {
        navigate(`/search`);
    }


    return (
        <div className='listMenu-wrapper'>
            <h3>Menu Card of : {props.menuList.name} {props.menuList.address}</h3>
            <div className="listMenu-content">
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col" style={{width:'5%'}}>#</th>
                        <th scope="col" style={{width:'20%'}}>Dish Name</th>
                        <th scope="col" style={{width:'10%'}}>Price</th>
                        <th scope="col" style={{width:'10%'}}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.menuList && props.menuList.menu.map((item,index)=>{
                            return(
                                <tr>
                                    <th scope="row" key={item.id}>{item.id}</th>
                                    <td>{item.dishName}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        <button className='btn btnGrp btn-xs btn-success' onClick={()=>addHandler(item)}>Add</button>
                                        <button className='btn btnGrp btn-xs btn-danger' onClick={()=>deleteHandler(item)}>Delete</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                { hasItems && <div className="cart-items">
                    <div className='header'>
                        <h4>Cart</h4>
                    </div>    
                    <div className='main-body'>
                        {cartCtx.items.map((item,index)=>{
                            return(
                                <div className='cart-row'>
                                    <span>{item.name} : </span>
                                    <span>{item.price} ₹</span>
                                </div>
                            );
                        })}
                    </div>
                    <div className='footer'>    
                        <label>Total Amount : ₹. {totalAmount}</label>
                    </div>
                </div>}
            </div>
            {hasItems && <div className="text-center mt-5 btn-grp">
                <button type="button" className="btn btn-warning" onClick={goBackHandler}>Choose from other restaurant</button>
                <button type="button" className="btn btn-primary" onClick={placeOrderHandler}>Confirm & Place Order</button>
            </div>}
        </div>
    )
}

export default ListMenu
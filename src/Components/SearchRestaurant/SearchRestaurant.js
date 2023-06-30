import React,{useRef,useState,useNavigate} from 'react';
import './SearchRestaurant.css';
import { Link } from "react-router-dom";
import { BASE_URL } from '../../Constants/APIConstants'
import hotelImage from '../../Asset/Hotel-1.avif';


const SearchRestaurant = ({chooseMenu}) => {
    const [restData, setRestData] = useState();
    const addressRef = useRef('');
    const searchHandler = () => {
        fetch(BASE_URL + 'restaurants?address_like=' + addressRef.current.value, {
            method: "GET"
          }).then((response) => {
            return response.json();
          })
          .then((resp) => {
            setRestData(resp);
          });
    }

    return(
        <div className="search-wrapper">
            <h1>Search Restaurants</h1>
            <div className="search-box-2">
                <input type="text" className="form-control" placeholder="Enter Address" ref={addressRef}/>
                <button className="btn btn-primary" onClick={searchHandler}>Search</button>
            </div>
            { restData && 
            <div className='results'>
                <h3>Search Results</h3>
                <hr />
                {restData.map((item,index)=>{
                     return (
                        <div key={index} className="restCard">
                            <img src={hotelImage} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">{item.bestFor}</p>
                                <p className="card-text">{item.address}</p>
                                <button className="btn btn-primary menuBtn" onClick={()=>chooseMenu(item)}><Link to="/listMenu" style={{color:"white",fontWeight:'bold',textDecoration:'none'}}>View Menu</Link></button>
                            </div>
                        </div>
                     );
                })}
            </div>}
        </div>
    )
}

export default SearchRestaurant;
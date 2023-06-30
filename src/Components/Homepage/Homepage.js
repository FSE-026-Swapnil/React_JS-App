import React, {useContext} from "react";
import './Homepage.css'
import banner from '../../Asset/banner.jpg';
import dish from '../../Asset/dish.png';
import mobPayment from '../../Asset/mobile-payment.png';
import offer from '../../Asset/offer.jpg';
import railway from '../../Asset/railway.png';
import trainSeat from '../../Asset/train-seat.png';
import AuthContext from "../../Store/auth-context";

const Homepage = () => {
    return(
        <main className="main-container">
              <div className="banner">
                  <img src={banner} alt="Banner"/>
                  <div className="content-wrapper">
                      <label className="banner-text">Order Delicious Food On Trains</label>
                      <div className="search-box">
                          <input type="number" className="form-control" placeholder="Enter PNR Number To Order" />
                          <button className="btn btn-primary">Search</button>
                      </div>
                      
                  </div>
              </div>
              <div className="order-steps">
                  <div>
                      <label className="text-header">Get Food in Train with easy steps</label>
                      <label>Order Delicious food in Train from pre-approved restaurants across 400+ stations in india</label>
                  </div>
                  <div>
                      <img src={railway} width="80" height="80" alt="" />
                      <label className="text-header">Enter PNR Number</label>
                  </div>
                  <div>
                      <img src={dish} width="80" height="80" alt="" />
                      <label className="text-header">Choose Food You Love</label>
                  </div>
                  <div>
                      <img src={mobPayment} width="80" height="80" alt="" />
                      <label className="text-header">Place Order Via Online / COD</label>
                  </div>
                  <div>
                      <img src={trainSeat} width="80" height="80" alt="" />
                      <label className="text-header">Get Food On Your Seat</label>
                  </div>
              </div>
              <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" data-bs-interval="2600">
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <div className="cards-wrapper">
                          <div className="card">
                          <img src={offer} className="card-img-top" alt="..."/>
                          <div className="card-body">
                              <h5 className="card-title">FREE DELIVERY</h5>
                              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                              <a href="#" className="btn btn-primary">View Offer</a>
                          </div>
                          </div>
                          <div className="card d-none d-md-block">
                          <img src={offer} className="card-img-top" alt="..."/>
                          <div className="card-body">
                              <h5 className="card-title">FLAT ₹.50 OFF</h5>
                              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                              <a href="#" className="btn btn-primary">View Offer</a>
                          </div>
                          </div>
                          <div className="card d-none d-md-block">
                          <img src={offer} className="card-img-top" alt="..."/>
                          <div className="card-body">
                              <h5 className="card-title">BIG HUNGER FEST</h5>
                              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                              <a href="#" className="btn btn-primary">View Offer</a>
                          </div>
                          </div>
                      </div>
                    </div>
                    <div className="carousel-item">
                      <div className="cards-wrapper">
                        <div className="card">
                          <img src={offer} className="card-img-top" alt="..."/>
                          <div className="card-body">
                            <h5 className="card-title">GET ₹.30 OFF</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" className="btn btn-primary">View Offer</a>
                          </div>
                        </div>
                        <div className="card d-none d-md-block">
                          <img src={offer} className="card-img-top" alt="..."/>
                          <div className="card-body">
                            <h5 className="card-title">15% OFF ON GROUP ORDER</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" className="btn btn-primary">View Offer</a>
                          </div>
                        </div>
                        <div className="card d-none d-md-block">
                          <img src={offer} className="card-img-top" alt="..."/>
                          <div className="card-body">
                            <h5 className="card-title">FIRST USER</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" className="btn btn-primary">View Offer</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-item">
                      <div className="cards-wrapper">
                          <div className="card">
                          <img src={offer} className="card-img-top" alt="..."/>
                          <div className="card-body">
                              <h5 className="card-title">FIRST 3 ORDERS FREE DELIVERY</h5>
                              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                              <a href="#" className="btn btn-primary">View Offer</a>
                          </div>
                          </div>
                          <div className="card d-none d-md-block">
                          <img src={offer} className="card-img-top" alt="..."/>
                          <div className="card-body">
                              <h5 className="card-title">FLAT ₹.100 OFF</h5>
                              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                              <a href="#" className="btn btn-primary">View Offer</a>
                          </div>
                          </div>
                          <div className="card d-none d-md-block">
                          <img src={offer} className="card-img-top" alt="..."/>
                          <div className="card-body">
                              <h5 className="card-title">BIG DIWALI FEST</h5>
                              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                              <a href="#" className="btn btn-primary">View Offer</a>
                          </div>
                          </div>
                      </div>
                    </div>
                    <div className="carousel-item">
                      <div className="cards-wrapper">
                        <div className="card">
                          <img src={offer} className="card-img-top" alt="..."/>
                          <div className="card-body">
                            <h5 className="card-title">CHRISTMAS OFFER</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" className="btn btn-primary">View Offer</a>
                          </div>
                        </div>
                        <div className="card d-none d-md-block">
                          <img src={offer} className="card-img-top" alt="..."/>
                          <div className="card-body">
                            <h5 className="card-title">5% OFF ON GROUP ORDER</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" className="btn btn-primary">View Offer</a>
                          </div>
                        </div>
                        <div className="card d-none d-md-block">
                          <img src={offer} className="card-img-top" alt="..."/>
                          <div className="card-body">
                            <h5 className="card-title">NEW YEAR OFFER</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" className="btn btn-primary">View Offer</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
              <div className="partner">
                  <div>
                      <label>Are you a Restaurant Owner ?</label>
                      <legend>Partner with us and Grow your business fastly by providing food service through our website...</legend>
                  </div>
                  <div>
                      <button className="btn btn-lg">SIGN UP AS A PARTNER</button>
                  </div>
              </div>
          </main>
    );
}

export default Homepage;
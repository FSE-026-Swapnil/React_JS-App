import React from "react";
import './Footer.css'

const Footer = () => {
    return(
        <footer className="container-fluid p-0">
            <div className="d-flex justify-content-between p-3">
                <div className="flex-item">
                    <ul>    
                        <label>COMPANY</label>
                        <li>HOME</li>
                        <li>ABOUT US</li>
                        <li>FAQ</li>
                        <li>CAREER</li>
                        <li>T & C</li>
                    </ul>
                </div>
                <div className="flex-item">
                    <ul>    
                        <label>HELP & SUPPORT</label>
                        <li>CALLBACK REQUEST</li>
                        <li>CANCELLATION REQUEST</li>
                        <li>FEEDBACK / COMPLAINT</li>
                        <li>CONTACT US</li>
                    </ul>
                </div>
                <div className="flex-item">
                    <ul>    
                        <label>PARTNERSHIP</label>
                        <li>RESTAURANT SIGNUP</li>
                        <li>LINKED RESTAURANTS</li>
                        <li>FAQ</li>
                        <li>CAREER</li>
                        <li>T & C</li>
                    </ul>
                </div>
                <div className="flex-item">
                    <ul>    
                        <label>SOCIAL LINKS</label>
                        <li>FACEBOOK</li>
                        <li>INSTAGRAM</li>
                        <li>LINKEDIN</li>
                        <li>TWITTER</li>
                        <li>YOUTUBE</li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
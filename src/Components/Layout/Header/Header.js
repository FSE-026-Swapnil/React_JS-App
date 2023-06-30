import React ,{useContext} from "react";
import './Header.css';
import { Link } from "react-router-dom";
import brand from '../../../Asset/brand.png';
import profile from '../../../Asset/user.png'
import { getUser, removeUserSession } from "../../Common/Common";
import AuthContext from "../../../Store/auth-context";

const Header = () => {
    const ctx = useContext(AuthContext);

    const logoutHandler = () => {
        removeUserSession();
        ctx.logout();
    }
    
    return(
        <header>
            <div className="header">
                <img src={brand} className="brand-logo" width="260" height="80" alt="App Logo" />
                <ul>
                    { !ctx.status && <li><Link to="/login">LOGIN</Link></li> }
                    { ctx.status && <li><Link to="/" onClick={logoutHandler}>LOGOUT</Link></li>}
                    <li><a href="">RAIL TOOLS</a></li>
                    <li><a href="">GROUP ORDER</a></li>
                    <li><a href="">TRACK ORDER</a></li>
                </ul>
            </div>
        </header>
    );
}

export default Header;
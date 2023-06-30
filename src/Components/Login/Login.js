import react, { useState, useRef, useContext } from "react";
import "./Login.css";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../../Constants/APIConstants'
import { setUserSession } from "../Common/Common";
import { useNavigate } from "react-router-dom";
import AuthContext from '../../Store/auth-context';

const Login = () => {
  const navigate = useNavigate();
  const ctx = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [isAgent, setIsAgent] = useState(false);
  const [customerType, setCustomerType] = useState('');
  const [message, setMessage] = useState('');
  const emailRef = useRef('');
  const passRef = useRef('');
  const nameRef = useRef('');
  const fssaiRef = useRef('');
  const addrRef = useRef('');
  const mobRef = useRef('');

  const registerNow = () => {
    setIsLogin(false);
    setIsOwner(false);
    setIsAgent(false);
    emailRef.current.value ='';
    passRef.current.value = '';
  };

  const loginNow = () => {
    setIsLogin(true);
    emailRef.current.value ='';
    passRef.current.value = '';
    setMessage('');
  };

  const showMessage = () => {
    setMessage('Password length should be more than 3 characters.');
  }

  const hideMessage = () => {
    setMessage('');
  }

  const optionHandler = (event) => {
    if (event.target.value === "Restaurant Owner") {
      setIsAgent(false);
      setIsOwner(true);
      setCustomerType('Restaurant Owner');
    } else if (event.target.value === "System User") {
      setIsOwner(false);
      setIsAgent(true);
      setCustomerType('System User');
    } else {
      setIsOwner(false);
      setIsAgent(false);
      setCustomerType('Customer');
    }
  };

  const validateFormInputs = (event) => {
    event.preventDefault();
    //let emailValid = emailRef.current.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,3})$/i);
    let passwordValid = passRef.current.value.length >= 4;
   
    if(!passwordValid){
      toast.warn("Please enter valid password.Password length should be more than 3 characters.");
    }

    if(passwordValid){
      submitHandler();
    }
  }

  const submitHandler = (event) => {
    let userData = {
      email : emailRef.current.value,
      password : passRef.current.value
    };
    
    if(!isLogin){
      if(customerType === 'Restaurant Owner'){
        userData = {
          ...userData,
          restaurantName : nameRef.current.value,
          restaurantAddr : addrRef.current.value,
          fssaiNo : fssaiRef.current.value,
          customerType:'Restaurant Owner'
        }
      }else if(customerType === 'System User'){
        userData = {
          ...userData,
          mobileNo : mobRef.current.value,
          customerType:'System User'
        }
      }else{
        userData = {
          ...userData,
          customerType:'User'
        }
      }
    }

    if(isLogin){
      // Login
      fetch(BASE_URL + 'users?email=' + emailRef.current.value, {
        method: "GET"
      }).then((response) => {
        return response.json();
      })
      .then((resp) => {
        if(resp.length > 0){
          if(resp[0].password === passRef.current.value){
            setUserSession(resp[0].id, resp[0].email,resp[0].customerType,resp[0]?.restaurantName);
            ctx.login();
            toast.success("Logged in successfully.");
            navigate(`/dashboard`);
          }else{
            toast.error("Invalid credentials. Email or password does not match.");
          }
        }else{
          toast.warn("User does not exists.");
        }
      });
    }else{
      // Sign Up 
        fetch(BASE_URL + 'users', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(userData)
        }).then((response) => {
          return response.json();
        })
        .then((response) => {
          toast.success('Hurray!!! Registration completed.');
          if(response.customerType === 'Restaurant Owner'){
            userData.menu = [];
            userData.bestFor = "North Indian, Italian, Continental, Bar Food, Desserts, Beverages"
            fetch(BASE_URL + 'restaurants', {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(userData)
            }).then((response) => {
              
            });
          }
        });
      }
  };

  return (
    <div className="card wrapper">
      <div className="card-header">
        {isLogin ? <h1>Sign In</h1> : <h1>Register</h1>}
      </div>
      <div className="card-body">
        <form onSubmit={validateFormInputs}>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              ref={emailRef}
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              ref={passRef}
              onFocus={showMessage}
              onBlur={hideMessage}
            />
            { !isLogin && message && <small>{message}</small> }
          </div>

          { !isLogin &&  
          <div className="mb-3">
            <label>Sign up as</label>
            <select className="form-select" onChange={optionHandler}>
              <option value="default" selected>Select user type</option>
              <option value="Customer">Customer</option>
              <option value="Restaurant Owner">Restaurant Owner</option>
              <option value="System User">System User</option>
            </select>
          </div>
          }

          {isOwner && !isLogin ? (
            <div>
              <div className="mb-3">
                <label>Restaurant Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter restaurant name"
                  ref={nameRef}
                />
              </div>

              <div className="mb-3">
                <label>Restaurant Address</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter restaurant address"
                  ref={addrRef}
                />
              </div>

              <div className="mb-3">
                <label>FSSAI No.</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter FSSAI no."
                  ref={fssaiRef}
                />
              </div>
            </div>
          ) : isAgent && !isLogin ? (
            <div>
              <div className="mb-3">
                <label>Mobile No.</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter mobile no."
                  ref={mobRef}
                />
              </div>
            </div>
          ) : (
            ""
          )}

          <div className="d-grid">
            <button type="submit" className="btn btn-dark">
              {isLogin ? <h5>Log In</h5> : <h5>Sign Up</h5>}
            </button>
          </div>
          {isLogin ? (
            <p className="text-center mt-4">
              Not a member&nbsp;&nbsp;
              <a href="#" onClick={registerNow}>
                Sign up now 🡺
              </a>
            </p>
          ) : (
            <p className="text-center mt-4">
              <a href="#" onClick={loginNow}>
                Login now 🡺
              </a>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;

import React, { useState, useContext } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/storeContext';
import axios from 'axios';

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState('Login');
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Handle input changes
  const onchangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url + (currState === 'Login' ? '/api/user/login' : '/api/user/register');

    try {
     const response = await axios.post(newUrl, data);
      console.log('Response:', response.data); // Debugging log
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        setShowLogin(false); // Close popup
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="Close"
            aria-label="Close Login Popup"
          />
        </div>

        <div className="login-popup-input">
          {currState === 'Login' ? null : (
            <input
              type="text"
              name="name"
              placeholder="Your name"
              onChange={onchangeHandler}
              value={data.name}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Your email"
            onChange={onchangeHandler}
            value={data.email}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Your password"
            onChange={onchangeHandler}
            value={data.password}
            required
          />
        </div>

        <button type="submit">{currState === 'Sign up' ? 'Create account' : 'Login'}</button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>
            By continuing, I agree to the terms and conditions of use & privacy policy.
          </p>
        </div>

        {currState === 'Login' ? (
          <p>
            Create a new account?{' '}
            <span onClick={() => setCurrState('Sign up')}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <span onClick={() => setCurrState('Login')}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
  
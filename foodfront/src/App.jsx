import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Cart from './components/pages/Cart/Cart';
import Home from './components/pages/Home/Home';
import PlaceOrder from './components/pages/PlaceOrder/PlaceOrder';
import Footer from './components/footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {/* Pass setShowLogin to LoginPopup */}
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <div className='app'>
        {/* Pass setShowLogin to Navbar */}
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/placeorder' element={<PlaceOrder />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;

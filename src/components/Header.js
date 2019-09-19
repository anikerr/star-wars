import React from 'react';

import './Header.css';
import logo from '../assets/img/logo.png';

const Header = () => {
  return (
    <div className="header">
      <img src={logo} alt="logo" id="logo" />
    </div>
  );
};
export default Header;

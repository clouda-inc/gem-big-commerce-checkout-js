import React from 'react';

import logo from '../../image/logo.svg';

import './header.scss';

const Header = () => {
  return (
    <div className="headerContainer">
      <div className="headerWrapper">
        <img alt="logo" src={logo} />
      </div>
    </div>
  );
};

export default Header;

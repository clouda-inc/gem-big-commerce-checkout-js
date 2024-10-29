import React from 'react';

import logo from '../../image/logo.svg';

import './header.scss';

const Header = () => {
  return (
    <div className="headerContainer">
      <div className="headerWrapper">
        <a href="https://www.lucd.art/">
          <img alt="logo" src={logo} />
        </a>
      </div>
    </div>
  );
};

export default Header;

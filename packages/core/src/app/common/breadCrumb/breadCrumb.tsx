import React from 'react';

import './breadCrumb.scss';

const BreadCrumb = () => {
  return (
    <div className="breadCrumbContainer">
      <div className="breadCrumbWrapper">
        <div className="breadCrumbText">Home</div>
        <div className="breadCrumbIcon">
          <svg
            fill="none"
            height="13"
            viewBox="0 0 12 13"
            width="12"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4.5 3.90723L7.5 6.90723L4.5 9.90723" stroke="#E5E6E8" />
          </svg>
        </div>
        <div className="breadCrumbText">My Account</div>
        <div style={{ width: '12px', height: '12px' }}>
          <svg
            fill="none"
            height="13"
            viewBox="0 0 12 13"
            width="12"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4.5 3.90723L7.5 6.90723L4.5 9.90723" stroke="#E5E6E8" />
          </svg>
        </div>
        <div className="breadCrumbText">Checkout</div>
      </div>
    </div>
  );
};

export default BreadCrumb;

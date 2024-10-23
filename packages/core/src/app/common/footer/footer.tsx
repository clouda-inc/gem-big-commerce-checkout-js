import React from 'react';
import './footer.scss';

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footerWrapper">
        <div className="footer-content">
          <span>© 2024 All Rights Reserved</span>
        </div>
        <div className="footer-links">
          <span>Privacy Policy</span>
          <span>Terms of Conditions</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;

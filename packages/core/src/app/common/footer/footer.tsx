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
          <a className="footer-link" href="https://www.lucd.art/privacy-policy">
            <span>Privacy Policy</span>
          </a>
          <a className="footer-link" href="https://www.lucd.art/terms-conditions">
            <span>Terms of Conditions</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;

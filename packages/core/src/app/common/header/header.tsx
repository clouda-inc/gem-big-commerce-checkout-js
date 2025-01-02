import React, { useEffect } from 'react';

import './header.scss';

const Header = () => {
  useEffect(() => {
    const link = document.createElement('link');

    link.rel = '';
    link.href = 'https://store-qxtizk9ym4.mybigcommerce.com/content/images/logo.webp';
    document.head.appendChild(link);
  }, []);

  return (
    <div className="headerContainer">
      <div className="headerWrapper">
        <a href="https://www.lucd.art/">
          <img
            alt="logo"
            decoding="async"
            height={48}
            src="https://store-qxtizk9ym4.mybigcommerce.com/content/images/logo.webp"
            width={158}
          />
        </a>
      </div>
    </div>
  );
};

export default Header;

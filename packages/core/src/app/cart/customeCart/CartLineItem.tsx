import { LineItem } from '@bigcommerce/checkout-sdk';
import React, { Component, ReactNode } from 'react';

import './CartLineItem.scss';

import { withCurrency, WithCurrencyProps } from '@bigcommerce/checkout/locale';

import giaCertificate from '../../image/GIA-certificate.png';

interface CartLineItemProps {
  lineItem: LineItem;
}

class CartLineItem extends Component<CartLineItemProps & WithCurrencyProps> {
  render(): ReactNode {
    const { lineItem, currency } = this.props;

    return (
      <div className="checkout-cart-summary-line-item" key={lineItem?.id}>
        <div className="checkout-cart-summary-image-container">
          <img
            alt={lineItem?.name}
            className="checkout-cart-summary-image"
            height={80}
            src={lineItem?.imageUrl}
            width={80}
          />
        </div>
        <div className="checkout-cart-summary-detaile-wrapper">
          <div className="checkout-cart-summary-product-name-container">
            <div className="checkout-cart-summary-product-name">{lineItem?.name}</div>
            <div className="checkout-cart-summary-product-certificate">
              <img
                alt="GIA Certificate"
                className="checkout-cart-summary-product-certificate-image"
                height={16}
                src={giaCertificate}
                width={48}
              />
            </div>
          </div>
          <div className="checkout-cart-summary-product-price-container">
            <div className="checkout-cart-summary-product-quantity">
              <span>
                <p className="checkout-cart-summary-product-quantity-value">{lineItem?.quantity}</p>
                <p className="checkout-cart-summary-product-quantity-unit">x</p>
              </span>
            </div>
            <div className="checkout-cart-summary-product-price">
              {currency.toCustomerCurrency(lineItem?.listPrice)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withCurrency(CartLineItem);

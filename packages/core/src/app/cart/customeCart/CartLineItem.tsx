import { LineItem } from '@bigcommerce/checkout-sdk';
import React, { Component, ReactNode } from 'react';

import './CartLineItem.scss';

interface CartLineItemProps {
  lineItem: LineItem;
}

class CartLineItem extends Component<CartLineItemProps> {
  render(): ReactNode {
    const { lineItem } = this.props;

    return (
      <div key={lineItem?.id}>
        <div className="checkout-cart-summary-image-container">
          <img className="checkout-cart-summary-image" src={lineItem?.imageUrl} />
        </div>
        <div className="checkout-cart-summary-detaile-wrapper">
          <div className="checkout-cart-summary-product-name">{lineItem?.name}</div>
          <div>GIA</div>
          <div className="checkout-cart-summary-product-price-container">
            <div className="checkout-cart-summary-product-quantity">{lineItem?.quantity}X</div>
            <div className="checkout-cart-summary-product-price">{lineItem?.listPrice}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default CartLineItem;

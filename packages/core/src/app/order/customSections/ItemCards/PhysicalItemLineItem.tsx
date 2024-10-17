import { PhysicalItem } from '@bigcommerce/checkout-sdk';
import React, { Component, ReactNode } from 'react';

import { ShopperCurrency } from '../../../currency';
import giaCertificate from '../../../image/GIA-certificate.png';

import './PhysicalItemLineItem.scss';

interface LineItemProps {
  item: PhysicalItem;
}

class PhysicalItemLineItem extends Component<LineItemProps> {
  render(): ReactNode {
    const item = this.props.item;

    return (
      <div className="item-container">
        <div className="image-container">
          <img alt={item?.name} height={80} src={item?.imageUrl} width={80} />
        </div>
        <div className="item-details-container">
          <div className="item-name-cetificate">
            <div className="item-name">{item.name}</div>
            <div className="item-cetifcate">
              <img
                className="checkout-cart-summary-product-certificate-image"
                height={16}
                src={giaCertificate}
                width={48}
              />
            </div>
          </div>
          <div className="item-price-container">
            <div className="item-qunatity">{item.quantity}x</div>
            <div className="item-price">
              <ShopperCurrency amount={item?.listPrice} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PhysicalItemLineItem;

import { LineItemMap } from '@bigcommerce/checkout-sdk';
import React, { Component, ReactNode } from 'react';

import { PhysicalItemLineItem } from '.';

import './OrderItemList.scss';

interface OrderItemListProps {
  lineItems: LineItemMap;
}

class OrderItemList extends Component<OrderItemListProps> {
  render(): ReactNode {
    return (
      <div className="order-item">
        <div className="order-item-physical-item-list">
          {this.props.lineItems.physicalItems &&
            this.props.lineItems.physicalItems?.map((item, index: number) => (
              <PhysicalItemLineItem item={item} key={index} />
            ))}
        </div>
      </div>
    );
  }
}

export default OrderItemList;

import { LineItemMap } from '@bigcommerce/checkout-sdk';
import React, { Component, ReactNode } from 'react';

import './OrderItemCount.scss';

interface OrderItemCountProps {
  lineItems: LineItemMap;
}

class OrderItemCount extends Component<OrderItemCountProps> {
  render(): ReactNode {
    const itemCount = this.props.lineItems?.physicalItems.length;

    return <div className="order-item-count">{itemCount} items in card</div>;
  }
}

export default OrderItemCount;

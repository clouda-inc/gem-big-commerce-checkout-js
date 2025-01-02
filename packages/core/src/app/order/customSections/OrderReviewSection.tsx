import { LineItemMap } from '@bigcommerce/checkout-sdk';
import React, { Component } from 'react';

import './OrderReviewSection.scss';

import { OrderItemCount, OrderItemList } from '.';

interface OrderReviewSectionProps {
  lineItems: LineItemMap;
}

class OrderReviewSection extends Component<OrderReviewSectionProps> {
  render(): React.ReactNode {
    return (
      <div className="order-review-section">
        <div className="order-review-header">Order Review</div>
        <div className="order-review-body">
          <OrderItemCount lineItems={this.props.lineItems} />
          <OrderItemList lineItems={this.props.lineItems} />
        </div>
      </div>
    );
  }
}

export default OrderReviewSection;

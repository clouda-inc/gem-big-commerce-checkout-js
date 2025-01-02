import React, { Component, ReactNode } from 'react';

import './OrderBillingSummary.scss';
import { ShopperCurrency } from '../../currency';

interface OrderBillingSummaryProps {
  subTotal: number | string;
  discountAmount: number | string;
  shippingCost: number | string;
  tax: number | string;
  total: number | string;
  customerId: number;
  orderId: number | string;
}

class OrderBillingSummary extends Component<OrderBillingSummaryProps> {
  render(): ReactNode {
    const { subTotal, discountAmount, shippingCost, tax, total, customerId, orderId } = this.props;

    return (
      <div className="order-billing-summary-container">
        <div className="order-billing-summary-header">Billing Summary</div>
        <div className="order-billing-summary-body">
          <div className="order-billing-summary-price-details-section">
            <div className="order-billing-summary-subtotal">
              <div className="order-billing-summary-subtotal-title">Subtotal</div>
              <div className="order-billing-summary-subtotal-price">
                <ShopperCurrency amount={subTotal as number} />
              </div>
            </div>
            <div className="order-billing-summary-discount">
              <div className="order-billing-summary-discount-title">Discount</div>
              <div className="order-billing-summary-discount-price">
                <ShopperCurrency amount={discountAmount as number} />
              </div>
            </div>
            <div className="order-billing-summary-shipping">
              <div className="order-billing-summary-shipping-title">Shiping</div>
              <div className="order-billing-summary-shipping-price">
                <ShopperCurrency amount={shippingCost as number} />
              </div>
            </div>
            <div className="order-billing-summary-tax">
              <div className="order-billing-summary-tax-title">Tax</div>
              <div className="order-billing-summary-tax-price">
                <ShopperCurrency amount={tax as number} />
              </div>
            </div>
          </div>
          <div className="order-billing-summary-grand-total-section">
            <div className="order-billing-summary-grand-total">Grand Total</div>
            <div className="order-billing-summary-grand-total-price">
              <ShopperCurrency amount={total as number} />
            </div>
          </div>
          <div className="order-billing-summary-button-section">
            <div className="order-billing-summary-keep-shopping-container">
              <a
                className="order-billing-summary-keep-shopping-link"
                href="https://www.lucd.art/search"
              >
                Keep Shopping
              </a>
            </div>
            {!!customerId && customerId !== 0 && (
              <div className="order-billing-summary-order-details-container">
                <a
                  className="order-billing-summary-order-details-link"
                  href={`https://www.lucd.art/order?id=${orderId}`}
                >
                  Order Details
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default OrderBillingSummary;

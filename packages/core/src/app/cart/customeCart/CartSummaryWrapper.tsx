/* eslint-disable no-console */
import React, { Component, ReactNode } from 'react';

import { withLanguage, WithLanguageProps } from '@bigcommerce/checkout/locale';

import { withAnalytics } from '../../analytics';
import { withCheckout } from '../../checkout';
import { CheckoutState, WithCheckoutProps } from '../../checkout/Checkout';
import mapToCheckoutProps from '../../checkout/mapToCheckoutProps';

import CartLineItem from './CartLineItem';

class CartSummaryWrapper extends Component<WithCheckoutProps & WithLanguageProps, CheckoutState> {
  render(): ReactNode {
    const { cart } = this.props;

    console.log('cart : ', cart);

    return (
      <div className="checkout-cart-summary">
        {cart?.lineItems?.physicalItems && (
          <div className="checkout-cart-summary-line-items">
            {cart.lineItems.physicalItems?.map((lineItem) => (
              <CartLineItem key={lineItem?.id} lineItem={lineItem} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default withAnalytics(withLanguage(withCheckout(mapToCheckoutProps)(CartSummaryWrapper)));

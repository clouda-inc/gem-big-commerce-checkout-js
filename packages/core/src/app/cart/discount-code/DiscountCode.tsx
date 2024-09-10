/* eslint-disable no-console */
import { CheckoutSelectors } from '@bigcommerce/checkout-sdk';
import React, { Component, ReactNode } from 'react';

import { TranslatedString, withLanguage, WithLanguageProps } from '@bigcommerce/checkout/locale';
import { CheckoutContextProps } from '@bigcommerce/checkout/payment-integration-api';

import { withAnalytics } from '../../analytics';
import { withCheckout } from '../../checkout';
import { CheckoutState, WithCheckoutProps } from '../../checkout/Checkout';

import './DiscountCode.scss';

interface DiscountCodeState {
  discountCode: string;
}

interface DiscountCodeProps {
  couponCode: any;
  couponError: any;
  isRemovingCoupon: boolean;
  isApplyingCoupon: boolean;
  applyCoupon: (couponCode: string) => Promise<CheckoutSelectors>;
  removeCoupon(code: string): void;
}

class DiscountCode extends Component<
  WithCheckoutProps & WithLanguageProps & DiscountCodeProps,
  CheckoutState & DiscountCodeState
> {
  constructor(props: WithCheckoutProps & WithLanguageProps & DiscountCodeProps) {
    super(props);
    this.state = {
      ...this.state,
      discountCode: props.couponCode || '',
    };
  }

  render(): ReactNode {
    const { couponCode, couponError, isRemovingCoupon, isApplyingCoupon, applyCoupon } = this.props;

    console.log('couponError jjjjj : ', couponError);
    console.log('discountCode : ', couponCode);

    const handleSubmitDiscountCode = async (event: any) => {
      event.preventDefault();

      const { discountCode } = this.state;

      try {
        const data = await applyCoupon(discountCode);

        // this.setState({ discountCode: couponCode });

        console.log('[before coupon code] data : ', couponError);

        console.log('[after coupon code] data : ', data);
      } catch (error) {
        console.error('error : ', error);
        // this.setState({ discountCode: couponCode });
        console.log('[before coupon code] data : ', couponError);
      }
    };

    return (
      <><div className="discount-code">
        <div className="discount-code-label">
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <TranslatedString id="cart.discountCode.title" />
            <div className="discount-code-status-container">
              {!!couponError && (
                <div>
                  <div>!</div>
                </div>
              )}
              {isRemovingCoupon || isApplyingCoupon ? <div className="spinner" /> : <></>}
          </div>
        </div>
        <div style={{ width: '100%', color: 'red' }}>
          {!!couponError && <div>{couponError?.body?.detail}</div>}
        </div>
      </div><div className="discount-code-input-wrapper">
          <div className="discount-code-input-container">
            <div className="discount-code-input-lable">
              <TranslatedString id="cart.discountCode.placeholder" />
            </div>
            <input
              className="discount-code-input"
              disabled={isApplyingCoupon || isRemovingCoupon}
              onChange={(e) => this.setState({ discountCode: e.target.value })}
              type="text"
              value={this.state.discountCode} />
          </div>
          <div className="discount-code-button-wrapper">
            {!!this.state.discountCode && (
              <button
                className="discount-code-button"
                disabled={isApplyingCoupon || isRemovingCoupon}
                onClick={handleSubmitDiscountCode}
              >
                Validate
              </button>
            )}
            {!!this.props.couponCode ||
              (!!couponError && (
                <div>
                  <button className="discount-code-button">Remove</button>
                </div>
              ))}
          </div>
        </div></>
      </div>
    );
  }
}

export function mapToDisCountCodeProps({
  checkoutService,
  checkoutState,
}: CheckoutContextProps): DiscountCodeProps {
  const {
    data: { getCoupons },
    statuses: { isRemovingCoupon, isApplyingCoupon },
    errors: { getApplyCouponError, getRemoveCouponError },
  } = checkoutState;

  return {
    couponCode: getCoupons(),
    couponError: getApplyCouponError() || getRemoveCouponError(),
    isRemovingCoupon: isRemovingCoupon(),
    isApplyingCoupon: isApplyingCoupon(),
    applyCoupon: checkoutService.applyCoupon,
    removeCoupon: checkoutService.removeCoupon,
  };
}

export default withAnalytics(withLanguage(withCheckout(mapToDisCountCodeProps)(DiscountCode)));

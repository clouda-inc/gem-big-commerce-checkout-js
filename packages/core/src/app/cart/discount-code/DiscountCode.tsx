import { CheckoutSelectors } from '@bigcommerce/checkout-sdk';
import classNames from 'classnames';
import React, { Component, ReactNode } from 'react';

import { TranslatedString, withLanguage, WithLanguageProps } from '@bigcommerce/checkout/locale';
import { CheckoutContextProps } from '@bigcommerce/checkout/payment-integration-api';

import { withAnalytics } from '../../analytics';
import { withCheckout } from '../../checkout';
import { CheckoutState, WithCheckoutProps } from '../../checkout/Checkout';
import { IconCheck } from '../../ui/icon';

import './DiscountCode.scss';

interface DiscountCodeState {
  discountCode: string;
}

interface DiscountCodeProps {
  couponCode: any;
  checkout: any;
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
    const {
      couponCode,
      couponError,
      isRemovingCoupon,
      isApplyingCoupon,
      applyCoupon,
      removeCoupon,
    } = this.props;

    const handleSubmitDiscountCode = async (event: any) => {
      event.preventDefault();

      const { discountCode } = this.state;

      try {
        await applyCoupon(discountCode);

        this.setState({ discountCode: couponCode });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('error : ', error);
      }
    };

    const handleRemoveDiscountCode = (event: any) => {
      event.preventDefault();

      const { couponCode } = this.props;

      removeCoupon(couponCode);
    };

    return (
      <div className='checkout-discount-wrapper"'>
        <div className="discount-code">
          {this.props.checkout && (
            <div>
              <div className="discount-code-label">
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <TranslatedString id="cart.discountCode.title" />
                  <div className="discount-code-status-container">
                    {!!couponError && (
                      <div>
                        <div
                          style={{
                            color: '#FF0000',
                            width: '2rem',
                            height: '2rem',
                            border: '1px solid #FF0000',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          !
                        </div>
                      </div>
                    )}
                    {(isRemovingCoupon || isApplyingCoupon) && <div className="spinner" />}
                    {!!couponCode && (!isRemovingCoupon || !isApplyingCoupon) && (
                      <IconCheck
                        additionalClassName={classNames(
                          'stepHeader-counter',
                          'optimizedCheckout-step',
                          {
                            'stepHeader-counter--complete': !!couponCode,
                          },
                        )}
                      />
                    )}
                  </div>
                </div>
              </div>
              {!!couponCode && (
                <div className="discount-code-input-wrapper">
                  <div className="discount-code-input-container">
                    <div className="discount-code-input-lable">
                      <TranslatedString id="cart.discountCode.placeholder" />
                    </div>
                    <input
                      className="discount-code-input"
                      disabled={true}
                      onChange={(e) => this.setState({ discountCode: e.target.value })}
                      type="text"
                      value={couponCode}
                    />
                  </div>
                  <div className="discount-code-button-wrapper">
                    {!!couponCode && (
                      <div>
                        <button className="discount-code-button" onClick={handleRemoveDiscountCode}>
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {!couponCode && (
                <div className="discount-code-input-wrapper">
                  <div className="discount-code-input-container">
                    <div className="discount-code-input-lable">
                      <TranslatedString id="cart.discountCode.placeholder" />
                    </div>
                    <input
                      className="discount-code-input"
                      disabled={isApplyingCoupon || isRemovingCoupon}
                      onChange={(e) => this.setState({ discountCode: e.target.value })}
                      type="text"
                      value={this.state.discountCode || this.props?.couponCode || ''}
                    />
                  </div>
                  <div className="discount-code-button-wrapper">
                    {!!this.state.discountCode && !couponCode && (
                      <button
                        className="discount-code-button"
                        disabled={isApplyingCoupon || isRemovingCoupon}
                        onClick={handleSubmitDiscountCode}
                      >
                        Validate
                      </button>
                    )}
                  </div>
                </div>
              )}
              {!!couponError && (
                <div
                  style={{
                    width: '100%',
                    color: 'red',
                    fontSize: '10px',
                    paddingLeft: '1.5rem',
                    paddingBottom: '1.5rem',
                    paddingRight: '1.5rem',
                  }}
                >
                  <div>{couponError?.body?.detail}</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export function mapToDisCountCodeProps({
  checkoutService,
  checkoutState,
}: CheckoutContextProps): DiscountCodeProps {
  const {
    data: { getCoupons, getCheckout },
    statuses: { isRemovingCoupon, isApplyingCoupon },
    errors: { getApplyCouponError, getRemoveCouponError },
  } = checkoutState;

  return {
    couponCode: getCoupons()?.find((coupon) => coupon.code)?.code,
    checkout: getCheckout(),
    couponError: getApplyCouponError() || getRemoveCouponError(),
    isRemovingCoupon: isRemovingCoupon(),
    isApplyingCoupon: isApplyingCoupon(),
    applyCoupon: checkoutService.applyCoupon,
    removeCoupon: checkoutService.removeCoupon,
  };
}

export default withAnalytics(withLanguage(withCheckout(mapToDisCountCodeProps)(DiscountCode)));

import { CheckoutRequestBody, CheckoutSelectors } from '@bigcommerce/checkout-sdk';
import React, { Component, ReactNode } from 'react';

import {
  TranslatedString,
  withCurrency,
  WithCurrencyProps,
  withLanguage,
  WithLanguageProps,
} from '@bigcommerce/checkout/locale';
import { CheckoutContextProps } from '@bigcommerce/checkout/payment-integration-api';

import { withAnalytics } from '../../analytics';
import { withCheckout } from '../../checkout';
import { WithCheckoutProps } from '../../checkout/Checkout';

import './BillingSummary.scss';

interface BillingSummaryProps {
  checkout: any;
  isLoading: boolean;
  updateCheckout(payload: CheckoutRequestBody): Promise<CheckoutSelectors>;
}

interface BilingProps {
  formId: string;
  isPaymentStepActive: boolean;
}

class BillingSummary extends Component<
  WithCheckoutProps & WithLanguageProps & BillingSummaryProps & WithCurrencyProps & BilingProps
> {
  render(): ReactNode {
    const { checkout, currency, formId, isPaymentStepActive, isLoading, isPending } = this.props;
    const { subtotal, taxTotal, grandTotal, shippingCostTotal } = checkout;
    const { discountAmount } = checkout.cart;

    return (
      <div className="checkout-billing-summary-wrapper">
        <div className="billing-summary">
          <div className="billing-summary-label">
            <TranslatedString id="billing-summary.title" />
          </div>
          <div className="billing-summary-body">
            <div className="billing-summary-billing-detail-section">
              <div className="billing-summary-subtotla-section">
                <div className="billing-summary-subtotla">
                  <TranslatedString id="billing-summary.subtotal" />
                </div>
                <div className="billing-summary-subtotla-value">
                  {currency.toCustomerCurrency(subtotal)}
                </div>
              </div>
              <div className="billing-summary-discount-section">
                <div className="billing-summary-discount">
                  <TranslatedString id="billing-summary.discount" />
                </div>
                <div className="billing-summary-discount-value">
                  {currency.toCustomerCurrency(discountAmount)}
                </div>
              </div>
              <div className="billing-summary-shipping-section">
                <div className="billing-summary-shipping">
                  <TranslatedString id="billing-summary.shipping" />
                </div>
                <div className="billing-summary-shipping-value">
                  {currency.toCustomerCurrency(shippingCostTotal)}
                </div>
              </div>
              <div className="billing-summary-tax-section">
                <div className="billing-summary-tax">
                  <TranslatedString id="billing-summary.tax" />
                </div>
                <div className="billing-summary-tax-value">
                  {currency.toCustomerCurrency(taxTotal)}
                </div>
              </div>
            </div>
            <div className="billing-summary-grand-total-section">
              <div className="billing-summary-grand-total">
                <TranslatedString id="billing-summary.total" />
              </div>
              <div className="billing-summary-grand-total-value">
                {currency.toCustomerCurrency(grandTotal)}
              </div>
            </div>
            <div className="billing-summary-payment-button-section">
              <div className="billing-summary-payment-button-container">
                <button
                  className="billing-summary-payment-button"
                  disabled={!isPaymentStepActive || isLoading || isPending}
                  form={formId}
                  id="checkout-payment-continue"
                  type="submit"
                >
                  Pay {currency.toCustomerCurrency(grandTotal)}
                </button>
              </div>
              <div className="billing-summary-privacy-container">
                <div className="billing-summary-privacy-label">By purchasing you agree to our</div>
                <div className="billing-summary-privacy-policy">
                  <a className="billing-summary-privacy-policy-link">Privacy & Terms Policy</a>
                </div>
              </div>
              <div className="billing-summary-policy-container">
                <div className="billing-summary-shipping-policy">Shipping Policy</div>
                <div className="billing-summary-return-policy">Return Policy</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export function mapToBillingSummaryProps({
  checkoutService,
  checkoutState,
}: CheckoutContextProps): BillingSummaryProps | null {
  const {
    data: { getCheckout },
    statuses: { isUpdatingCheckout },
  } = checkoutState;

  const checkout = getCheckout();

  if (!checkout) {
    return null;
  }

  const isLoading = isUpdatingCheckout();

  return {
    checkout,
    isLoading,
    updateCheckout: checkoutService.updateCheckout,
  };
}

export default withCurrency(
  withAnalytics(withLanguage(withCheckout(mapToBillingSummaryProps)(BillingSummary))),
);

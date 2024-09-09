import { CheckoutSelectors, CustomerRequestOptions, CustomError } from '@bigcommerce/checkout-sdk';
import { noop } from 'lodash';
import React, { FunctionComponent } from 'react';

import { TranslatedString } from '@bigcommerce/checkout/locale';
import { CheckoutContextProps } from '@bigcommerce/checkout/payment-integration-api';

import { withCheckout } from '../checkout';
import { isErrorWithType } from '../common/error';
// import { Button, ButtonSize, ButtonVariant } from '../ui/button';

import canSignOut, { isSupportedSignoutMethod } from './canSignOut';

import './CustomerInfo.scss';

export interface CustomerInfoProps {
  onSignOut?(event: CustomerSignOutEvent): void;
  onSignOutError?(error: CustomError): void;
}

export interface CustomerSignOutEvent {
  isCartEmpty: boolean;
}

interface WithCheckoutCustomerInfoProps {
  email: string;
  methodId: string;
  isSignedIn: boolean;
  isSigningOut: boolean;
  signOut(options?: CustomerRequestOptions): Promise<CheckoutSelectors>;
}

const CustomerInfo: FunctionComponent<CustomerInfoProps & WithCheckoutCustomerInfoProps> = ({
  email,
  methodId,
  isSignedIn,
  // isSigningOut,
  onSignOut = noop,
  onSignOutError = noop,
  signOut,
}) => {
  const handleSignOut: () => Promise<void> = async () => {
    try {
      if (isSupportedSignoutMethod(methodId)) {
        await signOut({ methodId });
        onSignOut({ isCartEmpty: false });
        window.location.reload();
      } else {
        await signOut();
        onSignOut({ isCartEmpty: false });
      }
    } catch (error) {
      if (isErrorWithType(error) && error.type === 'checkout_not_available') {
        onSignOut({ isCartEmpty: true });
      } else {
        onSignOutError(error);
      }
    }
  };

  return (
    <div className="customerView checkout-customer-info" data-test="checkout-customer-info">
      <div
        className="customerView-body optimizedCheckout-contentPrimary checkout-customer-info-email-container"
        data-test="customer-info"
      >
        <div className="checkout-customer-info-email-heading">Email Address</div>
        <div className="checkout-customer-info-email">{email}</div>
      </div>

      <div className="customerView-actions">
        {isSignedIn && (
          <div className="customerView-signout-message">
            <div
              className="customerView-signout-message-click-here"
              data-test="sign-out-link"
              onClick={handleSignOut}
            >
              <TranslatedString id="common.click_here" />
            </div>
            <div>
              <TranslatedString id="common.to_logout_to_use_a_different_email" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function mapToWithCheckoutCustomerInfoProps({
  checkoutService,
  checkoutState,
}: CheckoutContextProps): WithCheckoutCustomerInfoProps | null {
  const {
    data: { getBillingAddress, getCheckout, getCustomer },
    statuses: { isSigningOut },
  } = checkoutState;

  const billingAddress = getBillingAddress();
  const checkout = getCheckout();
  const customer = getCustomer();

  if (!billingAddress || !checkout || !customer) {
    return null;
  }

  const methodId =
    checkout.payments && checkout.payments.length === 1 ? checkout.payments[0].providerId : '';

  return {
    email: billingAddress.email || customer.email,
    methodId,
    isSignedIn: canSignOut(customer, checkout, methodId),
    isSigningOut: isSigningOut(),
    signOut: checkoutService.signOutCustomer,
  };
}

export default withCheckout(mapToWithCheckoutCustomerInfoProps)(CustomerInfo);

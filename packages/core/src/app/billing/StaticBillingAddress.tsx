import { Address, CheckoutPayment, FormField } from '@bigcommerce/checkout-sdk';
import { noop } from 'lodash';
import React, { FunctionComponent, memo } from 'react';

import { preventDefault } from '@bigcommerce/checkout/dom-utils';
import { TranslatedString } from '@bigcommerce/checkout/locale';
import { CheckoutContextProps } from '@bigcommerce/checkout/payment-integration-api';
import {
  isPayPalFastlaneAddress,
  PoweredByPayPalFastlaneLabel,
  usePayPalFastlaneAddress,
} from '@bigcommerce/checkout/paypal-fastlane-integration';

import { AddressType, StaticAddress } from '../address';
import { withCheckout } from '../checkout';
import CheckoutStepType from '../checkout/CheckoutStepType';
import { EMPTY_ARRAY } from '../common/utility';

import './StaticBillingAddress.scss';

export interface StaticBillingAddressProps {
  address: Address;
  showSameAsShippingLable: boolean;
  isEditable: boolean;
  onEdit: any;
  type: CheckoutStepType;
}

interface WithCheckoutStaticBillingAddressProps {
  fields: FormField[];
  payments?: CheckoutPayment[];
}

const StaticBillingAddress: FunctionComponent<
  StaticBillingAddressProps & WithCheckoutStaticBillingAddressProps
> = ({ address, payments = EMPTY_ARRAY, showSameAsShippingLable, isEditable, onEdit, type }) => {
  const { paypalFastlaneAddresses } = usePayPalFastlaneAddress();
  const showPayPalFastlaneLabel = isPayPalFastlaneAddress(address, paypalFastlaneAddresses);

  if (payments.find((payment) => payment.providerId === 'amazonpay')) {
    return (
      <p>
        <TranslatedString id="billing.billing_address_amazonpay" />
      </p>
    );
  }

  return (
    <>
      <div className="billing-address-summary-container">
        <div className="billing-address-summary-title">Billing Address</div>
        <div className="static-billing-address-container">
          <StaticAddress address={address} type={AddressType.Billing} />
          <div className="static-billing-address-label-container">
            {isEditable && (
              <div
                className="static-billing-address-change"
                onClick={preventDefault(isEditable && onEdit ? () => onEdit(type) : noop)}
              >
                Change
              </div>
            )}

            {showSameAsShippingLable && (
              <div className="static-billing-address-same">Same as shipping address</div>
            )}
          </div>
        </div>
      </div>

      {showPayPalFastlaneLabel && <PoweredByPayPalFastlaneLabel />}
    </>
  );
};

export function mapToStaticBillingAddressProps(
  { checkoutState }: CheckoutContextProps,
  { address }: StaticBillingAddressProps,
): WithCheckoutStaticBillingAddressProps | null {
  const {
    data: { getBillingAddressFields, getCheckout },
  } = checkoutState;

  const checkout = getCheckout();

  return {
    fields: getBillingAddressFields(address.countryCode),
    payments: checkout && checkout.payments,
  };
}

export default withCheckout(mapToStaticBillingAddressProps)(memo(StaticBillingAddress));

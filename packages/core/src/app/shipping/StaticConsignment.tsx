import { Cart, Consignment } from '@bigcommerce/checkout-sdk';
import React, { FunctionComponent, memo } from 'react';

import {
  isPayPalFastlaneAddress,
  PoweredByPayPalFastlaneLabel,
  usePayPalFastlaneAddress,
} from '@bigcommerce/checkout/paypal-fastlane-integration';

import { AddressType, StaticAddress } from '../address';

import { StaticShippingOption } from './shippingOption';
import './StaticConsignment.scss';
import StaticConsignmentItemList from './StaticConsignmentItemList';

interface StaticConsignmentProps {
  consignment: Consignment;
  cart: Cart;
  compactView?: boolean;
}

const StaticConsignment: FunctionComponent<StaticConsignmentProps> = ({
  consignment,
  cart,
  compactView,
}) => {
  const { paypalFastlaneAddresses } = usePayPalFastlaneAddress();
  const { shippingAddress: address, selectedShippingOption } = consignment;
  const showPayPalFastlaneAddressLabel = isPayPalFastlaneAddress(address, paypalFastlaneAddresses);

  return (
    <div className="staticConsignment">
      <div className="address-container">
        <div className="address-title">Shipping Address</div>
        <div className="static-consignment-address-container">
          <StaticAddress address={address} type={AddressType.Shipping} />
          <div className="static-consignment-address-change">Change</div>
        </div>
      </div>

      {showPayPalFastlaneAddressLabel && <PoweredByPayPalFastlaneLabel />}

      {!compactView && <StaticConsignmentItemList cart={cart} consignment={consignment} />}

      {selectedShippingOption && (
        <div>
          <div className="shippingOption shippingOption--alt shippingOption--selected">
            <div className="shippingOptionLabel">Shipping Method</div>
            <StaticShippingOption
              displayAdditionalInformation={false}
              method={selectedShippingOption}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(StaticConsignment);

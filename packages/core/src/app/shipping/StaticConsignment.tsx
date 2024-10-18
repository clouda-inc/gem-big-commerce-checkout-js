import { Cart, Consignment } from '@bigcommerce/checkout-sdk';
import { noop } from 'lodash';
import React, { FunctionComponent, memo } from 'react';

import { preventDefault } from '@bigcommerce/checkout/dom-utils';
import {
  isPayPalFastlaneAddress,
  PoweredByPayPalFastlaneLabel,
  usePayPalFastlaneAddress,
} from '@bigcommerce/checkout/paypal-fastlane-integration';

import { AddressType, StaticAddress } from '../address';

import { StaticShippingOption } from './shippingOption';
import StaticConsignmentItemList from './StaticConsignmentItemList';

import './StaticConsignment.scss';

interface StaticConsignmentProps {
  consignment: Consignment;
  cart: Cart;
  compactView?: boolean;
  isEditable: boolean;
  onEdit: any;
  type: any;
}

const StaticConsignment: FunctionComponent<StaticConsignmentProps> = ({
  consignment,
  cart,
  compactView,
  isEditable,
  onEdit,
  type,
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
          {isEditable && (
            <div
              className="static-consignment-address-change"
              onClick={preventDefault(isEditable && onEdit ? () => onEdit(type) : noop)}
            >
              Change
            </div>
          )}
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

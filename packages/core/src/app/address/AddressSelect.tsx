import { Address, CustomerAddress } from '@bigcommerce/checkout-sdk';
import React, { FunctionComponent, memo } from 'react';

import { preventDefault } from '@bigcommerce/checkout/dom-utils';
import { TranslatedString } from '@bigcommerce/checkout/locale';
import {
  PoweredByPayPalFastlaneLabel,
  usePayPalFastlaneAddress,
} from '@bigcommerce/checkout/paypal-fastlane-integration';

import AddressType from './AddressType';
import isEqualAddress from './isEqualAddress';
import StaticAddress from './StaticAddress';

import './AddressSelect.scss';

export interface AddressSelectProps {
  addresses: CustomerAddress[];
  selectedAddress?: Address;
  type: AddressType;
  onSelectAddress(address: Address): void;
  onUseNewAddress(currentAddress?: Address): void;
}

const AddressSelectMenu: FunctionComponent<AddressSelectProps> = ({
  addresses,
  onSelectAddress,
  onUseNewAddress,
  selectedAddress,
  type,
}) => (
  <div className="address-with-selector-container">
    <div>
      <div
        className="add-new-address"
        data-test="add-new-address"
        onClick={preventDefault(() => onUseNewAddress(selectedAddress))}
      >
        <TranslatedString id="address.enter_address_action" />
      </div>
    </div>
    <ul className="address-with-selector-list-container">
      {addresses.map((address) => (
        <div
          className="address-with-selector-container"
          data-test="address-select-option"
          key={address.id}
        >
          <div className="address-with-selector-container-inner">
            <div className="address-with-selector">
              <input
                checked={!!isEqualAddress(selectedAddress, address)}
                className="address-with-selector-input"
                onClick={preventDefault(() => onSelectAddress(address))}
                type="radio"
              />
            </div>
            <StaticAddress address={address} type={type} />
          </div>
        </div>
      ))}
    </ul>
  </div>
);

const AddressSelect = ({
  addresses,
  selectedAddress,
  type,
  onSelectAddress,
  onUseNewAddress,
}: AddressSelectProps) => {
  const { shouldShowPayPalFastlaneLabel } = usePayPalFastlaneAddress();

  const handleSelectAddress = (newAddress: Address) => {
    if (!isEqualAddress(selectedAddress, newAddress)) {
      onSelectAddress(newAddress);
    }
  };

  const handleUseNewAddress = () => {
    onUseNewAddress(selectedAddress);
  };

  return (
    <div className="form-field">
      <div className="dropdown--select">
        <AddressSelectMenu
          addresses={addresses}
          onSelectAddress={handleSelectAddress}
          onUseNewAddress={handleUseNewAddress}
          selectedAddress={selectedAddress}
          type={type}
        />
      </div>

      {shouldShowPayPalFastlaneLabel && <PoweredByPayPalFastlaneLabel />}
    </div>
  );
};

export default memo(AddressSelect);

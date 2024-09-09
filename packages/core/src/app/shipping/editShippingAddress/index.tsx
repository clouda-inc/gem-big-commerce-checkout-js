/* eslint-disable no-console */
import { CustomerAddress } from '@bigcommerce/checkout-sdk';
import React, { Component, ReactNode } from 'react';

export interface ShippingAddressEditFormProps {
  address: CustomerAddress;
  formId: string;
  updateAddress: (address: CustomerAddress) => void;
  onEditModalClose?: () => void;
}

export interface ShippingAddressEditFormState {
  editAddress: CustomerAddress;
}

class ShippingAddressEditForm extends Component<
  ShippingAddressEditFormProps,
  ShippingAddressEditFormState
> {
  constructor(props: ShippingAddressEditFormProps) {
    super(props);
    this.state = {
      editAddress: props.address,
    };
  }

  render(): ReactNode {
    const { address, formId, updateAddress } = this.props;
    const { editAddress } = this.state;

    console.log('address', address);
    // console.log('showEditAddressModal', showEditAddressModal);

    return (
      <div>
        <form
          id={formId}
          onSubmit={() => updateAddress(editAddress)}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <div>
            <input
              onChange={(e) => {
                this.setState({ editAddress: { ...editAddress, firstName: e.target.value } });
              }}
              type="text"
              value={editAddress?.firstName}
            />
          </div>
          <div>
            <input
              onChange={(e) => {
                this.setState({ editAddress: { ...editAddress, lastName: e.target.value } });
              }}
              type="text"
              value={editAddress?.lastName}
            />
          </div>
          <div>
            <input
              onChange={(e) => {
                this.setState({ editAddress: { ...editAddress, address1: e.target.value } });
              }}
              type="text"
              value={editAddress?.address1}
            />
          </div>
          <div>
            <input
              onChange={(e) => {
                this.setState({ editAddress: { ...editAddress, address2: e.target.value } });
              }}
              type="text"
              value={editAddress?.address2}
            />
          </div>
          <div>
            <input
              onChange={(e) => {
                this.setState({ editAddress: { ...editAddress, city: e.target.value } });
              }}
              type="text"
              value={editAddress?.city}
            />
          </div>
          <div>
            <input
              onChange={(e) => {
                this.setState({
                  editAddress: { ...editAddress, stateOrProvince: e.target.value },
                });
              }}
              type="text"
              value={editAddress?.stateOrProvince}
            />
          </div>
          <div>
            <input
              onChange={(e) => {
                this.setState({ editAddress: { ...editAddress, postalCode: e.target.value } });
              }}
              type="text"
              value={editAddress?.country}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default ShippingAddressEditForm;

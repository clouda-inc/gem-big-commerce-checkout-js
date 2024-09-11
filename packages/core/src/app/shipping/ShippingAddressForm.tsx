import {
  Address,
  Consignment,
  Country,
  CustomerAddress,
  FormField,
} from '@bigcommerce/checkout-sdk';
import React, { Component, ReactNode } from 'react';

import { TranslatedString } from '@bigcommerce/checkout/locale';
// import { Modal, ModalHeader } from '@bigcommerce/checkout/ui';

import {
  AddressForm,
  // AddressSelect,
  AddressType,
  isEqualAddress,
  isValidCustomerAddress,
  StaticAddress,
} from '../address';
import { connectFormik, ConnectFormikProps } from '../common/form';
import { Fieldset } from '../ui/form';
import { LoadingOverlay } from '../ui/loading';
// import { Modal } from '../ui/modal';

// import ShippingAddressEditForm from './editShippingAddress';
// import { getRandomName } from './editShippingAddress/util';
import { SingleShippingFormValues } from './SingleShippingForm';

import './ShippingAddressForm.scss';

export interface ShippingAddressFormProps {
  addresses: CustomerAddress[];
  address?: Address;
  consignments: Consignment[];
  countries?: Country[];
  countriesWithAutocomplete: string[];
  googleMapsApiKey?: string;
  isLoading: boolean;
  formFields: FormField[];
  shouldShowSaveAddress?: boolean;
  isFloatingLabelEnabled?: boolean;
  onUseNewAddress(currentAddress?: Address): void;
  onFieldChange(fieldName: string, value: string): void;
  onAddressSelect(address: Address): void;
  updateShippingAddress(address: Address, includeShippingOptions: boolean): void;
}

interface ShippingEditFormState {
  editAddress: CustomerAddress;
  showEditAddressModal: boolean;
}

const addressFieldName = 'shippingAddress';
const token = 'q64h3xndgjcrd3vn1iggj9iypp2tyzi';

class ShippingAddressForm extends Component<
  ShippingAddressFormProps & ConnectFormikProps<SingleShippingFormValues>,
  ShippingEditFormState
> {
  constructor(props: ShippingAddressFormProps & ConnectFormikProps<SingleShippingFormValues>) {
    super(props);
    this.state = {
      editAddress: {} as CustomerAddress,
      showEditAddressModal: false,
    };
  }

  render(): ReactNode {
    const {
      addresses,
      address: shippingAddress,
      onAddressSelect,
      onUseNewAddress,
      updateShippingAddress,
      shouldShowSaveAddress,
      countries,
      countriesWithAutocomplete,
      formFields,
      isLoading,
      googleMapsApiKey,
      isFloatingLabelEnabled,
      formik: {
        values: { shippingAddress: formAddress },
      },
    } = this.props;

    const { editAddress, showEditAddressModal } = this.state;

    const hasAddresses = addresses && addresses.length > 0;
    const hasValidCustomerAddress = isValidCustomerAddress(shippingAddress, addresses, formFields);

    const handleUseNewAddress = () => {
      onUseNewAddress(shippingAddress);
    };

    const handleSelectAddress = (newAddress: Address) => {
      if (!isEqualAddress(shippingAddress, newAddress)) {
        onAddressSelect(newAddress);
      }
    };

    const handleEditAddress = (address: CustomerAddress) => {
      this.setState({ editAddress: address, showEditAddressModal: true });
    };

    const handleCloseEditAddressModal = () => {
      this.setState({ showEditAddressModal: false });
    };

    const onSubmit = (e: any) => {
      e.preventDefault();

      const editedaddress = {
        id: editAddress?.id,
        first_name: editAddress?.firstName,
        last_name: editAddress?.lastName,
        address1: editAddress?.address1,
        address2: editAddress?.address2,
        city: editAddress?.city,
        state_or_province: editAddress?.stateOrProvince,
        postal_code: editAddress?.postalCode,
        country_code: editAddress?.countryCode,
        phone: editAddress?.phone,
        address_type: editAddress?.type,
      };

      fetch('https://api.bigcommerce.com/stores/qxtizk9ym4/v3/customers/addresses', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-Auth-Token': token,
        },
        body: JSON.stringify([{ ...editedaddress }]),
      })
        .then((r) => r.json())
        .then((r) => {
          handleCloseEditAddressModal();
          updateShippingAddress(
            {
              firstName: r.data[0].first_name,
              lastName: r.data[0].last_name,
              address1: r.data[0].address1,
              address2: r.data[0].address2,
              city: r.data[0].city,
              stateOrProvince: r.data[0].state_or_province,
              postalCode: r.data[0].postal_code,
              countryCode: r.data[0].country_code,
              phone: r.data[0].phone,
              country: r.data[0].country,
              company: r.data[0].company,
              stateOrProvinceCode: r.data[0].state_or_province_code,
              customFields: [],
            },
            true,
          );
          // handleSelectAddress({
          //   firstName: r.data[0].first_name,
          //   lastName: r.data[0].last_name,
          //   address1: r.data[0].address1,
          //   address2: r.data[0].address2,
          //   city: r.data[0].city,
          //   stateOrProvince: r.data[0].state_or_province,
          //   postalCode: r.data[0].postal_code,
          //   countryCode: r.data[0].country_code,
          //   phone: r.data[0].phone,
          //   country: r.data[0].country,
          //   company: r.data[0].company,
          //   stateOrProvinceCode: r.data[0].state_or_province_code,
          //   customFields: [],
          // });
          // window.location.reload();
        })
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.error('Error : ', e);
        });
    };

    return (
      <Fieldset id="checkoutShippingAddress">
        {!showEditAddressModal && hasAddresses && (
          <Fieldset id="shippingAddresses">
            <LoadingOverlay isLoading={isLoading}>
              <div className="shipping-address-list-wrapper">
                <div
                  className="add-new-address"
                  data-test="add-new-address"
                  onClick={handleUseNewAddress}
                >
                  <TranslatedString id="address.enter_address_action" />
                </div>
                <div className="shipping-address-list-container">
                  {addresses &&
                    addresses?.map((address, index: number) => {
                      return (
                        <div className="shipping-address" key={index}>
                          <div className="shipping-address-with-selector">
                            <div>
                              <input
                                checked={!!isEqualAddress(shippingAddress, address)}
                                className="shipping-address-with-selector-input"
                                onClick={() => handleSelectAddress(address)}
                                type="radio"
                              />
                            </div>
                            <StaticAddress address={address} type={AddressType.Shipping} />
                          </div>
                          <button
                            className="shipping-address-edit-button"
                            onClick={(event) => {
                              event.preventDefault();
                              // handleUpdateCustomerAddress(address);
                              handleEditAddress(address);
                            }}
                          >
                            Edit
                          </button>
                        </div>
                      );
                    })}
                </div>
              </div>
            </LoadingOverlay>
          </Fieldset>
        )}
        {!hasValidCustomerAddress && (
          <LoadingOverlay isLoading={isLoading} unmountContentWhenLoading>
            <AddressForm
              countries={countries}
              countriesWithAutocomplete={countriesWithAutocomplete}
              countryCode={formAddress && formAddress.countryCode}
              fieldName={addressFieldName}
              formFields={formFields}
              googleMapsApiKey={googleMapsApiKey}
              isFloatingLabelEnabled={isFloatingLabelEnabled}
              onAutocompleteToggle={this.handleAutocompleteToggle}
              onChange={this.handleChange}
              setFieldValue={this.setFieldValue}
              shouldShowSaveAddress={shouldShowSaveAddress}
            />
          </LoadingOverlay>
        )}
        {showEditAddressModal && (
          <div className="edit-shipping-address-form">
            <div className="edit-shipping-address-title">Edit Shipping Address</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.875rem' }}>
              <div className="form-field-name-container">
                <div className="form-field-first-name form-field">
                  <input
                    className="form-field-first-name form-field-input"
                    id="firstName"
                    name="firstName"
                    onChange={(e) => {
                      this.setState({ editAddress: { ...editAddress, firstName: e.target.value } });
                    }}
                    type="text"
                    value={editAddress?.firstName}
                  />
                </div>
                <div className="form-field-last-name form-field">
                  <input
                    className="form-field-last-name form-field-input"
                    id="lastName"
                    name="lastName"
                    onChange={(e) => {
                      this.setState({ editAddress: { ...editAddress, lastName: e.target.value } });
                    }}
                    type="text"
                    value={editAddress?.lastName}
                  />
                </div>
              </div>
              <div className="form-field-address1 form-field">
                <input
                  className="form-field-address1 form-field-input"
                  id="address1"
                  name="address1"
                  onChange={(e) => {
                    this.setState({ editAddress: { ...editAddress, address1: e.target.value } });
                  }}
                  type="text"
                  value={editAddress?.address1}
                />
              </div>
              <div className="form-field-address2 form-field">
                <input
                  className="form-field-address2 form-field-input"
                  id="address2"
                  name="address2"
                  onChange={(e) => {
                    this.setState({ editAddress: { ...editAddress, address2: e.target.value } });
                  }}
                  type="text"
                  value={editAddress?.address2}
                />
              </div>
              <div className="form-field-country form-field">
                <input
                  className="form-field-country form-field-input"
                  id="country"
                  name="country"
                  onChange={(e) => {
                    this.setState({ editAddress: { ...editAddress, country: e.target.value } });
                  }}
                  type="text"
                  value={editAddress?.country}
                />
              </div>
              <div className="form-field-stateOrProvince-city-container">
                <div className="form-field-stateOrProvince form-field">
                  <input
                    className="form-field-stateOrProvince form-field-input"
                    id="stateOrProvince"
                    name="stateOrProvince"
                    onChange={(e) => {
                      this.setState({
                        editAddress: { ...editAddress, stateOrProvince: e.target.value },
                      });
                    }}
                    type="text"
                    value={editAddress?.stateOrProvince}
                  />
                </div>
                <div className="form-field-city form-field">
                  <input
                    className="form-field-city form-field-input"
                    id="city"
                    name="city"
                    onChange={(e) => {
                      this.setState({
                        editAddress: { ...editAddress, city: e.target.value },
                      });
                    }}
                    type="text"
                    value={editAddress.city}
                  />
                </div>
              </div>
              <div className="form-field-postalCode-phone-container">
                <div className="form-field-postalCode form-field">
                  <input
                    className="form-field-postalCode form-field-input"
                    id="postalCode"
                    name="postalCode"
                    onChange={(e) => {
                      this.setState({
                        editAddress: { ...editAddress, postalCode: e.target.value },
                      });
                    }}
                    type="text"
                    value={editAddress?.postalCode}
                  />
                </div>
                <div className="form-field-phone form-field">
                  <input
                    className="form-field-phone form-field-input"
                    id="phone"
                    name="phone"
                    onChange={(e) => {
                      this.setState({ editAddress: { ...editAddress, phone: e.target.value } });
                    }}
                    type="text"
                    value={editAddress.phone}
                  />
                </div>
              </div>
              <div className="form-field-saveAddress-button">
                <button
                  className="edit-shipping-address-cancel"
                  onClick={handleCloseEditAddressModal}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className="edit-shipping-address-submit"
                  onClick={(e) => onSubmit(e)}
                  type="submit"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </Fieldset>
    );
  }

  private setFieldValue: (fieldName: string, fieldValue: string) => void = (
    fieldName,
    fieldValue,
  ) => {
    const {
      formik: { setFieldValue },
      formFields,
    } = this.props;

    const customFormFieldNames = formFields
      .filter((field) => field.custom)
      .map((field) => field.name);

    const formFieldName = customFormFieldNames.includes(fieldName)
      ? `customFields.${fieldName}`
      : fieldName;

    setFieldValue(`${addressFieldName}.${formFieldName}`, fieldValue);
  };

  private handleChange: (fieldName: string, value: string) => void = (fieldName, value) => {
    const { onFieldChange } = this.props;

    onFieldChange(fieldName, value);
  };

  private handleAutocompleteToggle: (state: { inputValue: string; isOpen: boolean }) => void = ({
    isOpen,
    inputValue,
  }) => {
    const { onFieldChange } = this.props;

    if (!isOpen) {
      onFieldChange('address1', inputValue);
    }
  };
}

export default connectFormik(ShippingAddressForm);

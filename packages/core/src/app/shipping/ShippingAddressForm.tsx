/* eslint-disable no-console */
import {
  Address,
  Consignment,
  Country,
  CustomerAddress,
  FormField,
} from '@bigcommerce/checkout-sdk';
import React, { Component, ReactNode } from 'react';

import { TranslatedString } from '@bigcommerce/checkout/locale';

import { AddressType, isEqualAddress, isValidCustomerAddress, StaticAddress } from '../address';
import { connectFormik, ConnectFormikProps } from '../common/form';
import { InputField } from '../common/input';
import { Fieldset } from '../ui/form';
import { LoadingOverlay } from '../ui/loading';

import { updateCustomerAddress } from './querry';
import shiftGivenAddressToTop from './shiftGivenAddressToTop';
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
  createCustomerAddress: any;
  isGuest: boolean;
}

interface NewStateAddressError {
  field: string;
  error: boolean;
}

interface ShippingEditFormState {
  editAddress: CustomerAddress;
  showEditAddressModal: boolean;
  showAddNewAddress: boolean;
  newStateAddress: CustomerAddress;
  saveNewAddressToCustomerProfile: boolean;
  newStateAddressError: NewStateAddressError;
  customerAddressList: CustomerAddress[];
}

// const token = 'q64h3xndgjcrd3vn1iggj9iypp2tyzi';

class ShippingAddressForm extends Component<
  ShippingAddressFormProps & ConnectFormikProps<SingleShippingFormValues>,
  ShippingEditFormState
> {
  constructor(props: ShippingAddressFormProps & ConnectFormikProps<SingleShippingFormValues>) {
    super(props);
    this.state = {
      editAddress: {} as CustomerAddress,
      showEditAddressModal: false,
      showAddNewAddress: false,
      newStateAddress: {} as CustomerAddress,
      saveNewAddressToCustomerProfile: false,
      newStateAddressError: {} as NewStateAddressError,
      customerAddressList: [] as CustomerAddress[],
    };
  }

  componentDidMount(): void {
    const { addresses, address: shippingAddress, formFields } = this.props;

    this.setState({
      customerAddressList: [...addresses],
    });

    this.setState({
      showAddNewAddress: !isValidCustomerAddress(shippingAddress, addresses, formFields),
    });

    this.setState({
      newStateAddress: {
        ...this.state.newStateAddress,
        countryCode: (this.props.countries ?? []).find((c) => c)?.code ?? 'US',
        stateOrProvinceCode:
          this.props.countries?.find((c) => c)?.subdivisions?.find((s) => s)?.code ?? 'AL',
      },
    });

    if (this.props.addresses.length === 0) {
      this.setState({
        newStateAddress: {
          ...(shippingAddress as CustomerAddress),
        },
      });
    }
  }

  render(): ReactNode {
    const {
      address: shippingAddress,
      onAddressSelect,
      onUseNewAddress,
      updateShippingAddress,
      countries,
      isLoading,
      createCustomerAddress,
      isGuest,
      // googleMapsApiKey,
    } = this.props;

    const { editAddress, showEditAddressModal, customerAddressList } = this.state;

    const hasAddresses = customerAddressList && customerAddressList.length > 0;

    const handleUseNewAddress = () => {
      onUseNewAddress(shippingAddress);
      this.setState({ showAddNewAddress: true });
      this.setState({
        newStateAddress: {
          countryCode: countries?.find((country) => country.code === 'US')?.code ?? 'US',
          stateOrProvinceCode: 'AL',
        } as CustomerAddress,
      });
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

      const variable = {
        addressEntityId: editAddress?.id,
        address1: editAddress?.address1,
        address2: editAddress?.address2,
        city: editAddress?.city,
        countryCode: editAddress?.countryCode,
        firstName: editAddress?.firstName,
        lastName: editAddress?.lastName,
        phone: editAddress?.phone,
        postalCode: editAddress?.postalCode,
        stateOrProvince: editAddress?.stateOrProvince,
      };

      fetch('/graphql', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJjaWQiOlsxXSwiY29ycyI6WyJodHRwczovL2FwaS5iaWdjb21tZXJjZS5jb20iLCJodHRwczovL2NoZWNrb3V0Lmx1Y2QuYXJ0Il0sImVhdCI6MjE0NzQ4MzY0NywiaWF0IjoxNzI4NDcwNDg3LCJpc3MiOiJCQyIsInNpZCI6MTAwMjg3MjY5Mywic3ViIjoibWxuZ2hybWFyeHZsaXY0MzUwMHJ3NmI3b2FudGI0MyIsInN1Yl90eXBlIjoyLCJ0b2tlbl90eXBlIjoxfQ.Y5jjaoHnIhLL_wscLd4BP5Qw0CyiPGtJqbrwHYXcDFJxX5mNamdeJNLlAUVeJhujHF3urxsVJz3vV5AEk-40Rg',
          Origin: 'https://checkout.lucd.art',
        },
        body: JSON.stringify({
          query: updateCustomerAddress,
          variables: variable,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          const updateResult = result?.data?.customer?.updateCustomerAddress?.address;

          handleCloseEditAddressModal();
          updateShippingAddress(
            {
              firstName: updateResult.firstName,
              lastName: updateResult.lastName,
              address1: updateResult.address1,
              address2: updateResult.address2,
              city: updateResult.city,
              stateOrProvince: updateResult.stateOrProvince,
              postalCode: updateResult.postalCode,
              countryCode: updateResult.countryCode,
              phone: updateResult.phone,
              country: updateResult.country,
              company: updateResult.company,
              stateOrProvinceCode: updateResult.stateOrProvinceCode,
              customFields: [],
            },
            true,
          );

          const tt = [
            ...(this.state.customerAddressList ?? []).filter(
              (address) => address?.id !== editAddress?.id,
            ),
            { ...updateResult, id: updateResult?.entityId },
          ];

          console.log('tt :: ', tt);

          this.setState({
            customerAddressList: tt,
          });

          console.log('this.props.addresses : ', this.props.addresses);
        })
        .catch((error) => console.error(error));
    };

    const handleCreateNewAddress = (e: any) => {
      e.preventDefault();

      const validFirstName = this.state.newStateAddress?.firstName;
      const validLastName = this.state.newStateAddress?.lastName;
      const validAddress1 = this.state.newStateAddress?.address1;
      const validCity = this.state.newStateAddress?.city;
      const validStateOrProvince = this.state.newStateAddress?.stateOrProvinceCode;
      const validPostalCode = this.state.newStateAddress?.postalCode;
      const validCountryCode = this.state.newStateAddress?.countryCode;
      const validPhone = this.state.newStateAddress?.phone;

      if (!validFirstName) {
        this.setState({ newStateAddressError: { error: true, field: 'firstName' } });

        return;
      }

      if (!validLastName) {
        this.setState({ newStateAddressError: { error: true, field: 'lastName' } });

        return;
      }

      if (!validAddress1) {
        this.setState({ newStateAddressError: { error: true, field: 'address1' } });

        return;
      }

      if (!validCity) {
        this.setState({ newStateAddressError: { error: true, field: 'city' } });

        return;
      }

      if (!validStateOrProvince) {
        this.setState({ newStateAddressError: { error: true, field: 'stateOrProvince' } });

        return;
      }

      if (!validPostalCode) {
        this.setState({ newStateAddressError: { error: true, field: 'postalCode' } });

        return;
      }

      if (!validCountryCode) {
        this.setState({ newStateAddressError: { error: true, field: 'postalCode' } });

        return 0;
      }

      if (!validPhone) {
        this.setState({ newStateAddressError: { error: true, field: 'phone' } });
      }

      if (this.state.saveNewAddressToCustomerProfile) {
        createCustomerAddress(this.state.newStateAddress);
      }

      onAddressSelect(this.state.newStateAddress);
      this.setState({ showAddNewAddress: false });
    };

    return (
      <Fieldset id="checkoutShippingAddress">
        {!showEditAddressModal && hasAddresses && !this.state.showAddNewAddress && (
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
                  {this.state.customerAddressList &&
                    shiftGivenAddressToTop<CustomerAddress>(
                      this.state.customerAddressList,
                      shippingAddress as CustomerAddress,
                    )?.map((address, index: number) => {
                      return (
                        <div className="shipping-address" key={index}>
                          <div className="shipping-address-with-selector">
                            <div>
                              <input
                                checked={!!isEqualAddress(shippingAddress, address)}
                                className="shipping-address-with-selector-input"
                                onChange={() => handleSelectAddress(address)}
                                type="radio"
                              />
                            </div>
                            <StaticAddress address={address} type={AddressType.Shipping} />
                          </div>
                          <button
                            className="shipping-address-edit-button"
                            onClick={(event) => {
                              event.preventDefault();
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
        {showEditAddressModal && !this.state.showAddNewAddress && (
          <div className="edit-shipping-address-form">
            <div className="edit-shipping-address-title">Edit Shipping Address</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.875rem' }}>
              <div className="form-field-name-container">
                <div className="form-field-first-name form-field">
                  <InputField
                    id="firstName"
                    name="firstName"
                    onChange={(e: { target: { value: any } }) => {
                      this.setState({ editAddress: { ...editAddress, firstName: e.target.value } });
                    }}
                    title="First Name"
                    value={editAddress?.firstName}
                  />
                </div>
                <div className="form-field-last-name form-field">
                  <InputField
                    id="lastName"
                    name="lastName"
                    onChange={(e: { target: { value: any } }) => {
                      this.setState({ editAddress: { ...editAddress, lastName: e.target.value } });
                    }}
                    title="Last Name"
                    value={editAddress?.lastName}
                  />
                </div>
              </div>
              <div className="form-field-address1 form-field">
                <InputField
                  id="address1"
                  name="address1"
                  onChange={(e: { target: { value: any } }) => {
                    this.setState({ editAddress: { ...editAddress, address1: e.target.value } });
                  }}
                  title="Address 1"
                  value={editAddress?.address1}
                />
              </div>
              <div className="form-field-address2 form-field">
                <InputField
                  id="address2"
                  name="address2"
                  onChange={(e: { target: { value: any } }) => {
                    this.setState({ editAddress: { ...editAddress, address2: e.target.value } });
                  }}
                  title="Address 2"
                  value={editAddress?.address2}
                />
              </div>
              <div className="form-field-country form-field">
                {this.props.countries && this.props.countries?.length > 0 ? (
                  <div>
                    <select
                      className="form-field-country form-field-input"
                      id="country"
                      name="country"
                      onChange={(e) => {
                        this.setState({
                          editAddress: { ...this.state.editAddress, countryCode: e.target.value },
                        });
                      }}
                      value={this.state.editAddress?.countryCode}
                    >
                      {this.props.countries?.map((country) => {
                        return (
                          <option
                            className="country-selector-option"
                            key={country?.code}
                            value={country?.code}
                          >
                            {country?.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                ) : (
                  <div>
                    <InputField
                      id="country"
                      name="country"
                      onChange={(e: { target: { value: any } }) => {
                        this.setState({ editAddress: { ...editAddress, country: e.target.value } });
                      }}
                      title="Country"
                      value={editAddress?.country}
                    />
                  </div>
                )}
              </div>
              <div className="form-field-stateOrProvince-city-container">
                <div className="form-field-stateOrProvince form-field">
                  {this.props.countries &&
                  (
                    this.props.countries.find(
                      (country) => country?.code === this.state.editAddress?.countryCode,
                    )?.subdivisions ?? []
                  )?.length > 0 ? (
                    <div>
                      <select
                        className="form-field-stateOrProvince form-field-input"
                        id="stateOrProvince"
                        name="stateOrProvince"
                        onChange={(e) => {
                          this.setState({
                            editAddress: {
                              ...this.state.editAddress,
                              stateOrProvince: e.target.value,
                            },
                          });
                        }}
                        value={
                          (
                            this.props.countries.find(
                              (country) => country?.code === this.state.editAddress?.countryCode,
                            )?.subdivisions ?? []
                          ).find(
                            (stateOrProvince) =>
                              stateOrProvince?.code === editAddress?.stateOrProvince,
                          )?.code
                        }
                      >
                        {(
                          this.props.countries.find(
                            (country) => country?.code === this.state.editAddress?.countryCode,
                          )?.subdivisions ?? []
                        ).map((stateOrProvince) => {
                          return (
                            <option
                              className="stateOrProvince-selector-option"
                              key={stateOrProvince?.code}
                              value={stateOrProvince?.code}
                            >
                              {stateOrProvince?.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  ) : (
                    <div>
                      <InputField
                        id="stateOrProvince"
                        name="stateOrProvince"
                        onChange={(e: { target: { value: any } }) => {
                          this.setState({
                            editAddress: { ...editAddress, stateOrProvince: e.target.value },
                          });
                        }}
                        title="State"
                        value={editAddress?.stateOrProvince}
                      />
                    </div>
                  )}
                </div>
                <div className="form-field-city form-field">
                  <InputField
                    id="city"
                    name="city"
                    onChange={(e: { target: { value: any } }) => {
                      this.setState({
                        editAddress: { ...editAddress, city: e.target.value },
                      });
                    }}
                    title="City"
                    value={editAddress?.city}
                  />
                </div>
              </div>
              <div className="form-field-postalCode-phone-container">
                <div className="form-field-postalCode form-field">
                  <InputField
                    id="postalCode"
                    name="postalCode"
                    onChange={(e: { target: { value: any } }) => {
                      this.setState({
                        editAddress: { ...editAddress, postalCode: e.target.value },
                      });
                    }}
                    title="Postal Code"
                    value={editAddress?.postalCode}
                  />
                </div>
                <div className="form-field-phone form-field">
                  <InputField
                    id="phone"
                    name="phone"
                    onChange={(e: { target: { value: any } }) => {
                      this.setState({ editAddress: { ...editAddress, phone: e.target.value } });
                    }}
                    title="Phone"
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
        {this.state.showAddNewAddress && (
          <LoadingOverlay isLoading={isLoading} unmountContentWhenLoading>
            <div className="new-shipping-address-form">
              <div
                className="add-new-address"
                data-test="add-new-address"
                onClick={handleUseNewAddress}
              >
                <TranslatedString id="address.enter_address_action" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.875rem' }}>
                <div className="form-field-name-container">
                  <div className="form-field-first-name form-field">
                    <InputField
                      id="firstName"
                      name="firstName"
                      onChange={(e: { target: { value: any } }) => {
                        if (
                          this.state.newStateAddressError?.field === 'firstName' &&
                          this.state.newStateAddressError?.error === true
                        ) {
                          this.setState({ newStateAddressError: { field: '', error: false } });
                        }

                        this.setState({
                          newStateAddress: {
                            ...this.state.newStateAddress,
                            firstName: e.target.value,
                          },
                        });
                      }}
                      pattern={`\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+`}
                      title="First name"
                      value={this.state.newStateAddress?.firstName}
                    />
                    {this.state.newStateAddressError?.field === 'firstName' &&
                      this.state.newStateAddressError.error && (
                        <div className="form-field-error-msg">First name is a Requied field</div>
                      )}
                  </div>
                  <div className="form-field-last-name form-field">
                    <InputField
                      id="lastName"
                      name="lastName"
                      onChange={(e: { target: { value: any } }) => {
                        if (
                          this.state.newStateAddressError?.field === 'lastName' &&
                          this.state.newStateAddressError?.error === true
                        ) {
                          this.setState({ newStateAddressError: { field: '', error: false } });
                        }

                        this.setState({
                          newStateAddress: {
                            ...this.state.newStateAddress,
                            lastName: e.target.value,
                          },
                        });
                      }}
                      title="Last name"
                      value={this.state.newStateAddress?.lastName}
                    />
                    {this.state.newStateAddressError?.field === 'lastName' &&
                      this.state.newStateAddressError.error && (
                        <div className="form-field-error-msg">Last name is a Requied field</div>
                      )}
                  </div>
                </div>
                <div className="form-field-address1 form-field">
                  <InputField
                    id="address1"
                    name="address1"
                    onChange={(e: { target: { value: any } }) => {
                      if (
                        this.state.newStateAddressError?.field === 'address1' &&
                        this.state.newStateAddressError?.error === true
                      ) {
                        this.setState({ newStateAddressError: { field: '', error: false } });
                      }

                      this.setState({
                        newStateAddress: {
                          ...this.state.newStateAddress,
                          address1: e.target.value,
                        },
                      });
                    }}
                    title="Address line 1"
                    value={this.state.newStateAddress?.address1}
                  />
                  {this.state.newStateAddressError?.field === 'address1' &&
                    this.state.newStateAddressError.error && (
                      <div className="form-field-error-msg">Address 1 is a Requied field</div>
                    )}
                </div>
                <div className="form-field-address2 form-field">
                  <InputField
                    id="address2"
                    name="address2"
                    onChange={(e: { target: { value: any } }) => {
                      this.setState({
                        newStateAddress: {
                          ...this.state.newStateAddress,
                          address2: e.target.value,
                        },
                      });
                    }}
                    title="Address line 2"
                    value={this.state.newStateAddress?.address2}
                  />
                </div>
                <div className="form-field-country form-field">
                  {countries && countries?.length > 0 && (
                    <select
                      className="form-field-country form-field-input"
                      id="country"
                      name="country"
                      onChange={(e) => {
                        if (
                          this.state.newStateAddressError?.field === 'country' &&
                          this.state.newStateAddressError?.error === true
                        ) {
                          this.setState({ newStateAddressError: { field: '', error: false } });
                        }

                        this.setState({
                          newStateAddress: {
                            ...this.state.newStateAddress,
                            countryCode: e.target.value,
                          },
                        });
                      }}
                      value={this.state.newStateAddress?.countryCode}
                    >
                      {countries.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  )}
                  {countries && countries?.length === 0 && (
                    <InputField
                      id="country"
                      name="country"
                      onChange={(e: { target: { value: any } }) => {
                        if (
                          this.state.newStateAddressError?.field === 'country' &&
                          this.state.newStateAddressError?.error === true
                        ) {
                          this.setState({ newStateAddressError: { field: '', error: false } });
                        }

                        this.setState({
                          newStateAddress: {
                            ...this.state.newStateAddress,
                            country: e.target.value,
                          },
                        });
                      }}
                      title="Country"
                      value={this.state.newStateAddress?.country}
                    />
                  )}
                  {this.state.newStateAddressError?.field === 'country' &&
                    this.state.newStateAddressError.error && (
                      <div className="form-field-error-msg">Country is a Requied field</div>
                    )}
                </div>
                <div className="form-field-stateOrProvince-city-container">
                  <div className="form-field-stateOrProvince form-field">
                    {countries &&
                      (
                        countries?.find((c) => c.code === this.state.newStateAddress?.countryCode)
                          ?.subdivisions ?? []
                      )?.length > 0 && (
                        <select
                          className="form-field-stateOrProvince form-field-input"
                          id="stateOrProvince"
                          name="stateOrProvince"
                          onChange={(e) => {
                            if (
                              this.state.newStateAddressError?.field === 'stateOrProvince' &&
                              this.state.newStateAddressError?.error === true
                            ) {
                              this.setState({ newStateAddressError: { field: '', error: false } });
                            }

                            this.setState({
                              newStateAddress: {
                                ...this.state.newStateAddress,
                                stateOrProvinceCode: e.target.value,
                              },
                            });
                          }}
                          value={this.state.newStateAddress?.stateOrProvinceCode}
                        >
                          {(
                            countries?.find(
                              (c) => c.code === this.state.newStateAddress?.countryCode,
                            )?.subdivisions ?? []
                          ).map((state) => (
                            <option key={state.code} value={state.code}>
                              {state.name}
                            </option>
                          ))}
                        </select>
                      )}
                    {!countries ||
                      (countries?.find((c) => c.code === this.state.newStateAddress?.countryCode)
                        ?.subdivisions?.length === 0 && (
                        <InputField
                          id="stateOrProvince"
                          name="stateOrProvince"
                          onChange={(e: { target: { value: any } }) => {
                            if (
                              this.state.newStateAddressError?.field === 'stateOrProvince' &&
                              this.state.newStateAddressError?.error === true
                            ) {
                              this.setState({ newStateAddressError: { field: '', error: false } });
                            }

                            this.setState({
                              newStateAddress: {
                                ...this.state.newStateAddress,
                                stateOrProvince: e.target.value,
                              },
                            });
                          }}
                          title="State or province"
                          value={this.state.newStateAddress?.stateOrProvince}
                        />
                      ))}
                    {this.state.newStateAddressError?.field === 'stateOrProvince' &&
                      this.state.newStateAddressError.error && (
                        <div className="form-field-error-msg">
                          State or province is a Requied field
                        </div>
                      )}
                  </div>
                  <div className="form-field-city form-field">
                    <InputField
                      id="city"
                      name="city"
                      onChange={(e: { target: { value: any } }) => {
                        if (
                          this.state.newStateAddressError?.field === 'city' &&
                          this.state.newStateAddressError?.error === true
                        ) {
                          this.setState({ newStateAddressError: { field: '', error: false } });
                        }

                        this.setState({
                          newStateAddress: { ...this.state.newStateAddress, city: e.target.value },
                        });
                      }}
                      title="City"
                      value={this.state.newStateAddress?.city}
                    />
                    {this.state.newStateAddressError?.field === 'city' &&
                      this.state.newStateAddressError.error && (
                        <div className="form-field-error-msg">City is a Requied field</div>
                      )}
                  </div>
                </div>
                <div className="form-field-postalCode-phone-container">
                  <div className="form-field-postalCode form-field">
                    <InputField
                      id="postalCode"
                      name="postalCode"
                      onChange={(e: { target: { value: any } }) => {
                        const postalCode = e.target.value;

                        this.setState({
                          newStateAddress: {
                            ...this.state.newStateAddress,
                            postalCode,
                          },
                        });

                        if (
                          this.state.newStateAddressError?.field === 'postalCode' &&
                          this.state.newStateAddressError?.error === true
                        ) {
                          this.setState({ newStateAddressError: { field: '', error: false } });
                        }
                      }}
                      title="Postal Code"
                      value={this.state.newStateAddress?.postalCode}
                    />
                    {this.state.newStateAddressError?.field === 'postalCode' &&
                      this.state.newStateAddressError.error && (
                        <div className="form-field-error-msg">Postal Code is a Requied field</div>
                      )}
                    {this.state.newStateAddressError?.field === 'postalCodeValidation' &&
                      this.state.newStateAddressError.error && (
                        <div className="form-field-error-msg">Invalid Postal Code</div>
                      )}
                  </div>
                  <div className="form-field-phone form-field">
                    <InputField
                      id="phone"
                      name="phone"
                      onChange={(e: { target: { value: any } }) => {
                        const phoneNumnerTemp = e.target.value;

                        this.setState({
                          newStateAddress: { ...this.state.newStateAddress, phone: e.target.value },
                        });

                        const pattern = new RegExp('^[+]{0,1}[0-9]{1,4}[0-9]*$');

                        if (pattern.test(phoneNumnerTemp)) {
                          this.setState({ newStateAddressError: { field: 'phone', error: false } });
                        } else {
                          this.setState({ newStateAddressError: { field: 'phone', error: true } });
                        }
                      }}
                      title="Phone"
                      value={this.state.newStateAddress?.phone}
                    />
                    {this.state.newStateAddressError?.field === 'phone' &&
                      this.state.newStateAddressError.error && (
                        <div className="form-field-error-msg">Phone Number is a invalid</div>
                      )}
                  </div>
                </div>
                {!isGuest && (
                  <div className="form-field-saveAddress">
                    <input
                      checked={this.state.saveNewAddressToCustomerProfile}
                      className="form-field-saveAddress-input"
                      onChange={(e) =>
                        this.setState({ saveNewAddressToCustomerProfile: e.target.checked })
                      }
                      type="checkbox"
                    />
                    <div className="form-field-saveAddress-label">Save Address for later use</div>
                  </div>
                )}
                <div className="form-field-saveAddress-button">
                  {!this.props.isGuest && (
                    <div
                      className="add-new-shipping-address-cancel"
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState({ showAddNewAddress: false });
                      }}
                    >
                      Cancel
                    </div>
                  )}
                  <button
                    className="edit-shipping-address-submit"
                    onClick={(e) => handleCreateNewAddress(e)}
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </LoadingOverlay>
        )}
        {!this.state.showAddNewAddress && !showEditAddressModal && !hasAddresses && (
          <div>
            <div
              className="add-new-address"
              data-test="add-new-address"
              onClick={handleUseNewAddress}
              style={{ paddingBottom: '1rem' }}
            >
              <TranslatedString id="address.enter_address_action" />
            </div>
            <div className="shipping-address-show-when-no-address">
              <StaticAddress address={shippingAddress as Address} />
            </div>
          </div>
        )}
      </Fieldset>
    );
  }
}

export default connectFormik(ShippingAddressForm);

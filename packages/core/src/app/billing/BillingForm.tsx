import {
  Address,
  CheckoutSelectors,
  Country,
  Customer,
  FormField,
} from '@bigcommerce/checkout-sdk';
import { FormikProps, withFormik } from 'formik';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import { lazy } from 'yup';

import { TranslatedString, withLanguage, WithLanguageProps } from '@bigcommerce/checkout/locale';
import { usePayPalFastlaneAddress } from '@bigcommerce/checkout/paypal-fastlane-integration';
import { AddressFormSkeleton } from '@bigcommerce/checkout/ui';

import {
  AddressFormValues,
  getAddressFormFieldsValidationSchema,
  getTranslateAddressError,
  isEqualAddress,
  isValidAddress,
  mapAddressToFormValues,
  StaticAddress,
} from '../address';
import { getCustomFormFieldsValidationSchema } from '../formFields';
import { Button, ButtonVariant } from '../ui/button';
import { Fieldset, Form } from '../ui/form';
import { LoadingOverlay } from '../ui/loading';

import StaticBillingAddress from './StaticBillingAddress';

import './BillingForm.scss';

export type BillingFormValues = AddressFormValues & { orderComment: string };

export interface BillingFormProps {
  billingAddress?: any;
  countries: Country[];
  countriesWithAutocomplete: string[];
  customer: Customer;
  customerMessage: string;
  googleMapsApiKey: string;
  isUpdating: boolean;
  methodId?: string;
  shouldShowOrderComments: boolean;
  isFloatingLabelEnabled?: boolean;
  getFields(countryCode?: string): FormField[];
  onSubmit(values: BillingFormValues): void;
  onUnhandledError(error: Error): void;
  updateAddress(address: Partial<Address>): Promise<CheckoutSelectors>;
  selectedShippingAddress: Address;
  navigateNextStep(): void;
}

const BillingForm = ({
  // googleMapsApiKey,
  billingAddress,
  countries,
  isUpdating,
  methodId,
  updateAddress,
  onUnhandledError,
  selectedShippingAddress,
  navigateNextStep,
}: BillingFormProps & WithLanguageProps & FormikProps<BillingFormValues>) => {
  const [isResettingAddress, setIsResettingAddress] = useState(false);
  const addressFormRef: RefObject<HTMLFieldSetElement> = useRef(null);
  const { isPayPalFastlaneEnabled, paypalFastlaneAddresses } = usePayPalFastlaneAddress();

  const shouldRenderStaticAddress = methodId === 'amazonpay';

  const addressInStore = JSON.parse(localStorage.getItem('billingAddress') || '{}');
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [tempBillingAddress, setTempBillingAddress] = useState<Address>({
    ...addressInStore,
    countryCode: 'US',
    stateOrProvince: addressInStore?.stateOrProvince || 'Alabama',
    stateOrProvinceCode: addressInStore?.stateOrProvinceCode || 'AL',
  });

  const [billingAddressFromProps, setBillingAddressFromProps] = useState<Address>(billingAddress);

  const billingAddressesToShow = [{ ...selectedShippingAddress }, { ...tempBillingAddress }].filter(
    (addres) =>
      isValidAddress(addres, []) &&
      !!addres.firstName &&
      addres.firstName !== '' &&
      !!addres.lastName &&
      addres.lastName !== '' &&
      (addres?.address1?.length || 0) > 0 &&
      (addres?.address2?.length || 0) > 0 &&
      (addres?.city?.length || 0) > 0 &&
      (addres?.postalCode?.length || 0) > 0,
  );

  const billingAddresses = isPayPalFastlaneEnabled
    ? paypalFastlaneAddresses
    : billingAddressesToShow;
  const hasAddresses = billingAddresses?.length > 0;

  useEffect(() => {
    setTempBillingAddress({
      ...addressInStore,
      countryCode: 'US',
      company: '',
      stateOrProvince: addressInStore?.stateOrProvince || 'Alabama',
      stateOrProvinceCode: addressInStore?.stateOrProvinceCode || 'AL',
    });
  }, []);

  useEffect(() => {
    setBillingAddressFromProps(billingAddress);
  }, [billingAddress]);

  const handleSelectAddress = async (address: Partial<Address>) => {
    setIsResettingAddress(true);

    try {
      await updateAddress(address);
      navigateNextStep();
    } catch (error) {
      if (error instanceof Error) {
        onUnhandledError(error);
      }
    } finally {
      setIsResettingAddress(false);
    }
  };

  const handleAddNewTempAddress = (e: any) => {
    e.preventDefault();
    setOpenEdit(true);
    setTempBillingAddress({
      ...tempBillingAddress,
      firstName: '',
      lastName: '',
      address1: '',
      address2: '',
      city: '',
      postalCode: '',
      countryCode: 'US',
      stateOrProvince: 'Alabama',
      stateOrProvinceCode: 'AL',
    });
  };

  const handleSaveTempAddress = (e: any) => {
    e.preventDefault();

    const add = {
      ...tempBillingAddress,
      country: countries.find((country) => country.code === tempBillingAddress.countryCode)?.name,
      stateOrProvince:
        countries
          .find((country) => country.code === tempBillingAddress.countryCode)
          ?.subdivisions.find(
            (subdivision) => subdivision.code === tempBillingAddress.stateOrProvince,
          )?.name ?? tempBillingAddress.stateOrProvince,
      stateOrProvinceCode:
        countries
          .find((country) => country.code === tempBillingAddress.countryCode)
          ?.subdivisions.find(
            (subdivision) => subdivision.code === tempBillingAddress.stateOrProvince,
          )?.code ?? tempBillingAddress.stateOrProvinceCode,
    };

    localStorage.setItem('billingAddress', JSON.stringify(add));
    handleSelectAddress({ ...tempBillingAddress, id: billingAddress?.id } as Address);
    setOpenEdit(false);
  };

  return (
    <Form autoComplete="on" className="billing-address-form">
      {shouldRenderStaticAddress && billingAddress && (
        <div className="form-fieldset">
          <StaticBillingAddress address={billingAddress} />
        </div>
      )}
      <div className="billing-address-add-new-container">
        <div className="billing-address-add-new" onClick={handleAddNewTempAddress}>
          Add new Address
        </div>
      </div>
      <Fieldset id="checkoutBillingAddress" ref={addressFormRef}>
        {hasAddresses && !shouldRenderStaticAddress && !openEdit && (
          <Fieldset id="billingAddresses">
            <LoadingOverlay isLoading={isResettingAddress}>
              <div className="custom-billing-address-list">
                {billingAddressesToShow.map((address, index: number) => {
                  return (
                    <div
                      className="custom-billing-address-container"
                      key={index}
                      onClick={() => {
                        handleSelectAddress({ ...address, id: billingAddress?.id } as Address);
                      }}
                    >
                      <div className="custom-billing-address">
                        <input
                          checked={isEqualAddress(address, billingAddressFromProps)}
                          className="billing-address-input"
                          type="radio"
                        />
                        <div className="billing-address-container">
                          <StaticAddress address={address as Address} />
                        </div>
                      </div>
                      {isEqualAddress(address, selectedShippingAddress) && (
                        <div className="billing-addres-same-shipping-label">
                          same as shipping address
                        </div>
                      )}
                      {isEqualAddress(address, tempBillingAddress) && (
                        <div
                          className="billing-addres-edit-label"
                          onClick={() => setOpenEdit(true)}
                        >
                          edit
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </LoadingOverlay>
          </Fieldset>
        )}

        {openEdit && (
          <AddressFormSkeleton isLoading={isResettingAddress}>
            <div>
              <div className="temp-billing-address-container">
                <div className="temp-billing-address-name-container">
                  <div className="temp-billing-address-firstname">
                    <input
                      className="temp-billing-address-firstname-input"
                      id="firstName"
                      name="firstName"
                      onChange={(e) =>
                        setTempBillingAddress({ ...tempBillingAddress, firstName: e.target.value })
                      }
                      placeholder="First Name"
                      type="text"
                      value={tempBillingAddress.firstName}
                    />
                  </div>
                  <div className="temp-billing-address-lastname">
                    <input
                      className="temp-billing-address-lastname-input"
                      id="lastName"
                      name="lastName"
                      onChange={(e) => {
                        setTempBillingAddress({ ...tempBillingAddress, lastName: e.target.value });
                      }}
                      placeholder="Last Name"
                      type="text"
                      value={tempBillingAddress.lastName}
                    />
                  </div>
                </div>
                <div className="temp-billing-address1-container">
                  <input
                    className="temp-billing-address1-input"
                    id="address1"
                    name="address1"
                    onChange={(e) =>
                      setTempBillingAddress({ ...tempBillingAddress, address1: e.target.value })
                    }
                    placeholder="Address"
                    type="text"
                    value={tempBillingAddress.address1}
                  />
                </div>
                <div className="temp-billing-address2-container">
                  <input
                    className="temp-billing-address2-input"
                    id="address2"
                    name="address2"
                    onChange={(e) =>
                      setTempBillingAddress({ ...tempBillingAddress, address2: e.target.value })
                    }
                    placeholder="Address"
                    type="text"
                    value={tempBillingAddress.address2}
                  />
                </div>
                <div className="temp-billing-address-country-container">
                  <select
                    className="temp-billing-address-country-select"
                    onChange={(e) =>
                      setTempBillingAddress({ ...tempBillingAddress, countryCode: e.target.value })
                    }
                    value={tempBillingAddress.countryCode || 'US'}
                  >
                    {countries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="temp-billing-address-state-city-container">
                  <div className="temp-billing-address-state">
                    {(
                      countries?.find((c) => c.code === tempBillingAddress.countryCode)
                        ?.subdivisions ?? []
                    )?.length > 0 ? (
                      <div className="temp-billing-address-state-container">
                        <select
                          className="temp-billing-address-state-select"
                          onChange={(e) =>
                            setTempBillingAddress({
                              ...tempBillingAddress,
                              stateOrProvince: e.target.value,
                            })
                          }
                          value={tempBillingAddress.stateOrProvinceCode}
                        >
                          {(
                            countries?.find((c) => c.code === tempBillingAddress.countryCode)
                              ?.subdivisions ?? []
                          ).map((state) => (
                            <option key={state.code} value={state.code}>
                              {state.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <div className="temp-billing-address-state-container">
                        <input
                          className="temp-billing-address-state-select"
                          id="stateOrProvince"
                          name="stateOrProvince"
                          onChange={(e) =>
                            setTempBillingAddress({
                              ...tempBillingAddress,
                              stateOrProvince: e.target.value,
                            })
                          }
                          placeholder="State Or Province"
                          type="text"
                          value={tempBillingAddress.stateOrProvince}
                        />
                      </div>
                    )}
                  </div>
                  <div className="temp-billing-address-city-container">
                    <input
                      className="temp-billing-address-city-input"
                      id="city"
                      name="city"
                      onChange={(e) =>
                        setTempBillingAddress({ ...tempBillingAddress, city: e.target.value })
                      }
                      placeholder="City"
                      type="text"
                      value={tempBillingAddress.city}
                    />
                  </div>
                </div>
                <div className="temp-billing-address-postalcode-phone-container">
                  <div className="temp-billing-address-postalcode-container">
                    <input
                      className="temp-billing-address-postalcode-input"
                      id="postalCode"
                      name="postalCode"
                      onChange={(e) =>
                        setTempBillingAddress({ ...tempBillingAddress, postalCode: e.target.value })
                      }
                      placeholder="Postal Code"
                      type="text"
                      value={tempBillingAddress.postalCode}
                    />
                  </div>
                  <div className="temp-billing-address-phone-container">
                    <input
                      className="temp-billing-address-phone-input"
                      id="phone"
                      name="phone"
                      onChange={(e) => {
                        setTempBillingAddress({ ...tempBillingAddress, phone: e.target.value });
                      }}
                      placeholder="Phone"
                      type="text"
                      value={tempBillingAddress.phone}
                    />
                  </div>
                </div>
                <div className="temp-billing-address-button-container">
                  <button
                    className="temp-billing-address-cancel-button"
                    onClick={() => setOpenEdit(false)}
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    className="temp-billing-address-save-button"
                    onClick={handleSaveTempAddress}
                    type="button"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </AddressFormSkeleton>
        )}
      </Fieldset>
      <div className="form-actions">
        <Button
          disabled={isUpdating || isResettingAddress}
          id="checkout-billing-continue"
          isLoading={isUpdating || isResettingAddress}
          type="submit"
          variant={ButtonVariant.Primary}
        >
          <TranslatedString id="common.continue_action" />
        </Button>
      </div>
    </Form>
  );
};

export default withLanguage(
  withFormik<BillingFormProps & WithLanguageProps, BillingFormValues>({
    handleSubmit: (values, { props: { onSubmit } }) => {
      onSubmit(values);
    },
    mapPropsToValues: ({ getFields, customerMessage, billingAddress }) => ({
      ...mapAddressToFormValues(
        getFields(billingAddress && billingAddress.countryCode),
        billingAddress,
      ),
      orderComment: customerMessage,
    }),
    isInitialValid: ({ billingAddress, getFields, language }) =>
      !!billingAddress &&
      getAddressFormFieldsValidationSchema({
        language,
        formFields: getFields(billingAddress.countryCode),
      }).isValidSync(billingAddress),
    validationSchema: ({ language, getFields, methodId }: BillingFormProps & WithLanguageProps) =>
      methodId === 'amazonpay'
        ? lazy<Partial<AddressFormValues>>((values) =>
            getCustomFormFieldsValidationSchema({
              translate: getTranslateAddressError(language),
              formFields: getFields(values && values.countryCode),
            }),
          )
        : lazy<Partial<AddressFormValues>>((values) =>
            getAddressFormFieldsValidationSchema({
              language,
              formFields: getFields(values && values.countryCode),
            }),
          ),
    enableReinitialize: true,
  })(BillingForm),
);

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
import CheckoutStepType from '../checkout/CheckoutStepType';
import { CustomGoogleAutocomplete } from '../common/google-autofile';
import { InputField } from '../common/input';
import { getCustomFormFieldsValidationSchema } from '../formFields';
import { Button, ButtonVariant } from '../ui/button';
import { Fieldset, Form } from '../ui/form';
import { LoadingOverlay } from '../ui/loading';

import StaticBillingAddress from './StaticBillingAddress';

import './BillingForm.scss';

export type BillingFormValues = AddressFormValues & { orderComment: string };

interface InputFieldErrorType {
  input: string;
  error: boolean;
  type: 'validationMessage' | 'noError';
}

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
  googleMapsApiKey,
  billingAddress,
  countries,
  isUpdating,
  methodId,
  updateAddress,
  onUnhandledError,
  selectedShippingAddress,
  navigateNextStep,
}: // navigateTo,
// navigateNextStep,
BillingFormProps & WithLanguageProps & FormikProps<BillingFormValues>) => {
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

  const [inputError, setInputError] = useState<InputFieldErrorType>({
    input: '',
    error: false,
    type: 'noError',
  });

  const billingAddressesToShow = [{ ...selectedShippingAddress }, { ...tempBillingAddress }].filter(
    (addres) =>
      isValidAddress(addres, []) &&
      !!addres.firstName &&
      addres.firstName !== '' &&
      !!addres.lastName &&
      addres.lastName !== '' &&
      (addres?.address1?.length || 0) > 0 &&
      (addres?.city?.length || 0) > 0 &&
      (addres?.postalCode?.length || 0) > 0,
  );

  const billingAddresses = isPayPalFastlaneEnabled
    ? paypalFastlaneAddresses
    : billingAddressesToShow;
  const hasAddresses = billingAddresses?.length > 0;

  const email = billingAddress.email;

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
      await updateAddress({ ...address, email } as Address);

      // if (isGuest) {
      navigateNextStep();
      // }
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

    if (inputError?.error) {
      return;
    }

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

  const handleSelectGoogleNewAddress = (address: any) => {
    const address1 = address?.name;

    const address2 = address?.vicinity;

    const city = address?.address_components?.find((addressComponent: any) =>
      addressComponent.types?.find((type: string) => type === 'administrative_area_level_2'),
    )?.long_name;

    const stateOrProvince = address?.address_components?.find((addressComponent: any) =>
      addressComponent.types?.find((type: string) => type === 'administrative_area_level_1'),
    )?.long_name;

    const stateOrProvinceCode = address?.address_components?.find((addressComponent: any) =>
      addressComponent.types?.find((type: string) => type === 'administrative_area_level_1'),
    )?.short_name;

    const countryCode = address?.address_components?.find((addressComponent: any) =>
      addressComponent.types?.find((type: string) => type === 'country'),
    )?.short_name;

    const postalCode = address?.address_components?.find((addressComponent: any) =>
      addressComponent.types?.find((type: string) => type === 'postal_code'),
    )?.long_name;

    setTempBillingAddress({
      ...tempBillingAddress,
      address1,
      address2,
      city,
      stateOrProvince,
      stateOrProvinceCode,
      countryCode,
      postalCode,
    });
  };

  return (
    <Form autoComplete="on" className="billing-address-form">
      {shouldRenderStaticAddress && billingAddress && (
        <div className="form-fieldset">
          <StaticBillingAddress
            address={billingAddress}
            isEditable={false}
            onEdit={() => {}}
            showSameAsShippingLable={isEqualAddress(billingAddress, selectedShippingAddress)}
            type={CheckoutStepType?.Billing}
          />
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
                    <div className="custom-billing-address-container" key={index}>
                      <div
                        className="custom-billing-address"
                        onClick={(event) => {
                          event.preventDefault();
                          handleSelectAddress({ ...address, id: billingAddress?.id } as Address);
                        }}
                      >
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
                          onClick={(e) => {
                            e.preventDefault();
                            setOpenEdit(true);
                            e.stopPropagation();
                          }}
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
                    <InputField
                      id="firstName"
                      name="firstName"
                      onChange={(e: { target: { value: any } }) =>
                        setTempBillingAddress({ ...tempBillingAddress, firstName: e.target.value })
                      }
                      title="First Name"
                      value={tempBillingAddress.firstName}
                    />
                  </div>
                  <div className="temp-billing-address-lastname">
                    <InputField
                      id="lastName"
                      name="lastName"
                      onChange={(e: { target: { value: any } }) => {
                        setTempBillingAddress({ ...tempBillingAddress, lastName: e.target.value });
                      }}
                      title="Last Name"
                      value={tempBillingAddress.lastName}
                    />
                  </div>
                </div>
                <div className="temp-billing-address1-container">
                  {googleMapsApiKey ? (
                    <CustomGoogleAutocomplete
                      googleMapsApiKey={googleMapsApiKey}
                      libraries={['places']}
                      onAddressSelect={handleSelectGoogleNewAddress}
                      onChange={(value) => {
                        setTempBillingAddress({ ...tempBillingAddress, address1: value });
                      }}
                      title="Address 1"
                      value={tempBillingAddress?.address1 ?? ''}
                    />
                  ) : (
                    <InputField
                      id="address1"
                      name="address1"
                      onChange={(e: { target: { value: any } }) =>
                        setTempBillingAddress({ ...tempBillingAddress, address1: e.target.value })
                      }
                      title="Address"
                      value={tempBillingAddress.address1}
                    />
                  )}
                </div>
                <div className="temp-billing-address2-container">
                  <InputField
                    id="address2"
                    name="address2"
                    onChange={(e: { target: { value: any } }) =>
                      setTempBillingAddress({ ...tempBillingAddress, address2: e.target.value })
                    }
                    title="Address"
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
                      (countries?.find((c) => c.code === tempBillingAddress.countryCode) &&
                        countries?.find((c) => c.code === tempBillingAddress.countryCode)
                          ?.subdivisions) ??
                      []
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
                        <InputField
                          id="stateOrProvince"
                          name="stateOrProvince"
                          onChange={(e: { target: { value: any } }) =>
                            setTempBillingAddress({
                              ...tempBillingAddress,
                              stateOrProvince: e.target.value,
                            })
                          }
                          title="State Or Province"
                          value={tempBillingAddress.stateOrProvince}
                        />
                      </div>
                    )}
                  </div>
                  <div className="temp-billing-address-city-container">
                    <InputField
                      id="city"
                      name="city"
                      onChange={(e: { target: { value: any } }) =>
                        setTempBillingAddress({ ...tempBillingAddress, city: e.target.value })
                      }
                      title="City"
                      value={tempBillingAddress.city}
                    />
                  </div>
                </div>
                <div className="temp-billing-address-postalcode-phone-container">
                  <div className="temp-billing-address-postalcode-container">
                    <InputField
                      id="postalCode"
                      name="postalCode"
                      onChange={(e: { target: { value: any } }) => {
                        const value = e.target.value;
                        const pattern = /^[#.0-9a-zA-Z\s-]{4,12}$/;

                        if (!pattern.test(value)) {
                          setInputError({
                            input: 'postalCode',
                            error: true,
                            type: 'validationMessage',
                          });
                        } else {
                          setInputError({
                            input: 'postalCode',
                            error: false,
                            type: 'noError',
                          });
                        }

                        setTempBillingAddress({
                          ...tempBillingAddress,
                          postalCode: value,
                        });
                      }}
                      title="Postal Code"
                      value={tempBillingAddress.postalCode}
                    />
                    {inputError.input === 'postalCode' && inputError.error && (
                      <div className="form-field-error-message">Enter a valid postal code</div>
                    )}
                  </div>
                  <div className="temp-billing-address-phone-container">
                    <InputField
                      id="phone"
                      name="phone"
                      onChange={(e: { target: { value: any } }) => {
                        const value = e.target.value;
                        const pattern = /^\+[1-9]{1}[0-9]{9,14}$/;

                        setTempBillingAddress({ ...tempBillingAddress, phone: value });

                        if (value.length > 0) {
                          if (!pattern.test(value)) {
                            setInputError({
                              input: 'phone',
                              error: true,
                              type: 'validationMessage',
                            });
                          } else {
                            setInputError({
                              input: 'phone',
                              error: false,
                              type: 'noError',
                            });
                          }
                        } else {
                          setInputError({
                            input: 'phone',
                            error: false,
                            type: 'noError',
                          });
                        }
                      }}
                      title="Phone"
                      value={tempBillingAddress.phone}
                    />
                    {inputError.input === 'phone' && inputError.error && (
                      <div className="form-field-error-message">Enter a valid phone number</div>
                    )}
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
            {/* <AddressForm formFields={getFields(countryCode)} /> */}
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

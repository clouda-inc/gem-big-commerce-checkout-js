import { CheckoutSelectors, Consignment } from '@bigcommerce/checkout-sdk';
import { FormikProps } from 'formik';
import { noop } from 'lodash';
import React, { PureComponent, ReactNode } from 'react';

import { AnalyticsContextProps } from '@bigcommerce/checkout/analytics';
import { TranslatedString } from '@bigcommerce/checkout/locale';
import { ChecklistSkeleton } from '@bigcommerce/checkout/ui';

import { AddressType, StaticAddress } from '../../address';
import { withAnalytics } from '../../analytics';
import { withFormikExtended } from '../../common/form';
import getRecommendedShippingOption from '../getRecommendedShippingOption';
import StaticConsignmentItemList from '../StaticConsignmentItemList';

import { ShippingOptionsProps, WithCheckoutShippingOptionsProps } from './ShippingOptions';
import './ShippingOptionsForm.scss';
import ShippingOptionsList from './ShippingOptionsList';

export type ShippingOptionsFormProps = ShippingOptionsProps &
  WithCheckoutShippingOptionsProps &
  AnalyticsContextProps;

class ShippingOptionsForm extends PureComponent<
  ShippingOptionsFormProps & FormikProps<ShippingOptionsFormValues>
> {
  private unsubscribe?: () => void;

  componentDidMount(): void {
    const { subscribeToConsignments } = this.props;

    this.unsubscribe = subscribeToConsignments(this.selectDefaultShippingOptions);
  }

  componentDidUpdate(): void {
    const { analyticsTracker, consignments, shouldShowShippingOptions } = this.props;

    if (consignments?.length && shouldShowShippingOptions) {
      analyticsTracker.showShippingMethods();
    }
  }

  componentWillUnmount(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = undefined;
    }
  }

  render(): ReactNode {
    const {
      consignments,
      isMultiShippingMode,
      selectShippingOption,
      isLoading,
      shouldShowShippingOptions,
      invalidShippingMessage,
      methodId,
    } = this.props;

    if (!consignments?.length || !shouldShowShippingOptions) {
      return (
        <ChecklistSkeleton
          additionalClassName="shippingOptions-skeleton"
          isLoading={isLoading()}
          rows={2}
        >
          {this.renderNoShippingOptions(
            <TranslatedString
              id={
                methodId || isMultiShippingMode
                  ? 'shipping.select_shipping_address_text'
                  : 'shipping.enter_shipping_address_text'
              }
            />,
          )}
        </ChecklistSkeleton>
      );
    }

    return (
      <>
        {consignments.map((consignment) => (
          <div className="shippingOptions-container form-fieldset" key={consignment.id}>
            {isMultiShippingMode && this.renderConsignment(consignment)}

            <ShippingOptionsList
              consignmentId={consignment.id}
              inputName={getRadioInputName(consignment.id)}
              isLoading={isLoading(consignment.id)}
              isMultiShippingMode={isMultiShippingMode}
              onSelectedOption={selectShippingOption}
              selectedShippingOptionId={
                consignment.selectedShippingOption && consignment.selectedShippingOption.id
              }
              shippingOptions={consignment.availableShippingOptions}
            />

            {(!consignment.availableShippingOptions ||
              !consignment.availableShippingOptions.length) && (
              <ChecklistSkeleton
                additionalClassName="shippingOptions-skeleton"
                isLoading={isLoading(consignment.id)}
                rows={2}
              >
                {this.renderNoShippingOptions(invalidShippingMessage)}
              </ChecklistSkeleton>
            )}
          </div>
        ))}
      </>
    );
  }

  private selectDefaultShippingOptions: (state: CheckoutSelectors) => void = async ({ data }) => {
    const { selectShippingOption, setFieldValue } = this.props;

    const consignment = (data.getConsignments() || []).find(
      ({ selectedShippingOption, availableShippingOptions: shippingOptions }) =>
        !selectedShippingOption && shippingOptions,
    );

    if (!consignment || !consignment.availableShippingOptions) {
      return;
    }

    const { availableShippingOptions, id } = consignment;
    const recommendedOption = getRecommendedShippingOption(availableShippingOptions);
    const singleShippingOption =
      availableShippingOptions.length === 1 && availableShippingOptions[0];
    const defaultShippingOption = recommendedOption || singleShippingOption;

    if (!defaultShippingOption) {
      return;
    }

    await selectShippingOption(id, defaultShippingOption.id);
    setFieldValue(`shippingOptionIds.${id}`, defaultShippingOption.id);
  };

  private renderNoShippingOptions(message: ReactNode): ReactNode {
    return (
      <div className="shippingOptions-panel optimizedCheckout-overlay">
        <div className="shipping-option-error-title-container">
          <div className="shipping-option-error-icon">
            <svg
              fill="none"
              height="22"
              viewBox="0 0 22 22"
              width="22"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="10.5464" cy="10.5464" r="10.0464" stroke="#024F60" />
              <path
                d="M11.8647 15.8938C11.8647 16.2238 11.7258 16.5403 11.4786 16.7736C11.2313 17.0069 10.896 17.138 10.5464 17.138C10.1968 17.138 9.86144 17.0069 9.61421 16.7736C9.36698 16.5403 9.22809 16.2238 9.22809 15.8938C9.22809 15.5638 9.36698 15.2473 9.61421 15.014C9.86144 14.7806 10.1968 14.6496 10.5464 14.6496C10.896 14.6496 11.2313 14.7806 11.4786 15.014C11.7258 15.2473 11.8647 15.5638 11.8647 15.8938ZM11.2055 12.6277H9.88724C9.7966 12.6277 9.72245 12.5577 9.72245 12.4721V3.45143C9.72245 3.36589 9.7966 3.2959 9.88724 3.2959H11.2055C11.2962 3.2959 11.3703 3.36589 11.3703 3.45143V12.4721C11.3703 12.5577 11.2962 12.6277 11.2055 12.6277Z"
                fill="#024F60"
              />
            </svg>
          </div>
          <div className="shipping-option-error-title">Requires a valid address</div>
        </div>
        <p
          aria-live="polite"
          className="shippingOptions-panel-message optimizedCheckout-primaryContent"
          role="alert"
        >
          {message}
        </p>
      </div>
    );
  }

  private renderConsignment(consignment: Consignment): ReactNode {
    const { cart } = this.props;

    return (
      <div className="staticConsignment">
        <strong>
          <TranslatedString id="shipping.shipping_address_heading" />
        </strong>

        <StaticAddress address={consignment.shippingAddress} type={AddressType.Shipping} />

        <StaticConsignmentItemList cart={cart} consignment={consignment} />
      </div>
    );
  }
}

function getRadioInputName(consignmentId: string): string {
  return `shippingOptionIds.${consignmentId}`;
}

export interface ShippingOptionsFormValues {
  shippingOptionIds: {
    [shippingOptionIds: string]: string;
  };
}

export default withAnalytics(
  withFormikExtended<ShippingOptionsFormProps, ShippingOptionsFormValues>({
    handleSubmit: noop,
    mapPropsToValues({ consignments }) {
      const shippingOptionIds: { [id: string]: string } = {};

      (consignments || []).forEach((consignment) => {
        shippingOptionIds[consignment.id] = consignment.selectedShippingOption
          ? consignment.selectedShippingOption.id
          : '';
      });

      return { shippingOptionIds };
    },
  })(ShippingOptionsForm),
);

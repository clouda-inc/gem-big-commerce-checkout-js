import classNames from 'classnames';
import { noop } from 'lodash';
import React, { FunctionComponent, memo, ReactNode } from 'react';

import { preventDefault } from '@bigcommerce/checkout/dom-utils';
import { TranslatedString } from '@bigcommerce/checkout/locale';

// import { Button, ButtonSize, ButtonVariant } from '../ui/button';
import { IconCheck } from '../ui/icon';

import CheckoutStepType from './CheckoutStepType';
import './CheckoutStepHeader.scss';

export interface CheckoutStepHeaderProps {
  heading: ReactNode;
  isActive?: boolean;
  isComplete?: boolean;
  isEditable?: boolean;
  summary?: ReactNode;
  type: CheckoutStepType;
  onEdit?(type: CheckoutStepType): void;
}

const CheckoutStepHeader: FunctionComponent<CheckoutStepHeaderProps> = ({
  heading,
  isActive,
  isComplete,
  isEditable,
  onEdit,
  summary,
  type,
}) => {
  return (
    <div
      className={classNames('stepHeader checkout-summary-wrapper ', {
        'is-readonly': !isEditable,
        'is-clickable': isEditable && !isActive,
      })}
      onClick={preventDefault(isEditable && onEdit ? () => onEdit(type) : noop)}
    >
      {/** Heading of the checkout components - start */}
      <div className="stepHeader-figure stepHeader-column checkout-summary-heading">
        <h2 className="stepHeader-title optimizedCheckout-headingPrimary">{heading}</h2>
        <IconCheck
          additionalClassName={classNames('stepHeader-counter', 'optimizedCheckout-step', {
            'stepHeader-counter--complete': isComplete,
          })}
        />
      </div>
      {/** Heading of the checkout components - end */}

      <div className="checkout-summary-container">
        {/** summary of the checkout components - start */}
        <div
          className="stepHeader-body stepHeader-column optimizedCheckout-contentPrimary"
          data-test="step-info"
        >
          {!isActive && isComplete && summary}
        </div>
        {/** summary of the checkout components - end */}

        {/** edit button of the checkout components - start */}
        {isEditable && !isActive && (
          <div className="stepHeader-actions stepHeader-column checkout-summary-enable-edit">
            <div
              aria-expanded={isActive}
              className="checkout-summary-enable-edit-button"
              data-test="step-edit-button"
            >
              <TranslatedString id="common.edit_action" />
            </div>
          </div>
        )}
        {/** edit button of the checkout components - end */}
      </div>
    </div>
  );
};

export default memo(CheckoutStepHeader);

/* eslint-disable no-console */
import { CheckoutRequestBody, CheckoutSelectors } from '@bigcommerce/checkout-sdk';
import React, { Component, ReactNode } from 'react';

import { TranslatedString, withLanguage, WithLanguageProps } from '@bigcommerce/checkout/locale';
import { CheckoutContextProps } from '@bigcommerce/checkout/payment-integration-api';

import { withAnalytics } from '../../analytics';
import { withCheckout } from '../../checkout';
import { WithCheckoutProps } from '../../checkout/Checkout';

import './OrderComment.scss';

interface OrderCommentStates {
  comment: string;
  hasComment: boolean;
  editing: boolean;
}

interface OrderCommentProps {
  comment: string;
  isLoading: boolean;
  updateCheckout(payload: CheckoutRequestBody): Promise<CheckoutSelectors>;
}

class OrderComment extends Component<
  WithCheckoutProps & WithLanguageProps & OrderCommentProps,
  OrderCommentStates
> {
  constructor(props: WithCheckoutProps & WithLanguageProps & OrderCommentProps) {
    super(props);
    this.state = {
      comment: props.comment || '',
      hasComment: !!props.comment,
      editing: !props.comment,
    };
  }

  render(): ReactNode {
    const { comment } = this.props;

    console.log(comment);

    const handleSubmitOrderComment = async (event: any) => {
      event.preventDefault();

      const { comment } = this.state;

      const { updateCheckout, cart, loadCheckout } = this.props;

      await updateCheckout({ customerMessage: comment });

      loadCheckout(cart?.id ?? '');
      this.setState({ editing: false });
    };

    const handleDeleteOrderComment = async (event: any) => {
      event.preventDefault();

      const { updateCheckout, cart, loadCheckout } = this.props;

      await updateCheckout({ customerMessage: '' });

      loadCheckout(cart?.id ?? '');
    };

    return (
      <div className="order-comment">
        <div className="order-comment-label">
          <TranslatedString id="cart.orderComment.title" />
        </div>
        {!!comment && <div>{comment}</div>}
        {!comment && <div>No Comment</div>}
        {!this.state.editing && (!!this.state.hasComment || !!this.props.comment) && (
          <div className="order-comment-value-wrapper">
            <div className="order-comment-value-container">
              <div className="order-comment-input-lable">
                <TranslatedString id="cart.orderComment.placeholder" />
              </div>
              <div className="order-comment-value">{this.state.comment}</div>
            </div>
            <div className="order-comment-value-action-container">
              <button
                className="order-comment-value-delete-button"
                onClick={handleDeleteOrderComment}
              >
                Delete
              </button>
              <button
                className="order-comment-value-edit-button"
                onClick={() => this.setState({ editing: true })}
              >
                Edit
              </button>
            </div>
          </div>
        )}
        {((!this.state.hasComment && !this.props.comment) || this.state.editing) && (
          <div>
            <div className="order-comment-input-wrapper">
              <div className="order-comment-input-container">
                <div className="order-comment-input-lable">
                  <TranslatedString id="cart.orderComment.placeholder" />
                </div>
                <textarea
                  className="order-comment-input"
                  cols={30}
                  disabled={this.props.isLoading}
                  onChange={(e) => {
                    this.setState({ comment: e.target.value });
                  }}
                  rows={5}
                  value={this.state.comment}
                />
              </div>
              <div>
                <button
                  className="order-comment-submit"
                  disabled={this.props.isLoading}
                  onClick={handleSubmitOrderComment}
                >
                  {this.state.hasComment ? 'Update Comment' : 'Add Comment'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export function mapToOrderCommentProps({
  checkoutService,
  checkoutState,
}: CheckoutContextProps): OrderCommentProps | null {
  const {
    data: { getCheckout },
    statuses: { isUpdatingCheckout },
  } = checkoutState;

  const checkout = getCheckout();

  if (!checkout) {
    return null;
  }

  const isLoading = isUpdatingCheckout();

  return {
    comment: checkout.customerMessage,
    isLoading,
    updateCheckout: checkoutService.updateCheckout,
  };
}

export default withAnalytics(withLanguage(withCheckout(mapToOrderCommentProps)(OrderComment)));

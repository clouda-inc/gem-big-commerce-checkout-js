import {
  CheckoutSelectors,
  Customer,
  EmbeddedCheckoutMessenger,
  EmbeddedCheckoutMessengerOptions,
  Order,
  StoreConfig,
} from '@bigcommerce/checkout-sdk';
import classNames from 'classnames';
import React, { Component, ReactNode } from 'react';

import { AnalyticsContextProps } from '@bigcommerce/checkout/analytics';
import { ErrorLogger } from '@bigcommerce/checkout/error-handling-utils';
import { CheckoutContextProps } from '@bigcommerce/checkout/payment-integration-api';

import { withAnalytics } from '../analytics';
import { withCheckout } from '../checkout';
import { ErrorModal } from '../common/error';
import { EmbeddedCheckoutStylesheet, isEmbedded } from '../embeddedCheckout';
import { CreatedCustomer, SignUpFormValues } from '../guestSignup';
import { LargeLoadingSpinner } from '../ui/loading';

import { OrderBillingSummary, OrderReviewSection } from './customSections';
import ThankYouHeader from './ThankYouHeader';

import './OrderConfirmation.scss';

export interface OrderConfirmationState {
  error?: Error;
  hasSignedUp?: boolean;
  isSigningUp?: boolean;
}

export interface OrderConfirmationProps {
  containerId: string;
  embeddedStylesheet: EmbeddedCheckoutStylesheet;
  errorLogger: ErrorLogger;
  orderId: number;
  createAccount(values: SignUpFormValues): Promise<CreatedCustomer>;
  createEmbeddedMessenger(options: EmbeddedCheckoutMessengerOptions): EmbeddedCheckoutMessenger;
}

interface WithCheckoutOrderConfirmationProps {
  order?: Order;
  config?: StoreConfig;
  loadOrder(orderId: number): Promise<CheckoutSelectors>;
  isLoadingOrder(): boolean;
  customer?: Customer;
}

class OrderConfirmation extends Component<
  OrderConfirmationProps & WithCheckoutOrderConfirmationProps & AnalyticsContextProps,
  OrderConfirmationState
> {
  state: OrderConfirmationState = {};

  private embeddedMessenger?: EmbeddedCheckoutMessenger;

  componentDidMount(): void {
    const {
      containerId,
      createEmbeddedMessenger,
      embeddedStylesheet,
      loadOrder,
      orderId,
      analyticsTracker,
    } = this.props;

    loadOrder(orderId)
      .then(({ data }) => {
        const { links: { siteLink = '' } = {} } = data.getConfig() || {};
        const messenger = createEmbeddedMessenger({ parentOrigin: siteLink });

        this.embeddedMessenger = messenger;

        messenger.receiveStyles((styles) => embeddedStylesheet.append(styles));
        messenger.postFrameLoaded({ contentId: containerId });

        analyticsTracker.orderPurchased();
      })
      .catch(this.handleUnhandledError);
  }

  render(): ReactNode {
    const { order, config, isLoadingOrder } = this.props;

    if (!order || !config || isLoadingOrder()) {
      return (
        <div className="order-confirmation-loading-container">
          <div className="order-confirmation-loading-wrapper">
            <LargeLoadingSpinner isLoading={true} />
            <div className="order-confirmation-loading-text">Loading...</div>
          </div>
        </div>
      );
    }

    return (
      <div
        className={classNames('layout optimizedCheckout-contentPrimary', {
          'is-embedded': isEmbedded(),
        })}
      >
        <div className="layout-main">
          <div className="order-confirmation">
            <div className="order-confirmation-header">
              <div className="order-confirmation-thanks-header">
                <ThankYouHeader name={order.billingAddress.firstName} />
              </div>
              <div className="order-confirmation-note-container">
                <div className="order-confirmation-note">
                  <div className="order-confirmation-note-text">
                    Your order was completed successfully.
                  </div>
                  <div className="order-confirmation-note-text">
                    An e-mail reciept including the details about your order has been sent to the
                    e-mail address provided. Please keep it for your records.
                  </div>
                </div>
                <div className="order-confirmation-note-status">Order Number {order?.orderId}</div>
              </div>
            </div>
            <div className="order-confirmation-body">
              <OrderReviewSection lineItems={order?.lineItems} />
              <OrderBillingSummary
                customerId={order?.customerId}
                discountAmount={order?.discountAmount}
                orderId={order?.orderId}
                shippingCost={order?.shippingCostTotal}
                subTotal={order.baseAmount}
                tax={order?.taxTotal}
                total={order?.orderAmount}
              />
            </div>

            {this.renderErrorModal()}
          </div>
        </div>
      </div>
    );
  }

  private renderErrorModal(): ReactNode {
    const { error } = this.state;

    return (
      <ErrorModal error={error} onClose={this.handleErrorModalClose} shouldShowErrorCode={false} />
    );
  }

  private handleErrorModalClose: () => void = () => {
    this.setState({ error: undefined });
  };

  private handleUnhandledError: (error: Error) => void = (error) => {
    const { errorLogger } = this.props;

    this.setState({ error });
    errorLogger.log(error);

    if (this.embeddedMessenger) {
      this.embeddedMessenger.postError(error);
    }
  };
}

export function mapToOrderConfirmationProps(
  context: CheckoutContextProps,
): WithCheckoutOrderConfirmationProps | null {
  const {
    checkoutState: {
      data: { getOrder, getConfig, getCustomer },
      statuses: { isLoadingOrder },
    },
    checkoutService,
  } = context;

  const config = getConfig();
  const order = getOrder();
  const customer = getCustomer();

  return {
    config,
    isLoadingOrder,
    loadOrder: checkoutService.loadOrder,
    order,
    customer,
  };
}

export default withAnalytics(withCheckout(mapToOrderConfirmationProps)(OrderConfirmation));

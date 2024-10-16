import React, { FunctionComponent, memo } from 'react';

import LargeLoadingSpinner from './LargeLoadingSpinner';

import './LoadingNotification.scss';

export interface LoadingNotificationProps {
  isLoading: boolean;
}

const LoadingNotification: FunctionComponent<LoadingNotificationProps> = ({ isLoading }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div className="loadingNotification">
      <div className="loadingNotification-label-ss optimizedCheckout-loadingToaster">
        <LargeLoadingSpinner isLoading={isLoading} />
        <div className="loadingNotification-label-text">Loading...</div>
      </div>
    </div>
  );
};

export default memo(LoadingNotification);

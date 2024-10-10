import React, { FunctionComponent, memo } from 'react';

import LargeLoadingSpinner from './LargeLoadingSpinner';

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
      </div>
    </div>
  );
};

export default memo(LoadingNotification);

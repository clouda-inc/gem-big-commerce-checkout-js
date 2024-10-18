import React, { FunctionComponent, memo } from 'react';

import './LargeLoadingSpinner.scss';

export interface LoadingSpinnerProps {
  isLoading: boolean;
}

const LargeLoadingSpinner: FunctionComponent<LoadingSpinnerProps> = ({ isLoading }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div className="large-loading-spinner-container">
      <div className="large-loading-spinner" />
    </div>
  );
};

export default memo(LargeLoadingSpinner);

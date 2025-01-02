import React, { FunctionComponent } from 'react';

import LoadingSpinner from './LoadingSpinner';

import './LoadingOverlay.scss';

export interface LoadingOverlayProps {
  isLoading: boolean;
  hideContentWhenLoading?: boolean;
  unmountContentWhenLoading?: boolean;
  showLoader?: boolean;
}

const LoadingOverlay: FunctionComponent<LoadingOverlayProps> = ({
  children,
  hideContentWhenLoading,
  unmountContentWhenLoading,
  isLoading,
  showLoader = true,
}) => {
  if (hideContentWhenLoading || unmountContentWhenLoading) {
    return (
      <>
        {showLoader && <LoadingSpinner isLoading={isLoading} />}
        {unmountContentWhenLoading && isLoading ? null : (
          <div
            style={{
              display: hideContentWhenLoading && isLoading ? 'none' : undefined,
            }}
          >
            {children}
          </div>
        )}
      </>
    );
  }

  return (
    <div className="loadingOverlay-container">
      {children}
      {isLoading && <LoadingSpinner isLoading={isLoading} />}
    </div>
  );
};

export default LoadingOverlay;

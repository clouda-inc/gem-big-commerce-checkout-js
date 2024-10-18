import { Library } from '@googlemaps/js-api-loader';
import { StandaloneSearchBox, useJsApiLoader } from '@react-google-maps/api';
import React, { useRef } from 'react';

import './gogleAutoFile.scss';

interface AddressAutoFillProps {
  libraries: Library[];
  title: string;
  value: string;
  onChange: (value: string) => void;
  googleMapsApiKey: string;
  onAddressSelect: (address: any) => void;
}

function AddressAutoFill({
  libraries,
  title,
  googleMapsApiKey,
  value,
  onChange,
  onAddressSelect,
}: AddressAutoFillProps) {
  const inputRef = useRef<google.maps.places.SearchBox | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey,
    libraries,
  });

  const handleOnPlacesChanged = () => {
    if (inputRef.current) {
      const addressList = inputRef.current.getPlaces();

      if (!addressList) {
        return;
      }

      onAddressSelect(addressList[0]);
    }
  };

  return (
    <>
      {isLoaded && (
        <StandaloneSearchBox
          onLoad={(ref) => (inputRef.current = ref)}
          onPlacesChanged={handleOnPlacesChanged}
        >
          <div className="google-autocomplete-container">
            <div className="google-autocomplete-entryarea">
              <input
                className="google-autocomplete-input-field-input"
                onChange={(e) => onChange(e.target.value)}
                placeholder=""
                type="text"
                value={value}
              />
              <div className="google-autocomplete-labelline">{title}</div>
            </div>
          </div>
        </StandaloneSearchBox>
      )}
    </>
  );
}

export default AddressAutoFill;

import React from 'react';

import { InputField } from '../input';

import countryListData from './countries_data.json';
// import countryList from './coutryList.json';

import './phoneNumberInput.scss';

interface PhoneNumberInputProps {
  value: string;
  country: string;
  onChange: (e: any) => void;
}

export const PhoneNumberInput = (props: PhoneNumberInputProps) => {
  // const country = countryList[props.country as keyof typeof countryList];

  const countryData = countryListData[props.country as keyof typeof countryListData];

  return (
    <div className="phone-number-input">
      <div className="phone-number-input-country-code">
        {/* <img alt={country?.name} height={20} src={country?.image} width={20} />
        <span>{countryData?.phone_code}</span>
        <span>{countryData?.country_name}</span> */}
        <span>{countryData?.flag}</span>
      </div>
      <InputField
        id="phone-number"
        name="phone-number"
        onChange={props.onChange}
        placeholder="Enter your phone number"
        title="Phone Number (Optional)"
        value={props.value}
      />
    </div>
  );
};

import React, { useEffect, useState } from 'react';

import { InputField } from '../input';

import countryList from './coutryList.json';
import './phoneNumberInput.scss';

interface Country {
  name: string;
  emoji: string;
  unicode: string;
  image: string;
  phoneCode: string;
}

interface CountryList {
  [key: string]: Country;
}

const countryListTyped: CountryList = countryList;

const countries = Object.keys(countryListTyped).map((key: string) => {
  return {
    name: countryListTyped[key].name,
    code: key,
    image: countryListTyped[key].image,
    phoneCode: countryListTyped[key].phoneCode,
    unicode: countryListTyped[key].unicode,
  };
});

interface PhoneNumberInputProps {
  value: string;
  onChange: (e: any) => void;
  setState: any;
  // onCountryChange: (e: any) => void;
}

const PhoneNumberInput = (props: PhoneNumberInputProps) => {
  const value = props.value;

  const [selectedCountry, setSelectedCountry] = useState('US');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    const splitValue = value?.split('-') || [];
    const countryCode = splitValue[0] || 'US';
    const phoneNumberTemp = splitValue[1] || '';

    setPhoneNumber(phoneNumberTemp);

    // console.log('[PhoneNumberInput] splitValue : ', splitValue);

    // console.log('[PhoneNumberInput] country-code : ', countryCode);
    // console.log('[PhoneNumberInput] phone-number : ', phoneNumber);

    const selectedCountryCode = countries.find(
      (country) => country.phoneCode === countryCode,
    )?.code;

    // console.log('[PhoneNumberInput] selectedCountryCode : ', selectedCountryCode);

    if (selectedCountryCode) {
      setSelectedCountry(selectedCountryCode);
    }
  }, [value]);

  const handleCountryChange = (e: any) => {
    // console.log('[PhoneNumberInput] [handleCountryChange] e : ', e);
    setSelectedCountry(e.target.value);
  };

  // console.log('[PhoneNumberInput] selectedCountry : ', selectedCountry);

  const handlePhoneNumberChange = (e: any) => {
    const pattern = /^[0-9]{6,12}$/;
    const phoneNumnerTemp = `${e.target.value}`;

    setPhoneNumber(phoneNumnerTemp);

    // console.log('[PhoneNumberInput] [handlePhoneNumberChange] phoneNumber : ', phoneNumnerTemp);
    props.onChange(
      `${
        selectedCountry ? countries.find((d) => d.code === selectedCountry)?.phoneCode : ''
      }-${phoneNumnerTemp}`,
    );

    if (phoneNumnerTemp.length > 0) {
      if (pattern.test(phoneNumnerTemp)) {
        props.setState({
          editStateAddressError: { field: 'phone', error: false },
        });
      } else {
        props.setState({ editStateAddressError: { field: 'phone', error: true } });
      }
    } else {
      props.setState({
        editStateAddressError: { field: 'phone', error: false },
      });
    }
  };

  return (
    <div className="phone-number-input">
      <div className="phone-number-input-country-code">
        <CountryCodeSelector onChange={handleCountryChange} value={selectedCountry} />
      </div>
      <InputField
        id="phone-number"
        name="phone-number"
        onChange={handlePhoneNumberChange}
        placeholder="Enter your phone number"
        title="Phone Number (Optional)"
        value={phoneNumber}
      />
    </div>
  );
};

export default PhoneNumberInput;

const CountryCodeSelector = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="custom-dropdown">
      <button className="custom-dropdown-button" onClick={() => setIsOpen(!isOpen)}>
        {countries.find((country) => country.code === props.value)?.name ? (
          <div className="dropdown-button-inner">
            <img
              src={(countryList as any)[props.value]?.image}
              style={{ width: '20px', marginRight: '8px' }}
            />
            {(countryList as any)[props.value]?.phoneCode}
          </div>
        ) : (
          <div className="custom-dropdown-text">Select Country</div>
        )}
        <div>
          <svg
            fill="none"
            height="6"
            viewBox="0 0 11 6"
            width="11"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 0.75L5.5 5.25L10 0.75" stroke="#4F4F4F" />
          </svg>
        </div>
      </button>
      {isOpen && (
        <div className="custom-dropdown-content">
          {countries.map((country) => (
            <div
              className="custom-dropdown-item"
              key={country.code}
              onClick={() => {
                props.onChange({ target: { value: country.code } });
                setIsOpen(false);
              }}
            >
              <img
                alt={country.name}
                height={12}
                src={country.image}
                style={{ width: '18px', height: '12px' }}
                width={18}
              />
              {country.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

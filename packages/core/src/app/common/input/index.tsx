import React, { InputHTMLAttributes, useState } from 'react';

import './inputField.scss';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  title: string;
  value: string;
  onChange: any;
}

export const InputField = ({ id, name, title, value, onChange, ...rest }: InputFieldProps) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  return (
    <div>
      <div className={`input-field-container ${focused ? 'focused-input-field-container' : ''}`}>
        <div className={`input-field-title ${focused || value ? 'active' : ''}`}>{title}</div>
        <input
          {...rest}
          className={`input-field-input ${focused ? 'focused' : ''}`}
          id={id}
          name={name}
          onBlur={handleBlur}
          onChange={onChange}
          onFocus={handleFocus}
          type="text"
          value={value}
        />
      </div>
    </div>
  );
};

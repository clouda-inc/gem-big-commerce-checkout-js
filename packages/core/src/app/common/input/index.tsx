import React, { InputHTMLAttributes } from 'react';

import './inputField.scss';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  title: string;
  value: string;
  onChange: any;
}

export const InputField = ({ id, name, title, value, onChange, ...rest }: InputFieldProps) => {
  return (
    <div>
      <div className="input-field-container">
        <div className="input-field-title">{title}</div>
        <input
          {...rest}
          className="input-field-input"
          id={id}
          name={name}
          onChange={onChange}
          placeholder={title}
          type="text"
          value={value}
        />
      </div>
    </div>
  );
};

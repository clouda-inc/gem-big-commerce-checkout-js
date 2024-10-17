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
    <div className="container">
      <div className="entryarea">
        <input
          {...rest}
          className="input-field-input"
          id={id}
          name={name}
          onChange={onChange}
          placeholder=""
          type="text"
          value={value}
        />
        <div className="labelline">{title}</div>
      </div>
    </div>
  );
};

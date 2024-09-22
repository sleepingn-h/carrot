import type { ChangeEvent, InputHTMLAttributes, ReactElement, ReactNode } from 'react';
import React, { Children, cloneElement } from 'react';

type RadioGroupProps = {
  label?: string;
  name: string;
  onStateChange: (value: string) => void;
  children: ReactElement;
  value: string;
};

type InputElementProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  id: string;
  disabled?: boolean;
  children: ReactNode;
};

const Group = ({ children, name, onStateChange, value }: RadioGroupProps) =>
  Children.map(children, (child) =>
    cloneElement(child, {
      ...child.props,
      name,
      checked: value === child.props.value,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        onStateChange(e.target.value);
      },
    })
  );

const Radio = ({ children, id, value, ...props }: InputElementProps) => {
  return (
    <div>
      <input type='radio' id={id} value={value} {...props} />
      <label htmlFor={id}>{children}</label>
    </div>
  );
};

const Radios = {
  Group: Group,
  Button: Radio,
};

export default Radios;

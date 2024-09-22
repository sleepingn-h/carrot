import { createContext, ReactNode, SetStateAction, useContext, useState } from 'react';

type InputProps<T> = {
  inputs: T;
  setInputs: (value: T) => void;
};

const InputContext = createContext<InputProps<string> | null>(null);

export function useInputs() {
  const context = useContext(InputContext);

  if (!context) throw new Error('Cannot find InputContext');
  return context;
}

export default function InputProvider({ children }: { children: ReactNode }) {
  const [inputs, setInputs] = useState('');

  return <InputContext.Provider value={{ inputs, setInputs }}>{children}</InputContext.Provider>;
}

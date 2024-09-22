import {
  ButtonHTMLAttributes,
  createContext,
  InputHTMLAttributes,
  memo,
  ReactNode,
  useContext,
  useState,
  forwardRef,
  ForwardedRef,
} from 'react';
import classNames from 'classnames';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import styles from './Input.module.css';

type InputContextProps = {
  id: string;
  label: boolean;
  required: boolean;
};

const InputContext = createContext<InputContextProps | null>(null);

export function useInputs() {
  const context = useContext(InputContext);

  if (!context) throw new Error('Cannot find InputContext');
  return context;
}

type RootProps = {
  id: string;
  label?: boolean;
  dir?: 'row' | 'col';
  className?: string;
  required?: boolean;
  children: ReactNode;
  as?: 'file';
};

const Root = ({ label = false, dir = 'col', id, required, ...props }: RootProps) => {
  const cns = classNames(
    styles.root,
    props.as ? styles[props.as] : '',
    props.className ? props.className : '',
    styles[dir]
  );

  return (
    <InputContext.Provider value={{ label, id, required }}>
      <div className={cns}>{props.children}</div>
    </InputContext.Provider>
  );
};

const Wrap = ({ ...props }) => {
  const cns = classNames(styles.wrap, styles[props.className ?? '']);
  return <div {...props} className={cns} />;
};

const Label = ({ ...props }) => {
  const { label, id, required } = useInputs();
  const cnsLabel = classNames(
    styles.label,
    styles[props.className],
    label ? 'sr-only' : '',
    required ? styles.required : ''
  );

  return <label {...props} htmlFor={id} className={cnsLabel} />;
};

const Input = forwardRef(function Input(
  props: InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement> | null
) {
  const { id, required } = useInputs();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  if (props.type === 'password') {
    const checkType = () => {
      if (props.type === 'password') {
        return isPasswordVisible ? 'text' : 'password';
      }

      if (props.type) {
        return props.type;
      }

      return 'text';
    };

    return (
      <div className={classNames(styles.input, styles.password)}>
        <input
          {...props}
          id={id}
          name={id}
          type={checkType()}
          ref={ref}
          value={props.value}
          required={required}
        />
        <button
          className={styles.viewPassword}
          type='button'
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          {isPasswordVisible ? <HiOutlineEye /> : <HiOutlineEyeOff />}
        </button>
      </div>
    );
  }

  return (
    <div className={styles.input}>
      <input
        {...props}
        id={id}
        name={id}
        type={props.type}
        ref={ref}
        value={props.value}
        required={required}
      />
    </div>
  );
});

const Textarea = ({ ...props }) => {
  const { id, required } = useInputs();

  return (
    <textarea
      {...props}
      className={styles.textarea}
      id={id}
      name={id}
      rows={props.rows ?? 10}
      cols={props.cols ?? 30}
      required={required}
    />
  );
};

const Button = ({ type = 'button', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const cnsButton = classNames(styles.button, props.className);
  return <button {...props} type={type} className={cnsButton} />;
};

const Errors = ({ errorMessages }: { errorMessages: string[] }) => {
  return (
    <>
      {errorMessages.map((message, index) => (
        <p className={styles.error} key={index}>
          {message}
        </p>
      ))}
    </>
  );
};

const Info = ({ ...props }) => {
  return <p {...props} className={styles.info} />;
};

const Inputs = {
  Wrap: memo(Wrap),
  Root: memo(Root),
  Label: memo(Label),
  Input: memo(Input),
  Textarea: memo(Textarea),
  Button: memo(Button),
  Errors: memo(Errors),
  Info: memo(Info),
};

export default Inputs;

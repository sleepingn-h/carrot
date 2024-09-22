import { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

type Props = {
  type?: 'button' | 'submit';
  onClick?: () => void;
};

const Button = ({ type = 'button', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <button className={styles.button} {...props} type={type} />;
};

export default Button;

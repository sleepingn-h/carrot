import { ReactNode } from 'react';
import styles from './Align.module.css';
import classNames from 'classnames';

type Props = {
  children: ReactNode;
  dir?: 'left' | 'center' | 'right';
  width?: 'full' | 'half' | 'auto';
  className?: string;
};

const Align = ({ dir = 'center', children, ...props }: Props) => {
  const cns = classNames(styles.align, styles[dir], styles[props.width], styles[props.className]);

  return (
    <div {...props} className={cns}>
      {children}
    </div>
  );
};

export default Align;

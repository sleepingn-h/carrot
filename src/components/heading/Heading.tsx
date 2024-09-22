import { ElementType } from 'react';
import classNames from 'classnames';
import styles from './Heading.module.css';

type Props = {
  as?: ElementType;
  align?: 'left' | 'right' | 'center';
  title?: string;
  subtitle?: string;
  className?: 'fz600' | 'fz700' | 'fz800';
};
const Heading = ({ as: Component = 'h2', title, subtitle, ...props }: Props) => {
  const cns = classNames(styles.title, styles[props.className]);

  return (
    <div className={classNames(styles.heading, styles[props.align])}>
      <Component {...props} className={cns}>
        {title}
      </Component>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
};

export default Heading;

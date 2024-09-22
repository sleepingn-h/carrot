import styles from './Divider.module.css';

type Props = {
  space?: number;
  color?: string;
};

const Divider = ({ space = 22, color = '#ccc', ...restProps }: Props) => {
  const style = {
    marginTop: space,
    marginBottom: space,
    background: color,
  };

  return <div className={styles.line} style={style} {...restProps} />;
};

export default Divider;

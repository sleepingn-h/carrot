import { RotatingLines } from 'react-loader-spinner';
import styles from './Loader.module.css';

type Props = {
  basic?: boolean;
};

const Loader = ({ basic }: Props) => {
  if (basic) {
    return (
      <div className={styles.basicWrapper}>
        <RotatingLines
          strokeColor='grey'
          strokeWidth='5'
          animationDuration='0.75'
          width='30'
          visible={true}
        />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        <RotatingLines
          strokeColor='grey'
          strokeWidth='5'
          animationDuration='0.75'
          width='30'
          visible={true}
        />
      </div>
    </div>
  );
};

export default Loader;

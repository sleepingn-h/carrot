import styles from './Chips.module.css';

type ChipsProps = {
  chips: string | string[];
};
const Chips = ({ chips }: ChipsProps) => {
  const chipsIsArray = Array.isArray(chips) ? true : false;
  return (
    <p className={styles.chips}>
      {!chipsIsArray && <span>{chips}</span>}
      {chipsIsArray && (chips as string[]).map((chip, index) => <span key={index}>{chip}</span>)}
    </p>
  );
};

export default Chips;

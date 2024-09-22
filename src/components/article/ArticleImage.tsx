import Image from 'next/image';
import styles from './Article.module.css';

type Props = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

const ArticleImage = ({ src, alt, width = 650, height = 650 }: Props) => {
  return (
    <div className={styles.image}>
      <Image src={src} alt={alt} width={width} height={height} />
    </div>
  );
};

export default ArticleImage;

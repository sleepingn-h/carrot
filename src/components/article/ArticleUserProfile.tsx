import Image from 'next/image';
import { HiOutlineUserCircle } from 'react-icons/hi';
import styles from './Article.module.css';

type Props = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

const ArticleUserProfile = ({ src, alt, width = 40, height = 40 }: Props) => {
  return (
    <div className={styles.profile}>
      {src && <Image src={src} alt={alt} width={width} height={height} />}
      {!src && <HiOutlineUserCircle className={styles.icons} size={width} />}
    </div>
  );
};

export default ArticleUserProfile;

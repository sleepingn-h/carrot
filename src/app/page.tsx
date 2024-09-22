import Heading from '@/components/heading/Heading';
import styles from './page.module.css';
import Article from '@/components/article/Article';

export default async function Home() {
  return (
    <>
      <Heading align='center' title='중고거래 최신매물' className='fz600' />
      <Article />
    </>
  );
}

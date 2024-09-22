import Article from '@/components/article/Article';
import Heading from '@/components/heading/Heading';

const FleamarketPage = async () => {
  return (
    <>
      <Heading align='center' title='중고거래 최신매물' className='fz600' />
      <Article />
    </>
  );
};

export default FleamarketPage;

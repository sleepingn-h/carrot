'use client';

import { useAuthContext } from '@/context/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/assets/logo.svg';
import useAuth from '@/hooks/useAuth';
import { HiOutlinePlusCircle, HiOutlineUser } from 'react-icons/hi';
import Trigger from '@/components/trigger/Trigger';
import styles from './Header.module.css';

const Header = () => {
  const router = useRouter();
  const pathname = usePathname().split('/');
  const { uid, setUserState, bizUser } = useAuth();
  const { logout } = useAuthContext();

  const loggedOut = () => {
    setUserState(null);
    router.push('/');
  };

  return (
    <header className={styles.header}>
      <div className='cinner'>
        <div className={styles.flex}>
          <Link className={styles.logo} href={'/'}>
            <Image priority src={Logo} alt='당근' width={65} height={36} />
          </Link>
        </div>
        <nav className={styles.link}>
          <Link className={pathname[1] === 'fleamarket' ? styles.active : ''} href={'/fleamarket'}>
            중고거래
          </Link>
          <Link className={pathname[1] === 'nearby' ? styles.active : ''} href={'/nearby'}>
            동네생활
          </Link>
          <Link className={pathname[1] === 'around-me' ? styles.active : ''} href={'/around-me'}>
            내주변
          </Link>
        </nav>
        <div className={styles.flex}>
          {uid && (
            <Link href={'/my'}>
              <HiOutlineUser className={styles.icons} size={24} />
              <span className='sr-only'>나의 당근</span>
            </Link>
          )}
          {bizUser && (
            <Link href={'/fleamarket/add-product'}>
              <span className='sr-only'>광고 글쓰기</span>
              <HiOutlinePlusCircle className={styles.icons} size={24} />
            </Link>
          )}
          {!uid ? (
            <Trigger size='sm' href={'/login'} bgColor='secondary'>
              로그인
            </Trigger>
          ) : (
            <Trigger size='sm' onClick={() => logout(loggedOut)} bgColor='secondary'>
              로그아웃
            </Trigger>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

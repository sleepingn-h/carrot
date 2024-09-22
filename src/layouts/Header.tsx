'use client';

import { useAuthContext } from '@/context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/assets/logo.svg';
import { HiOutlinePlusCircle, HiOutlineSearch, HiOutlineUser } from 'react-icons/hi';
import Trigger from '@/components/trigger/Trigger';
import styles from './Header.module.css';

const Header = () => {
  const { uid, logout, bizUser } = useAuthContext();
  const isLoggedin = uid !== null;

  return (
    <header className={styles.header}>
      <div className='cinner'>
        <div className={styles.flex}>
          <Link className={styles.logo} href={'/'}>
            <Image priority src={Logo} alt='당근' width={65} height={36} />
          </Link>
        </div>
        <nav className={styles.link}>
          <Link href={'/fleamarket'}>중고거래</Link>
          <Link href={'/nearby'}>동네생활</Link>
          {/* <Link href={'/around-me'}>내주변</Link> */}
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
            <Trigger size='sm' onClick={logout} bgColor='secondary'>
              로그아웃
            </Trigger>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

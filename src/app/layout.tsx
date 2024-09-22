import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Providers from '@/redux/provider';
import AuthContextProvider from '@/context/AuthContext';
import Header from '@/layouts/Header';
import './globals.css';

const URL = 'http://localhost:3001';
const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: '당근이세요?',
  description:
    '중고 거래부터 동네 정보까지, 이웃과 함께해요. 가깝고 따뜻한 당신의 근처를 만들어요.',
  openGraph: {
    images: `${URL}/og-image.png`,
  },
  twitter: {
    images: `${URL}/og-image.png`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={pretendard.className}>
        <Providers>
          <AuthContextProvider>
            <Header />
            <main className='content'>{children}</main>
          </AuthContextProvider>
        </Providers>
      </body>
    </html>
  );
}

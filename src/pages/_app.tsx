import '../styles/global.css';

import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';

import store from '@/redux/store';

type MyAppProps = AppProps;

function MyApp({ Component, pageProps }: MyAppProps): JSX.Element {
  const router = useRouter();
  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (router.pathname !== '/auth/login' && router.pathname !== '/auth/sign-up') {
      if (storedAuth) {
        const auth = JSON.parse(storedAuth);
        if (!auth.refreshToken || !auth.token) {
          router.push('/auth/login');
        }
      } else {
        router.push('/auth/login');
      }
    }
  }, [router]);

  return (
    <div>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      <Provider store={store}>
        <Toaster position="bottom-right" toastOptions={{ success: { duration: 2000 } }} />

        <Component {...pageProps} />
      </Provider>
    </div>
  );
}

export default MyApp;

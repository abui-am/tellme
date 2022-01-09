import '../styles/global.css';

import { AppProps } from 'next/app';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';

import store from '@/redux/store';

type MyAppProps = AppProps;

function MyApp({ Component, pageProps }: MyAppProps): JSX.Element {
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

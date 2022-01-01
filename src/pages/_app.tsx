import '../styles/global.css';

import { AppProps } from 'next/app';

type MyAppProps = AppProps;

function MyApp({ Component, pageProps }: MyAppProps): JSX.Element {
  return <Component {...pageProps} />;
}

export default MyApp;

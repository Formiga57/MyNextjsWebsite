import { AppProps } from 'next/app';
import Global from '../styles/global';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Global />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;

import { AppProps } from 'next/app';
import { AuthProvider } from '../contexts/AuthContext';
import Global from '../styles/global';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Global />
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default MyApp;

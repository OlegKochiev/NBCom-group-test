import Loader from '@/components/Loader';
import '@/styles/globals.css';
import type {AppProps} from 'next/app';
import {Router} from 'next/router';
import {useState} from 'react';

export default function App({Component, pageProps}: AppProps) {
  const [isLoading, setIsLoading] = useState(false);

  Router.events.on('routeChangeStart', (url) => {
    setIsLoading(true);
  });
  Router.events.on('routeChangeComplete', (url) => {
    setIsLoading(false);
  });
  return isLoading ? <Loader /> : <Component {...pageProps} />;
}

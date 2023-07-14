import {useEffect, useState} from 'react';
import Head from 'next/head';
import {Router} from 'next/router';
import type {AppProps} from 'next/app';
import Loader from '@/components/Loader';
import '@/styles/globals.css';

export default function App({Component, pageProps}: AppProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoading = (isLoading: boolean) => {
    setIsLoading(isLoading);
  };

  useEffect(() => {
    Router.events.on('routeChangeStart', () => {
      handleLoading(true);
    });

    Router.events.on('routeChangeComplete', () => {
      handleLoading(false);
    });
    return () => {
      Router.events.off('routeChangeStart', () => {
        handleLoading(true);
      });

      Router.events.off('routeChangeComplete', () => {
        handleLoading(false);
      });
    };
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
      </Head>
      {isLoading ? <Loader /> : <Component {...pageProps} />}
    </>
  );
}

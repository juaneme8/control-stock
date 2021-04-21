import { Flex, Input } from '@chakra-ui/react';
import Head from 'next/head';

import AppBar from '../components/AppBar';

export default function Home() {
  return (
    <>
      <Head>
        <title>Control de Stock - CIME</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <AppBar />
      <Input maxWidth="1200" mt="10" p="10" placeholder="Buscar equipo" size="lg" />
    </>
  );
}

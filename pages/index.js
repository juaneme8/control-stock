import { Input } from '@chakra-ui/react';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Control de Stock - CIME</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <Input maxWidth="1200" mt="10" p="10" placeholder="Buscar equipo" size="lg" />
    </>
  );
}

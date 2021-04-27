import { Box, Button, ChakraProvider, Container, Flex, HStack } from '@chakra-ui/react';
import Link from 'next/link';

import DarkModeSwitch from '../components/DarkModeSwitch';
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Box padding={4}>
        <Container borderRadius="sm" boxShadow="md" maxWidth="container.xl" padding={4}>
          <Flex justifyContent="space-between" mb={4}>
            <HStack spacing={4}>
              <Button colorScheme="teal" variant="outline">
                <Link href="/list">Listado</Link>
              </Button>
              <Button colorScheme="teal" variant="outline">
                <Link href="/add">Agregar</Link>
              </Button>
            </HStack>
            <DarkModeSwitch />
          </Flex>
          <Component {...pageProps} />
        </Container>
      </Box>
    </ChakraProvider>
  );
}
export default MyApp;

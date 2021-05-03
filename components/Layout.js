import React from 'react';

import { Box, Button, Container, Flex, HStack } from '@chakra-ui/react';
import Link from 'next/link';

import DarkModeSwitch from '../components/DarkModeSwitch';
function Layout({ children }) {
  return (
    <Box padding={4}>
      <Container borderRadius="sm" boxShadow="md" maxWidth="container.xl" padding={4}>
        <Flex justifyContent="space-between" mb={4}>
          <HStack spacing={4}>
            <Link href="/">
              <Button colorScheme="teal" variant="outline">
                Inicio
              </Button>
            </Link>
            <Link href="/list">
              <Button colorScheme="teal" variant="outline">
                Listado Equipos
              </Button>
            </Link>
            <Link href="/add">
              <Button colorScheme="teal" variant="outline">
                Scanear Equipos
              </Button>
            </Link>
          </HStack>
          <DarkModeSwitch />
        </Flex>
        {children}
      </Container>
    </Box>
  );
}

export default Layout;

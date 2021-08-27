import { Box, Container, Flex, HStack, IconButton } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import DarkModeSwitch from '../components/DarkModeSwitch';
import Logo from './Logo';


function Layout({ children }) {
  // const logoColor = useColorModeValue('#2C7A7B', '#8FD3CE');

  return (
    <Box padding={4}>
      <Container borderRadius="sm" boxShadow="md" maxWidth="container.xl" padding={4}>
        <Flex justifyContent="space-between" mb={4}>
          <HStack spacing={4}>
            <Link href="/">
              <IconButton borderRadius="50%" colorScheme="teal" icon={<Logo />} variant="outline" />
            </Link>

            {/* <Link href="/list">
              <Button colorScheme="teal" variant="outline">
                Listado Equipos
              </Button>
            </Link> */}
          </HStack>
          <DarkModeSwitch />
        </Flex>
        {children}
      </Container>
    </Box>
  );
}

export default Layout;

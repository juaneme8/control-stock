import React from 'react';

import { Box, Container, Flex, HStack, IconButton, useColorMode } from '@chakra-ui/react';
import Link from 'next/link';
import { FaSignOutAlt } from 'react-icons/fa';

import DarkModeSwitch from '../components/DarkModeSwitch';
import Logo from './Logo';

function Layout({ children }) {
  const { colorMode } = useColorMode();

  // const logoColor = useColorModeValue('#2C7A7B', '#8FD3CE');

  return (
    <Box padding={4}>
      <Container borderRadius="sm" boxShadow="md" maxWidth="container.xl" padding={4}>
        <Flex justifyContent="space-between" mb={4}>
          <HStack spacing={4}>
            <Link href="/">
              <IconButton
                bg={colorMode === 'light' ? '' : 'teal.800'}
                borderRadius="50%"
                colorScheme="teal"
                icon={<Logo />}
                variant="outline"
              />
            </Link>

            {/* <Link href="/list">
              <Button colorScheme="teal" variant="outline">
                Listado Equipos
              </Button>
            </Link> */}
          </HStack>
          <HStack>
            <Link href="/salida">
              <IconButton borderRadius="50%" colorScheme="teal" icon={<FaSignOutAlt />} variant="outline" />
            </Link>
            <DarkModeSwitch />
          </HStack>
        </Flex>
        {children}
      </Container>
    </Box>
  );
}

export default Layout;

import React from 'react';

import { Box, Flex, Heading, Menu, MenuItem } from '@chakra-ui/react';

import DarkModeSwitch from './DarkModeSwitch';

// Note: This code could be better, so I'd recommend you to understand how I solved and you could write yours better :)
const Header = (props) => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  return (
    <Flex
      align="center"
      as="nav"
      bg="teal.200"
      color="teal.800"
      justify="space-between"
      padding="1.5rem"
      w="100%"
      wrap="wrap"
      {...props}
    >
      <Flex align="center">
        <Heading as="h1" color="teal.800" letterSpacing={'-.1rem'} size="lg">
          Stock CIME
        </Heading>
      </Flex>

      <Box display={{ base: 'block', md: 'none' }} onClick={handleToggle}>
        <svg fill="white" viewBox="0 0 20 20" width="12px" xmlns="http://www.w3.org/2000/svg">
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box display={{ sm: show ? 'block' : 'none', md: 'flex' }} width={{ sm: 'full', md: 'auto' }}>
        <Menu>
          <MenuItem>Listado</MenuItem>
          <MenuItem>Agregar</MenuItem>
        </Menu>
      </Box>

      <Box display={{ sm: show ? 'block' : 'none', md: 'block' }} mt={{ base: 4, md: 0 }}>
        <DarkModeSwitch />
      </Box>
    </Flex>
  );
};

export default Header;

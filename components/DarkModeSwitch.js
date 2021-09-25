import React from 'react';

import { useColorMode, IconButton } from '@chakra-ui/react';
import { BiMoon, BiSun } from 'react-icons/bi';

const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="Toggle Dark Switch"
      borderRadius="50%"
      colorScheme="teal"
      icon={colorMode === 'dark' ? <BiSun /> : <BiMoon />}
      variant="outline"
      onClick={toggleColorMode}
    />
  );
};

export default DarkModeSwitch;

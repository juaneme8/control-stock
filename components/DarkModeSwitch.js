import React from 'react';

import { useColorMode, IconButton } from '@chakra-ui/react';
import { BiMoon, BiSun } from 'react-icons/bi';

const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="Toggle Dark Switch"
      icon={colorMode === 'dark' ? <BiSun /> : <BiMoon />}
      onClick={toggleColorMode}
    />
  );
};

export default DarkModeSwitch;

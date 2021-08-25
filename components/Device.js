import { Text, VStack } from '@chakra-ui/layout';
import { Box, Circle, Flex, HStack, Square, Stack } from '@chakra-ui/react';

const Device = ({ device }) => {
  const { barcode, description, code, serie, brand, location, state, image, catalogue } = device;

  const getLineColor = () => {
    if (location === 'Linea A') return 'blue.100';
    if (location === 'Linea B') return 'red.100';
    if (location === 'Linea C') return 'blue.400';
    if (location === 'Linea D') return 'green.400';
    if (location === 'Linea E') return 'purple.400';
    if (location === 'Linea H') return 'yellow.500';
    if (location === 'Linea P') return 'yellow.800';
    if (location === 'CIME') return 'teal.400';
  };

  const getStateColor = (state) => {
    if (state === 'approved') return 'green.400';
    if (state === 'fix') return 'yellow.400';
    if (state === 'rejected') return 'red.400';
  };

  return (
    <Box color="gray.600">
      <Flex align="center">
      <Circle size="10px" bg={getStateColor(state)} color="white"></Circle> 
        <Text bg="gray.200" borderRadius="md" px={1} fontSize="sm" align="center" flex="1" ml={2}>{barcode}</Text>
      </Flex>

      <Text casing="uppercase" fontWeight="bold" noOfLines={1}>
        {description}
      </Text>

      <Text bg={getLineColor()} borderRadius="md" color="white" px={2}>
        {location}
      </Text>
     
      <Text mt={2}>{brand}</Text>
      <Text>{code}</Text>
      <Text>{serie}</Text>
      
    </Box>
  );
};

export default Device;

import { Text } from '@chakra-ui/layout';
import { Box, Circle, Flex } from '@chakra-ui/react';
import { getLineColor } from '../utils/helpers';

const Device = ({ device }) => {
  const { barcode, description, code, serie, brand, location, state, image, catalogue } = device;



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

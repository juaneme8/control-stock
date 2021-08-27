import { Text } from '@chakra-ui/layout';
import { Box, Circle, Flex } from '@chakra-ui/react';
import { getLineColor,getStateColor } from '../utils/helpers';

const Device = ({ device }) => {
  const { barcode, description, code, serie, brand, location, state, image, catalogue } = device;
  return (
    <Box color="gray.600">
      <Flex align="center">
      <Circle size="10px" bg={getStateColor(state)} color="white"></Circle> 
        <Text bg="gray.200" borderRadius="md" px={1} fontSize="sm" align="center" flex="1" ml={2}>{barcode}</Text>
      </Flex>

      <Text casing="uppercase" fontWeight="bold" noOfLines={1}>
        {description}
      </Text>

      <Text bg={getLineColor(location)} borderRadius="md" color="white" px={2}>
        {location}
      </Text>
     
      <Text mt={2}>{brand}</Text>
      <Text>{code}</Text>
      <Text>{serie}</Text>
      
    </Box>
  );
};

export default Device;

import { Text, VStack } from '@chakra-ui/layout';

const Device = ({ device }) => {
  const { barcode, name, description, line, location, manufacturer } = device;

  const getLineColor = () => {
    if (line === 'A') return 'blue.100';
    if (line === 'B') return 'red.100';
    if (line === 'C') return 'blue.400';
    if (line === 'D') return 'green.400';
    if (line === 'E') return 'purple.400';
    if (line === 'H') return 'yellow.500';
    if (line === 'P') return 'yellow.800';
  };

  return (
    <VStack color="teal.800" spacing={1}>
      <Text casing="uppercase" fontWeight="bold">
        {name}
      </Text>
      <Text>{description}</Text>
      <Text>{location}</Text>
      <Text>{manufacturer}</Text>
      <Text bg={getLineColor()} borderRadius="md" color="black.100" px={2}>
        LINEA {line}{' '}
      </Text>
      <Text fontSize="sm">{barcode}</Text>
    </VStack>
  );
};

export default Device;

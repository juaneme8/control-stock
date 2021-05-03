import { Text, VStack } from '@chakra-ui/layout';

const Device = ({ device }) => {
  const { barcode, name, description, line, location, manufacturer } = device;

  console.log(device);

  const getLineColor = () => {
    if (line === 'A') return 'blue.100';
    if (line === 'B') return 'red.100';
    if (line === 'C') return 'blue.400';
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

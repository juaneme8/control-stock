import { HStack, Badge, Circle, Text, VStack } from '@chakra-ui/layout';

const Device = ({ device }) => {
  const { state, barcode, name, description, line, location, manufacturer } = device;

  console.log(device);

  return (
    <VStack color="teal.800" spacing={1}>
      <Badge colorScheme={state} mb={2} variant="solid">
        RECHAZADO
      </Badge>
      <HStack>
        <Circle bg="teal.800" color="white" size="40px">
          <Text color="teal.100"> {line}</Text>
        </Circle>
        <Text fontSize="sm">{barcode}</Text>
      </HStack>

      <Text casing="uppercase">{name}</Text>
      <Text>{description}</Text>
      <Text>{location}</Text>
      <Text>{manufacturer}</Text>
    </VStack>
  );
};

export default Device;

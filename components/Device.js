import { Circle, Text, VStack } from '@chakra-ui/layout';

const Device = ({ device, handleDelete }) => {
  const { _id, line, name } = device;

  return (
    <VStack color="teal.800">
      <Text> {name}</Text>

      <Circle bg="teal.800" color="white" size="50px">
        <Text color="teal.100"> {line}</Text>
      </Circle>

      <Text>{_id}</Text>
    </VStack>
  );
};

export default Device;

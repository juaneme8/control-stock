import React, { useState } from 'react';

import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Flex, Heading } from '@chakra-ui/layout';
import { BiPlus } from 'react-icons/bi';

import DeviceDetails from '../components/DeviceDetails';

const Add = () => {
  const [searchInput, setSearchInput] = useState('');
  const [showDetails, setShowDetails] = useState(false);

  const handleInputChange = (e) => {
    // Cambió el barcode entonces limpio detalles
    setShowDetails(false);
    const {
      target: { value: inputValue },
    } = e;

    setSearchInput(inputValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setShowDetails(true);
    // Si el código ingresado tiene datos en la DB los muestro y sino coloco un formulario para que los actualice.
    // console.log(searchInput);
  };

  return (
    <>
      <Heading as="h2" size="lg">
        Scanear Equipos
      </Heading>
      <form onSubmit={handleSubmit}>
        <Flex mt={4}>
          <Input autoFocus placeholder="Agregar Equipo" size="lg" value={searchInput} onChange={handleInputChange} />
          <Button disabled={!searchInput} ml="2" size="lg" type="submit">
            <BiPlus />
          </Button>
        </Flex>
      </form>

      {showDetails && <DeviceDetails barcode={searchInput} />}
    </>
  );
};

export default Add;

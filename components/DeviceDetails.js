import React, { useEffect, useState } from 'react';

import { Button, FormControl, FormLabel, Input, Badge, Box, Center, HStack, Radio, RadioGroup } from '@chakra-ui/react';
import axios from 'axios';

const DeviceDetails = ({ barcode }) => {
  const [device, setDevice] = useState({});

  useEffect(() => {
    const fetchDevice = async () => {
      const res = await axios.get(`http://localhost:3000/api/devices/${barcode}`);

      const { data } = res;

      // Si el get fue exitoso
      if (data.success) {
        // Si el código buscado no existe obtengo null
        if (!data.data) setDevice({});
        else setDevice(data.data);
      } else {
        setDevice({});
      }
    };

    fetchDevice();
  }, [barcode]);

  const handleInputChange = (e) => {
    setDevice({ ...device, [e.target.name]: e.target.value });
  };
  const handleRadioChange = (e) => {
    // console.log(e);
    setDevice({ ...device, state: e });
  };

  const handleSaveDevice = () => {
    const saveDevice = async () => {
      const res = await axios.put(`http://localhost:3000/api/devices/${barcode}`, {
        name: device.name,
        description: device.description,
        line: device.line,
        manufacturer: device.manufacturer,
        location: device.location,
        state: device.state,
      });

      const { data } = res;

      // Si el get fue exitoso
      if (data.success) {
        // console.log('exito');
        // mostrar mensaje de exito
      } else {
        // mostrar mensaje de error
        // console.log('noexito');
      }
    };

    saveDevice();
  };

  console.log(device);

  return (
    <Box bg="gray.50" border="1px" borderColor="gray.300" borderRadius="md" mt={8} p={4}>
      <Badge colorScheme="teal" mb={4} variant="solid">
        Código de Barras: {barcode}
      </Badge>

      <FormControl as="fieldset" id="state" mb={4}>
        <FormLabel as="legend">Estado</FormLabel>
        <RadioGroup value={device?.state || `fix`} onChange={handleRadioChange}>
          <HStack spacing={4}>
            <Radio name="state" value="approved">
              Aprobado
            </Radio>
            <Radio name="state" value="fix">
              Para Intervenir
            </Radio>
            <Radio name="state" value="rejected">
              Rechazado
            </Radio>
          </HStack>
        </RadioGroup>
      </FormControl>

      <FormControl as="fieldset" id="name" mb={4}>
        <FormLabel as="legend">Nombre Equipo</FormLabel>
        <Input name="name" value={device?.name || ``} onChange={handleInputChange} />
      </FormControl>

      <FormControl id="description" mb={4}>
        <FormLabel as="legend">Descripción</FormLabel>
        <Input name="description" value={device?.description || ``} onChange={handleInputChange} />
      </FormControl>
      <FormControl id="line" mb={4}>
        <FormLabel as="legend">Línea</FormLabel>
        <Input name="line" value={device?.line || ``} onChange={handleInputChange} />
      </FormControl>

      <FormControl id="manufacturer" mb={4}>
        <FormLabel as="legend">Flota</FormLabel>
        <Input name="manufacturer" value={device?.manufacturer || ``} onChange={handleInputChange} />
      </FormControl>

      <FormControl id="location" mb={4}>
        <FormLabel as="legend">Ubicación</FormLabel>
        <Input name="location" value={device?.location || ``} onChange={handleInputChange} />
      </FormControl>

      <Center>
        <Button colorScheme="teal" variant="outline" onClick={handleSaveDevice}>
          {device._id ? 'Actualizar' : 'Crear Nuevo'}
        </Button>
      </Center>
    </Box>
  );
};

export default DeviceDetails;

import React, { useEffect, useState } from 'react';

import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Badge, Box, Center } from '@chakra-ui/layout';
import axios from 'axios';

const DeviceDetails = ({ barcode }) => {
  const [device, setDevice] = useState({});

  useEffect(() => {
    const fetchDevice = async () => {
      const res = await axios.get(`http://localhost:3000/api/devices/${barcode}`);

      const { data } = res;

      // Si el get fue exitoso
      if (data.success) {
        // console.table(data.data);
        setDevice(data.data);
      } else {
        setDevice({});
      }
    };

    fetchDevice();
  }, [barcode]);

  const handleInputChange = (e) => {
    setDevice({ ...device, [e.target.name]: e.target.value });
  };

  const handleSaveDevice = () => {
    const saveDevice = async () => {
      const res = await axios.put(`http://localhost:3000/api/devices/${barcode}`, {
        name: device.name,
        description: device.description,
        line: device.line,
        manufacturer: device.manufacturer,
        location: device.location,
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

  return (
    <Box bg="gray.50" border="1px" borderColor="gray.300" borderRadius="md" mt={8} p={4}>
      <Badge colorScheme="teal" mb={4} variant="solid">
        Código de Barras: {barcode}
      </Badge>
      <FormControl id="name" mb={4}>
        <FormLabel>Nombre Equipo</FormLabel>
        <Input name="name" value={device?.name || ``} onChange={handleInputChange} />
      </FormControl>
      <FormControl id="description" mb={4}>
        <FormLabel>Descripción</FormLabel>
        <Input name="description" value={device?.description || ``} onChange={handleInputChange} />
      </FormControl>
      <FormControl id="line" mb={4}>
        <FormLabel>Línea</FormLabel>
        <Input name="line" value={device?.line || ``} onChange={handleInputChange} />
      </FormControl>
      <FormControl id="manufacturer" mb={4}>
        <FormLabel>Flota</FormLabel>
        <Input name="manufacturer" value={device?.manufacturer || ``} onChange={handleInputChange} />
      </FormControl>
      <FormControl id="location" mb={4}>
        <FormLabel>Ubicación</FormLabel>
        <Input name="location" value={device?.location || ``} onChange={handleInputChange} />
      </FormControl>
      <Center>
        <Button colorScheme="teal" variant="outline" onClick={handleSaveDevice}>
          {device ? 'Actualizar' : 'Crear Nuevo'}
        </Button>
      </Center>
    </Box>
  );
};

export default DeviceDetails;

import React, { useEffect, useState } from 'react';

import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Center, Flex, Grid, GridItem, Heading } from '@chakra-ui/layout';
import axios from 'axios';
import { BiSearchAlt2 } from 'react-icons/bi';

import Device from '../components/Device';

function List() {
  const [devices, setDevices] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const fetchDevices = async () => {
      // console.log('fetchDevices');
      const res = await axios.get('http://localhost:3000/api/devices/');
      const { data } = res;

      // Si el get fue exitoso
      if (data.success) {
        // console.table(data.data);
        setDevices(data.data);
      }
    };

    fetchDevices();
  }, []);

  const handleInputChange = (e) => {
    const {
      target: { value: inputValue },
    } = e;

    setSearchInput(inputValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Actualizo el valor de la DB
    const res = await axios.post('http://localhost:3000/api/devices/', {
      name: searchInput.slice(1),
      line: searchInput[0].toUpperCase(),
    });

    const {
      data: {
        data: { _id },
      },
    } = res;

    // console.log(res);

    // Actualizo la variable de estado
    setDevices([
      ...devices,
      {
        _id: _id,
        name: searchInput.slice(1),
        line: searchInput[0].toUpperCase(),
      },
    ]);

    setSearchInput('');
  };

  return (
    <>
      <Heading as="h2" size="lg">
        Listado de Equipos
      </Heading>

      <form onSubmit={handleSubmit}>
        <Flex mt={4}>
          <Input autoFocus placeholder="Agregar Equipo" size="lg" value={searchInput} onChange={handleInputChange} />
          <Button disabled={!searchInput} ml="2" size="lg" type="submit">
            <BiSearchAlt2 />
          </Button>
        </Flex>
      </form>

      <Grid gap={6} mt="6" templateColumns="repeat(auto-fill, minmax(200px,1fr))">
        {devices.map((device) => (
          <GridItem key={device._id}>
            <Center bg="gray.100" p="6" rounded="lg">
              <Device device={device} />
            </Center>
          </GridItem>
        ))}
      </Grid>
    </>
  );
}

export default List;

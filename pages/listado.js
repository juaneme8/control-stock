import React, { useEffect, useState } from 'react';

import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Box, Center, Container, Flex, Heading, Wrap, WrapItem } from '@chakra-ui/layout';
import axios from 'axios';

import AppBar from '../components/AppBar';
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

  const handleDelete = async (id) => {
    // console.log(id);
    const newDevices = devices.filter((device) => device._id !== id);

    // console.log(newDevices);

    await axios.delete('http://localhost:3000/api/devices/', {
      data: { _id: id },
    });

    setDevices(newDevices);
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
      <AppBar />
      <Container maxWidth="1200px">
        <Box bg="gray.100" mt="4" p="4" rounded="lg">
          <Heading as="h3" color="teal.800" mb="2" size="lg">
            Listado de Equipos
          </Heading>
        </Box>

        <form onSubmit={handleSubmit}>
          <Flex mt="4">
            <Input placeholder="Agregar Equipo" size="lg" value={searchInput} onChange={handleInputChange} />
            <Button disabled={!searchInput} size="lg" type="submit">
              +
            </Button>
          </Flex>
        </form>

        <Wrap justify="center" mt="4">
          {devices.map((device) => (
            <div key={device._id}>
              <Center bg="gray.100" m="4" p="6" rounded="lg" w="300px">
                <Device device={device} handleDelete={handleDelete} />
              </Center>
            </div>
          ))}
        </Wrap>
      </Container>
    </>
  );
}

export default List;

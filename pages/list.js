import React, { useEffect, useState } from 'react';

import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Center, Flex, Grid, GridItem, Heading } from '@chakra-ui/layout';
import axios from 'axios';
import Link from 'next/link';
import { BiSearchAlt2 } from 'react-icons/bi';

import Device from '../components/Device';
import { Box } from '@chakra-ui/react';

function List() {
  const [devices, setDevices] = useState([]);
  const [showingDevices, setShowingDevices] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const getStateColor = (state) => {
    if (state === 'approved') return 'green.400';
    if (state === 'fix') return 'yellow.400';
    if (state === 'rejected') return 'red.400';
  };
  
  useEffect(() => {
    const fetchDevices = async () => {
      const res = await axios.get('http://localhost:3001/api/devices/');
      const { data } = res;

      console.log(data)

      setDevices(data);
      setShowingDevices(data);
    
    }

    fetchDevices();
  }, []);

  const handleInputChange = (e) => {
    const {
      target: { value: inputValue },
    } = e;

    setSearchInput(inputValue);
    setShowingDevices(devices);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const auxDevices = devices.filter((device) => {
      return device.name.includes(searchInput);
    });

    setShowingDevices(auxDevices);
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

      <Grid gap={4} mt="6" templateColumns="repeat(auto-fill, minmax(200px,1fr))">
        {showingDevices.map((device) => (
          <GridItem key={device.id} as={Link} href={`/devices/${device.barcode}`}>
            <Box
              bg="gray.50"
              border="1px"
              // borderColor={getStateColor(device.state)}
              borderColor="gray.400"
              cursor="pointer"
              p={4}
              rounded="lg"
            >
              <Device device={device} />
            </Box>
          </GridItem>
        ))}
      </Grid>
    </>
  );
}

export default List;

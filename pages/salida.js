import React, { useEffect, useState } from 'react';

import { FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Box, Heading } from '@chakra-ui/layout';
import { Select } from '@chakra-ui/select';
import { useToast } from '@chakra-ui/toast';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Salida() {
  const router = useRouter();

  const [locations, setLocations] = useState({});
  const [destination, setDestination] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [exitList, setExitList] = useState([]);
  const toast = useToast();

  // Obtengo las localizaciones
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/locations`);
        // console.log('Status: ', res.status);

        setLocations(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLocations();
  }, []);

  const handleDestinationChange = (e) => {
    // console.log(e.target.value)
    setDestination(e.target.value);
  };

  const showToast = (toastTitle, toastStatus, redirect) => {
    toast({
      title: toastTitle,
      // description: 'El equipo fue creado exitosamente',
      status: toastStatus,
      duration: 1000,
      isClosable: true,
      position: 'bottom-left',
      onCloseComplete: redirect ? () => router.push('/') : null,
    });
  };

  const handleInputChange = (e) => {
    // console.log(e.target.value)
    setInputValue(e.target.value);

    if (e.target.value.length === 6) {
      setInputValue('');

      //   console.log(exitList);

      // Chequeo si el equipo ingresado no forma parte de exitList
      // exitList.find(item => item.barcode === e.ta)

      const fetchDevice = async () => {
        const res = await axios.get(`http://localhost:3001/api/devices/${e.target.value}`);

        // console.log(res.data);

        if (res.status === 200) {
          setExitList([...exitList, res.data]);

          showToast('Equipo cargado a la lista de salida', 'success', false);
        } else showToast('Ocurrió un error', 'error', false);
      };

      fetchDevice();
    }
  };

  return (
    <>
      <Head>
        <title>SGS - Salida de Equipos</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <Heading as="h2" size="lg">
        Salida de Equipos
      </Heading>

      <Input
        autoFocus
        mt={5}
        placeholder="Ingrese los 6 dígitos del código de barras"
        size="lg"
        value={inputValue}
        onChange={handleInputChange}
      />

      {exitList.length ? (
        <Box>
          {exitList.map((item) => (
            <Box
              key={item.id}
              bgGradient="linear-gradient(
					 90deg, rgba(114, 176, 218, 0.125) 0%, rgba(114, 176, 218, 0.02) 100%)"
              cursor="pointer"
              mt={4}
              p={4}
              rounded="lg"
            >
              {item.description} - S/N: {item.serie} ({item.barcode})
            </Box>
          ))}

          <FormLabel as="legend">Destino</FormLabel>

          <Select name="location" value={destination} variant="outline" onChange={handleDestinationChange}>
            <option value="">Elija el Destino</option>
            {locations.length > 0 &&
              locations.map((location) => {
                if (location.active) {
                  return (
                    <option key={location.id} value={location.name}>{`(${location.cid}) ${location.name}`}</option>
                  );
                } else {
                  return null;
                }
              })}
          </Select>
        </Box>
      ) : null}
    </>
  );
}

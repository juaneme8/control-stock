import React, { useEffect, useState } from 'react';

import { Button, Text, FormControl, FormLabel, Input, Badge, Box, Center, HStack, Radio, RadioGroup, useToast, SimpleGrid, Flex, Circle, Stack } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router'

const DeviceDetails = ({ barcode }) => {
	const router = useRouter()

	const [device, setDevice] = useState({});
	const toast = useToast();

	useEffect(() => {
		const fetchDevice = async () => {
			const res = await axios.get(`http://localhost:3001/api/devices/${barcode}`);

			const { data } = res;

			// Si el código buscado no existe obtengo null
			if (!data) setDevice({});
			else setDevice(data);
		};

		fetchDevice();
	}, [barcode]);

	const handleInputChange = e => {
		setDevice({ ...device, [e.target.name]: e.target.value });
	};
	const handleRadioChange = e => {
		// console.log(e);
		setDevice({ ...device, state: e });
	};

	const handleCancel = () => {
		router.push('/')
	}

	const handleSaveDevice = () => {
		const saveDevice = async () => {
			console.log(barcode);
			const res = await axios.put(`http://localhost:3001/api/devices/${barcode}`, {
				barcode,
				description: device.description,
				code: device.code,
				serie: device.serie,
				brand: device.brand,
				catalogue: device.catalogue,
				location: device.location,
				state: device.state,
			});

			console.log(res)

			const { data } = res;

			// Si el get fue exitoso
			if (data) {
				// mostrar mensaje de exito
				toast({
					title: 'Equipo actualizado exitosamente',
					// description: 'El equipo fue creado exitosamente',
					status: 'success',
					duration: 2000,
					isClosable: true,
					position: 'bottom-left',
				});
			} else {
				// mostrar mensaje de error
				toast({
					title: 'Ocurrió un error',
					// description: 'Ocurrió un error al crear el equipo',
					status: 'error',
					duration: 2000,
					isClosable: true,
					position: 'bottom-left',
				});
			}
		};

		saveDevice();
	};

	const getStateColor = (state) => {
		if (state === 'approved') return 'green.400';
		if (state === 'fix') return 'yellow.400';
		if (state === 'rejected') return 'red.400';
	};
	console.log(device);
	
	return (
		<Box bg='gray.50' border='1px' borderColor='gray.300' borderRadius='md' mt={8} p={4}>
			<Badge colorScheme='teal' mb={4} variant='solid'>
				Código de Barras: {barcode}
			</Badge>

			<Flex align="center">
      <Circle size="10px" bg={getStateColor(device.state)} color="white"></Circle> 
        <Text bg="gray.200" borderRadius="md" px={1} fontSize="sm" align="center" flex="1" ml={2}>{barcode}</Text>
      </Flex>

			<FormControl as='fieldset' id='state' mb={4}>
				<FormLabel as='legend'>Estado</FormLabel>
				<RadioGroup value={device?.state || `fix`} onChange={handleRadioChange}>
					<HStack spacing={4}>
						<Radio name='state' value='approved'>
							Aprobado
						</Radio>
						<Radio name='state' value='fix'>
							Para Intervenir
						</Radio>
						<Radio name='state' value='rejected'>
							Rechazado
						</Radio>
					</HStack>
				</RadioGroup>
			</FormControl>

			<FormControl id='description' mb={4}>
				<FormLabel as='legend'>Descripción</FormLabel>
				<Input name='description' value={device?.description || ``} onChange={handleInputChange} />
      </FormControl>
      <SimpleGrid columns={2} spacing={10}>
				<FormControl id='serie' mb={4}>
					<FormLabel as='legend'>N/S</FormLabel>
					<Input name='serie' value={device?.serie || ``} onChange={handleInputChange} />
				</FormControl>
				<FormControl id='code' mb={4}>
					<FormLabel as='legend'>Código</FormLabel>
					<Input name='code' value={device?.code || ``} onChange={handleInputChange} />
				</FormControl>
			</SimpleGrid>
			<FormControl id='location' mb={4}>
				<FormLabel as='legend'>Ubicación</FormLabel>
				<Input name='location' value={device?.location || ``} onChange={handleInputChange} />
			</FormControl>

			<FormControl id='brand' mb={4}>
				<FormLabel as='legend'>Flota</FormLabel>
				<Input name='brand' value={device?.brand || ``} onChange={handleInputChange} />
			</FormControl>



			<HStack justify="center">
			<Button colorScheme='red' variant='outline' onClick={handleCancel}>
					Cancelar
				</Button>
				<Button colorScheme='teal' variant='outline' onClick={handleSaveDevice}>
					{device.id ? 'Actualizar' : 'Crear Nuevo'}
				</Button>
			</HStack>
		</Box>
	);
};

export default DeviceDetails;

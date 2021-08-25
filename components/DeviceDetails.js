import React, { useEffect, useState } from 'react';

import { Button, FormControl, FormLabel, Input, Badge, Box, Center, HStack, Radio, RadioGroup, useToast, SimpleGrid } from '@chakra-ui/react';
import axios from 'axios';

const DeviceDetails = ({ barcode }) => {
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

	const handleSaveDevice = () => {
		const saveDevice = async () => {
			const res = await axios.put(`http://localhost:3001/api/devices/${barcode}`, {
				description: device.description,
				code: device.code,
				serie: device.serie,
				brand: device.brand,
				catalogue: device.catalogue,
				location: device.location,
				state: device.state,
			});

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

	console.log(device);

	return (
		<Box bg='gray.50' border='1px' borderColor='gray.300' borderRadius='md' mt={8} p={4}>
			<Badge colorScheme='teal' mb={4} variant='solid'>
				Código de Barras: {barcode}
			</Badge>

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



			<Center>
				<Button colorScheme='teal' variant='outline' onClick={handleSaveDevice}>
					{device.id ? 'Actualizar' : 'Crear Nuevo'}
				</Button>
			</Center>
		</Box>
	);
};

export default DeviceDetails;

import {
	Badge,
	Box, Button, Circle, Flex, FormControl,
	FormLabel, HStack, Input, Select, SimpleGrid, Stack, useToast
} from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getStateColor } from '../utils/helpers';


const DeviceDetails = ({ barcode }) => {
	const router = useRouter();

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
	const handleSelectChange = e => {
		// console.log(e.target.value);
		setDevice({ ...device, state: e.target.value });
	};

	const handleCancel = () => {
		router.push('/');
	};

	const handleSaveDevice = () => {
		const saveDevice = async () => {
			// console.log(barcode);
			const res = await axios.put(`http://localhost:3001/api/devices/${barcode}`, {
				code: device.code,
				serie: device.serie,
				brand: device.brand,
				description: device.description,
				location: device.location,
				state: device.state,
				// image: device.image,
				// catalogue: device.catalogue,
			});

			// Si la actualización fue exitosa
			if (res.status === 201) {
				// mostrar mensaje de exito
				toast({
					title: 'Equipo actualizado exitosamente',
					// description: 'El equipo fue creado exitosamente',
					status: 'success',
					duration: 2000,
					isClosable: true,
					position: 'bottom-left',
					onCloseComplete: () => router.push('/'),
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
			<HStack>
				<Circle size='15px' bg={getStateColor(device.state)} color='white'></Circle>
				<Badge mb={4} variant='solid' fontSize='0.8em'>
					EQUIPO: {barcode}
				</Badge>
			</HStack>

			<Flex align='center'></Flex>

			<FormControl as='fieldset' id='state' mb={4}>
				<FormLabel as='legend'>Estado</FormLabel>
				
				<Stack spacing={3}>
					<Select variant='outline' value={device?.state || `fix`} onChange={handleSelectChange}>
						<option value='approved'>Aprobado</option>
						<option value='fix'>Para Intervenir</option>
						<option value='rejected'>Rechazado</option>
					</Select>
				</Stack>
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

			<HStack justify='center'>
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

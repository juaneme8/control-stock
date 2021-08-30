import {
	Badge,
	Box,
	Button,
	Circle,
	Flex,
	FormControl,
	FormLabel,
	HStack,
	IconButton,
	Input,
	Select,
	SimpleGrid,
	Stack,
	useToast,
	Text,
	Center,
} from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getStateColor } from '../utils/helpers';

import { FaTrash, FaSave } from 'react-icons/fa';

import { format } from 'date-fns';

const DeviceDetails = ({ barcode, state }) => {
	const router = useRouter();

	const [device, setDevice] = useState({});
	const toast = useToast();

	useEffect(() => {
		const fetchDevice = async () => {
			try {
				const res = await axios.get(`http://localhost:3001/api/devices/${barcode}`);
				// console.log('Status: ', res.status);

				setDevice(res.data);
			} catch (error) {
				console.log(error);
			}
		};

		// Si la url es ?state=new no quiero buscarlo en la DB pues es un equipo nuevo
		if (state !== 'new') {
			fetchDevice();
		}
	}, [barcode]);

	const handleInputChange = e => {
		setDevice({ ...device, [e.target.name]: e.target.value });
	};
	const handleSelectChange = e => {
		// console.log(e.target.value);
		setDevice({ ...device, state: e.target.value });
	};

	const handleDeleteDevice = () => {
		const deleteDevice = async () => {
			const res = await axios.delete(`http://localhost:3001/api/devices/${barcode}`);
			// console.log(res);

			// Si la actualización fue exitosa
			if (res.status === 201) {
				// mostrar mensaje de exito
				toast({
					title: 'Equipo eliminado correctamente',
					// description: 'El equipo fue creado exitosamente',
					status: 'warning',
					duration: 1000,
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
					duration: 1000,
					isClosable: true,
					position: 'bottom-left',
				});
			}
		};

		deleteDevice();
	};

	const handleCancel = () => {
		router.push('/');
	};

	const handleSaveDevice = () => {
		const saveDevice = async () => {
			console.log(barcode);
			//Si es un dispositivo nuevo
			if (state === 'new') {
				const res = await axios.post(`http://localhost:3001/api/devices`, {
					barcode,
					code: device.code.toUpperCase(),
					serie: device.serie.toUpperCase(),
					brand: device.brand,
					description: device.description,
					location: device.location,
					state: device.state || 'fix',
					// image: device.image,
					// catalogue: device.catalogue,
				});
			}
			//Si estoy actualizando un dispositivo existente
			else {
			}
			const res = await axios.put(`http://localhost:3001/api/devices/${barcode}`, {
				code: device.code.toUpperCase(),
				serie: device.serie.toUpperCase(),
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
					duration: 1000,
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
					duration: 1000,
					isClosable: true,
					position: 'bottom-left',
				});
			}
		};

		saveDevice();
	};

	const handleNewRepair = deviceId => {
		const postRepair = async deviceId => {
			const res = await axios.post(`http://localhost:3001/api/repairs/${deviceId}`);
			// console.log(res);

			// Si la actualización fue exitosa
			if (res.status === 200) {
				// mostrar mensaje de exito
				toast({
					title: 'Reparación creada correctamente',
					// description: 'El equipo fue creado exitosamente',
					status: 'success',
					duration: 1000,
					isClosable: true,
					position: 'bottom-left',
				});
			} else {
				// mostrar mensaje de error
				toast({
					title: 'Ocurrió un error',
					// description: 'Ocurrió un error al crear el equipo',
					status: 'error',
					duration: 1000,
					isClosable: true,
					position: 'bottom-left',
				});
			}
		};

		console.log(deviceId);
		postRepair(deviceId);
	};

	const handleDeleteRepair = (repairId) => {
		console.log(repairId)
		console.log('handleDeleteRepair');
	};

	const handleUpdateRepair = (repairId) => {
		console.log(repairId)
		console.log('handleUpdateRepair');
	};

	console.log(device.repairs);

	return (
		<Box bg='gray.50' border='1px' borderColor='gray.300' borderRadius='md' mt={8} p={4}>
			<HStack justify='space-between'>
				<HStack>
					<Circle size='15px' bg={getStateColor(device.state)} color='white'></Circle>
					<Badge mb={4} variant='solid' fontSize='0.8em'>
						EQUIPO: {barcode}
					</Badge>
				</HStack>
				<IconButton variant='outline' aria-label='Eliminar Equipo' fontSize='20px' icon={<FaTrash />} onClick={handleDeleteDevice} />
			</HStack>

			<Flex align='center'></Flex>

			<FormControl as='fieldset' id='state' mb={4}>
				<FormLabel as='legend'>Estado</FormLabel>

				<Stack spacing={3}>
					<Select bg={getStateColor(device.state)} variant='outline' value={device?.state || `fix`} onChange={handleSelectChange}>
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

			<Button colorScheme='teal' variant='outline' onClick={() => handleNewRepair(device.id)}>
				Agregar Reparación
			</Button>
			{device.repairs?.length > 0
				? device.repairs.map(repair => (
						<Box key={repair.id} p={4} mt={4} borderRadius='lg' borderWidth='1px' borderColor='teal.600'>
							<HStack justify='space-between'>
								{/* <FormControl id={`entryDate${repair.id}`} mb={4}>
									<FormLabel as='legend'>Fecha de Entrada</FormLabel>
									<Input name='brand' value={repair.entryDate} />
								</FormControl> */}
								<Box>
									<Text fontWeight='semibold' align='center'>
										Fecha Entrada
									</Text>
									{repair.entryDate ? (
										<Text align='center'>{format(new Date(repair.entryDate), 'dd/MM/yy')}</Text>
									) : (
										<Text align='center'>-</Text>
									)}
								</Box>
								<Box>
									<Text fontWeight='semibold' align='center'>
										Fecha Reparación
									</Text>
									{repair.repairDate ? (
										<Text align='center'>{format(new Date(repair.repairDate), 'dd/MM/yy')}</Text>
									) : (
										<Text align='center'>-</Text>
									)}
								</Box>
								<Box>
									<Text fontWeight='semibold' align='center'>
										Fecha Salida
									</Text>
									{repair.exitDate ? (
										<Text align='center'>{format(new Date(repair.exitDate), 'dd/MM/yy')}</Text>
									) : (
										<Text align='center'>-</Text>
									)}
								</Box>
							<HStack>
							{!repair.exitDate ? (
									<IconButton
										variant='outline'
										aria-label='Actualizar Reparación'
										icon={<FaSave />}
										onClick={() => handleUpdateRepair(repair.id)}
										colorScheme='teal'
									/>
										
								) : null}
								
							<IconButton
									variant='outline'
									aria-label='Eliminar Reparación'
									icon={<FaTrash />}
									onClick={() => handleUpdateRepair(repair.id)}
									colorScheme='red'
							/>
							
						</HStack>
							</HStack>

							<FormControl id='brand' mt={4}>
								<FormLabel as='legend'>Descripción:</FormLabel>
								<Input name='brand' value={repair.description || ``} onChange={handleInputChange} />
							</FormControl>
							
						</Box>
				  ))
				: null}

			<HStack justify='center' mt={4}>
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

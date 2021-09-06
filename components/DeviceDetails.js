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
	Heading,
	Divider,
	Tooltip,
} from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getStateColor } from '../utils/helpers';

import { FaTrash, FaSave, FaPlus, FaAngleLeft } from 'react-icons/fa';

import { format } from 'date-fns';

import SkipChangesDialog from './SkipChangesDialog';

const DeviceDetails = ({ barcode, state }) => {
	const router = useRouter();

	const [device, setDevice] = useState({});
	const [descriptionsList, setDescriptionsList] = useState({});
	const [descriptionDetails, setDescriptionDetails] = useState({});
	const [locations, setLocations] = useState({});
	const [unsavedChanges, setUnsavedChanges] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [outdatedData, setOutdatedData] = useState(false);
	const toast = useToast();

	useEffect(() => {
		const fetchDevice = async () => {
			try {
				const res = await axios.get(`http://localhost:3001/api/devices/${barcode}`);
				// console.log('Status: ', res.status);

				setOutdatedData(false);
				setDevice(res.data);
			} catch (error) {
				console.log(error);
			}
		};

		// Si la url es ?state=new no quiero buscarlo en la DB pues es un equipo nuevo
		if (state !== 'new') {
			fetchDevice();
		}
	}, [barcode, outdatedData]);

	// Obtengo las descripciones de equipos
	useEffect(() => {
		const fetchDescriptionsList = async () => {
			try {
				const res = await axios.get(`http://localhost:3001/api/catalogues`);
				// console.log('Status: ', res.status);

				setDescriptionsList(res.data);
			} catch (error) {
				console.log(error);
			}
		};

		fetchDescriptionsList();
	}, []);

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

	// console.log('state', state)
	// console.log('barcode', barcode)

	const handleInputChange = e => {
		// console.log(e.target.name)
		// console.log(e.target.value)
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
			// console.log(barcode);
			//Si es un dispositivo nuevo
			if (state === 'new') {
				const res = await axios.post(`http://localhost:3001/api/devices`, {
					barcode,
					code: device.code?.toUpperCase(),
					serie: device.serie?.toUpperCase(),
					brand: device.brand,
					description: device.description,
					location: device.location,
					state: device.state || 'fix',
					// image: device.image,
					// catalogue: device.catalogue,
				});

				const res2 = await axios.post(`http://localhost:3001/api/repairs/${res.data.id}`);
				console.log(res2.data);
			}
			//Si estoy actualizando un dispositivo existente
			else {
			}
			const res = await axios.put(`http://localhost:3001/api/devices/${barcode}`, {
				code: device.code?.toUpperCase(),
				serie: device.serie?.toUpperCase(),
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
		// console.log('handleNewRepair');
		const postRepair = async deviceId => {
			const res = await axios.post(`http://localhost:3001/api/repairs/${deviceId}`);
			console.log(res.data);

			const { id, entryDate, active } = res.data;
			// Creo un array auxiliar al que le agregaré la reparación
			const repairsArr = device.repairs;
			repairsArr.push({ id, entryDate, active });

			setDevice({ ...device, repairs: repairsArr });

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

		// console.log(deviceId);
		postRepair(deviceId);
	};

	const handleDeleteRepair = repairId => {
		// console.log('handleDeleteRepair')
		const deleteRepair = async () => {
			const res = await axios.delete(`http://localhost:3001/api/repairs/${repairId}`);
			// console.log(res);

			// Creo un array auxiliar al que le sacaré la reparación eliminada
			let repairsArr = device.repairs;
			repairsArr = repairsArr.filter(repair => repair.id !== repairId);

			setDevice({ ...device, repairs: repairsArr });

			// Si el borrado fue exitoso
			if (res.status === 204) {
				// mostrar mensaje de exito
				toast({
					title: 'Reparación eliminada correctamente',
					// description: 'El equipo fue creado exitosamente',
					status: 'warning',
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

		deleteRepair();
	};

	const handleUpdateRepair = repairId => {
		// console.log('handleUpdateRepair')
		// console.log(repairId)
		const updateRepair = async () => {
			let description = '';
			device.repairs.forEach(repair => {
				if (repair.id === repairId) {
					description = repair.description;
				}
			});

			const res = await axios.put(`http://localhost:3001/api/repairs/${repairId}`, {
				description,
			});

			setOutdatedData(true);
			setUnsavedChanges(false);

			// console.log(res);

			// Si la actualización fue exitosa
			if (res.status === 200) {
				// mostrar mensaje de exito
				toast({
					title: 'Reparación actualizada exitosamente',
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

		updateRepair();
	};

	const handleRepairChange = (e, repairId) => {
		// console.log('handleRepairChange');
		// console.log(e.target.value)
		// console.log(repairId)

		setUnsavedChanges(true);

		let repairsArr = device.repairs;
		repairsArr.forEach(repair => {
			if (repair.id === repairId) {
				repair.description = e.target.value;
			}
		});

		// console.log(repairsArr)

		setDevice({ ...device, repairs: repairsArr });
	};

	const handleDescriptionChange = e => {
		// Solo actúo si seleccionó algo válido
		if (e.target.value !== '') {
			const match = descriptionsList.filter(item => {
				return item.description == e.target.value;
			});

			const { description, code, image, catalogue } = match[0];

			setDevice({ ...device, description, code, image, catalogue });
		}
	};

	const handleSubmit = () => {
		if (unsavedChanges) {
			setIsOpen(true);
		} else {
			handleSaveDevice();
		}
	};

	// console.log(device);

	return (
		<>
			<SkipChangesDialog isOpen={isOpen} setIsOpen={setIsOpen} handleSkipChanges={handleSaveDevice} />
			<Box bg='gray.50' border='1px' borderColor='gray.300' borderRadius='md' mt={8} p={4}>
				<Heading>Datos Equipo</Heading>
				<Divider orientation='horizontal' />
				<HStack justify='space-between' mt={4}>
					<HStack>
						<Circle size='15px' bg={getStateColor(device.state)} color='white'></Circle>
						<Badge mb={4} variant='solid' fontSize='0.8em'>
							EQUIPO: {barcode}
						</Badge>
					</HStack>
					<Tooltip label='Eliminar Equipo' placement='right-start'>
						<IconButton variant='outline' aria-label='Eliminar Equipo' fontSize='20px' icon={<FaTrash />} onClick={handleDeleteDevice} />
					</Tooltip>
				</HStack>

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

				<SimpleGrid columns={3} spacing={10}>
					<FormControl id='description' mb={4}>
						<FormLabel as='legend'>Equipo</FormLabel>

						<Select variant='outline' name='description' value={device?.description || ``} onChange={handleDescriptionChange}>
							<option value=''>Elija una descripción</option>
							{descriptionsList.length > 0 &&
								descriptionsList.map(listItem => {
									if (listItem.active) {
										return (
											<option key={listItem.id} value={listItem.description}>
												{listItem.description}
											</option>
										);
									}
								})}
						</Select>
					</FormControl>
					<FormControl id='catalogue' mb={4}>
						<FormLabel as='legend'>Catálogo Metrovias</FormLabel>
						<Input name='catalogue' value={device?.catalogue || ``} isDisabled />
					</FormControl>
					<FormControl id='code' mb={4}>
						<FormLabel as='legend'>Código Fabricante</FormLabel>
						<Input name='code' variant='filled' value={device?.code || ``} onChange={handleInputChange} isDisabled />
					</FormControl>
				</SimpleGrid>

				<FormControl id='serie' mb={4}>
					<FormLabel as='legend'>N/S</FormLabel>
					<Input name='serie' value={device?.serie || ``} onChange={handleInputChange} />
				</FormControl>

				<FormControl id='location' mb={4}>
					<FormLabel as='legend'>Ubicación</FormLabel>

					<Select variant='outline' name='location' value={device?.location || ``} onChange={handleInputChange}>
						<option value=''>Elija una Ubicación</option>
						{locations.length > 0 &&
							locations.map(location => {
								if (location.active) {
									return <option key={location.id} value={location.name}>{`(${location.cid}) ${location.name}`}</option>;
								}
							})}
					</Select>
				</FormControl>

				<FormControl id='brand' mb={4}>
					<FormLabel as='legend'>Flota</FormLabel>
					<Input name='brand' value={device?.brand || ``} onChange={handleInputChange} />
				</FormControl>
				<HStack justify='center' mt={4} spacing={5}>
					<IconButton colorScheme='teal' variant='outline' onClick={handleCancel}>
						<FaAngleLeft />
					</IconButton>
					<IconButton colorScheme='teal' variant='outline' onClick={handleSubmit}>
						<FaSave />
					</IconButton>
				</HStack>
			</Box>
			<Box bg='gray.50' border='1px' borderColor='gray.300' borderRadius='md' mt={8} p={4}>
				{device.repairs?.length > 0 ? (
					<>
						<Heading>Reparaciones</Heading>
						<Divider orientation='horizontal' />

						{device.repairs.map(
							repair =>
								repair.active && (
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
													<Text align='center'>{format(new Date(repair.entryDate), 'dd/MM/yy HH:mm:ss')}hs</Text>
												) : (
													<Text align='center'>-</Text>
												)}
											</Box>
											<Box>
												<Text fontWeight='semibold' align='center'>
													Fecha Reparación
												</Text>
												{repair.repairDate ? (
													<Text align='center'>{format(new Date(repair.repairDate), 'dd/MM/yy HH:mm:ss')}hs</Text>
												) : (
													<Text align='center'>-</Text>
												)}
											</Box>
											<Box>
												<Text fontWeight='semibold' align='center'>
													Fecha Salida
												</Text>
												{repair.exitDate ? (
													<Text align='center'>{format(new Date(repair.exitDate), 'dd/MM/yy HH:mm:ss')}hs</Text>
												) : (
													<Text align='center'>-</Text>
												)}
											</Box>
											<HStack>
												{unsavedChanges ? (
													<IconButton
														variant='outline'
														aria-label='Actualizar Reparación'
														icon={<FaSave />}
														onClick={() => handleUpdateRepair(repair.id)}
														colorScheme='teal'
													/>
												) : null}

												<Tooltip label='Eliminar Reparación' placement='right-start'>
													<IconButton
														variant='outline'
														aria-label='Eliminar Reparación'
														icon={<FaTrash />}
														onClick={() => handleDeleteRepair(repair.id)}
														colorScheme='red'
													/>
												</Tooltip>
											</HStack>
										</HStack>

										<FormControl id={`description${repair.id}`} mt={4}>
											<FormLabel as='legend'>Descripción:</FormLabel>
											<Input
												name={`description${repair.id}`}
												value={repair.description || ``}
												onChange={e => handleRepairChange(e, repair.id)}
											/>
										</FormControl>
									</Box>
								)
						)}
						{device.repairs[device.repairs.length - 1].exitDate ? (
							<Tooltip label='Crear nuevo ingreso al Laboratorio' placement='right-start'>
								<IconButton variant='outline' colorScheme='teal' onClick={() => handleNewRepair(device.id)} mt={4}>
									<FaPlus />
								</IconButton>
							</Tooltip>
						) : null}
					</>
				) : null}
			</Box>
		</>
	);
};

export default DeviceDetails;

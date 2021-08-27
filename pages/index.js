import { Input } from '@chakra-ui/input';
import { Grid, GridItem, Heading } from '@chakra-ui/layout';
import { Box } from '@chakra-ui/react';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import router from 'next/router';
import { useEffect, useState } from 'react';
import Device from '../components/Device';
import NewDeviceDialog from '../components/NewDeviceDialog';

export default function Home() {
	const [devices, setDevices] = useState([]);
	const [showingDevices, setShowingDevices] = useState([]);
	const [searchInput, setSearchInput] = useState('');
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const fetchDevices = async () => {
			const res = await axios.get('http://localhost:3001/api/devices/');
			const { data } = res;

			// console.log(data);

			setDevices(data);
			setShowingDevices(data);
		};

		fetchDevices();
	}, []);

	const handleInputChange = e => {
		const {
			target: { value: inputValue },
		} = e;

		setSearchInput(inputValue);

		// Si no hay nada ingresado en el input de búsqueda
		// Muestro todos los dispositivos
		if (inputValue === '') {
			setShowingDevices(devices);
			return;
		}
		//Si hay algo ingresado en el input de búsqueda
		// Muestro los dispositivos que coinciden con el código ingresado
		const aux = devices.filter(device => device.barcode.toString().includes(inputValue));
		setShowingDevices(aux);

		//Si no tengo resultado y ya ingresé 6 dígitos
		if (aux.length === 0 && inputValue.length === 6) {
			setIsOpen(true);
		}
	};

	const handleNewDevice = () => {
		router.push(`/details/${searchInput}`);
	};

	return (
		<>
			<Head>
				<title>Stock - CIME</title>
				<link href='/favicon.ico' rel='icon' />
			</Head>
			<Heading as='h2' size='lg'>
				Listado de Equipos
			</Heading>

			<NewDeviceDialog isOpen={isOpen} setIsOpen={setIsOpen} handleNewDevice={handleNewDevice} />

			<Input
				autoFocus
				placeholder='Ingrese los 6 dígitos del código de barras'
				mt={5}
				size='lg'
				value={searchInput}
				onChange={handleInputChange}
			/>

			<Grid gap={4} mt='6' templateColumns='repeat(auto-fill, minmax(200px,1fr))'>
				{showingDevices.map(device => (
					<GridItem key={device.id} as={Link} href={`/details/${device.barcode}`}>
						<Box
							bg='gray.50'
							border='1px'
							// borderColor={getStateColor(device.state)}
							borderColor='gray.400'
							cursor='pointer'
							p={4}
							rounded='lg'
						>
							<Device device={device} />
						</Box>
					</GridItem>
				))}
			</Grid>
		</>
	);
}

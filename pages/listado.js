import { Avatar, Box, Button, Card, CardContent, CardHeader, Container, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { grey, lightBlue, red, blue, green, deepPurple, yellow } from '@material-ui/core/colors';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
	// List
	container: {
		marginTop: theme.spacing(2),
	},

	// Device
	root: {
		margin: theme.spacing(1),
		background: grey[100],
	},
	badge: {
		backgroundColor: device => {
			if (device.line === 'A') {
				return lightBlue[900];
			}
			if (device.line === 'B') {
				return red[900];
			}
			if (device.line === 'C') {
				return blue[900];
			}
			if (device.line === 'D') {
				return green[500];
			}
			if (device.line === 'E') {
				return deepPurple[500];
			}
			if (device.line === 'H') {
				return yellow[500];
			}
			if (device.line === 'P') {
				return yellow[900];
			}
		},
	},
}));

function List() {
	const classes = useStyles();
	const [devices, setDevices] = useState([]);
	const [searchInput, setSearchInput] = useState('');

	useEffect(() => {
		const fetchDevices = async () => {
			console.log('fetchDevices');
			const res = await axios.get(`http://localhost:3000/api/devices/`);
			const { data } = res;
			if (data.success) {
				console.table(data.data);
				setDevices(data.data);
			}
		};

		fetchDevices();
	}, []);

	const handleInputChange = e => {
		const {
			target: { value: inputValue },
		} = e;

		setSearchInput(inputValue);
	};

	const handleSubmit = async e => {
		e.preventDefault();

		// Actualizo el valor de la DB
		const res = await axios.post(`http://localhost:3000/api/devices/`, {
			name: searchInput.slice(1),
			line: searchInput[0],
		});

		const {
			data: {
				data: { _id },
			},
		} = res;

		// console.log(res);

		// Actualizo la variable de estado
		setDevices([...devices, { _id: _id, name: searchInput.slice(1), line: searchInput[0] }]);
	};

	return (
		<Container maxWidth='md' className={classes.container}>
			<form onSubmit={handleSubmit}>
				<Grid container>
					<Grid item xs={11}>
						<TextField value={searchInput} placeholder='Agregar Equipo' onChange={handleInputChange} fullWidth />
					</Grid>
					<Grid item xs={1}>
						<Button type='submit' variant='contained' color='primary' size='small' fullWidth>
							AGREGAR
						</Button>
					</Grid>
				</Grid>
			</form>
			<Typography variant='h5' color='textSecondary'>
				Listado de Equipos
			</Typography>
			<Grid container>
				{devices.map(device => (
					<Grid item key={device._id} xs={6} sm={4} md={3}>
						<Device device={device} />
					</Grid>
				))}
			</Grid>
		</Container>
	);
}

const Device = ({ device }) => {
	const classes = useStyles(device);
	const { line, name } = device;
	return (
		<Card className={classes.root}>
			<CardHeader
				className={classes.cardHeader}
				avatar={
					<Avatar aria-label='linea' className={classes.badge}>
						{line}
					</Avatar>
				}
				title={name}
				subheader='barcode'
			/>
		</Card>
	);
};

export default List;

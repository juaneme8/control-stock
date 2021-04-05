import { Avatar, Box, Button, Card, CardContent, CardHeader, Container, Grid, IconButton, makeStyles, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { lightBlue, red, blue, green, deepPurple, yellow } from '@material-ui/core/colors';
import axios from 'axios';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import theme from '../src/theme';

const useStyles = makeStyles(theme => ({
	// List

	cardHeaderAction: {
		marginTop: 0,
	},

	// Device
	root: {
		margin: theme.spacing(1),
		background: '#eeeeee',
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
		<>
			<form onSubmit={handleSubmit}>
				<TextField value={searchInput} placeholder='Agregar Equipo' onChange={handleInputChange} />

				<IconButton type='submit' aria-label='delete' size='small' color='primary' disabled={!searchInput}>
					<AddIcon />
				</IconButton>
			</form>

			<Grid container>
				{devices.map(device => (
					<Grid item key={device._id} xs={4}>
						<Device device={device} />
					</Grid>
				))}
			</Grid>
		</>
	);
}

const Device = ({ device }) => {
	const classes = useStyles(device);
	const { _id, line, name } = device;

	const handleDelete = name => {
		// const newDevices = devices.filter((_, index) => index !== todoIndex);

		console.log(name);
		// setDevices([...devices, { _id: _id, name: searchInput.slice(1), line: searchInput[0] }]);
	};

	return (
		<Card className={classes.root}>
			<CardHeader
				className={classes.cardHeader}
				avatar={
					<Avatar aria-label='linea' className={classes.badge}>
						{line}
					</Avatar>
				}
				classes={{ action: classes.cardHeaderAction }}
				title={name}
				subheader='barcode'
				action={
					<IconButton aria-label='eliminar' onClick={() => handleDelete(_id)}>
						<DeleteIcon />
					</IconButton>
				}
			/>
		</Card>
	);
};

export default List;

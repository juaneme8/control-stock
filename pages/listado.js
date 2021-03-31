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
	badgeA: {
		background: lightBlue[900],
	},
	badgeB: {
		background: red[900],
	},
	badgeC: {
		background: blue[900],
	},
	badgeD: {
		background: green[500],
	},
	badgeE: {
		background: deepPurple[500],
	},
	badgeH: {
		background: yellow[500],
	},
	badgeP: {
		background: yellow[900],
	},
}));

function List() {
	const classes = useStyles();
	const [devices, setDevices] = useState([]);
	const [searchInput, setSearchInput] = useState('');
	const [refresh, setRefresh] = useState(true);

	useEffect(() => {
		const fetchDevices = async () => {
			console.log('fetchDevices');
			const res = await axios.get(`http://localhost:3000/api/devices/`);
			const { data } = res;
			if (data.success) {
				console.log(data.data);
				setDevices(data.data);
			}
			setRefresh(false);
		};

		if (refresh) fetchDevices();
	}, [refresh]);

	const handleInputChange = e => {
		const {
			target: { value: inputValue },
		} = e;

		setSearchInput(inputValue);
	};

	const handleSubmit = async e => {
		e.preventDefault();

		const lineLetters = ['A', 'B', 'C', 'D', 'E', 'H', 'P'];

		console.log('handleSubmit');

		console.log(lineLetters[searchInput[0] - 1]);

		const res = await axios.post(`http://localhost:3000/api/devices/`, {
			name: searchInput.slice(1),
			line: lineLetters[searchInput[0] - 1],
		});

		setRefresh(true);

		//setDevices([...devices, { line: 'D', name: e.target.value }]);
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
	const classes = useStyles();
	const { line, name } = device;
	return (
		<Card className={classes.root}>
			<CardHeader
				className={classes.cardHeader}
				avatar={
					<Avatar aria-label='linea' className={`${classes[`badge${line}`]}`}>
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

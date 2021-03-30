import { Avatar, Box, Card, CardContent, CardHeader, Container, makeStyles, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { grey, lightBlue, red, blue, green, deepPurple, yellow } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
	// List
	list: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
	},

	// Device
	root: {
		width: 180,
		margin: theme.spacing(1),
		background: grey[100],
	},
	cardHeader: {
		padding: theme.spacing(1, 1, 0, 1),
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
	cardContent: {
		display: 'flex',
		justifyContent: 'center',
		padding: 0,
		'&:last-child': {
			paddingBottom: 0,
		},
	},
}));

function List() {
	const classes = useStyles();

	const handleSearch = e => {
		const {
			target: { value: inputValue },
		} = e;

		console.log(inputValue);
	};

	return (
		<Container className={classes.container}>
			<TextField placeholder='Buscar' fullWidth onChange={handleSearch} />
			<Typography variant='h5' color='textSecondary'>
				Listado de Equipos
			</Typography>
			<Box className={classes.list}>
				<Device line='A' title='Equipo A' barCode='AAA' date='AA/AA/AAAA' />
				<Device line='B' title='Equipo A' barCode='AAA' date='AA/AA/AAAA' />
				<Device line='C' title='Equipo A' barCode='AAA' date='AA/AA/AAAA' />
				<Device line='D' title='Equipo A' barCode='AAA' date='AA/AA/AAAA' />
				<Device line='E' title='Equipo A' barCode='AAA' date='AA/AA/AAAA' />
				<Device line='H' title='Equipo A' barCode='AAA' date='AA/AA/AAAA' />
				<Device line='P' title='Equipo A' barCode='AAA' date='AA/AA/AAAA' />
			</Box>
		</Container>
	);
}

const Device = props => {
	const classes = useStyles(props);

	const { line, title, barCode, date } = props;

	return (
		<Card className={classes.root}>
			<CardHeader
				className={classes.cardHeader}
				avatar={
					<Avatar aria-label='linea' className={`${classes[`badge${line}`]}`}>
						{line}
					</Avatar>
				}
				title={title}
				subheader={barCode}
			/>

			<CardContent className={classes.cardContent}>
				<Typography variant='caption' color='textSecondary'>
					{date}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default List;

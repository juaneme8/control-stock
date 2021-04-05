import { Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles, Tooltip, Typography } from '@material-ui/core';
import React from 'react';
import Link from 'next/link';
import ListIcon from '@material-ui/icons/List';
const drawerWidth = 150;

const useStyles = makeStyles({
	root: {
		display: 'flex',
	},
	drawer: {
		width: drawerWidth,
	},
	drawerPaper: {
		width: drawerWidth,
	},
});

function Layout({ children }) {
	const classes = useStyles();

	const sidebarLinks = [
		{
			id: 1,
			title: 'Listado',
			url: '/listado',
			icon: <ListIcon />,
		},
	];

	return (
		<div>
			<div>app bar</div>
			<Drawer className={classes.drawer} variant='permanent' classes={{ paper: classes.drawerPaper }} anchor='left'>
				<div>
					<Typography variant='h5' className={classes.title}>
						Control Stock
					</Typography>
				</div>

				<List>
					{sidebarLinks.map(({ id, title, url, icon }) => (
						<Link key={id} href={url} passHref>
							<ListItem button component='a'>
								<Tooltip title={title}>
									<ListItemIcon>{icon}</ListItemIcon>
								</Tooltip>
								<ListItemText primary={title} />
							</ListItem>
						</Link>
					))}
				</List>
			</Drawer>

			<div>{children}</div>
		</div>
	);
}

export default Layout;

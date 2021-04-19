import {
  AppBar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import React from 'react';
import Link from 'next/link';
import ListIcon from '@material-ui/icons/List';
const drawerWidth = 150;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    padding: theme.spacing(2),
  },
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
    background: '#eeeeee',
  },
  appbar: {
    background: '#212121',
    width: `calc(100% -  ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  page: {
    background: '#f9f9f9',
    width: '100%',
    padding: theme.spacing(3),
  },
}));

function Layout({ children }) {
  const classes = useStyles();
  const sidebarLinks = [
    {
      id: 1,
      title: 'Inicio',
      url: '/',
      icon: <ListIcon />,
    },
    {
      id: 2,
      title: 'Listado',
      url: '/listado',
      icon: <ListIcon />,
    },
  ];

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} color="primary" elevation={0} position="fixed">
        <Toolbar>
          <Typography variant="h6">CIME</Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" className={classes.drawer} classes={{ paper: classes.drawerPaper }} variant="permanent">
        <div>
          <Typography className={classes.title} variant="h5">
            Menu
          </Typography>
        </div>

        <List>
          {sidebarLinks.map(({ id, title, url, icon }) => (
            <Link key={id} passHref href={url}>
              <ListItem button component="a">
                <Tooltip title={title}>
                  <ListItemIcon>{icon}</ListItemIcon>
                </Tooltip>
                <ListItemText primary={title} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <div className={classes.page}>
        <div className={classes.toolbar} />
        {children}
      </div>
    </div>
  );
}

export default Layout;

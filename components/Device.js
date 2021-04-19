import { makeStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { blue, deepPurple, green, lightBlue, red, yellow } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
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
    backgroundColor: (device) => {
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

const Device = ({ device, handleDelete }) => {
  const classes = useStyles(device);
  const { _id, line, name } = device;

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton aria-label="eliminar" onClick={() => handleDelete(_id)}>
            <DeleteIcon />
          </IconButton>
        }
        avatar={
          <Avatar aria-label="linea" className={classes.badge}>
            {line}
          </Avatar>
        }
        className={classes.cardHeader}
        classes={{ action: classes.cardHeaderAction }}
        subheader="barcode"
        title={name}
      />
    </Card>
  );
};

export default Device;

import React, { useEffect, useState } from 'react';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';

import Device from '../components/Device';

function List() {
  const [devices, setDevices] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const fetchDevices = async () => {
      // console.log('fetchDevices');
      const res = await axios.get('http://localhost:3000/api/devices/');
      const { data } = res;

      // Si el get fue exitoso
      if (data.success) {
        // console.table(data.data);
        setDevices(data.data);
      }
    };

    fetchDevices();
  }, []);

  const handleInputChange = (e) => {
    const {
      target: { value: inputValue },
    } = e;

    setSearchInput(inputValue);
  };

  const handleDelete = async (id) => {
    // console.log(id);
    const newDevices = devices.filter((device) => device._id !== id);

    // console.log(newDevices);

    await axios.delete('http://localhost:3000/api/devices/', {
      data: { _id: id },
    });

    setDevices(newDevices);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Actualizo el valor de la DB
    const res = await axios.post('http://localhost:3000/api/devices/', {
      name: searchInput.slice(1),
      line: searchInput[0].toUpperCase(),
    });

    const {
      data: {
        data: { _id },
      },
    } = res;

    // console.log(res);

    // Actualizo la variable de estado
    setDevices([
      ...devices,
      {
        _id: _id,
        name: searchInput.slice(1),
        line: searchInput[0].toUpperCase(),
      },
    ]);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField placeholder="Agregar Equipo" value={searchInput} onChange={handleInputChange} />

        <IconButton aria-label="delete" color="primary" disabled={!searchInput} size="small" type="submit">
          <AddIcon />
        </IconButton>
      </form>

      <Grid container>
        {devices.map((device) => (
          <Grid key={device._id} item xs={4}>
            <Device device={device} handleDelete={handleDelete} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default List;

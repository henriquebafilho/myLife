import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import shows from '../../../database/shows/index';

function Row(props) {
  const { row } = props;

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell align="center">{row.evento}</TableCell>
        <TableCell>{row.bandas.map(banda => {
          return <div>{banda}</div>
        })}</TableCell>
        <TableCell align="center">{row.data}</TableCell>
        <TableCell align="center">{row.local}</TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function Shows() {
  return (<>
    <div style={{ margin: '100px 0 50px 0' }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Evento</TableCell>
              <TableCell>Bandas</TableCell>
              <TableCell align="center">Data</TableCell>
              <TableCell align="center">Local</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shows.reverse().map((show) => (
              <Row key={show.evento + show.data} row={show} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  </>);
}
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import cds from '../../../database/cds/index';

function Row(props) {
    const { row } = props;

    function getCDName(name) {
        return name.replace(/[\/\\]/g, '-');
    }

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell align="center">
                    <img
                        src={'../../../database/cds/Capas/' + getCDName(row.banda + " - " + row.album) + '.png' || '../../../database/cds/Capas/Metallica - Master of Puppets.png'}
                        width={150}
                        height={150}
                        title={getCDName(row.banda + " - " + row.album)}
                        alt={getCDName(row.banda + " - " + row.album)}
                    />
                </TableCell>
                <TableCell align="left">
                    <div>
                        <div>{row.banda}</div>
                        <div>{row.album}</div>
                        <div>{row.ano}</div>
                    </div>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function CDs() {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Capa</TableCell>
                        <TableCell align="start">Informações</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cds.map((cd) => (
                        <Row key={cd.banda + cd.album} row={cd} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
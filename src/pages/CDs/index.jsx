import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Modal } from '@mui/material';
import cds from '../../../database/cds/index';

function Row(props) {
    const { row } = props;
    const [openModal, setOpenModal] = useState(false);
    const modalImgSize = 400;
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: modalImgSize
    };

    function getCDName(name) {
        return name.replace(/[\/\\]/g, '-');
    }

    return (<>
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell align="center">
                    <Button onClick={() => setOpenModal(true)}>
                        <img
                            src={'../../../database/cds/Capas/' + getCDName(row.banda + " - " + row.album) + '.png' || '../../../database/cds/Capas/Metallica - Master of Puppets.png'}
                            width={150}
                            height={150}
                            title={getCDName(row.banda + " - " + row.album)}
                            alt={getCDName(row.banda + " - " + row.album)}
                        />
                    </Button>
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

        <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <img
                    src={'../../../database/cds/Capas/' + getCDName(row.banda + " - " + row.album) + '.png' || '../../../database/cds/Capas/Metallica - Master of Puppets.png'}
                    width={modalImgSize}
                    height={modalImgSize}
                    title={getCDName(row.banda + " - " + row.album)}
                    alt={getCDName(row.banda + " - " + row.album)}
                />
            </Box>
        </Modal>
    </>
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
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import cds from '../../../database/cds/index';

function getCDName(banda, album) {
    return (banda + " - " + album).replace(/[\/\\]/g, '-');
}

function CDCard({ cd }) {
    const [openModal, setOpenModal] = useState(false);
    const imageName = getCDName(cd.banda, cd.album);
    const imageSrc = import.meta.env.BASE_URL + 'Capas/' + imageName + '.png';

    return (
        <>
            <Box sx={{ width: 150, textAlign: 'center' }}>
                <Button
                    onClick={() => setOpenModal(true)}
                    sx={{
                        p: 0,
                        minWidth: 0,
                        display: 'block',
                        '& img': {
                            transition: 'transform 0.2s ease, filter 0.2s ease',
                            borderRadius: '4px',
                            display: 'block',
                        },
                        '&:hover img': {
                            transform: 'scale(1.06)',
                            filter: 'drop-shadow(0 0 10px rgba(88, 166, 255, 0.45))',
                        },
                    }}
                >
                    <img src={imageSrc} width={150} height={150} title={imageName} alt={imageName} />
                </Button>
                <Typography variant="body2" sx={{ mt: 0.75, lineHeight: 1.3, color: 'text.primary' }}>
                    {cd.album}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    {cd.ano ?? '—'}
                </Typography>
            </Box>

            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                }}>
                    <img src={imageSrc} width={400} height={400} title={imageName} alt={imageName} style={{ display: 'block' }} />
                </Box>
            </Modal>
        </>
    );
}

export default function CDs() {
    const [view, setView] = useState('todos');
    const [search, setSearch] = useState('');

    const grouped = cds.reduce((acc, cd) => {
        if (!acc[cd.banda]) acc[cd.banda] = [];
        acc[cd.banda].push(cd);
        return acc;
    }, {});

    const bands = Object.keys(grouped).sort((a, b) => a.localeCompare(b));

    const normalize = str => str.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
    const filteredBands = bands.filter(b => normalize(b).includes(normalize(search)));

    return (
        <Box sx={{ mt: '80px', px: { xs: 2, md: 4 }, pb: 6 }}>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4, flexWrap: 'wrap', gap: 2 }}>
                <Typography variant="h4">CDs</Typography>
                <ToggleButtonGroup
                    value={view}
                    exclusive
                    onChange={(_, v) => { if (v) { setView(v); setSearch(''); } }}
                    size="small"
                >
                    <ToggleButton value="todos">Todos</ToggleButton>
                    <ToggleButton value="bandas">Por Banda</ToggleButton>
                </ToggleButtonGroup>
            </Box>

            {/* Todos — grouped by band, all visible */}
            {view === 'todos' && (
                <Box>
                    {bands.map(banda => (
                        <Box key={banda} sx={{ mb: 5 }}>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'baseline',
                                gap: 2,
                                mb: 2,
                                pb: 1,
                                borderBottom: '1px solid #30363d',
                            }}>
                                <Typography variant="h5">{banda}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {grouped[banda].length} {grouped[banda].length === 1 ? 'CD' : 'CDs'}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                                {grouped[banda].map(cd => (
                                    <CDCard key={cd.banda + cd.album} cd={cd} />
                                ))}
                            </Box>
                        </Box>
                    ))}
                </Box>
            )}

            {/* Por Banda — accordion with search */}
            {view === 'bandas' && (
                <Box>
                    <Box sx={{
                        display: 'flex', alignItems: 'center', gap: 1,
                        mb: 3, px: 2, py: 1,
                        backgroundColor: '#161b22',
                        border: '1px solid #30363d',
                        borderRadius: '8px',
                    }}>
                        <SearchIcon sx={{ color: '#8b949e', fontSize: 20 }} />
                        <InputBase
                            placeholder="Buscar banda..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            sx={{ flex: 1, color: 'text.primary', fontSize: '0.95rem' }}
                        />
                    </Box>
                    {filteredBands.map(banda => (
                        <Accordion key={banda} disableGutters sx={{
                            backgroundColor: '#161b22',
                            border: '1px solid #30363d',
                            borderRadius: '8px !important',
                            mb: 1.5,
                            '&:before': { display: 'none' },
                        }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#8b949e' }} />}>
                                <Typography variant="h6" sx={{ mr: 1.5 }}>{banda}</Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ alignSelf: 'center' }}>
                                    {grouped[banda].length} {grouped[banda].length === 1 ? 'CD' : 'CDs'}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ pt: 1, borderTop: '1px solid #30363d' }}>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                                    {grouped[banda].map(cd => (
                                        <CDCard key={cd.banda + cd.album} cd={cd} />
                                    ))}
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>
            )}

        </Box>
    );
}

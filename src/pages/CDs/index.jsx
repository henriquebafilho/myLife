import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
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
            <Box sx={{ textAlign: 'center' }}>
                <Button
                    onClick={() => setOpenModal(true)}
                    sx={{
                        p: 0,
                        minWidth: 0,
                        display: 'block',
                        width: '100%',
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
                    <img src={imageSrc} title={imageName} alt={imageName} style={{ width: '100%', aspectRatio: '1', objectFit: 'cover' }} />
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

const TAB_PATHS = ['/cds', '/cds/bandas'];

export default function CDs() {
    const navigate = useNavigate();
    const location = useLocation();
    const [search, setSearch] = useState('');

    const view = location.pathname.startsWith('/cds/bandas') ? 'bandas' : 'todos';

    const grouped = cds.reduce((acc, cd) => {
        if (!acc[cd.banda]) acc[cd.banda] = [];
        acc[cd.banda].push(cd);
        return acc;
    }, {});

    const bands = Object.keys(grouped).sort((a, b) => a.localeCompare(b));

    const normalize = str => str.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
    const filteredBands = bands.filter(b => normalize(b).includes(normalize(search)));
    const filteredCds = cds.filter(cd => {
        const term = normalize(search);
        return normalize(cd.banda).includes(term)
            || normalize(cd.album).includes(term)
            || String(cd.ano).includes(search.trim());
    });

    return (
        <Box sx={{ mt: '80px', px: { xs: 2, md: 4 }, pb: 6 }}>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4, flexWrap: 'wrap', gap: 2 }}>
                <Typography variant="h4">CDs</Typography>
                <ToggleButtonGroup
                    value={view}
                    exclusive
                    onChange={(_, v) => { if (v) { navigate(TAB_PATHS[v === 'bandas' ? 1 : 0]); setSearch(''); } }}
                    size="small"
                >
                    <ToggleButton value="todos">Todos</ToggleButton>
                    <ToggleButton value="bandas">Banda</ToggleButton>
                </ToggleButtonGroup>
            </Box>

            <Routes>
            <Route path="/" element={
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
                            placeholder="Buscar banda, álbum ou ano..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            sx={{ flex: 1, color: 'text.primary', fontSize: '0.95rem' }}
                        />
                    </Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                        {filteredCds.length} {filteredCds.length === 1 ? 'CD encontrado' : 'CDs encontrados'}
                    </Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 3 }}>
                        {filteredCds.map(cd => (
                            <CDCard key={cd.banda + cd.album} cd={cd} />
                        ))}
                    </Box>
                </Box>
            } />

            <Route path="bandas" element={
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
                                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 3 }}>
                                    {grouped[banda].map(cd => (
                                        <CDCard key={cd.banda + cd.album} cd={cd} />
                                    ))}
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>
            } />
            </Routes>

        </Box>
    );
}

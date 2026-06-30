import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MuiTabs from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import shows from '../../../database/shows/index';

function parseDate(dateStr) {
    return dateStr.split('/').reverse().join('');
}

function formatDate(dateStr) {
    const [d, m, y] = dateStr.split('/');
    return `${d}/${m}/${y}`;
}

const bandAliases = {
    'Matanza Ritual': 'Matanza',
};

const localAliases = {
    'HSBC Arena': 'Farmasi Arena',
    'Jeunesse Arena': 'Farmasi Arena',
    'Teatro Odisseia': 'Agyto',
};

function normalizeBanda(banda) {
    return bandAliases[banda] || banda;
}

function normalizeLocal(local) {
    return localAliases[local] || local;
}

const sorted = [...shows].sort((a, b) => parseDate(b.data).localeCompare(parseDate(a.data)));

const byBanda = {};
sorted.forEach(show => {
    show.bandas.forEach(banda => {
        const key = normalizeBanda(banda);
        if (!byBanda[key]) byBanda[key] = [];
        byBanda[key].push(show);
    });
});

const byLocal = {};
sorted.forEach(show => {
    const key = normalizeLocal(show.local);
    if (!byLocal[key]) byLocal[key] = [];
    byLocal[key].push(show);
});

const bandas = Object.keys(byBanda).sort((a, b) => {
    const diff = byBanda[b].length - byBanda[a].length;
    return diff !== 0 ? diff : a.localeCompare(b, 'pt');
});
const locais = Object.keys(byLocal).sort((a, b) => byLocal[b].length - byLocal[a].length);
const mostSeenBanda = Object.entries(byBanda).sort((a, b) => b[1].length - a[1].length)[0];

const statBoxStyle = {
    flex: '1 1 160px',
    backgroundColor: '#161b22',
    border: '1px solid #30363d',
    borderRadius: '8px',
    p: 2,
    textAlign: 'center',
};

function ShowCard({ show, onSelectLocal }) {
    const emOrdem = show.bandas;
    const total = emOrdem.length;

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { sm: 'flex-start' },
            gap: 2,
            py: 2,
            borderBottom: '1px solid #30363d',
            '&:last-child': { borderBottom: 'none' },
        }}>
            <Box sx={{ minWidth: 90, pt: 0.3 }}>
                <Typography variant="caption" color="text.secondary">
                    {formatDate(show.data)}
                </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
                    {emOrdem.map((banda, i) => {
                        const isHeadliner = i === 0;
                        const progress = total === 1 ? 1 : 1 - i / (total - 1);
                        const fontSize = 0.7 + progress * 0.55;
                        const opacity = 0.45 + progress * 0.55;
                        return (
                            <Typography key={banda} sx={{
                                fontSize: `${fontSize}rem`,
                                fontWeight: isHeadliner ? 700 : 500,
                                opacity,
                                lineHeight: 1.3,
                                color: 'text.primary',
                            }}>
                                {banda}
                            </Typography>
                        );
                    })}
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.75, display: 'block' }}>
                    {show.evento} ·{' '}
                    <Typography
                        component="span"
                        variant="caption"
                        onClick={() => onSelectLocal && onSelectLocal(normalizeLocal(show.local))}
                        sx={{
                            cursor: onSelectLocal ? 'pointer' : 'default',
                            color: onSelectLocal ? '#58a6ff' : 'text.secondary',
                            '&:hover': onSelectLocal ? { textDecoration: 'underline' } : {},
                        }}
                    >
                        {show.local}
                    </Typography>
                </Typography>
            </Box>
        </Box>
    );
}


export default function Shows() {
    const [tab, setTab] = useState(0);
    const [bandaSearch, setBandaSearch] = useState('');
    const [localSearch, setLocalSearch] = useState('');

    const selectLocal = (local) => {
        setTab(2);
        setLocalSearch(local);
        window.scrollTo({ top: 0, behavior: 'auto' });
    };

    const normalize = str => str.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

    const filteredBandas = bandas.filter(b => normalize(b).includes(normalize(bandaSearch)));
    const filteredLocais = locais.filter(l => normalize(l).includes(normalize(localSearch)));

    return (
        <Box sx={{ mt: '80px', px: { xs: 2, md: 4 }, pb: 6 }}>

            {/* Stats */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
                <Box sx={statBoxStyle}>
                    <Typography variant="h4">{shows.length}</Typography>
                    <Typography variant="body2" color="text.secondary">shows</Typography>
                </Box>
                <Box sx={statBoxStyle}>
                    <Typography variant="h4">{bandas.length}</Typography>
                    <Typography variant="body2" color="text.secondary">bandas diferentes</Typography>
                </Box>
                <Box sx={statBoxStyle}>
                    <Typography variant="h5" sx={{ mb: 0.25 }}>{mostSeenBanda[0]}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        banda mais vista · {mostSeenBanda[1].length}x
                    </Typography>
                </Box>
                <Box sx={statBoxStyle}>
                    <Typography variant="h5" sx={{ mb: 0.25 }}>{locais[0]}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        casa de shows mais frequentada · {byLocal[locais[0]].length} shows
                    </Typography>
                </Box>
            </Box>

            {/* Tabs */}
            <MuiTabs
                value={tab}
                onChange={(_, v) => { setTab(v); window.scrollTo({ top: 0, behavior: 'auto' }); }}
                sx={{ mb: 3, borderBottom: '1px solid #30363d' }}
            >
                <MuiTab label="Eventos" />
                <MuiTab label="Bandas" />
                <MuiTab label="Local" />
            </MuiTabs>

            {/* Eventos */}
            {tab === 0 && (
                <Box>
                    {(() => {
                        let currentYear = null;
                        return sorted.map(show => {
                            const year = show.data.split('/')[2];
                            const showDivider = year !== currentYear;
                            currentYear = year;
                            return (
                                <React.Fragment key={show.evento + show.data}>
                                    {showDivider && (
                                        <Box sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 2,
                                            my: 3,
                                        }}>
                                            <Box sx={{ flex: 1, height: '1px', backgroundColor: '#30363d' }} />
                                            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, letterSpacing: 1 }}>
                                                {year}
                                            </Typography>
                                            <Box sx={{ flex: 1, height: '1px', backgroundColor: '#30363d' }} />
                                        </Box>
                                    )}
                                    <ShowCard show={show} onSelectLocal={selectLocal} />
                                </React.Fragment>
                            );
                        });
                    })()}
                </Box>
            )}

            {/* Bandas */}
            {tab === 1 && (
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
                            value={bandaSearch}
                            onChange={e => setBandaSearch(e.target.value)}
                            sx={{ flex: 1, color: 'text.primary', fontSize: '0.95rem' }}
                        />
                    </Box>
                    {filteredBandas.map(banda => (
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
                                    {byBanda[banda].length} {byBanda[banda].length === 1 ? 'show' : 'shows'}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ pt: 0, borderTop: '1px solid #30363d' }}>
                                {byBanda[banda].map(show => (
                                    <ShowCard key={show.evento + show.data} show={show} onSelectLocal={selectLocal} />
                                ))}
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>
            )}

            {/* Por Local */}
            {tab === 2 && (
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
                            placeholder="Buscar local..."
                            value={localSearch}
                            onChange={e => setLocalSearch(e.target.value)}
                            sx={{ flex: 1, color: 'text.primary', fontSize: '0.95rem' }}
                        />
                    </Box>
                    {filteredLocais.map(local => (
                        <Accordion key={local} disableGutters sx={{
                            backgroundColor: '#161b22',
                            border: '1px solid #30363d',
                            borderRadius: '8px !important',
                            mb: 1.5,
                            '&:before': { display: 'none' },
                        }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#8b949e' }} />}>
                                <Typography variant="h6" sx={{ mr: 1.5 }}>{local}</Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ alignSelf: 'center' }}>
                                    {byLocal[local].length} {byLocal[local].length === 1 ? 'show' : 'shows'}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ pt: 0, borderTop: '1px solid #30363d' }}>
                                {byLocal[local].map(show => (
                                    <ShowCard key={show.evento + show.data} show={show} onSelectLocal={selectLocal} />
                                ))}
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>
            )}

        </Box>
    );
}

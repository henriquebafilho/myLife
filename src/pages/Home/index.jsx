import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import StadiumIcon from '@mui/icons-material/Stadium';
import MusicNote from '@mui/icons-material/MusicNote';
import Album from '@mui/icons-material/Album';
import rawJogos from '../../../database/jogos/index';
import rawOutros from '../../../database/outros/index';
import shows from '../../../database/shows/index';
import cds from '../../../database/cds/index';

const jogos = rawJogos.filter(j => j && typeof j === 'object' && j.mandante);
const outros = rawOutros.filter(j => j && typeof j === 'object' && j.mandante);

const estadiosVisitados = new Set();
[...jogos, ...outros].forEach(j => { if (j.estadio) estadiosVisitados.add(j.estadio); });

// Shows highlights
const bandAliases = { 'Matanza Ritual': 'Matanza' };
const bandaCount = {};
shows.forEach(show => {
    show.bandas.forEach(banda => {
        const key = bandAliases[banda] || banda;
        bandaCount[key] = (bandaCount[key] || 0) + 1;
    });
});
const topBanda = Object.entries(bandaCount).sort((a, b) => b[1] - a[1])[0];

const localAliases = { 'HSBC Arena': 'Farmasi Arena', 'Jeunesse Arena': 'Farmasi Arena', 'Teatro Odisseia': 'Agyto' };
const localCount = {};
shows.forEach(show => {
    const key = localAliases[show.local] || show.local;
    localCount[key] = (localCount[key] || 0) + 1;
});
const topLocal = Object.entries(localCount).sort((a, b) => b[1] - a[1])[0];

// Por ano
const jogosPorAno = {};
jogos.forEach(j => {
    const ano = j.data.split('-')[0];
    jogosPorAno[ano] = (jogosPorAno[ano] || 0) + 1;
});

const showsPorAno = {};
shows.forEach(s => {
    const ano = s.data.split('/')[2];
    showsPorAno[ano] = (showsPorAno[ano] || 0) + 1;
});

const allAnos = Array.from(new Set([
    ...Object.keys(jogosPorAno),
    ...Object.keys(showsPorAno),
])).sort();

const melhorAnoJogos = Object.entries(jogosPorAno).sort((a, b) => b[1] - a[1])[0];
const melhorAnoShows = Object.entries(showsPorAno).sort((a, b) => b[1] - a[1])[0];

function GraficoPorAno({ dados, cor, corDestaque, label }) {
    const [hover, setHover] = useState(null);
    const max = Math.max(...dados.map(d => d.count), 1);
    const melhorAno = dados.reduce((best, d) => d.count > best.count ? d : best, { count: 0 }).ano;

    return (
        <Box>
            <Box sx={{ position: 'relative', display: 'flex', alignItems: 'flex-end', gap: '2px', height: 80, mb: 1 }}>
                {dados.map(({ ano, count }) => {
                    const isHover = hover === ano;
                    const isBest = ano === melhorAno && count > 0;
                    return (
                        <Box
                            key={ano}
                            onMouseEnter={() => setHover(ano)}
                            onMouseLeave={() => setHover(null)}
                            sx={{
                                flex: 1,
                                height: count > 0 ? `${Math.max((count / max) * 100, 4)}%` : '4%',
                                backgroundColor: count === 0 ? '#21262d' : isBest ? corDestaque : cor,
                                borderRadius: '2px 2px 0 0',
                                opacity: isHover ? 1 : 0.75,
                                transition: 'opacity 0.1s, background-color 0.1s',
                                cursor: 'default',
                                position: 'relative',
                            }}
                        >
                            {isHover && count > 0 && (
                                <Box sx={{
                                    position: 'absolute',
                                    bottom: '100%',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    mb: 0.5,
                                    backgroundColor: '#30363d',
                                    border: '1px solid #484f58',
                                    borderRadius: '4px',
                                    px: 0.75,
                                    py: 0.25,
                                    whiteSpace: 'nowrap',
                                    zIndex: 10,
                                    pointerEvents: 'none',
                                }}>
                                    <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, color: '#e6edf3' }}>
                                        {count} {label}
                                    </Typography>
                                    <Typography sx={{ fontSize: '0.6rem', color: '#8b949e' }}>
                                        {ano}
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    );
                })}
            </Box>

            {/* Year labels every 5 years */}
            <Box sx={{ display: 'flex', gap: '2px' }}>
                {dados.map(({ ano }) => (
                    <Box key={ano} sx={{ flex: 1, textAlign: 'center' }}>
                        {ano % 5 === 0 && (
                            <Typography sx={{ fontSize: '0.6rem', color: '#8b949e' }}>{ano}</Typography>
                        )}
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

function SectionCard({ icon, label, count, onClick }) {
    return (
        <Box onClick={onClick} sx={{
            flex: '1 1 180px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            py: 4,
            px: 3,
            backgroundColor: '#161b22',
            border: '1px solid #30363d',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
            '&:hover': {
                borderColor: '#58a6ff',
                boxShadow: '0 0 20px rgba(88,166,255,0.15)',
                transform: 'translateY(-3px)',
            },
        }}>
            <Box sx={{ color: '#58a6ff', display: 'flex' }}>{icon}</Box>
            <Typography variant="h2" sx={{ lineHeight: 1 }}>{count}</Typography>
            <Typography variant="body2" color="text.secondary">{label}</Typography>
        </Box>
    );
}

function HighlightCard({ label, value, detail }) {
    return (
        <Box sx={{
            flex: '1 1 180px',
            py: 2.5,
            px: 3,
            backgroundColor: '#161b22',
            border: '1px solid #30363d',
            borderRadius: '12px',
        }}>
            <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                {label}
            </Typography>
            <Typography variant="h6" sx={{ mt: 0.5, mb: 0.25 }}>{value}</Typography>
            <Typography variant="caption" color="text.secondary">{detail}</Typography>
        </Box>
    );
}

export default function Home({ onNavigate }) {
    const [grafFiltro, setGrafFiltro] = useState('jogos');
    const botafogoShield = import.meta.env.BASE_URL + 'escudos/Botafogo.png';
    const foto = import.meta.env.BASE_URL + 'foto.png';

    const dadosGrafico = allAnos.map(ano => ({
        ano,
        count: grafFiltro === 'jogos' ? (jogosPorAno[ano] || 0) : (showsPorAno[ano] || 0),
    }));

    const melhor = grafFiltro === 'jogos' ? melhorAnoJogos : melhorAnoShows;

    return (
        <Box sx={{ mt: '80px', px: { xs: 2, md: 6 }, pb: 6 }}>

            {/* Hero */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: { xs: 4, md: 6 }, gap: 2 }}>
                <Box sx={{ position: 'relative', width: 148, height: 148 }}>
                    <Box sx={{
                        width: 148, height: 148, borderRadius: '50%', overflow: 'hidden',
                        border: '3px solid #30363d', boxShadow: '0 0 24px rgba(88,166,255,0.18)',
                    }}>
                        <img src={foto} alt="Henrique Filho" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 0%' }} />
                    </Box>
                    <Box sx={{
                        position: 'absolute', bottom: 4, right: 4, width: 40, height: 40,
                        borderRadius: '50%', backgroundColor: '#0d1117', border: '2px solid #30363d',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', p: '4px',
                    }}>
                        <img src={botafogoShield} alt="Botafogo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </Box>
                </Box>
                <Typography variant="h1" sx={{ fontSize: { xs: '3rem', md: '5rem' }, lineHeight: 1, textAlign: 'center' }}>
                    Henrique Filho
                </Typography>
            </Box>

            {/* Section cards */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 5 }}>
                <SectionCard icon={<StadiumIcon sx={{ fontSize: 36 }} />} label="jogos do Botafogo" count={jogos.length} onClick={() => onNavigate('jogos')} />
                <SectionCard icon={<MusicNote sx={{ fontSize: 36 }} />} label="shows" count={shows.length} onClick={() => onNavigate('shows')} />
                <SectionCard icon={<Album sx={{ fontSize: 36 }} />} label="CDs na coleção" count={cds.length} onClick={() => onNavigate('cds')} />
            </Box>

            {/* Por ano */}
            <Box sx={{ mb: 5, p: 3, backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '12px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, mb: 2.5 }}>
                    <Box>
                        <Typography variant="h6">Por ano</Typography>
                        {melhor && (
                            <Typography variant="caption" color="text.secondary">
                                melhor ano: <Box component="span" sx={{ color: grafFiltro === 'jogos' ? '#3fb950' : '#e3b341', fontWeight: 700 }}>{melhor[0]}</Box>
                                {' '}· {melhor[1]} {grafFiltro === 'jogos' ? 'jogos' : 'shows'}
                            </Typography>
                        )}
                    </Box>
                    <ToggleButtonGroup
                        value={grafFiltro}
                        exclusive
                        onChange={(_, v) => { if (v) setGrafFiltro(v); }}
                        size="small"
                    >
                        <ToggleButton value="jogos">Jogos</ToggleButton>
                        <ToggleButton value="shows">Shows</ToggleButton>
                    </ToggleButtonGroup>
                </Box>
                <GraficoPorAno
                    dados={dadosGrafico}
                    cor={grafFiltro === 'jogos' ? '#58a6ff' : '#e3b341'}
                    corDestaque={grafFiltro === 'jogos' ? '#3fb950' : '#f0a500'}
                    label={grafFiltro === 'jogos' ? 'jogos' : 'shows'}
                />
            </Box>

            {/* Highlights */}
            <Typography variant="h5" sx={{ mb: 2, color: 'text.secondary' }}>Destaques</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <HighlightCard label="Estádios visitados" value={estadiosVisitados.size} detail="Botafogo e outros jogos" />
                <HighlightCard label="Banda mais vista ao vivo" value={topBanda[0]} detail={`${topBanda[1]} shows`} />
                <HighlightCard label="Casa de shows mais frequentada" value={topLocal[0]} detail={`${topLocal[1]} shows`} />
            </Box>

        </Box>
    );
}

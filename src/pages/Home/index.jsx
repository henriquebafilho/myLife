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

const todosPorAno = {};
allAnos.forEach(ano => {
    todosPorAno[ano] = (jogosPorAno[ano] || 0) + (showsPorAno[ano] || 0);
});

const melhorAnoJogos = Object.entries(jogosPorAno).sort((a, b) => b[1] - a[1])[0];
const melhorAnoShows = Object.entries(showsPorAno).sort((a, b) => b[1] - a[1])[0];
const melhorAnoTodos = Object.entries(todosPorAno).sort((a, b) => b[1] - a[1])[0];

function GraficoPorAno({ dados, cor, corDestaque, label, dadosStack, cor2, label2 }) {
    const [hover, setHover] = useState(null);
    const totais = dadosStack
        ? dados.map((d, i) => d.count + (dadosStack[i]?.count || 0))
        : dados.map(d => d.count);
    const max = Math.max(...totais, 1);
    const melhorAno = dadosStack
        ? allAnos[totais.indexOf(Math.max(...totais))]
        : dados.reduce((best, d) => d.count > best.count ? d : best, { count: 0 }).ano;

    return (
        <Box>
            <Box sx={{ position: 'relative', display: 'flex', alignItems: 'flex-end', gap: '2px', height: 80, mb: 1 }}>
                {dados.map(({ ano, count }, idx) => {
                    const isHover = hover === ano;
                    const count2 = dadosStack ? (dadosStack[idx]?.count || 0) : 0;
                    const total = dadosStack ? count + count2 : count;
                    const isBest = ano === melhorAno && total > 0;

                    if (dadosStack) {
                        return (
                            <Box
                                key={ano}
                                onMouseEnter={() => setHover(ano)}
                                onMouseLeave={() => setHover(null)}
                                sx={{
                                    flex: 1,
                                    height: total > 0 ? `${Math.max((total / max) * 100, 4)}%` : '4%',
                                    position: 'relative',
                                    cursor: 'default',
                                }}
                            >
                                <Box sx={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column-reverse',
                                    borderRadius: '2px 2px 0 0',
                                    overflow: 'hidden',
                                    opacity: isHover ? 1 : isBest ? 0.95 : 0.75,
                                    transition: 'opacity 0.1s',
                                }}>
                                    {count > 0 && <Box sx={{ flex: count, backgroundColor: cor }} />}
                                    {count2 > 0 && <Box sx={{ flex: count2, backgroundColor: cor2 }} />}
                                    {total === 0 && <Box sx={{ flex: 1, backgroundColor: '#21262d' }} />}
                                </Box>
                                {isHover && total > 0 && (
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
                                        {count > 0 && (
                                            <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, color: cor }}>
                                                {count} {label}
                                            </Typography>
                                        )}
                                        {count2 > 0 && (
                                            <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, color: cor2 }}>
                                                {count2} {label2}
                                            </Typography>
                                        )}
                                        <Typography sx={{ fontSize: '0.6rem', color: '#8b949e' }}>
                                            {ano}
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        );
                    }

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
    const [grafFiltro, setGrafFiltro] = useState('tudo');
    const botafogoShield = import.meta.env.BASE_URL + 'escudos/Botafogo.png';
    const foto = import.meta.env.BASE_URL + 'foto.png';

    const dadosJogos = allAnos.map(ano => ({ ano, count: jogosPorAno[ano] || 0 }));
    const dadosShows = allAnos.map(ano => ({ ano, count: showsPorAno[ano] || 0 }));

    const dadosGrafico = grafFiltro === 'jogos' ? dadosJogos
        : grafFiltro === 'shows' ? dadosShows
        : dadosJogos;

    const dadosStack = grafFiltro === 'tudo' ? dadosShows : null;

    const melhor = grafFiltro === 'jogos' ? melhorAnoJogos
        : grafFiltro === 'shows' ? melhorAnoShows
        : melhorAnoTodos;

    const melhorLabel = grafFiltro === 'jogos' ? 'jogos'
        : grafFiltro === 'shows' ? 'shows'
        : 'eventos';

    const melhorColor = grafFiltro === 'jogos' ? '#3fb950'
        : grafFiltro === 'shows' ? '#e3b341'
        : '#e6edf3';

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
                                melhor ano: <Box component="span" sx={{ color: melhorColor, fontWeight: 700 }}>{melhor[0]}</Box>
                                {' '}· {melhor[1]} {melhorLabel}
                            </Typography>
                        )}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {grafFiltro === 'tudo' && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <Box sx={{ width: 10, height: 10, borderRadius: '2px', backgroundColor: '#58a6ff' }} />
                                    <Typography variant="caption" color="text.secondary">jogos</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <Box sx={{ width: 10, height: 10, borderRadius: '2px', backgroundColor: '#e3b341' }} />
                                    <Typography variant="caption" color="text.secondary">shows</Typography>
                                </Box>
                            </Box>
                        )}
                        <ToggleButtonGroup
                            value={grafFiltro}
                            exclusive
                            onChange={(_, v) => { if (v) setGrafFiltro(v); }}
                            size="small"
                        >
                            <ToggleButton value="tudo">Tudo</ToggleButton>
                            <ToggleButton value="jogos">Jogos</ToggleButton>
                            <ToggleButton value="shows">Shows</ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                </Box>
                <GraficoPorAno
                    dados={dadosGrafico}
                    dadosStack={dadosStack}
                    cor='#58a6ff'
                    corDestaque='#3fb950'
                    cor2='#e3b341'
                    label='jogos'
                    label2='shows'
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

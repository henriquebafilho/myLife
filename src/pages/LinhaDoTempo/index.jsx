import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import rawJogos from '../../../database/jogos/index';
import rawOutros from '../../../database/outros/index';
import shows from '../../../database/shows/index';
import Times from '../Jogos/Times';

const bandAliases = { 'Matanza Ritual': 'Matanza' };

const MONTHS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

function showToISO(dateStr) {
    const [d, m, y] = dateStr.split('/');
    return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
}

function formatShort(isoDate) {
    const [, m, d] = isoDate.split('-');
    return `${parseInt(d)} ${MONTHS[parseInt(m) - 1]}`;
}

const jogos = rawJogos.filter(j => j && typeof j === 'object' && j.mandante);
const outros = rawOutros.filter(j => j && typeof j === 'object' && j.mandante);

const allEvents = [
    ...jogos.map(j => ({ type: 'jogo', isoDate: j.data, raw: j })),
    ...outros.map(j => ({ type: 'outro', isoDate: j.data, raw: j })),
    ...shows.map(s => ({ type: 'show', isoDate: showToISO(s.data), raw: s })),
].sort((a, b) => b.isoDate.localeCompare(a.isoDate));

const byYear = {};
allEvents.forEach(e => {
    const year = e.isoDate.slice(0, 4);
    if (!byYear[year]) byYear[year] = [];
    byYear[year].push(e);
});

const years = Object.keys(byYear).sort((a, b) => b - a);

function EventRow({ event }) {
    const { type, isoDate, raw: r } = event;
    const isJogo = type === 'jogo';
    const isOutro = type === 'outro';
    const isShow = type === 'show';

    let title, subtitle;

    if (isJogo || isOutro) {
        title = `${r.mandante} ${r.golsMandante}×${r.golsVisitante} ${r.visitante}`;
        subtitle = `${r.campeonato} · ${r.estadio}`;
    } else {
        title = r.bandas.map(b => bandAliases[b] || b).join(', ');
        subtitle = `${r.evento} · ${r.local}`;
    }

    const escudoBase = import.meta.env.BASE_URL + 'escudos/';
    const mandanteEscudo = !isShow ? Times(r.mandante, r.data).escudo : null;
    const visitanteEscudo = !isShow ? Times(r.visitante, r.data).escudo : null;

    const shield = (escudo, alt) => (
        <img
            src={escudoBase + escudo + '.png'}
            alt={alt}
            style={{ width: 20, height: 20, objectFit: 'contain', flexShrink: 0 }}
            onError={(e) => { e.target.src = escudoBase + 'escudo.png'; }}
        />
    );

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            py: 1.25,
            borderBottom: '1px solid #21262d',
            '&:last-child': { borderBottom: 'none' },
        }}>
            <Typography variant="caption" color="text.secondary" sx={{ minWidth: 48, flexShrink: 0 }}>
                {formatShort(isoDate)}
            </Typography>
            <Box sx={{ flex: 1, minWidth: 0 }}>
                {isShow ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, minWidth: 0 }}>
                        <MusicNoteIcon sx={{ fontSize: 14, color: '#e3b341', flexShrink: 0 }} />
                        <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.3 }} noWrap>
                            {title}
                        </Typography>
                    </Box>
                ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, minWidth: 0 }}>
                        {shield(mandanteEscudo, r.mandante)}
                        <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.3 }} noWrap>
                            {title}
                        </Typography>
                        {shield(visitanteEscudo, r.visitante)}
                    </Box>
                )}
                <Typography variant="caption" color="text.secondary" noWrap sx={{ display: 'block' }}>
                    {subtitle}
                </Typography>
            </Box>
        </Box>
    );
}

export default function LinhaDoTempo() {
    return (
        <Box sx={{ mt: '80px', px: { xs: 2, md: 4 }, pb: 6 }}>
            <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>Linha do Tempo</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                {jogos.length + outros.length} jogos · {shows.length} shows
            </Typography>

            {years.map(year => {
                const events = byYear[year];
                const nJogos = events.filter(e => e.type === 'jogo' || e.type === 'outro').length;
                const nShows = events.filter(e => e.type === 'show').length;
                const parts = [];
                if (nJogos) parts.push(`${nJogos} ${nJogos === 1 ? 'jogo' : 'jogos'}`);
                if (nShows) parts.push(`${nShows} ${nShows === 1 ? 'show' : 'shows'}`);

                return (
                    <Box key={year} sx={{ mb: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                            <Box sx={{ flex: 1, height: '1px', backgroundColor: '#30363d' }} />
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1 }}>{year}</Typography>
                                <Typography variant="caption" color="text.secondary">{parts.join(' · ')}</Typography>
                            </Box>
                            <Box sx={{ flex: 1, height: '1px', backgroundColor: '#30363d' }} />
                        </Box>
                        <Box sx={{
                            backgroundColor: '#161b22',
                            border: '1px solid #30363d',
                            borderRadius: '10px',
                            px: 2,
                        }}>
                            {events.map(e => (
                                <EventRow
                                    key={e.type + e.isoDate + (e.raw.mandante || e.raw.evento)}
                                    event={e}
                                />
                            ))}
                        </Box>
                    </Box>
                );
            })}
        </Box>
    );
}

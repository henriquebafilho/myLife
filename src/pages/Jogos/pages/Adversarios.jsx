import { useState, useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Times from '../Times';
import common from '../common';
import ViewAdversario from './viewScreens/ViewAdversario';

const normalize = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase().trim();

const jogos = common.jogos;
const nomesNosJogos = new Set(jogos.flatMap(j => [j.mandante, j.visitante]));

const buildAdversarios = (meuTime) => {
    const set = new Set();
    for (const j of jogos) {
        const m = Times(j.mandante).nomeAtual;
        const v = Times(j.visitante).nomeAtual;
        if (m !== meuTime) set.add(m);
        if (v !== meuTime) set.add(v);
    }
    const arr = Array.from(set);
    arr.sort((a, b) => {
        const diff = common.getTotalAdversario(meuTime, b) - common.getTotalAdversario(meuTime, a);
        return diff !== 0 ? diff : a.localeCompare(b);
    });
    return arr;
};

export default function Adversarios({ meuTime, selectedAdversario, onSelectEstadio }) {
    const [search, setSearch] = useState('');
    const [adversarioAtual, setAdversarioAtual] = useState(null);

    const todosAdversarios = useMemo(() => buildAdversarios(meuTime), [meuTime]);

    useEffect(() => {
        if (selectedAdversario) {
            const nomeAtual = Times(selectedAdversario).nomeAtual;
            if (todosAdversarios.includes(nomeAtual)) {
                setAdversarioAtual(nomeAtual);
            }
        }
    }, [selectedAdversario, todosAdversarios]);

    const filtered = useMemo(() => {
        if (!search.trim()) return todosAdversarios;
        const term = normalize(search);
        return todosAdversarios.filter(name => {
            const team = Times(name);
            return [team.nomeAtual, ...team.nomesAnteriores].some(n => normalize(n).includes(term));
        });
    }, [search, todosAdversarios]);

    if (adversarioAtual) {
        return (
            <ViewAdversario
                meuTime={meuTime}
                adversario={adversarioAtual}
                onBack={() => setAdversarioAtual(null)}
                onSelectEstadio={onSelectEstadio}
            />
        );
    }

    return (
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
                    placeholder="Buscar adversário..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    sx={{ flex: 1, color: 'text.primary', fontSize: '0.95rem' }}
                />
            </Box>

            {filtered.length === 0 && (
                <Typography color="text.secondary" textAlign="center">Nenhum adversário encontrado</Typography>
            )}

            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 2 }}>
                {filtered.map(teamName => {
                    const team = Times(teamName);
                    const total = common.getTotalAdversario(meuTime, teamName);
                    const nomesAnterioresVistos = team.nomesAnteriores.filter(n => nomesNosJogos.has(n));
                    return (
                        <Box
                            key={teamName}
                            onClick={() => setAdversarioAtual(teamName)}
                            sx={{
                                cursor: 'pointer',
                                backgroundColor: team.backgroundColor,
                                border: `1px solid ${team.letterColor}`,
                                borderRadius: '8px',
                                overflow: 'hidden',
                                textAlign: 'center',
                                transition: 'border-color 0.15s, transform 0.15s',
                                '&:hover': { borderColor: '#8b949e', transform: 'translateY(-2px)' },
                            }}
                        >
                            <Box sx={{ pt: 2, px: 1 }}>
                                <img
                                    src={import.meta.env.BASE_URL + 'escudos/' + team.escudo + '.png'}
                                    alt={teamName}
                                    width={80}
                                    height={80}
                                    loading="lazy"
                                    style={{ objectFit: 'contain' }}
                                    onError={(e) => { e.target.src = import.meta.env.BASE_URL + 'escudos/escudo.png'; }}
                                />
                            </Box>
                            <Box sx={{ p: 1.5, pt: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.3, color: team.letterColor }}>{team.nomeAtual}</Typography>
                                <Typography variant="caption" sx={{ color: team.letterColor, opacity: 0.7 }}>
                                    {total} {total === 1 ? 'jogo' : 'jogos'}
                                </Typography>
                                {nomesAnterioresVistos.length > 0 && (
                                    <Typography variant="caption" sx={{ color: team.letterColor, opacity: 0.5, display: 'block', mt: 0.5, fontSize: '0.65rem', lineHeight: 1.2 }}>
                                        {nomesAnterioresVistos.join(', ')}
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
}

import { useState, useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import common from '../common';
import ViewEstadio from './viewScreens/ViewEstadio';

const normalize = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase().trim();

const jogos = common.jogos;

const todosEstadios = (() => {
    const set = new Set();
    for (const j of jogos) {
        if (j.estadio && j.estadio[0] !== '(') set.add(j.estadio);
    }
    const arr = Array.from(set);
    arr.sort((a, b) => {
        const diff = common.getTotalEstadio(b, jogos) - common.getTotalEstadio(a, jogos);
        return diff !== 0 ? diff : a.localeCompare(b);
    });
    return arr;
})();

export default function Estadios({ meuTime, selectedEstadio, onSelectAdversario }) {
    const [search, setSearch] = useState('');
    const [estadioAtual, setEstadioAtual] = useState(null);

    useEffect(() => {
        if (selectedEstadio && todosEstadios.includes(selectedEstadio)) {
            setEstadioAtual(selectedEstadio);
        }
    }, [selectedEstadio]);

    const filtered = useMemo(() => {
        if (!search.trim()) return todosEstadios;
        const term = normalize(search);
        return todosEstadios.filter(e => normalize(e).includes(term));
    }, [search]);

    if (estadioAtual) {
        const jogosEstadio = jogos.filter(j => j.estadio === estadioAtual);
        return (
            <ViewEstadio
                meuTime={meuTime}
                jogosEstadio={jogosEstadio}
                estadio={estadioAtual}
                onBack={() => setEstadioAtual(null)}
                onSelectAdversario={onSelectAdversario}
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
                    placeholder="Buscar estádio..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    sx={{ flex: 1, color: 'text.primary', fontSize: '0.95rem' }}
                />
            </Box>

            {filtered.length === 0 && (
                <Typography color="text.secondary" textAlign="center">Nenhum estádio encontrado</Typography>
            )}

            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 2 }}>
                {filtered.map(estadio => {
                    const total = common.getTotalEstadio(estadio, jogos);
                    const imagemEstadio = import.meta.env.BASE_URL + 'estadios/' + estadio + '.png';
                    return (
                        <Box
                            key={estadio}
                            onClick={() => setEstadioAtual(estadio)}
                            sx={{
                                cursor: 'pointer',
                                backgroundColor: '#161b22',
                                border: '1px solid #484f58',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                textAlign: 'center',
                                transition: 'border-color 0.15s, transform 0.15s',
                                '&:hover': { borderColor: '#8b949e', transform: 'translateY(-2px)' },
                            }}
                        >
                            <img
                                src={imagemEstadio}
                                alt={estadio}
                                loading="lazy"
                                style={{ display: 'block', width: '100%', aspectRatio: '1', objectFit: 'cover' }}
                                onError={(e) => { e.target.style.display = 'none'; }}
                            />
                            <Box sx={{ p: 1.5 }}>
                                <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.3 }}>{estadio}</Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {total} {total === 1 ? 'jogo' : 'jogos'}
                                </Typography>
                            </Box>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
}

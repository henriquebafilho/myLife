import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinhaJogo from '../components/LinhaJogo';
import common from '../common';

const outrosJogos = [...common.outrosJogos].sort((a, b) => b.data.localeCompare(a.data));

export default function OutrosJogos({ meuTime }) {
    let currentYear = null;
    return (
        <Box>
            {outrosJogos.length === 0 && (
                <Typography color="text.secondary" textAlign="center">Nenhum jogo cadastrado</Typography>
            )}
            {outrosJogos.map(jogo => {
                const year = jogo.data.split('-')[0];
                const showDivider = year !== currentYear;
                currentYear = year;
                return (
                    <React.Fragment key={jogo.mandante + jogo.visitante + jogo.data}>
                        {showDivider && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 3 }}>
                                <Box sx={{ flex: 1, height: '1px', backgroundColor: '#30363d' }} />
                                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, letterSpacing: 1 }}>
                                    {year}
                                </Typography>
                                <Box sx={{ flex: 1, height: '1px', backgroundColor: '#30363d' }} />
                            </Box>
                        )}
                        <LinhaJogo meuTime={null} jogo={jogo} />
                    </React.Fragment>
                );
            })}
        </Box>
    );
}

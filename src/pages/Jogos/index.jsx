import React, { useState } from 'react';
import './jogos.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MuiTabs from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import LinhaJogo from './components/LinhaJogo';
import Adversarios from './pages/Adversarios';
import Anos from './pages/Anos';
import Estadios from './pages/Estadios';
import OutrosJogos from './pages/OutrosJogos';
import Estatisticas from './components/Estatisticas';
import Times from './Times';
import common from './common';

const meuTime = 'Botafogo';
const jogos = [...common.jogos].sort((a, b) => b.data.localeCompare(a.data));

function JogosList({ onSelectEstadio, onSelectAdversario }) {
    let currentYear = null;
    return (
        <Box>
            {jogos.map(jogo => {
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
                        <LinhaJogo
                            meuTime={meuTime}
                            jogo={jogo}
                            onSelectEstadio={onSelectEstadio}
                            onSelectAdversario={onSelectAdversario}
                        />
                    </React.Fragment>
                );
            })}
        </Box>
    );
}

export default function Jogos() {
    const [tab, setTab] = useState(0);
    const [subTab, setSubTab] = useState('botafogo');
    const [selectedEstadio, setSelectedEstadio] = useState('');
    const [selectedAdversario, setSelectedAdversario] = useState('');

    const selectEstadio = (estadio) => {
        setTab(2);
        setSelectedEstadio(estadio);
        setSelectedAdversario('');
        window.scrollTo({ top: 0, behavior: 'auto' });
    };

    const selectAdversario = (adversario) => {
        const nomeAtual = Times(adversario).nomeAtual;
        setTab(3);
        setSelectedAdversario(nomeAtual);
        setSelectedEstadio('');
        window.scrollTo({ top: 0, behavior: 'auto' });
    };

    return (
        <Box sx={{ mt: '80px', px: { xs: 2, md: 4 }, pb: 6 }}>

            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 3 }}>
                <img
                    src={import.meta.env.BASE_URL + 'escudos/Botafogo.png'}
                    alt="Botafogo"
                    style={{ width: 48, height: 48, objectFit: 'contain' }}
                />
                <Typography variant="h4">Jogos do Botafogo</Typography>
            </Box>

            {/* Stats */}
            <Box sx={{ mb: 4 }}>
                <Estatisticas meuTime={meuTime} jogos={jogos} />
            </Box>

            {/* Tabs */}
            <MuiTabs
                value={tab}
                onChange={(_, v) => setTab(v)}
                sx={{ mb: 3, borderBottom: '1px solid #30363d' }}
            >
                <MuiTab label="Jogos" />
                <MuiTab label="Anos" />
                <MuiTab label="Estádios" />
                <MuiTab label="Adversários" />
            </MuiTabs>

            {/* Tab: Jogos */}
            {tab === 0 && (
                <Box>
                    <Box sx={{ mb: 3 }}>
                        <ToggleButtonGroup
                            value={subTab}
                            exclusive
                            onChange={(_, v) => { if (v) setSubTab(v); }}
                            size="small"
                        >
                            <ToggleButton value="botafogo">Botafogo</ToggleButton>
                            <ToggleButton value="outros">Outros Jogos</ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                    {subTab === 'botafogo' && (
                        <JogosList onSelectEstadio={selectEstadio} onSelectAdversario={selectAdversario} />
                    )}
                    {subTab === 'outros' && <OutrosJogos meuTime={meuTime} />}
                </Box>
            )}

            {tab === 1 && (
                <Anos meuTime={meuTime} onSelectEstadio={selectEstadio} onSelectAdversario={selectAdversario} />
            )}

            {tab === 2 && (
                <Estadios meuTime={meuTime} meusJogos={jogos} selectedEstadio={selectedEstadio} onSelectAdversario={selectAdversario} />
            )}

            {tab === 3 && (
                <Adversarios meuTime={meuTime} meusJogos={jogos} selectedAdversario={selectedAdversario} onSelectEstadio={selectEstadio} />
            )}

        </Box>
    );
}

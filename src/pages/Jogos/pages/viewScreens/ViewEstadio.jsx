import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'flag-icons/css/flag-icons.min.css';
import LinhaJogo from '../../components/LinhaJogo';
import Estatisticas from '../../components/Estatisticas';
import coordenadas from '../../estadiosCoordenadas';
import estadiosLocais from '../../estadiosLocais';

function LocalizacaoEstadio({ estadio }) {
    const posicao = coordenadas[estadio];
    const local = estadiosLocais[estadio];

    if (!posicao) return null;

    const codigoBandeira = local?.codigo || 'br';
    const texto = local?.pais
        ? [local?.cidade, local.pais].filter(Boolean).join(', ')
        : (local?.cidade && local?.uf) ? `${local.cidade}-${local.uf}` : local?.cidade;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, mb: 3 }}>
            <Box sx={{
                borderRadius: '8px', overflow: 'hidden', border: '1px solid #30363d',
                height: 220, width: '100%', maxWidth: 480,
            }}>
                <MapContainer
                    center={posicao}
                    zoom={12}
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
                    <Marker position={posicao} />
                </MapContainer>
            </Box>
            {texto && (
                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <span className={`fi fi-${codigoBandeira}`} style={{ fontSize: '1rem', borderRadius: '2px' }} />
                    {texto}
                </Typography>
            )}
        </Box>
    );
}

export default function ViewEstadio({ meuTime, jogosEstadio, estadio, onBack, onSelectAdversario }) {
    const jogos = [...jogosEstadio].sort((a, b) => b.data.localeCompare(a.data));

    let currentYear = null;

    return (
        <Box>
            <Button onClick={onBack} sx={{ mb: 2, color: 'text.secondary', textTransform: 'none', pl: 0 }}>
                ← Voltar
            </Button>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <Typography variant="h4">{estadio}</Typography>
            </Box>

            <LocalizacaoEstadio estadio={estadio} />

            <Estatisticas meuTime={meuTime} jogos={jogosEstadio} />

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
                            onSelectAdversario={onSelectAdversario}
                            disableEstadioClick={true}
                        />
                    </React.Fragment>
                );
            })}
        </Box>
    );
}

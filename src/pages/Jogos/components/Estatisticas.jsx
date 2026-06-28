import Times from '../Times';
import Common from '../common';

function Estatisticas(props) {
    var total = props.jogos.length;
    var vitorias = Common.getVitorias(props.meuTime, props.jogos);
    var empates = Common.getEmpates(props.meuTime, props.jogos);
    var derrotas = Common.getDerrotas(props.meuTime, props.jogos);
    return (
        <div style={{ paddingBottom: '30px', width: '100%', fontSize: '25px' }}>
            <p style={{ color: Times(props.meuTime).letterColor }}>{total} jogo{total > 1 ? 's' : ''}</p>
            <div className='resultsBar' style={{ borderColor: Times(props.meuTime).backgroundColor === 'white' ? 'black' : 'white' }}>
                <div className="vitoriasBar" title={vitorias + ' Vitórias'}
                    style={{
                        width: vitorias * 100 / total + '%',
                        borderTopLeftRadius: vitorias > 0 ? '10px' : '',
                        borderBottomLeftRadius: vitorias > 0 ? '10px' : '',
                        borderTopRightRadius: (vitorias > 0 && empates === 0 && derrotas === 0) ? '10px' : '',
                        borderBottomRightRadius: (vitorias > 0 && empates === 0 && derrotas === 0) ? '10px' : '',
                        textShadow: Common.textShadow
                    }}>
                    {vitorias > 0 ? vitorias : ""}
                </div>
                <div className="empatesBar" title={empates + ' Empates'}
                    style={{
                        width: empates * 100 / total + '%',
                        borderTopLeftRadius: (vitorias === 0 && empates > 0) ? '10px' : '',
                        borderBottomLeftRadius: (vitorias === 0 && empates > 0) ? '10px' : '',
                        borderTopRightRadius: (empates > 0 && derrotas === 0) ? '10px' : '',
                        borderBottomRightRadius: (empates > 0 && derrotas === 0) ? '10px' : '',
                        textShadow: Common.textShadow
                    }}>
                    {empates > 0 ? empates : ""}
                </div>
                <div className="derrotasBar" title={derrotas + ' Derrotas'}
                    style={{
                        width: derrotas * 100 / total + '%',
                        borderTopLeftRadius: (vitorias === 0 && empates === 0 && derrotas > 0) ? '10px' : '',
                        borderBottomLeftRadius: (vitorias === 0 && empates === 0 && derrotas > 0) ? '10px' : '',
                        borderTopRightRadius: derrotas > 0 ? '10px' : '',
                        borderBottomRightRadius: derrotas > 0 ? '10px' : '',
                        textShadow: Common.textShadow
                    }}>
                    {derrotas > 0 ? derrotas : ""}
                </div>
            </div>
        </div>
    )
}

export default Estatisticas;

import './jogos.css';
import Times from './Times';
import Tabs from './components/Tabs';
import common from './common';

function Jogos() {
    const meuTime = "Botafogo";
    const meusJogos = [...common.jogos].sort((a, b) =>
        a.data < b.data ? -1 : a.data > b.data ? 1 : 0
    );

    return (
        <>
            <div className="App-header" style={{ backgroundColor: Times(meuTime).backgroundColor, marginTop: '64px' }}>
                <div style={{ margin: '20px' }}>
                    <p style={{ display: 'inline', color: Times(meuTime).letterColor }}>
                        Botafogo de Futebol e Regatas
                    </p>
                </div>
                <img
                    src={import.meta.env.BASE_URL + 'escudos/Botafogo.png'}
                    alt="Escudo do Botafogo"
                    style={{ verticalAlign: 'middle', width: '100px', height: '100px' }}
                    loading='lazy'
                    onError={(e) => { e.target.src = import.meta.env.BASE_URL + 'escudos/escudo.png' }}
                />
                <br />
                <Tabs meuTime={meuTime} meusJogos={meusJogos} />
            </div>
        </>
    );
}

export default Jogos;

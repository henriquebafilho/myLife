import { Component } from 'react';
import Times from '../../Times';
import Estatisticas from '../../components/Estatisticas';
import LinhaJogo from '../../components/LinhaJogo';

class ViewAno extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meuTime: props.meuTime
        }
    }

    scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    async componentDidMount() {
        this.scrollToTop();
    }

    render() {
        const meuTime = this.props.meuTime;
        const jogos = [...this.props.jogosAno].sort(function (a, b) {
            return a.data < b.data ? -1 : a.data > b.data ? 1 : 0;
        });
        const imagemAno = import.meta.env.BASE_URL + 'anos/' + this.props.ano + '.png';
        return (
            <div style={{ backgroundColor: Times(this.props.meuTime).backgroundColor, color: Times(this.props.meuTime).letterColor }}>
                <div>
                    <button style={{ outline: 'none', border: 'none', textDecoration: 'underline', fontSize: '25px', cursor: 'pointer', backgroundColor: Times(this.props.meuTime).backgroundColor, color: Times(this.props.meuTime).letterColor }} onClick={this.props.onBack}>{"< Voltar"}</button>
                </div>
                <div className="App-header" style={{ backgroundColor: Times(this.props.meuTime).backgroundColor, color: Times(this.props.meuTime).letterColor }}>
                    <img
                        src={imagemAno}
                        style={{ verticalAlign: 'middle' }}
                        alt='ano'
                        height='250'
                        width='250'
                        loading='lazy'
                        onError={(e) => { e.target.style.display = 'none' }}
                    />
                    <h1 style={{ padding: '5px' }}>{this.props.ano}</h1>
                    <br />
                    <Estatisticas meuTime={this.props.meuTime} jogos={this.props.jogosAno} />
                    {jogos.map((index) => {
                        return <LinhaJogo key={JSON.stringify(index)} meuTime={meuTime} jogo={index} meusJogos={this.props.meusJogos} onSelectAdversario={this.props.onSelectAdversario} onSelectEstadio={this.props.onSelectEstadio} />
                    })}
                </div>
            </div>
        )
    }
}

export default ViewAno;

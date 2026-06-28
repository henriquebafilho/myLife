import React, { Component } from 'react';
import Times from '../../Times';
import Estatisticas from '../../components/Estatisticas';
import LinhaJogo from '../../components/LinhaJogo';

class ViewEstadio extends Component {
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
    const jogos = [...this.props.jogosEstadio].sort(function (a, b) {
      return a.data < b.data ? -1 : a.data > b.data ? 1 : 0;
    }).reverse();
    let anoAtual = 0;
    const imagemEstadio = import.meta.env.BASE_URL + 'estadios/' + this.props.estadio + '.png';
    return (
      <div style={{ backgroundColor: Times(this.props.meuTime).backgroundColor, color: Times(this.props.meuTime).letterColor }}>
        <div>
          <button style={{ outline: 'none', border: 'none', textDecoration: 'underline', fontSize: '25px', cursor: 'pointer', backgroundColor: Times(this.props.meuTime).backgroundColor, color: Times(this.props.meuTime).letterColor }} onClick={this.props.onBack}>{"< Voltar"}</button>
        </div>
        <div className="App-header" style={{ backgroundColor: Times(this.props.meuTime).backgroundColor, color: Times(this.props.meuTime).letterColor }}>
          <img
            src={imagemEstadio}
            style={{ verticalAlign: 'middle' }}
            alt='estadio'
            height='250'
            width='250'
            loading='lazy'
            onError={(e) => { e.target.style.display = 'none' }}
          />
          <h1>{this.props.estadio}</h1>
          <br />
          <Estatisticas meuTime={this.props.meuTime} jogos={this.props.jogosEstadio} />
          {jogos.map((index) => {
            let mostraAno = false;
            if (anoAtual !== index.data.split("-")[0]) {
              anoAtual = index.data.split("-")[0];
              mostraAno = true;
            }
            return <div key={JSON.stringify(index)} style={{ width: '100%' }}>
              {mostraAno ? <h1 style={{ textAlign: 'center', color: Times(meuTime).letterColor, margin: '40px' }}>{anoAtual}</h1> : ""}
              <LinhaJogo meuTime={meuTime} jogo={index} meusJogos={this.props.meusJogos} onSelectAdversario={this.props.onSelectAdversario} disableEstadioClick={true} />
            </div>
          })}
        </div>
      </div>
    )
  }
}

export default ViewEstadio;

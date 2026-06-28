import React, { Component } from 'react';
import Times from '../Times';
import LinhaJogo from '../components/LinhaJogo';
import common from '../common';

class OutrosJogos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meuTime: props.meuTime,
            outrosJogos: [],
            isLoading: false
        }
    }

    async componentDidMount() {
        this.setState({ isLoading: true });
        const outrosJogos = [...common.outrosJogos].sort((a, b) =>
            a.data > b.data ? -1 : a.data < b.data ? 1 : 0
        );
        this.setState({ outrosJogos, isLoading: false });
    }

    render() {
        const jogos = this.state.outrosJogos;
        const meuTimeStyle = Times(this.props.meuTime);
        let anoAtual = 0;

        return (
            <div className="jogos-container" style={{ color: meuTimeStyle.letterColor, backgroundColor: meuTimeStyle.backgroundColor }}>
                {jogos.length > 0 ? jogos.map((jogo, i) => {
                    let mostraAno = false;
                    const ano = jogo.data.split("-")[0];
                    if (anoAtual !== ano) {
                        anoAtual = ano;
                        mostraAno = true;
                    }
                    return <div key={i}>
                        {mostraAno && <h1 style={{ textAlign: 'center', color: meuTimeStyle.letterColor, margin: '40px' }}>{ano}</h1>}
                        <LinhaJogo meuTime={null} jogo={jogo} onSelectEstadio={() => {}} onSelectAdversario={() => {}} />
                    </div>
                }) : <div>
                    <h4 style={{ color: meuTimeStyle.letterColor, textAlign: 'center' }}>Nenhum jogo cadastrado</h4>
                </div>}
            </div>
        )
    }
}

export default OutrosJogos;

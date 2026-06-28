import React, { Component } from 'react';
import Times from '../Times';
import LinhaJogo from '../components/LinhaJogo';
import common from '../common';

class ProximosJogos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meuTime: props.meuTime,
            proximosJogos: [],
            isLoading: false
        }
    }

    async componentDidMount() {
        this._isMounted = true;
        window.scrollTo(0, 0);
        this.setState({ isLoading: true });
        const proximosJogos = common.jogos.filter(j => j.golsMandante === "" && j.golsVisitante === "");
        this.setState({ proximosJogos, isLoading: false });
    }

    render() {
        const meuTime = this.state.meuTime;
        const jogos = this.state.proximosJogos;
        return (
            <>
                <div className="jogos-container" style={{ color: Times(this.props.meuTime).letterColor, backgroundColor: Times(this.props.meuTime).backgroundColor }}>
                    {jogos.length > 0 ? jogos.map((index) => {
                        return <div key={JSON.stringify(index)}>
                            <LinhaJogo meuTime={meuTime} jogo={index} onSelectEstadio={this.props.onSelectEstadio} onSelectAdversario={this.props.onSelectAdversario} />
                        </div>
                    }) : <div>
                        <h4 style={{ color: Times(meuTime).letterColor, textAlign: 'center' }}>Não há jogos futuros</h4>
                    </div>}
                </div>
            </>
        )
    }
}

export default ProximosJogos;

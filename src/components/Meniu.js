import React from 'react';

class Meniu extends React.Component{

    render() {
        const {id, name, toogle} = this.props;
        return (
            <li className={'meniu-item '+toogle}><button onClick={() => this.props.onGetGenre(id)}>{name}</button></li>
        )
    }

}

export default Meniu;
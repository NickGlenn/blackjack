import React from 'react';

export default class Card extends React.Component {

    render () {
        const { color, faceDown, rank, suit  } = this.props;

        if(faceDown){
            return (
                <div className="card">
                    <div className="card__back marrakesh" />
                </div>
            )
        } else {
            return (
                <div className="card face-up">
                    <div style={{color}} className="card__value-upper">{rank}</div>
                    <div style={{color}} className="card__suit">{suit}</div>
                    <div style={{color}} className="card__value-lower">{rank}</div>
                </div>
            )
        }

    }
}
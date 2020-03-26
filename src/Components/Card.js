import React, { Component } from 'react';
import heart from './../Assets/img/heart.png';
import diamond from './../Assets/img/diamond.png';
import club from './../Assets/img/club.png';
import spade from './../Assets/img/spade.png';

export default class Card extends Component {

	getCardUrl = function() {
		const {card} = this.props;
		switch(card.suit) {
			case 'Club' : 
				return club;
			case 'Heart' :
				return heart;
			case 'Diamond' : 
				return diamond;
			case 'Spade' :
				return spade;
			default : 
				return spade;
		}
	}



	render() {
		const {card, show} = this.props;

		return(
			<div>
				{(show)?
				<div className="card-wrapper">
					<div className="card">
						<div className="upper-inf">{card.display}</div>
						<div className="suit"><img src={this.getCardUrl()} className="card-suit" alt={card.suit}/></div>
						<div className="lower-inf">{card.display}</div>
					</div>
					<div className="top-ten points"><span className="points-lbl">Points: </span> <span className="points-vl">{card.value}</span></div>
				</div>:
				<div className="backword card">

				</div>
			}
			</div>
		)
	}
}

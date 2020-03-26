import React, { Component } from 'react';
import Card from './Card.js';

export default class Hand extends Component {

	getCardsSeq = () => {
		const {cards, dealer} = this.props;
		return cards.map((card, index) => {
			let showCard = index === 0 ? !dealer : true; 
			return <Card key={index} card={card} show={showCard}/>
		}) 
	}

	render() {
		return(
			<div className="hand-wrapper">
				{this.getCardsSeq()}
			</div>
		)
	}
}

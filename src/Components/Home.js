import React, { Component } from 'react';
import Hand from './Hand.js';
import Card from './Card.js';
import CardDeck from './../Config/config.js';

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			deck: CardDeck,
			game: false,
			dealer: [],
			player: [],
			result: null
		}
	}

	handleShuffling = () => {
		const {deck} = this.state;
		for(let i = 0; i < deck.length; i++) {
			let k = Math.floor(Math.random() * i);
			[deck[k], deck[i]] = [deck[i], deck[k]];
		}
		console.log(deck);
		this.setState({deck: deck});
	}

	startGame = () => {
		this.handleShuffling();
		this.handleShuffling();
		const {dealer, player, deck} = this.state;
		for(let i = 0 ; i < 2 ; i++) {
			dealer.push(deck.pop());
			player.push(deck.pop());
		}
		this.setState({dealer, player, deck, game: true});
	}

	startNewGame = () => {
		this.setState({deck: CardDeck, dealer: [], player: [], result: null}, () => {this.startGame()});
		
	}

	checkPoints = () => {
		const {player} = this.state;
		let totalScore = this.getTotalPoints(player);
		if(totalScore === 21) {
			this.setState({result: "Congratulations!!! You won"});
		} else if (totalScore > 21) {
			this.setState({result: "Dealer won"});
		}
	}

	handleHit = () => {
		const {player, deck} = this.state;
		player.push(deck.pop());
		this.setState({player, deck}, () => {this.checkPoints()});
	}

	handleStand = () => {
		const {player, dealer, deck} = this.state;
		let playerTotal = this.getTotalPoints(player);
		let dealerTotal = this.getTotalPoints(dealer);
		while(dealerTotal < 17) {
			dealer.push(deck.pop());
			this.setState({dealer});
			dealerTotal = this.getTotalPoints(dealer);
		}
		if(dealerTotal >= playerTotal) {
			this.setState({result: "Dealer won"});
		} else {
			this.setState({result: "Congratulations!!! You won"});
		}
	}

	getTotalPoints = (cards) => {
		let score = 0;
		for(let i in cards) {score += cards[i].value;}
		if(score > 21) {
			let totalAces = 0;
			for(let i in cards) {if(cards[i].display === 'A') {totalAces++;}}
				while(score>21 && totalAces > 0) {
					score -= 10;
					totalAces -= 1;
				}
		}
		return score;
	}

	render() {
		const {dealer, player, game, result} = this.state;
		return(
			<div className="home-wrapper">
				{(game)?
				<div>
					<div>
						<Hand cards={dealer} dealer={result?false:true}/>
					</div>
					{(result)?
					<div className="top-ten total-points">Total Points = {this.getTotalPoints(dealer)}</div>:null
					}
					<div className="top-twenty">
						<button className="play-btn btn right-twenty" onClick={this.handleHit} disabled={result?true:false}>Hit</button>
						<button className="play-btn btn" onClick={this.handleStand} disabled={result?true:false}>Stand</button>
					</div>
					<div className="top-twenty">
						<Hand cards={player} dealer={false}/>
					</div>
					<div className="top-ten total-points">Total Points = {this.getTotalPoints(player)}</div>
					{(result)?
					<div className="top-twenty">
						<div className="result">{result}</div>
						<div className="top-twenty"><button className="start-btn btn" onClick={this.startNewGame}>Start New Game</button></div>
					</div>:null
					}
				</div>
				:
				<div className="welcome-wrapper">
					<div className="welcome-message">
						Welcome to Black Jack
					</div>
					<div className="top-twenty hand-wrapper">
						<Card show={false} id='carddeck'/>
					</div>
					<div className="str-btn-wrapper">
						<button className="prim-btn btn right-twenty" onClick={this.handleShuffling}>Shuffle Deck</button>
						<button className="start-btn btn" onClick={this.startGame}>Start Game</button>
					</div>
				</div>
				}
			</div>
		)
	}
}

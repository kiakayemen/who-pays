import { toast, ToastContainer } from "react-toastify";
import React, { Component } from "react";

const MyContext = React.createContext();

class MyProvider extends Component {
	state = {
		stage: 1,
		players: [],
		result: ''
	}

	addPlayerhandler = (name) => {
		this.setState((prevState) => ({
			players: [
				...prevState.players, name
			]
		}))
	}

	removePlayerHandler = (idx) => {
		let newArray = this.state.players;
		newArray.splice(idx, 1);
		this.setState({
			players: newArray
		});
	}

	nextHandler = () => {
		const { players } = this.state
		if (players.length < 2) {
			toast.error("U need more than 1 player!", {
				position: toast.POSITION.TOP_LEFT,
				autoClose: 2000
			})
		} else {
			this.setState({
				stage: 2
			}, () => {
				setTimeout(() => {
					this.generateLoser()
				}, 1000);
			})
		}
	}

	generateLoser = () => {
		const { players } = this.state;
		this.setState({
			result: players[Math.floor(Math.random() * players.length)]
		})
	}

	resetGame = () => {

		this.setState({
			stage: 1,
			result:''
		})

		// this.setState({
		// 	stage: 1,
		// 	players: [],
		// 	result: ''
		// })
	}

	render() {
		return (
			<>
				<MyContext.Provider value={{
					state: this.state,
					addPlayer: this.addPlayerhandler,
					removePlayer: this.removePlayerHandler,
					next: this.nextHandler,
					getNewLoser: this.generateLoser,
					resetGame: this.resetGame
				}}>
					{this.props.children}
				</MyContext.Provider>
				<ToastContainer />
			</>
		)
	}
}

export {
	MyContext,
	MyProvider
}
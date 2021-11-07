import React, { useState, useContext, useRef } from "react";
import { Button, Form, Alert } from 'react-bootstrap';
import { MyContext } from '../context';


const Stage1 = () => {

	const textInput = useRef();
	const context = useContext(MyContext);
	const [error, setError] = useState([false, '']);

	const validateInput = (value) => {
		if (value === '') {
			setError([true, 'Sorry, U need to add something']);
			return false;
		}
		if (value.length <= 2) {
			setError([true, 'Sorry, U need 3 characters at least']);
			return false;
		}
		return true;
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		const value = textInput.current.value;
		const validate = validateInput(value);

		if (validate) {
			// form is valid... add player
			setError([false, '']);
			context.addPlayer(value)
			textInput.current.value = ''
		}
	}

	console.log(context);

	return (
		<>
			<Form onSubmit={handleSubmit} className="mt-4">
				<Form.Group>
					<Form.Control
						type="text"
						placeholder="Add player name"
						name="player"
						ref={textInput}
					/>
				</Form.Group>

				{error[0] ?
					<Alert variant="danger">
						{error[1]}
					</Alert>
					: null

				}

				<Button className="miami" variant="primary" type="submit">
					Add Player
				</Button>
				{
					context.state.players && context.state.players.length > 0 ?
						<>
							<hr />
							<div>
								<ul className="list-group">
									{
										context.state.players.map((item, idx) => (
											<li className="list-group-item d-flex justify-content-between align-items-center list-group-item-action" key={idx} >
												{item}

												<span className="badge badge-danger"
													onClick={() => context.removePlayer(idx)}
												>x</span>
											</li>
										))
									}
								</ul>
								<div className="action_button"
									onClick={() => context.next()}
								>
									NEXT
								</div>
							</div>
						</>
						: null
				}
			</Form>
		</>
	);
}

export default Stage1;
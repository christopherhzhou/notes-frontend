import axios from 'axios';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addUser } from '../redux/actions/authActions';

const Login = (props) => {
	const [state, setState] = useState({
		username: '',
		password: ''
	});

	const fieldStyles = {
		padding: '5px'
	};

	const handleUsernameChange = (event) => {
		const newState = { ...state };
		newState.username = event.target.value;
		setState(newState);
	};

	const handlePasswordChange = (event) => {
		const newState = { ...state };
		newState.password = event.target.value;
		setState(newState);
	};

	const handleLogin = (event) => {
		event.preventDefault();
		const payload = {
			username: event.target.username.value,
			password: event.target.password.value
		};
		axios
			.post('/auth/token/', payload)
			.then((response) => {
				localStorage.setItem('token', response.data.access);
				const user = {
					token: response.data.access,
					username: payload.username
				};
				props.dispatch(addUser(user));
			})

			.catch((error) => alert('incorrect credentials'));
	};

	return (
		<div>
			<form onSubmit={handleLogin}>
				<div style={fieldStyles}>
					<label>Username: </label>
					<input
						type='text'
						id='username'
						value={state.username}
						onChange={handleUsernameChange}
					/>
				</div>
				<div style={fieldStyles}>
					<label>Password: </label>
					<input
						type='password'
						id='password'
						value={state.password}
						onChange={handlePasswordChange}
					/>
				</div>
				<input style={{ margin: '8px' }} type='submit' value='Login' />
			</form>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		user: state.auth.user
	};
};

export default connect(mapStateToProps)(Login);

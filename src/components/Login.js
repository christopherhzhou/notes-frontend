import axios from 'axios';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { addUser } from '../redux/actions/authActions';

const Login = (props) => {
	const [state, setState] = useState({
		username: '',
		password: ''
	});

	if (props.user) {
		return <Redirect to='/' />;
	}

	const fieldStyles = {
		padding: '5px'
	};

	const handleFieldChange = (event) => {
		const value = event.target.value;
		setState({
			...state,
			[event.target.name]: value
		});
		console.log(state);
	};

	const handleLogin = (event) => {
		event.preventDefault();
		const payload = {
			username: state.username,
			password: state.password
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
			<h3>Welcome back!</h3>
			<form onSubmit={handleLogin}>
				<div style={fieldStyles}>
					<label>Username: </label>
					<input
						type='text'
						name='username'
						id='username'
						value={state.username}
						onChange={handleFieldChange}
					/>
				</div>
				<div style={fieldStyles}>
					<label>Password: </label>
					<input
						type='password'
						name='password'
						id='password'
						value={state.password}
						onChange={handleFieldChange}
					/>
				</div>
				<input style={{ margin: '8px' }} type='submit' value='Login' />
			</form>
			<p>
				Don't have an account? <Link to='/signup'>Register here</Link>
			</p>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		user: state.auth.user
	};
};

export default connect(mapStateToProps)(Login);

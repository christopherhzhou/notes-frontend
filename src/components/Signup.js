import axios from 'axios';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { addUser } from '../redux/actions/authActions';

const Signup = (props) => {
	const [state, setState] = useState({
		username: '',
		email: '',
		password1: '',
		password2: ''
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
	};

	const handleSignup = async (event) => {
		const password1 = event.target.password1.value;
		const password2 = event.target.password2.value;

		if (password1 !== password2) {
			alert("Passwords don't match");
			return;
		}

		event.preventDefault();
		const payload = {
			username: event.target.username.value,
			email: event.target.email.value,
			password: event.target.password1.value
		};
		await axios
			.post('/auth/register/', payload)
			.then((response) => {
				alert('Account created!');
				const user = {
					username: payload.username,
					token: response.data.token
				};
				props.dispatch(addUser(user));
			})
			.catch((error) => {
				alert(error.response.data);
			});
	};

	return (
		<div>
			<h3>Sign up</h3>
			<form onSubmit={handleSignup}>
				<div style={fieldStyles}>
					<label>Username: </label>
					<input
						type='text'
						name='username'
						value={state.username}
						onChange={handleFieldChange}
					/>
				</div>
				<div style={fieldStyles}>
					<label>Email: </label>
					<input
						type='text'
						name='email'
						value={state.email}
						onChange={handleFieldChange}
					/>
				</div>
				<div style={fieldStyles}>
					<label>Password: </label>
					<input
						type='password'
						name='password1'
						value={state.password1}
						onChange={handleFieldChange}
					/>
				</div>
				<div style={fieldStyles}>
					<label>Confirm password: </label>
					<input
						type='password'
						name='password2'
						value={state.password2}
						onChange={handleFieldChange}
					/>
				</div>
				<input
					style={{ marginTop: '8px', marginBottom: '20px' }}
					type='submit'
					value='Sign up'
				/>
			</form>
			<Link to='/login'>Back to login</Link>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		user: state.auth.user
	};
};

export default connect(mapStateToProps)(Signup);

import React from 'react';
import { connect } from 'react-redux';
import { removeUser } from '../redux/actions/authActions';

const Header = (props) => {
	const handleLogout = () => {
		props.dispatch(removeUser());
		localStorage.removeItem('token');
	};

	return (
		<div>
			<p>Hello {props.user.username}.</p>
			<button onClick={handleLogout}>Logout</button>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		user: state.auth.user
	};
};

export default connect(mapStateToProps)(Header);

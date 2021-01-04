import React from 'react';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { removeUser } from '../redux/actions/authActions';

const Header = (props) => {
	const location = useLocation();

	if (location.pathname === '/login' || location.pathname === '/signup')
		return <></>;

	const handleLogout = () => {
		props.dispatch(removeUser());
		localStorage.removeItem('token');
	};

	let name;
	let toRender;

	if (props.user) {
		name = props.user.username;
		toRender = <button onClick={handleLogout}>Logout</button>;
	} else {
		name = 'stranger';
		toRender = (
			<Link to='/login'>
				<button>Login</button>
			</Link>
		);
	}

	return (
		<div>
			<p>Hello, {name}.</p>
			{toRender}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		user: state.auth.user
	};
};

export default connect(mapStateToProps)(Header);

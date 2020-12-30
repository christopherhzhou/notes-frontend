import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import CreateNote from './components/CreateNote';
import Notes from './components/Notes';
import Login from './components/Login';
import Header from './components/Header';
import Prechecks from './containers/Prechecks';
import './App.css';

const App = (props) => {
	let toRender;

	axios.defaults.baseURL = 'http://127.0.0.1:8000';

	if (!props.prechecksRan) {
		toRender = <Prechecks />;
	}
	// if prechecks have been run, we can now check whether or not a user
	// is logged in.
	else if (props.user) {
		toRender = (
			<Router>
				<Header />
				<Switch>
					<Route path='/' exact component={Notes} />
					<Route path='/create' exact component={CreateNote} />
					<Route path='/login' exact component={Login} />
				</Switch>
			</Router>
		);
	} else {
		toRender = (
			<div>
				<p>Welcome back! Please log in.</p>
				<Login />
			</div>
		);
	}

	return <div className='App'>{toRender}</div>;
};

const mapStateToProps = (state) => {
	return {
		prechecksRan: state.auth.prechecksRan,
		user: state.auth.user
	};
};

export default connect(mapStateToProps)(App);

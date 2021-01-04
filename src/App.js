import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import CreateNote from './components/CreateNote';
import Login from './components/Login';
import Header from './components/Header';
import Notes from './components/Notes';
import Prechecks from './containers/Prechecks';
import Signup from './components/Signup';
import './App.css';

const App = (props) => {
	let toRender;

	axios.defaults.baseURL = 'https://authed-notes-backend.herokuapp.com';

	if (!props.prechecksRan) {
		toRender = <Prechecks />;
	}
	// if prechecks have been run, we can now check whether or not a user
	// is logged in.
	else {
		toRender = (
			<Router>
				<Header />
				<Switch>
					<Route path='/' exact component={Notes} />
					<Route path='/create' exact component={CreateNote} />
					<Route path='/login' exact component={Login} />
					<Route path='/signup' exact component={Signup} />
				</Switch>
			</Router>
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

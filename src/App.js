import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import CreateNote from './components/CreateNote';
import Notes from './components/Notes';
import './App.css';

function App() {
	axios.defaults.baseURL = 'http://127.0.0.1:8000';

	return (
		<Router>
			<div className='App'>
				<Switch>
					<Route path='/' exact component={Notes} />
					<Route path='/create' exact component={CreateNote} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;

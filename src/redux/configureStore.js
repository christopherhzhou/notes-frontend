import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers/rootReducer';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

export default function configureStore() {
	const composeEnhancers =
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools

	return createStore(
		reducer,
		{}, // initial state
		composeEnhancers(applyMiddleware(reduxImmutableStateInvariant()))
	);
}

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import runPrechecks from '../functions/run-prechecks';
import { prechecksRan, addUser } from '../redux/actions/authActions';

const Prechecks = (props) => {
	useEffect(() => {
		runPrechecks()
			.then((res) => {
				if (res) props.dispatch(addUser(res));
			})
			.finally(() => {
				props.dispatch(prechecksRan());
			});
	});

	return <></>;
};

export default connect(null)(Prechecks);

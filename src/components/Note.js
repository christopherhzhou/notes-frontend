import React from 'react';

const Notes = (props) => {
	const divStyles = {
		width: '300px',
		margin: 'auto',
		border: 'solid gray 1px'
	};

	const timestampStyles = {
		color: 'grey',
		fontSize: '20%',
		marginBottom: '5px'
	};

	return (
		<div style={divStyles}>
			<p style={timestampStyles}>{props.timestamp}</p>
			<p style={{ margin: '5px' }}>{props.content}</p>
			<button onClick={props.onDelete}>Delete</button>
		</div>
	);
};

export default Notes;

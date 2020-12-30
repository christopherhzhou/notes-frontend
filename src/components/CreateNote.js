import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CreateNote = (props) => {
	const [note, setNote] = useState('');

	const handleCreateNote = (event) => {
		event.preventDefault();

		const content = {
			'content': event.target.note.value
		};

		const config = {
			headers: { Authorization: `Bearer ${props.user.token}` }
		};

		axios
			.post('/note-create/', content, config)
			.then((response) => {
				setNote('');
			})
			.catch((error) => alert(error));
	};

	return (
		<div>
			<div style={{ marginBottom: '20px' }}>
				<Link to='/'>
					<button>View my notes</button>
				</Link>
			</div>
			<form onSubmit={handleCreateNote}>
				<div>
					<label>Your note: </label>
					<input
						type='text'
						id='note'
						value={note}
						onChange={(event) => setNote(event.target.value)}
					/>
				</div>
				<input type='submit' value='Create note' />
			</form>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		user: state.auth.user
	};
};

export default connect(mapStateToProps)(CreateNote);

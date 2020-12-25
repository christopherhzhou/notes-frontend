import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CreateNote = () => {
	const [note, setNote] = useState('');

	const handleCreateNote = (event) => {
		event.preventDefault();
		axios
			.post('/note-create/', {
				'content': event.target.note.value
			})
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

export default CreateNote;

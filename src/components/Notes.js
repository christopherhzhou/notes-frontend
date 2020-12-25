import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Note from './Note';
import axios from 'axios';

import formatTime from '../functions/format-time';

const Notes = (props) => {
	const [notes, setNotes] = useState([
		{
			id: 0
		}
	]);

	useEffect(() => {
		getNotes();
	}, []);

	const getNotes = () => {
		axios
			.get('/note/')
			.then((response) => {
				const formattedNotes = response.data.map((note) => {
					const now = new Date();
					const then = new Date(Date.parse(note.timestamp));
					note.timestamp = formatTime(now - then);

					return note;
				});

				setNotes(formattedNotes);
			})
			.catch((error) =>
				setNotes([
					{
						id: -1
					}
				])
			);
	};

	let toRender;

	if (notes.length === 0) {
		toRender = <p>You don't have any notes :(</p>;
	} else if (notes[0].id === 0) {
		toRender = <p>Loading...</p>;
	} else if (notes[0].id === -1) {
		toRender = <p>Couldn't connect to the server :(</p>;
	} else {
		toRender = (
			<div>
				{notes.map((note, idx) => {
					return (
						<Note
							content={note.content}
							timestamp={note.timestamp}
							key={note.id}
							onDelete={() => handleNoteDelete(note.id, idx)}
						/>
					);
				})}
			</div>
		);
	}

	const handleNoteDelete = (id, idx) => {
		axios
			.delete(`/note-delete/${id}/`)
			.then((response) => {
				const newNotes = [...notes];
				newNotes.splice(idx, 1);
				setNotes(newNotes);
			})
			.catch((error) => alert(error));
	};

	return (
		<div>
			<div style={{ marginBottom: '20px' }}>
				<Link to='/create'>
					<button>Create note</button>
				</Link>
			</div>
			{toRender}
		</div>
	);
};

export default Notes;

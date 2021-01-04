import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
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
		if (props.user) {
			const getNotes = () => {
				const config = {
					headers: { Authorization: `Bearer ${props.user.token}` }
				};

				axios
					.get('/note/', config)
					.then((response) => {
						const formattedNotes = response.data.map((note) => {
							const now = new Date();
							const then = new Date(Date.parse(note.timestamp));
							note.timestamp = formatTime(now - then);

							return note;
						});

						setNotes(formattedNotes);
					})
					.catch((error) => {
						setNotes([
							{
								id: -1
							}
						]);
					});
			};

			getNotes();
		}
	}, [props.user]);

	// if there is no user, return this
	if (!props.user) return <p>Please sign in to view your notes.</p>;

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
		const config = {
			headers: { Authorization: `Bearer ${props.user.token}` }
		};

		axios
			.delete(`/note-delete/${id}/`, config)
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

const mapStateToProps = (state) => {
	return {
		user: state.auth.user
	};
};

export default connect(mapStateToProps)(Notes);

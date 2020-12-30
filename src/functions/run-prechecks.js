import axios from 'axios';

const runPrechecks = async () => {
	const token = localStorage.getItem('token');

	if (!token) return false;

	let toRet;

	// test that token is valid by attempting to get from /check-token/ endpoint
	const config = {
		headers: { Authorization: `Bearer ${token}` }
	};

	await axios
		.post('/auth/check-token/', {}, config)
		.then((response) => {
			toRet = {
				username: response.data.data.username,
				token: token
			};
		})
		.catch(() => {
			localStorage.removeItem('token');
			toRet = false;
		});

	return toRet;
};

export default runPrechecks;

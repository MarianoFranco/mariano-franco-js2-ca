import { getUser } from './localStorageHelpers.js';

if (getUser('jwt') === null) {
	console.log('There is no JWT token');
	window.location.href = './login.html';
}

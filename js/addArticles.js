import alert from './components/alert.js';
import { BASE_URL, headers } from './configs/configs.js';

let addBtn = document.querySelector('.addBtn');

addBtn.onclick = async function (event) {
	event.preventDefault();

	const title = document.querySelector('#title');
	const summary = document.querySelector('#description');
	const author = document.querySelector('#author');

	try {
		let newArticle = {
			title: title.value,
			summary: summary.value,
			author: author.value,
		};
		let response = await axios.post(
			`${BASE_URL}/articles`,
			newArticle,
			headers
		);
		alert('alert-success', 'Your article has been created successfully');

		title.value = '';
		summary.value = '';
		author.value = '';
	} catch (error) {
		alert('alert-danger', 'There was an error creating your article');
	}
};

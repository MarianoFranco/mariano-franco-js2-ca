import alert from './components/alert.js';
import { BASE_URL, headers } from './configs/configs.js';

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get('id');

let title = document.querySelector('#title');
let description = document.querySelector('#description');
let author = document.querySelector('#author');
const submitBtn = document.querySelector('.submitBtn');

async function getAnArticle() {
	const response = await axios.get(`${BASE_URL}/articles/${id}`);

	let articles = response.data;

	title.value = articles.title;
	description.value = articles.summary;
	author.value = articles.author;
}

getAnArticle();

submitBtn.onclick = async function (event) {
	event.preventDefault();
	let updatedArticle = {
		title: title.value,
		summary: description.value,
		author: author.value,
	};

	const response = await axios.put(
		`${BASE_URL}/articles/${id}`,
		updatedArticle,
		headers
	);

	alert('alert-success', 'Your article has been updated');
};

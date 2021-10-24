import { BASE_URL } from './configs/configs.js';
import { printInTheDomTableToEdit } from './components/printInTheDom.js';

async function getArticlesToModify() {
	let response = await axios.get(`${BASE_URL}/articles`);

	let listOfArticles = response.data;
	let articlesContainer = document.querySelector('.tableBody');
	printInTheDomTableToEdit(articlesContainer, listOfArticles);
}
getArticlesToModify();

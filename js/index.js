import { filteringAnArray } from './libs/filteringArray.js';
import { printInTheDom } from './components/printInTheDom.js';
import { BASE_URL } from './configs/configs.js';

async function getItemsFromApi() {
	let response = await axios.get(`${BASE_URL}/articles`);

	let listOfArticles = response.data;
	console.log(listOfArticles);

	let articlesContainer = document.querySelector('.tableBody');

	printInTheDom(articlesContainer, listOfArticles);

	let searchBar = document.querySelector('.search__textbox');

	searchBar.onkeyup = function () {
		articlesContainer.innerHTML = '';
		let filtering = filteringAnArray(listOfArticles, searchBar.value);
		printInTheDom(articlesContainer, filtering);
	};
}
getItemsFromApi();

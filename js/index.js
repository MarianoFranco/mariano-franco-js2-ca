import {
	saveToLocalStorage,
	getStorageItem,
} from './libs/localStorageHelpers.js';
import { filteringAnArray } from './libs/filteringArray.js';

function printInTheDom(domElementInHtml, arrayImGoingToGoTrough) {
	domElementInHtml.innerHTML = '';

	arrayImGoingToGoTrough.forEach((element, iteration) => {
		domElementInHtml.innerHTML += `
			<tr>
				<th>${iteration + 1}</th>
				<td>${element.title}</td>
				<td>${element.summary}</td>				
				<td>
					<i data-id="${element.id}" data-title="${element.title}" data-summary="${
			element.summary
		}" class="far fa-star article__icon"></i></button>
				</td>
			</tr>
		`;
	});
	let toggleButtons = document.querySelectorAll('.article__icon');
	toggleButtons.forEach((element) => {
		element.onclick = function () {
			console.log(element);
			element.classList.toggle('fas');
			let localStorageObject = {
				id: element.dataset.id,
				title: element.dataset.title,
				summary: element.dataset.summary,
			};
			let articles = getStorageItem('articles');

			console.log(localStorageObject.id);
			let isInStorage = articles.find(
				(productObject) => productObject.id === localStorageObject.id
			);

			if (isInStorage === undefined) {
				articles.push(localStorageObject);
				saveToLocalStorage('articles', articles);
			} else {
				let removedArticles = articles.filter(
					(productObject) => productObject.id !== localStorageObject.id
				);

				saveToLocalStorage('articles', removedArticles);
				console.log(removedArticles);
			}
		};
	});
}

async function getItemsFromApi() {
	let response = await axios.get('http://localhost:1337/articles');

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

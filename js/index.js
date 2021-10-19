import {
	saveToLocalStorage,
	getStorageItem,
} from './libs/localStorageHelpers.js';
import { filteringAnArray } from './libs/filteringArray.js';

async function getItemsFromApi() {
	let response = await axios.get('http://localhost:1337/articles');

	let listOfArticles = response.data;
	console.log(listOfArticles);

	let articlesContainer = document.querySelector('.tableBody');

	listOfArticles.forEach((element, iteration) => {
		articlesContainer.innerHTML += `
			<tr>
				<th>${iteration + 1}</th>
				<td>${element.title}</td>
				<td>${element.summary}</td>				
				<td>
					<div class="form-check form-switch">
  						<input class="form-check-input article__toggle" data-id="${
								element.id
							}" data-title="${element.title}" data-summary="${
			element.summary
		}" type="checkbox" role="switch" id="flexSwitchCheckDefault" >  					
					</div>
				</td>
			</tr>
		`;
	});

	let toggleButtons = document.querySelectorAll('.article__toggle');

	toggleButtons.forEach((element) => {
		element.onclick = function () {
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
			}
		};
	});

	let searchBar = document.querySelector('.search__textbox');

	searchBar.onkeyup = function () {
		articlesContainer.innerHTML = '';

		let filtering = filteringAnArray(listOfArticles, searchBar.value);
		filtering.forEach((element, iteration) => {
			articlesContainer.innerHTML += `
				<tr>
					<th>${iteration + 1}</th>
					<td>${element.title}</td>
					<td>${element.summary}</td>				
					<td>
						<div class="form-check form-switch">
							  <input class="form-check-input article__toggle" data-id="${element.id}" 
								data-title="${element.title}" 
								data-summary="${
									element.summary
								}" type="checkbox" role="switch" id="flexSwitchCheckDefault" >  					
						</div>
					</td>
				</tr>
			`;
		});
	};
}
getItemsFromApi();

import {
	saveToLocalStorage,
	getStorageItem,
} from '../libs/localStorageHelpers.js';
import alert from './alert.js';
import { BASE_URL, headers } from '../configs/configs.js';

export const printInTheDom = (domElementInHtml, arrayImGoingToGoTrough) => {
	domElementInHtml.innerHTML = '';

	arrayImGoingToGoTrough.forEach((element, iteration) => {
		domElementInHtml.innerHTML += `
			<tr>
				<th>${iteration + 1}</th>
				<td>${element.title}</td>
				<td>${element.summary}</td>	
				<td>${element.author}</td>	
				<td>
					<i data-id="${element.id}" data-title="${element.title}" data-summary="${
			element.summary
		}" data-author="${element.author}" class="far fa-star article__icon"></i>
				</td>
			</tr>
		`;
	});

	//targeting the icons

	let toggleButtons = document.querySelectorAll('.article__icon');

	toggleButtons.forEach((element) => {
		element.onclick = function () {
			element.classList.toggle('fas');
			let localStorageObject = {
				id: element.dataset.id,
				title: element.dataset.title,
				summary: element.dataset.summary,
				author: element.dataset.author,
			};
			let articles = getStorageItem('articles');

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
};

export const printInTheDomWithoutIcon = (
	domElementFromHtml,
	arrayImGoingToGoTrough
) => {
	if (arrayImGoingToGoTrough.length === 0) {
		alert('alert-danger', 'There are not articles in your favourite list');
	}

	domElementFromHtml.innerHTML = '';
	arrayImGoingToGoTrough.forEach((element, iteration) => {
		domElementFromHtml.innerHTML += `
        <tr>
            <th>${iteration + 1}</th>
            <td>${element.title}</td>
            <td>${element.summary}</td>
        </tr>
    `;
	});

	let deleteButton = document.querySelector('.clearButton');

	deleteButton.onclick = function () {
		localStorage.clear();
		arrayImGoingToGoTrough = [];

		printInTheDomWithoutIcon(domElementFromHtml, arrayImGoingToGoTrough);
	};
};

export const printInTheDomTableToEdit = (
	domElementFromHtml,
	arrayImGoingToGoTrough
) => {
	domElementFromHtml.innerHTML = '';
	arrayImGoingToGoTrough.forEach((element, iteration) => {
		domElementFromHtml.innerHTML += `
		<tr>
			<th scope="row">${iteration + 1}</th>
		<td>${element.title}</td>
		<td>
			<a class="article__link" href="editArticles.html?id=${
				element.id
			}" ><i class="far fa-edit article__icon"></i></a>
		</td>
		<td>
			<i class="fas fa-trash-alt  article__icon" data-id=${element.id}></i>
		</td>
	</tr>
    `;
	});

	let deleteButtons = document.querySelectorAll('.fa-trash-alt');

	deleteButtons.forEach((deleteBtn) => {
		deleteBtn.onclick = async function () {
			let responseDelete = await axios.delete(
				`${BASE_URL}/articles/${deleteBtn.dataset.id}`,
				headers
			);

			printInTheDomTableToEdit(domElementFromHtml, arrayImGoingToGoTrough);

			alert('alert-success', 'Your article has been deleted succesfully');
		};
	});
};

import {
	saveToLocalStorage,
	getStorageItem,
} from './libs/localStorageHelpers.js';

console.log(getStorageItem('articles'));

let favArticles = getStorageItem('articles');
let articlesMessage = document.querySelector('.articles__message');

function showOrHideArticlesMessage(
	arrayElementFromLocalStorage,
	domElementWithTheMessage
) {
	if (arrayElementFromLocalStorage.length === 0) {
		domElementWithTheMessage.style.display = 'block';
	} else {
		domElementWithTheMessage.style.display = 'none';
	}
}

function writeToDomFromLocalStorage(
	domElementFromHtml,
	arrayImGoingToGoTrough
) {
	showOrHideArticlesMessage(arrayImGoingToGoTrough, articlesMessage);

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

		writeToDomFromLocalStorage(domElementFromHtml, arrayImGoingToGoTrough);
	};
}

let articlesContainer = document.querySelector('.tableBody');

writeToDomFromLocalStorage(articlesContainer, favArticles);

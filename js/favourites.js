import {
	saveToLocalStorage,
	getStorageItem,
} from './libs/localStorageHelpers.js';

console.log(getStorageItem('articles'));

let favArticles = getStorageItem('articles');

let articlesMessage = document.querySelector('.articles__message');

if (favArticles.length === 0) {
	articlesMessage.style.display = 'block';
} else {
	articlesMessage.style.display = 'none';
}

function writeToDom(domElementFromHtml, arrayImGoingToGoTrough) {
	domElementFromHtml.innerHTML = '';
	arrayImGoingToGoTrough.forEach((element) => {
		domElementFromHtml.innerHTML += `
        <tr>
            <th>${element.id}</th>
            <td>${element.title}</td>
            <td>${element.summary}</td>				
            <td class="d-flex justify-content-center">
                <div class="delete">
                    <i class="fas fa-trash-alt" data-id="${element.id}" data-title="${element.title}" data-summary="${element.summary}" ></i>
                </div>
            </td>
        </tr>
    `;
	});

	let deleteButtons = document.querySelectorAll('.fa-trash-alt');

	deleteButtons.forEach((deleteButton) => {
		deleteButton.onclick = function () {
			console.log('A button was clicked the id is: ', deleteButton.dataset.id);

			let removedArticles = favArticles.filter(
				(productObject) => productObject.id !== deleteButton.dataset.id
			);
			saveToLocalStorage('articles', removedArticles);
			writeToDom(articlesContainer, favArticles);
		};
	});
}

let articlesContainer = document.querySelector('.tableBody');

writeToDom(articlesContainer, favArticles);

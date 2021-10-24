import {
	saveToLocalStorage,
	getStorageItem,
} from './libs/localStorageHelpers.js';
import {
	printInTheDom,
	printInTheDomWithoutIcon,
} from './components/printInTheDom.js';

console.log(getStorageItem('articles'));

let favArticles = getStorageItem('articles');

let articlesContainer = document.querySelector('.tableBody');

printInTheDomWithoutIcon(articlesContainer, favArticles);

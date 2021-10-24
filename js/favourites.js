import { getStorageItem } from './libs/localStorageHelpers.js';
import { printInTheDomWithoutIcon } from './components/printInTheDom.js';

let favArticles = getStorageItem('articles');

let articlesContainer = document.querySelector('.tableBody');

printInTheDomWithoutIcon(articlesContainer, favArticles);

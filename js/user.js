import { BASE_URL, headers } from './configs/configs.js';
import { printInTheDomTableToEdit } from './components/printInTheDom.js';

async function getArticlesToModify() {
	let response = await axios.get(`${BASE_URL}/articles`);

	let listOfArticles = response.data;
	let articlesContainer = document.querySelector('.tableBody');
	printInTheDomTableToEdit(articlesContainer, listOfArticles);

	//La pagina no se actualiza porque se necesita ejecutar el axios.get otra vez y actualimente no lo esta haciendo
	//una forma de arreglarlo es poner el codigo de prinInTheDOm dentro de esta pagina para que todo funcione
}
getArticlesToModify();

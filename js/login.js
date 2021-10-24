import { lengthValueTexbox, testEmailAddress } from './libs/validation.js';
import { BASE_URL } from './configs/configs.js';
import alert from './components/alert.js';

let form = document.querySelector('.form');
let email = document.querySelector('#email');
let password = document.querySelector('#password');

form.onsubmit = async function (event) {
	event.preventDefault();

	if (lengthValueTexbox(password.value, 5) && testEmailAddress(email.value)) {
		try {
			const response = await axios.post(`${BASE_URL}/auth/local`, {
				identifier: email.value,
				password: password.value,
			});

			localStorage.setItem('jwt', response.data.jwt);
			localStorage.setItem('user', JSON.stringify(response.data.user));
			window.location.href = './user.html';
		} catch (error) {
			alert('alert-danger', error);
		}
	} else {
		alert('alert-danger', 'Please, insert the right values to login');
	}
};

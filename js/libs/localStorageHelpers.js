export const saveToLocalStorage = function (key, value) {
	localStorage.setItem(key, JSON.stringify(value));
};

export const getStorageItem = function (key) {
	if (localStorage.getItem(key) !== null) {
		return JSON.parse(localStorage.getItem(key));
	} else {
		return [];
	}
};

export const getUser = function (userKey) {
	// We will only ever access this funtion on a page thats needs to
	// access the api
	// It makes sense to test here and check if there is a user.
	// If there isnt send them to the login page.
	return JSON.parse(localStorage.getItem(userKey));
};

// Get JWT Token

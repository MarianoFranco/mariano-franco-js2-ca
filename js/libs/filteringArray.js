export const filteringAnArray = (array, filteredText) => {
	return array.filter((arrayElement) => {
		return arrayElement.title
			.toLowerCase()
			.includes(filteredText.toLowerCase());
	});
};

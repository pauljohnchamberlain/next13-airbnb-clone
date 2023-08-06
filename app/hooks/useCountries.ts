import countries from 'world-countries';

const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

console.log('formattedCountries', formattedCountries);

const useCountries = () => {
	const getAll = () => formattedCountries;
	console.log('getAll on UseCountries', getAll);

	const getByValue = (value: string) => {
		if (!value) {
			console.trace('getByValue called with undefined value');
			return null;
		}
		const item = formattedCountries.find((item) => item.value === value);
		console.log('item on UseCountries', item);
		return item;
	};

	return {
		getAll,
		getByValue,
	};
};



export default useCountries;

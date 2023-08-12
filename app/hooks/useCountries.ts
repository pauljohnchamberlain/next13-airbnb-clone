import countries from 'world-countries';

const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

const useCountries = () => {
	const getAll = () => formattedCountries;

	const getByValue = (value: string) => {
		if (!value) {
			console.trace('getByValue called with undefined value');
			return null;
		}
		const item = formattedCountries.find((item) => item.value === value);
		return item;
	};

	return {
		getAll,
		getByValue,
	};
};



export default useCountries;

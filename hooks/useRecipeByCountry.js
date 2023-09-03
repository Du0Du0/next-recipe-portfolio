// 나라 이름을 변경하여 검색하는 함수
const getRecipesByCountry = async ({ queryKey }) => {
	const hoveredCountry = queryKey[1]; // queryKey[1]에 사용자가 입력한 나라 이름이 있어야 합니다.

	// 사용자가 입력한 나라 이름과 API 데이터의 나라 이름을 비교
	let matchedCountryName = null;
	const apiCountries = await axios.get('/countries.php');
	for (const apiCountry of apiCountries.data.countries) {
		if (apiCountry.strArea === hoveredCountry) {
			matchedCountryName = apiCountry.strArea;
			break;
		}
	}

	if (matchedCountryName) {
		// 맨 앞글자는 대문자, 그 뒤부터는 소문자로 변환
		matchedCountryName = matchedCountryName.charAt(0).toUpperCase() + matchedCountryName.slice(1).toLowerCase();

		const { data } = await axios.get(`/filter.php?a=${matchedCountryName}`);
		return data.meals || [];
	} else {
		return [];
	}
};

// 나라 이름을 변경하여 검색하는 커스텀 훅
export const useRecipeByCountry = (userCountryName) => {
	return useQuery(['RecipeByCountry', userCountryName], getRecipesByCountry);
};

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
const getRecipeByCategory = async ({ queryKey }) => {
	const { data } = await axios.get(`/filter.php?c=${queryKey[1]}`);
	return data?.meals || [];
};

//카테고리명으로 레시피데이터 fetching (추가로 debounce되는 Search값 가져옴)
export const useRecipeByCategory = (DebounceCategory, DebounceSearch) => {
	return useQuery(['RecipeByCategory', DebounceCategory], getRecipeByCategory, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 24,
		staleTime: 1000 * 60 * 60 * 24,
		//Search값이 비어있을때에만 동작 (사용자가 검색어 요청중이면 카
		enabled: DebounceSearch === '',
	});
};

const getRecipeBySearch = async ({ queryKey }) => {
	const { data } = await axios.get(`/search.php?s=${queryKey[1]}`);
	return data?.meals || [];
};

//검색어로 레시피데이터 fetching
export const useRecipeBySearch = (DobounceSearch) => {
	return useQuery(['RecipeBySearch', DobounceSearch], getRecipeBySearch, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 24,
		staleTime: 1000 * 60 * 60 * 24,
		//Search값이 비어있지 않을때만 동작
		enabled: DobounceSearch !== '', //인수로 들어온 인풋이 빈 문자열이면 실행불가
	});
};

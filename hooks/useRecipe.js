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
		//Search값이 비어있을때에만 동작 (사용자가 검색어 요청중이면 카테고리 요청은 중지시키기 위함)
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

//아이디로 상세 레시피 fetching
const getRecipeById = async ({ queryKey }) => {
	const { data } = await axios.get(`/lookup.php?i=${queryKey[1]}`);
	return data?.meals[0] || '';
};
export const useRecipeById = (DebounceId) => {
	return useQuery(['RecipeById', DebounceId], getRecipeById, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 24,
		staleTime: 1000 * 60 * 60 * 24,
		retry: 3, //데이터 요청 시도 횟수(디폴트3, 네트워트상황이 안좋을때 재시도횟수 늘림)
		//enabled값에는 truthy, falsy값이 적용안됨 (직접 boolean값을 생성해서 지정)
		//지금 상황에서는 SSG방식으로 초기 데이터를 호출하고 있기 때문에 아래 구문을 지정안해도 잘 동작됨
		//CSR방식으로 호출할떄에는 초기값이 undefined이기 때문에 발생하는 에러를 미리 방지
		enabled: SelectedCategory !== undefined, //useQuery의 호출 유무 true(실행, 디폴트값) false(실행안함)
	});
};

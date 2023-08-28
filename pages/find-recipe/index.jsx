import Head from 'next/head';
import styles from './style.module.scss';
import axios from 'axios';
import Category from '@/components/molecules/Category/Category';
import { useRecipeByCategory, useRecipeBySearch } from '@/hooks/useRecipe';
import { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import Card from '@/components/molecules/Card/Card';
import { Title } from '@/components/atoms/text/Title';
import clsx from 'clsx';
import SearchBar from '@/components/molecules/SearchBar/SearchBar';
import { Text } from '@/components/atoms/text/Text';

export default function Recipe({ categories }) {
	//Selected, Search 값이 변경되면 컴포넌트는 재호출되며
	//컴포넌트 재호출되면 자동으로 react-query훅이 해당 state값을 인수로 전달해서 자동데이터 fetching처리
	//미리 지정한 stale, cache가 남아있으면 데이터를 refetching하지 않음
	const [Selected, setSelected] = useState(categories[0].strCategory);
	const [Search, setSearch] = useState('');

	//이벤트가 단기간에 너무 많은 요청이 들어가는 것을 방지하기 위해서 위 2개 state값을 debounce처리해서 핸들러 호출횟수를 줄임
	const DebouncedSelected = useDebounce(Selected);
	const DebouncedSearch = useDebounce(Search);

	//debounce되는 값이 변경될떄에만 react-query 훅이 호출됨
	const { data: dataByCategory, isSuccess: isCategory } = useRecipeByCategory(DebouncedSelected, DebouncedSearch);
	const { data: dataBySearch, isSuccess: isSearch } = useRecipeBySearch(DebouncedSearch);
	//카테고리 버튼을 클릭할때 실행되는 함수
	//Selected값이 변경되고 새롭게 쿼리 요청을 보내는 조건이 Search값이 비어있어야 가능하므로
	//일단 Search값을 비워놓고 State변경요청 보내는 함수
	const handleClickCategory = (state) => {
		//처음 마운트가 되서 검색어가 없거나 사용자가 일부러 검색어를 비운경우
		setSearch('');
		setSelected(state);
	};

	//디바운싱되는 search, selected값이 변경이 될때마다 실행되는 useEffect
	useEffect(() => {
		//Search값이 있다면 기존의 카테고리 값을 비워야되므로 setSelected로 빈문자열의 state값을 쿼리로 보내서 빈배열을 다시 반환, 결과적으로 해당데이터는 화면에서 사라짐
		if (DebouncedSearch) {
			setSelected('');
			//search값이 없으면 다시 Search를 초기화시킨다음에
			//Selected값을 변경해서 새로 쿼리요청을 보냄
		} else {
			setSearch('');
			!DebouncedSelected && setSelected(categories[0].strCategory);
		}
	}, [DebouncedSearch, DebouncedSelected, categories]);
	return (
		<>
			<Head>
				<title>Recipe Page</title>
			</Head>
			<section className={styles.recipePage}>
				{/* 카테고리 버튼 클릭할때마다 실행할 핸들러함수를 onClick props으로 전달 */}
				<Category items={categories} onClick={handleClickCategory} active={DebouncedSelected} />
				{/* 현재 출력되는 값에 따라 제목 변경 */}
				<Title type={'slogan'} className={clsx(styles.titCategory)}>
					{DebouncedSelected ? DebouncedSelected : `Result: ${DebouncedSearch}`}
				</Title>
				{/* 검색창에 onChange가 발생할때마다 실행할 함수를 onChange props로 전달, value값도 같이 전달 */}
				<SearchBar inputType={'text'} isBtn={false} placeholder={'search'} value={Search} onChange={setSearch} />
				<div className={clsx(styles.listFrame)}>
					{/* Category 데이터가 있을때 */}
					{isCategory && dataByCategory.map((el) => <Card key={el.idMeal} imgSrc={el.strMealThumb} url={`/find-recipe/${el.idMeal}`} txt={`category - ${el.strMeal}`} className={clsx(styles.card)} />)}
					{/* Search 데이터가 있을때 */}
					{isSearch && dataBySearch.map((el) => <Card key={el.idMeal} imgSrc={el.strMealThumb} url={`/find-recipe/${el.idMeal}`} txt={`search - ${el.strMeal}`} className={clsx(styles.card)} />)}
					{/* Category가 없고, Search있고, Search배열 값이 0일때 */}
					{!isCategory && isSearch && dataBySearch.length === 0 && (
						<Text>
							No Results!! <br /> Try another Recipe Name.
						</Text>
					)}
				</div>
			</section>
		</>
	);
}
export async function getStaticProps() {
	const { data } = await axios.get('/categories.php');
	return {
		props: { categories: data.categories },
	};
}

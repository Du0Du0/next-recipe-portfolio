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
export default function Recipe({ categories }) {
	const [Selected, setSelected] = useState(categories[0].strCategory);
	const [Search, setSearch] = useState('');
	const DebouncedSelected = useDebounce(Selected);
	const DebouncedSearch = useDebounce(Search);
	const { data: dataByCategory, isSuccess: isCategory } = useRecipeByCategory(DebouncedSelected, DebouncedSearch);
	const { data: dataBySearch, isSuccess: isSearch } = useRecipeBySearch(DebouncedSearch);
	//카테고리 버튼을 클릭할때 실행되는 함수
	//Selected값이 변경되고 새롭게 쿼리 요청을 보내는 조건이 Search값이 비어있어야 가능하므로
	//일단 Search값을 비워놓고 State변경요청 보내는 함수
	const handleClickCategory = (state) => {
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
				<Category items={categories} onClick={handleClickCategory} active={DebouncedSelected} />
				<Title type={'slogan'} className={clsx(styles.titCategory)}>
					{DebouncedSelected}
				</Title>
				<SearchBar inputType={'text'} isBtn={false} placeholder={'search'} value={Search} onChange={setSearch} />
				<div className={clsx(styles.listFrame)}>
					{isCategory && dataByCategory.map((el) => <Card key={el.idMeal} imgSrc={el.strMealThumb} url={`/find-recipe/${el.idMeal}`} txt={`category - ${el.strMeal}`} className={clsx(styles.card)} />)}
					{isSearch && dataBySearch.map((el) => <Card key={el.idMeal} imgSrc={el.strMealThumb} url={`/find-recipe/${el.idMeal}`} txt={`search - ${el.strMeal}`} className={clsx(styles.card)} />)}
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

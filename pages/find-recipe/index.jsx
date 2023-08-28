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
	const { data: dataByCategory, isSuccess: isCategory } = useRecipeByCategory(DebouncedSelected);
	const { data: dataBySearch, isSuccess: isSearch } = useRecipeBySearch(DebouncedSearch);

	useEffect(() => {
		console.log(DebouncedSearch);
	}, [DebouncedSearch]);
	return (
		<>
			<Head>
				<title>Recipe Page</title>
			</Head>
			<section className={styles.recipePage}>
				<Category items={categories} onClick={setSelected} active={DebouncedSelected} />
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

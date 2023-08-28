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
	const [Selected, setSelected] = useState(categories[0].strCategory);
	const [Search, setSearch] = useState('');

	const DebouncedSelected = useDebounce(Selected);
	const DebouncedSearch = useDebounce(Search);

	const { data: dataByCategory, isSuccess: isCategory } = useRecipeByCategory(DebouncedSelected, DebouncedSearch);
	const { data: dataBySearch, isSuccess: isSearch } = useRecipeBySearch(DebouncedSearch);

	const handleClickCategory = (state) => {
		setSearch('');
		setSelected(state);
	};

	useEffect(() => {
		if (DebouncedSearch) {
			setSelected('');
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
				<Category items={categories} onClick={handleClickCategory} active={DebouncedSelected} className={clsx(styles.category)} />

				<article className={clsx(styles.titBox)}>
					<Title type={'slogan'} className={clsx(styles.titCategory)} style={{ color: '#bbb', hoverColor: '#bbb' }}>
						{DebouncedSelected ? DebouncedSelected : `Result: ${DebouncedSearch}`}
					</Title>

					<SearchBar inputType={'text'} isBtn={false} placeholder={'search'} value={Search} onChange={setSearch} />
				</article>

				<div className={clsx(styles.listFrame)}>
					{isCategory &&
						dataByCategory.map((el) => (
							<Card key={el.idMeal} imgSrc={el.strMealThumb} url={`/find-recipe/${el.idMeal}`} txt={`${el.strMeal}`} className={clsx(styles.card)} />
						))}

					{isSearch &&
						dataBySearch.map((el) => (
							<Card key={el.idMeal} imgSrc={el.strMealThumb} url={`/find-recipe/${el.idMeal}`} txt={`${el.strMeal}`} className={clsx(styles.card)} />
						))}

					{isSearch && dataBySearch.length === 0 && (
						<Text style={{ fontSize: 22, marginTop: 80, color: 'orange' }}>
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

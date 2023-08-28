import Head from 'next/head';
import styles from './style.module.scss';
import Swiper from '@/components/organisms/Swiper/Swiper';
import axios from 'axios';
import Category from '@/components/molecules/Category/Category';
import { useRecipeByCategory } from '@/hooks/useRecipe';
import { useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import Card from '@/components/molecules/Card/Card';
import { Title } from '@/components/atoms/text/Title';
import clsx from 'clsx';

export default function Recipe({ categories }) {
	const [Selected, setSelected] = useState(categories[0].strCategory);

	//useDebounce는 컴포넌트의 재랜더링 자체를 막는 것이 아닌
	//특정 State가 변경될때마다 실행되는 무거운 함수의 호출 자체를 Debouncing하기 위함
	const DebouncedSelected = useDebounce(Selected);
	const { data: dataByCategory, isSuccess: isCategory } = useRecipeByCategory(DebouncedSelected);
	const { data, isSuccess } = useRecipeByCategory(DebouncedSelected);
	return (
		<>
			<Head>
				<title>Recipe Page</title>
			</Head>

			<section className={styles.recipePage}>
				{/* 버튼활성화 순서1- category로 활성화여부를 구분할수 있는 정보값을 active라는 props로 전달 */}
				<Category items={categories} onClick={setSelected} active={DebouncedSelected} />

				<Title type={'slogan'} className={clsx(styles.titCategory)}>
					{DebouncedSelected}
				</Title>

				<div className={clsx(styles.listFrame)}>
					{isCategory && dataByCategory.map((el) => <Card key={el.idMeal} imgSrc={el.strMealThumb} url={`/find-recipe/${el.idMeal}`} txt={el.strMeal} className={clsx(styles.card)} />)}
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

import Head from 'next/head';
import styles from './style.module.scss';
import Swiper from '@/components/organisms/Swiper/Swiper';
import axios from 'axios';
import Category from '@/components/molecules/Category/Category';
import { useRecipeByCategory } from '@/hooks/useRecipe';
import { useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

export default function Recipe({ categories }) {
	const [Selected, setSelected] = useState(categories[0].strCategory);

	//useDebounce는 컴포넌트의 재랜더링 자체를 막는 것이 아닌
	//특정 State가 변경될때마다 실행되는 무거운 함수의 호출 자체를 Debouncing하기 위함
	const DebouncedSelected = useDebounce(Selected);
	const { data, isSuccess } = useRecipeByCategory(DebouncedSelected);
	return (
		<>
			<Head>
				<title>Recipe Page</title>
			</Head>

			<section className={styles.recipePage}>
				<Category items={categories} onClick={setSelected} />
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

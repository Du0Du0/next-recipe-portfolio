import Head from 'next/head';
import styles from './style.module.scss';
import Swiper from '@/components/organisms/Swiper/Swiper';
import axios from 'axios';
import Category from '@/components/molecules/Category/Category';
import { useRecipeByCategory } from '@/hooks/useRecipe';
import { useState } from 'react';

export default function Recipe({ categories }) {
	console.log(categories);
	//react-query를 활용하는 쿼리키 인수값을 State에 담음
	const [Selected, setSelected] = useState(categories[0].strCategory);
	//해당 State값이 바뀔때마다 react-query훅이 호출되면서 새로운 데이터 패칭
	const { data, isSuccess } = useRecipeByCategory('Beef');
	console.log(data);

	return (
		<>
			<Head>
				<title>Recipe Page</title>
			</Head>

			<section className={styles.recipePage}>
				{/* 이벤트가 발생해야 되는 자식요소에 queryKey로 연동되어 있는 state변경함수를 전달 */}
				<Category items={categories} handler={setSelected} />
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

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
	const { data, isSuccess } = useRecipeByCategory(Selected);
	//const obj = useRecipeByCategory(Selected);
	//{data:서버데이타, isSuccess: boolean, refetch: func}
	console.log(data);

	return (
		<>
			<Head>
				<title>Recipe Page</title>
			</Head>

			<section className={styles.recipePage}>
				{/* 이벤트가 발생해야 되는 자식요소에 queryKey로 연동되어 있는 state변경함수를 전달 */}
				{/* 자식 컴포넌트에 이벤트 전달해야때 무조건 이벤트명 props 핸들러함수 전달 : 자식요소에 어떤이벤트에 어떤 핸들러가 보내지는 파악하기 위함 */}
				{/* State변경하는 이벤트 핸들러함수를 onClick props에 담아서 전달 */}
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

import Head from 'next/head';
import axios from 'axios';

export default function Home({ meals, category }) {
	//idMeal
	//strMeal
	//strMealThumb
	console.log(meals);
	console.log(category);

	return (
		<>
			<Head>
				<title>Main Page</title>
			</Head>
			<h2>Main Page</h2>
		</>
	);
}

// ssg방식 (한번만 build됨)
export async function getStaticProps() {
	const list = [];
	const { data: obj } = await axios.get('/categories.php');
	const items = obj.categories;
	items.forEach((el) => list.push(el.strCategory));
	const newList = list.filter((el) => el !== 'Goat' && el !== 'Vegan' && el !== 'Starter');

	const randomNum = Math.floor(Math.random() * newList.length);

	const { data } = await axios.get(`/filter.php?c=${newList[randomNum]}`);

	return {
		//이전에 가져온 응답 데이터를 props 속성에 할당하여 해당 데이터를 페이지 컴포넌트 내에서 사용
		props: { ...data, category: newList[randomNum] },
		//아래 추가하면 ISR 방식으로 변경
		//24시간마다 재생성
		revalidate: 10,
	};
}

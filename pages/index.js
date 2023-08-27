import Head from 'next/head';
import styles from './Home.module.scss';
import clsx from 'clsx';
import axios from 'axios';
import Title from '@/components/atoms/text/Title';

export default function Home({ meals }) {
	//idMeal
	//strMeal
	//strMealThumb
	console.log(meals);

	return (
		<>
			<Head>
				<title>Next Recipe</title>
				<meta name='description' content='Generated by create next app' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className={clsx(styles.main)}>
				<Title
					url={'/abc'}
					className={styles.txt}
					//style에 컬러값 적용시 hover값까지 같이 스크립트로 덮어쓰기 되므로
					//아예 hover색상같이 같이 그룹으로 전달
					//style객체로 컬러값 자체를 전달하지 않으면
					//module.sass에 있는 기본 호버 스타일 적용
					style={{ color: 'violet', hoverColor: 'aqua' }}
				>
					Hello
				</Title>
			</main>
		</>
	);
}

// ssg방식 (한번만 build됨)
export async function getStaticProps() {
	//props로 데이터 넘길때에는 data안쪽의 값까지 뽑아낸다음에 전달
	const { data } = await axios.get('/filter.php?c=Seafood');
	console.log('response', data);

	return {
		//이전에 가져온 응답 데이터를 props 속성에 할당하여 해당 데이터를 페이지 컴포넌트 내에서 사용
		props: data,
		//아래 추가하면 ISR 방식으로 변경
		//24시간마다 재생성
		revalidate: 60 * 60 * 24,
	};
}

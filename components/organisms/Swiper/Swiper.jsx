import styles from './Swiper.module.scss';
import clsx from 'clsx';
import { Title } from '@/components/atoms/text/Title';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/css';
import { useState } from 'react';
import Slider from '@/components/molecules/Slider/Slider';
import Counter from '@/components/molecules/Counter/Counter';

//Next에서는 Autopaly, Pagination, Navigation기능을 활성화하기 위해 SwiperCore.use 사용
SwiperCore.use([Autoplay]);

//npm i swiper@9
function SwiperWrap({ recipe, category }) {
	console.log('recipe', recipe);
	console.log('category', category);
	const [Index, setIndex] = useState(0);
	console.log(Index);

	return (
		//idMeal
		//strMeal
		//strMealThumb
		<figure className={clsx(styles.visual)}>
			<Title style={{ position: 'absolute', top: '20vh', left: '10vw', fontSize: 50, color: 'orange' }}>{category}</Title>

			<Swiper
				className={clsx(styles.swiper)}
				modules={[Autoplay]}
				autoplay={{ delay: 2000, disableOnInteraction: true }}
				loop={true}
				grabCursor={true}
				slidesPerView={1}
				spaceBetween={100}
				centeredSlides={true}
				breakpoints={{
					1200: {
						slidesPerView: 3,
						spaceBetween: 50,
					},
				}}
			>
				{recipe.map((item) => (
					//SwiperSlide 컴포넌트안쪽에서 자동으로 JSX리턴하는 함수 호출 가능
					//해당 함수에는 파라미터로 현재 컴포넌트 요소가 활성화되어있는 구분할 수 있는 객체가 전달
					<SwiperSlide key={item.idMeal} className={clsx(styles.swiperSlide)}>
						{({ isActive }) => {
							console.log(props);
							return (
								<div className={clsx(isActive ? styles.on : '')}>
									<Title tag={'h3'} url={`/detail/${item.idMeal}?name=${item.strMeal}`} type={'slogan'}>
										{item.strMeal.length > 25 ? item.strMeal.substr(0, 25) : item.strMeal}
									</Title>

									<Slider data={recipe} index={Index} />
									<Counter index={Index} len={recipe.length} />
								</div>
							);
						}}
					</SwiperSlide>
				))}
			</Swiper>
		</figure>
	);
}

export default SwiperWrap;

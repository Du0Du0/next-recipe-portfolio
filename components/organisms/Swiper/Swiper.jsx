import styles from './Swiper.module.scss';
import clsx from 'clsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/css';

//npm i swiper@9
function SwiperWrap({ recipe, category }) {
	console.log('recipe', recipe);
	console.log('category', category);
	return (
		<figrue>
			<Swiper></Swiper>
		</figrue>
	);
}

export default SwiperWrap;

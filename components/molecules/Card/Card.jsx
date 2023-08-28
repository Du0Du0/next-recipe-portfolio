import { Pic } from '@/components/atoms/pic/Pic';
import styles from './Card.module.scss';
import clsx from 'clsx';

function Card({ txt, imgSrc, className }) {
	return (
		<article className={clsx(styles.card)}>
			<Pic imgSrc={imgSrc} />
		</article>
	);
}

export default Card;

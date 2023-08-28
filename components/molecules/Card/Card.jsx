import { Pic } from '@/components/atoms/pic/Pic';
import styles from './Card.module.scss';
import clsx from 'clsx';
import { Text } from '@/components/atoms/text/Text';

function Card({ txt, imgSrc, className, url }) {
	return (
		<article className={clsx(styles.card, className)}>
			{imgSrc && <Pic imgSrc={imgSrc} />}
			{txt && <Text url={url}>{txt}</Text>}
		</article>
	);
}

export default Card;

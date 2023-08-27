import Image from 'next/image';
import clsx from 'clsx';
import styles from './Visual.module.scss';

export function Visual({ imgSrc, style }) {
	return (
		<div className={clsx(styles.pic)} style={style}>
			<Image src={imgSrc} alt={imgSrc} priority fill sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' />
		</div>
	);
}

export function VisualWithText({ imgSrc, style, imgTxt }) {
	return (
		<div className={clsx(styles.picWithTxt)} style={style}>
			<Image src={imgSrc} alt={imgSrc} priority fill sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' />
			<h2>{imgTxt}</h2>
		</div>
	);
}

import Image from 'next/image';
import clsx from 'clsx';
import styles from './Visual.module.scss';

export function Visual({
	imgSrc,
	style,
	imgTxt,
	children, //해당 아톰 컴포넌트가 호출되는 위치에서의 className props를 내부로 전달
	className,
	priority = false,
}) {
	return (
		<div className={clsx(styles.pic, className)} style={style}>
			<Image src={imgSrc} alt={imgSrc} priority={priority} fill sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' />

			{/* 컴포넌트 호출시 전달되는 prop유무에 따라서 반환하는 JSX분기처리 */}
			{imgTxt && <h2>{imgTxt}</h2>}
			{children && children}
		</div>
	);
}

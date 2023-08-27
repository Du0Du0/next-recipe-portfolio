import Image from 'next/image';
import clsx from 'clsx';
import styles from './Pic.module.scss';
import Link from 'next/link';
import { HashLoader } from 'react-spinners';
import { useState } from 'react';

//react-spinners
export function Pic({
	imgSrc,
	style,
	imgTxt,
	children, //해당 아톰 컴포넌트가 호출되는 위치에서의 className props를 내부로 전달
	className,
	priority = false,
	url,
}) {
	const [IsLoaded, setIsLoaded] = useState(false);
	return (
		<div className={clsx(styles.pic, className)} style={style}>
			<Image src={imgSrc} alt={imgSrc} priority={priority} fill sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' onLoadingComplete={() => setIsLoaded(true)} />

			{/* 컴포넌트 호출시 전달되는 prop유무에 따라서 반환하는 JSX분기처리 */}
			{imgTxt && (
				<>
					{/* 이미지위에 글자가 출력되야 되므로 dimmed처리할 마스크 */}
					<aside></aside>
					{/* url 값이 전달되면 Link컴포넌트를 연결해서 출력 */}
					{url ? (
						<h2>
							<Link href={url}>{imgTxt}</Link>
						</h2>
					) : (
						<h2>{imgTxt}</h2>
					)}
				</>
			)}
			{children && (
				<>
					<aside></aside>
					{url ? <Link href={url}>children</Link> : children}
				</>
			)}
			{/* spinner로딩 */}
			<HashLoader
				cssOverride={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
				}}
				size={100}
				color={'aqua'}
				loading={!IsLoaded}
			/>
		</div>
	);
}

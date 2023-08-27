import React from 'react';
import Link from 'next/link';
import styles from './Text.module.scss';
import clsx from 'clsx';
import { Nanum_Myeongjo, Orbitron } from 'next/font/google';

const nanum = Nanum_Myeongjo({
	subsets: ['latin'],
	weight: ['400', '700'],
	preload: true,
	variable: '--font-nanum',
});
const orbitron = Orbitron({
	subsets: ['latin'],
	weight: ['400', '700'],
	preload: true,
	variable: '--font-orbitron',
});

function Text({ children, url, style, className, type, tag = 'p', isOn = false }) {
	return React.createElement(
		tag,
		{
			className: clsx(
				styles.txt,
				className,
				nanum.variable,
				orbitron.variable,
				styles[`txt_${type}`], //추가 클래스명
				isOn && styles.on //전달되는 boolean값에 따라 고유클래스 on추가, module.sass가 자체적으로 고유클래스명으로 변환하기 때문에 부모의 클래스명을 내부 전용 css에 연결하는게 불가
			),
			style: url ? style : { ...style, transitionDuration: '0.5s' },
			onMouseEnter: (e) => (e.target.style.color = style?.hoverColor),
			onMouseLeave: (e) => (e.target.style.color = style?.color),
		},
		url
			? React.createElement(
					Link,
					{
						href: url,
						style: { transitionDuration: '0.5s' },
					},
					children
			  )
			: children
	);
}

export default Text;

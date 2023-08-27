import React from 'react';
import Link from 'next/link';
import styles from './Title.module.scss';
import clsx from 'clsx';
import { Nanum_Myeongjo, Orbitron } from 'next/font/google';

const nanum = Nanum_Myeongjo({
	subsets: ['latin'],
	weight: ['400', '700'],
	preload: true,
	variable: '--font-nanum', //직접 사용할 변수명 등록, 해당 변수명을 활용하면 클래스 등록X
	display: 'swap',
	adjustFontFallback: false,
});

const orbitron = Orbitron({
	subsets: ['latin'],
	weight: ['400', '700'],
	preload: true,
	variable: '--font-orbitron',
	display: 'swap',
	adjustFontFallback: false,
});

//React.createElement(elementType:string, props:object, children:React Node)
export function Title({ children, url, style, className, type, tag = 'h1' }) {
	return React.createElement(
		tag, //elementType
		{
			//props
			className: clsx(styles.tit, className, nanum.variable, orbitron.variable, styles[`tit_${type}`]),
			style: url ? style : { ...style, transitionDuration: '0.5s' },
			onMouseEnter: (e) => (e.target.style.color = style?.hoverColor),
			onMouseLeave: (e) => (e.target.style.color = style?.color),
		},
		//React Node
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
export default Title;

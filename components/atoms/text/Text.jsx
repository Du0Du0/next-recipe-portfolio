import React from 'react';
import Link from 'next/link';
import styles from './Text.module.scss';
import clsx from 'clsx';
import { Nanum_Myeongjo, Orbitron } from 'next/font/google';
import { useRouter } from 'next/router';

const nanum = Nanum_Myeongjo({
	subsets: ['latin'],
	weight: ['400', '700'],
	preload: true,
	variable: '--font-nanum',
	display: 'block', //block(default): 외부폰트가 준비안되었을때 해당 텍스트 숨김처리, swap: 외부폰트 준비가 안되었을때 일단은 기본 system 폰트를 fallback처리해서 보임처리
	adjustFontFallback: true, //레이아웃의 최적화를 위해서 자동으로 fallback(대체폰트 출력)기능 실행
});
const orbitron = Orbitron({
	subsets: ['latin'],
	weight: ['400', '700'],
	preload: true,
	variable: '--font-orbitron',
	display: 'block',
	adjustFontFallback: true,
});

export function Text({ children, url, style, className, type, tag = 'p', isOn = false }) {
	const router = useRouter();
	const currentPath = router.pathname;

	return React.createElement(
		tag,
		{
			className: clsx(currentPath === url ? styles.on : '', styles.txt, className, nanum.variable, orbitron.variable, styles[`txt_${type}`], isOn && styles.on),
			style: url ? style : { ...style, transitionDuration: '0.5s' },
			onMouseEnter: (e) => (e.target.style.color = style?.hoverColor),
			onMouseLeave: (e) => (e.target.style.color = style?.color),
		},
		url ? React.createElement(Link, { href: url, style: { transitionDuration: '0.5s' } }, children) : children
	);
}

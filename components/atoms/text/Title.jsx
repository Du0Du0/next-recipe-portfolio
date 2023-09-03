import React from 'react';
import Link from 'next/link';
import styles from './Title.module.scss';
import clsx from 'clsx';
import { Roboto, Orbitron } from 'next/font/google';

const roboto = Roboto({
	subsets: ['latin'],
	weight: ['400', '700'],
	preload: true,
	variable: '--font-roboto',
	display: 'block',
	adjustFontFallback: true,
});

const orbitron = Orbitron({
	subsets: ['latin'],
	weight: ['400', '700'],
	preload: true,
	variable: '--font-orbitron',
	display: 'block',
	adjustFontFallback: true,
});

export function Title({ children, url, style, className, type, tag = 'h1' }) {
	return React.createElement(
		tag,
		{
			className: clsx(styles.tit, className, roboto.variable, orbitron.variable, styles[`tit_${type}`]),
			style: url ? style : { ...style, transitionDuration: '0.5s' },
			onMouseEnter: (e) => (e.target.style.color = style?.hoverColor),
			onMouseLeave: (e) => (e.target.style.color = style?.color),
		},

		url ? React.createElement(Link, { href: url, style: { transitionDuration: '0.5s' } }, children) : children
	);
}

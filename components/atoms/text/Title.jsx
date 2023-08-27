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
});

const orbitron = Orbitron({
	subsets: ['latin'],
	weight: ['400', '700'],
	preload: true,
	variable: '--font-orbitron',
});

// function Title({ children, url, style, className, type }) {
// 	return (
// 		<h1
// 			//폰트객체의 클래스명을 지정하면 안쪽의 모든 폰트는 해당 폰트가 디폴트로 적용
// 			//변수명을 활용해서 선별적으로 쓰고 싶을때 객체.variable
// 			className={clsx(
// 				styles.tit,
// 				className,
// 				nanum.variable,
// 				orbitron.variable, //연관배열 형태로 스타일객체의 클래스 지정
// 				styles[`tit_${type}`]
// 			)}
// 			//url속성유무로 자식에 링크가 있는지 파악
// 			//만약 자식으로 링크가 있으면 상위요소인 h1엘리먼트에는 transition속성 제거, 자식으로 링크가 없으면 transition속성 추가
// 			style={url ? style : { ...style, transitionDuration: '0.5s' }}
// 			//해당 컴포넌트에 hover이벤트가 발생할때마다 hover, color값을 분기처리
// 			//style객체가 넘어오지 않을때를 대비해서 옵셔널 체이닝
// 			onMouseEnter={(e) => (e.target.style.color = style?.hoverColor)}
// 			onMouseLeave={(e) => (e.target.style.color = style?.color)}
// 		>
// 			{url ? (
// 				//어차피 링크가 있다면 transition이 적용되야되므로 해당 속성 추가
// 				<Link href={url} style={{ transitionDuration: '0.5s' }}>
// 					{children}
// 				</Link>
// 			) : (
// 				children
// 			)}
// 		</h1>
// 	);
// }

//React.createElement(elementType:string, props:object, children:React Node)
function Title({ children, url, style, className, type, tag }) {
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

import styles from './Btn.module.scss';
import clsx from 'clsx';

function Btn({ type = 'button', children, style, className, handler }) {
	return (
		//부모로부터 handler라는 공통의 prop이름으로 이벤트핸들러함수(아무거나) 호출
		<button type={type} style={style} className={clsx(styles.btn, className)} onClick={() => handler(children)}>
			{children}
		</button>
	);
}

export default Btn;

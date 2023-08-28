import styles from './Btn.module.scss';
import clsx from 'clsx';

function Btn({ type = 'button', children, style, className, onClick }) {
	return (
		//부모로부터 handler라는 공통의 prop이름으로 이벤트핸들러함수(아무거나) 호출
		//onClick이벤트에 전달받은 핸들러 함수 연결
		<button type={type} style={style} className={clsx(styles.btn, className)} onClick={onClick}>
			{children}
		</button>
	);
}

export default Btn;

import styles from './Btn.module.scss';
import clsx from 'clsx';

function Btn({ type = 'button', children, style, className, onClick, isActive }) {
	return (
		//활성화순서3 - isActive값이 true일때만 on클래스 붙도록 처리
		<button type={type} style={style} className={clsx(styles.btn, className, isActive ? styles.on : '')} onClick={onClick}>
			{children}
		</button>
	);
}

export default Btn;

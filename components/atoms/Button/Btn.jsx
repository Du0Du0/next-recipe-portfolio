import styles from './Btn.module.scss';
import clsx from 'clsx';

function Btn({ type = 'button', children, style, className }) {
	return (
		<button type={type} style={style} className={clsx(styles.btn, className)}>
			{children}
		</button>
	);
}

export default Btn;

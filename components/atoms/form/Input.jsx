import styles from './Input.module.scss';
import clsx from 'clsx';

function Input({ type = 'text', placeholder = 'text', onChange, value, style = { style }, className }) {
	return <input type={type} className={clsx(styles.input, className)} placeholder={placeholder} value={value} onChange={onChange} style={style} />;
}

export default Input;

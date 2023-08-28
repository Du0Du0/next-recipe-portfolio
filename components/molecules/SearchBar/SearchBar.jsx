import Input from '@/components/atoms/form/Input';
import styles from './SearchBar.module.scss';
import clsx from 'clsx';
import Btn from '@/components/atoms/Button/Btn';

function SearchBar({ isBtn = true, btnText = 'button', inputType, value, onChange, placeholder }) {
	return (
		<div className={clsx(styles.searchBar)}>
			<Input type={inputType} value={value} onChange={onChange} placeholder={placeholder} />
			{isBtn && <Btn>{btnText}</Btn>}
		</div>
	);
}

export default SearchBar;

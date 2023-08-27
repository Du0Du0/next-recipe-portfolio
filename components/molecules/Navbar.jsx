import clsx from 'clsx';
import styles from './Navbar.module.scss';
import Text from '../atoms/text/Text';

function Navbar({ names }) {
	return (
		<nav className={clsx(styles.gnb)}>
			{names.map((el) => (
				<Text key={el} url={`/${el}`} type={'menu'} tag={'span'}>
					{el}
				</Text>
			))}
		</nav>
	);
}

export default Navbar;

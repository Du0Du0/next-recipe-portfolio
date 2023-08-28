import clsx from 'clsx';
import styles from './Navbar.module.scss';
import { Text } from '../../atoms/text/Text';

function Navbar({ names, gap }) {
	return (
		<nav className={clsx(styles.gnb)} style={{ gap: gap }}>
			{names.map((el) => {
				const url = el.toLowerCase().split(' ').join('-');

				return (
					<Text key={url} url={`/${url}`} type={'menu'} tag={'span'}>
						{el}
					</Text>
				);
			})}
		</nav>
	);
}

export default Navbar;

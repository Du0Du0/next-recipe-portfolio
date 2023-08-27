import Header from '../organisms/Header';
import styles from './Layout.module.scss';
import clsx from 'clsx';

function Layout() {
	return (
		<main className={clsx(styles.main)}>
			<Header />
		</main>
	);
}

export default Layout;

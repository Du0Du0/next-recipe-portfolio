import { Title } from '../../atoms/text/Title';
// import Navbar from '../../molecules/NavBar/Navbar';
import styles from './Header.module.scss';
import clsx from 'clsx';

function Header() {
	return (
		<header className={clsx(styles.header)}>
			<Title url={'/'} type={'logo'}>
				World Food Travel
			</Title>
			{/* <Navbar names={['Find Recipe', 'My Favorites']} /> */}
		</header>
	);
}

export default Header;

import clsx from 'clsx';
import styles from './Navbar.module.scss';
import Text from '../../atoms/text/Text';

function Navbar({ names, gap }) {
	return (
		<nav className={clsx(styles.gnb)} style={{ gap: gap }}>
			{names.map((el) => {
				//pros로 들어온 문자값을 먼저 소문자로 변경하고 빈칸이 있으면 빈칸을 구분점으로 배열로 변환한 다음 다시 해당 배열을 하이폰으로 연결해서 문자열로 반환 (라우터경로로 설정)
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

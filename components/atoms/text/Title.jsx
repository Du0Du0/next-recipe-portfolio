import Link from 'next/link';
import styles from './Title.module.scss';
import clsx from 'clsx';

function Title({ children, url, style, className }) {
	return (
		<h1 className={clsx(styles.tit, className)} style={style}>
			{url ? <Link href={url}>{children}</Link> : children}
		</h1>
	);
}

export default Title;

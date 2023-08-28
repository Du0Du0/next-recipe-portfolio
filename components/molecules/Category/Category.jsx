import Btn from '@/components/atoms/Button/Btn';
import styles from './Category.module.scss';
import clsx from 'clsx';

function Category({ items, onClick }) {
	return (
		<nav className={clsx(styles.category)}>
			{items.map((el) => (
				//부모로부터 받은 onClick핸들러함수 props을 다시 Btn컴포넌트에 전달
				<Btn key={el.idCategory} onClick={() => onClick(el.strCategory)}>
					{el.strCategory}
				</Btn>
			))}
		</nav>
	);
}

export default Category;

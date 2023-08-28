import Btn from '@/components/atoms/Button/Btn';
import styles from './Category.module.scss';
import clsx from 'clsx';

function Category({ items, onClick, active }) {
	return (
		<nav className={clsx(styles.category)}>
			{items.map((el) => (
				//버튼활성화 순서2 - ative로 활성화관련 정보를 받아서 내부에서 반복처리할때 활성화여부를 boolen값으로 만들어서 isActive라는 props로 전달
				<Btn key={el.idCategory} onClick={() => onClick(el.strCategory)} isActive={el.strCategory === active}>
					{el.strCategory}
				</Btn>
			))}
		</nav>
	);
}

export default Category;

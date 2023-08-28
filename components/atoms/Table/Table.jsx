import { Title } from '../text/Title';
import styles from './Table.module.scss';
import clsx from 'clsx';

/* 
  thead
    (순번, 재료명, 재료량)
  tbody 
    tr(반복)
    td()

*/

export function Table({ data, title }) {
	if (data.length === 0) return;
	return (
		<>
			{title && <Title>{title}</Title>}

			<table className={clsx(styles.table)}>
				<thead>
					<tr>
						{/* 첫번째 배열의 키값만 반복을 돌면서 제목줄 출력 */}
						{Object.keys(data[0]).map((key) => (
							<th key={key}>{key}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.map((el, idx) => (
						<tr key={idx}>
							{Object.values(el).map((val, idx) => (
								<td key={idx}>{val}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}

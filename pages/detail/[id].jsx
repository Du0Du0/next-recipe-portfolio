import { useRouter } from 'next/router';

function Detail() {
	const router = useRouter();
	const { id, name } = router.query;
	return (
		<section>
			<h1>{name}</h1>
		</section>
	);
}

export default Detail;

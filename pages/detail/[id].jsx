import { useRouter } from 'next/router';

function Detail() {
	const router = useRouter();
	const { id, name, url } = router.query;
	return (
		<section>
			<h1>{name}</h1>
			<p>{url}</p>
		</section>
	);
}

export default Detail;

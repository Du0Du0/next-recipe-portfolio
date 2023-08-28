import Layout from '@/components/template/Layout/Layout';
import '@/styles/globals.scss';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';

axios.defaults.baseURL = 'https://www.themealdb.com/api/json/v1/1';
const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
	const router = useRouter();
	return (
		<QueryClientProvider client={queryClient}>
			<AnimatePresence mode='wait'>
				<motion.div key={router.pathname}>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</motion.div>
			</AnimatePresence>
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}

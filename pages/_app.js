import Layout from '@/components/template/Layout/Layout';
import '@/styles/globals.scss';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { keepStyle } from '@/libs/keepStyle';
keepStyle(3000);

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
					{/* 페이지가 바뀌기 시작할때 나타날 프레임 */}
					<motion.div
						className='in'
						initial={{ scaleX: 0 }}
						animate={{ scaleX: 0 }}
						exit={{ scaleX: 1 }}
						transition={{ duration: 0.7, ease: [0.25, 0.1, 0.03, 0.99] }}
					></motion.div>
					{/* 페이지가 바뀌고 나서 사라질 프레임 */}
					<motion.div
						className='out'
						initial={{ scaleX: 1 }}
						animate={{ scaleX: 0 }}
						exit={{ scaleX: 0 }}
						transition={{ duration: 0.7, ease: [0.25, 0.1, 0.03, 0.99] }}
					></motion.div>
				</motion.div>
			</AnimatePresence>
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}

/*
	next동작방식 ssg, isr 방식으로 프리랜더되서 만들어지는 페이지는 
	프리렌더링 방식으로 구현되어 있는 페이지들은 이벤트가 발생하지 않더라도 라우터설정되어 있는 메뉴에 호버하면 
	해당 데이터를 확인할걸로 예측해서 미리 prefetching처리
	해당 페이지 컴포넌트가 라우터명이 변경되서 unmount될때마다 이다음에 prefetch할 데이터 용량을 최소화하기 위해서 style노드를 제거

	Framer-motion AnimatePresence를 이용해서 모션이 끝날때까지 이전 컴포넌트의 언마운트 시점을 강제로 holding하고 있으면
	이미 스타일 제거된 지저분한 페이지가 화면에 계속 출력이 되는 문제 발생
	정적인 스타일은 상관없지만 자바스크립트 동적으로 제어하는 module.scss. style-component, tailwindCSS에는 모두 위와 같은 문제발생

	해결방법
	라우터가 변경되는 시점마다, unmount되서 스타일이 날라가지 직전에 해당 스타일 노드를 head에서부터 복사한다음에 
	next고유 속성명 제거
	복사한 style node를 다시 강제로 head에 삽입
	이렇게 복사가된 style 노드는 next가 제거할 수 없으므로 router가 변경되더라도 복사된 style이 유지되므로 스타일도 유지
	transition이 끝나서 이전 페이지 컴포넌트가 언마운트 되는 시점에 강제 복사했던 스타일 노드를 다시 제거
	해당 기능을 함수로 만들어서 루트 컴포넌트에서 라우트가 변경될때마다 호출
*/

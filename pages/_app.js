import '@/styles/globals.scss';
import axios from 'axios';

axios.defaults.baseURL = 'https://www.themealdb.com/api/json/v1/1/';

export default function App({ Component, pageProps }) {
	return <Component {...pageProps} />;
}

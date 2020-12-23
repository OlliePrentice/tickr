import '../styles/App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChartLine, faCheckSquare } from '@fortawesome/free-solid-svg-icons'

library.add(faChartLine, faCheckSquare);

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp

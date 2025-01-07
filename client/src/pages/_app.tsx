import '../shared/styles/globals.css';
import { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div>
      <header>
        <nav>
          <a href="/about">About</a>
        </nav>
      </header>
      <Component {...pageProps} />
      <footer>
        <p>© 2024 My App</p>
      </footer>
    </div>
  );
};

export default MyApp;

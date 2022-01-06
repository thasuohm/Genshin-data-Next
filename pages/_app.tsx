import "../styles/globals.css";
import type { AppProps } from "next/app";
import "../styles/main.css";
import "../styles/dashboard.css";
import "../styles/character-card.css";
import "../styles/character-info.css";
import "../styles/nav-bar.css";
import Navbar from "../app/components/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="App">
      <Navbar />
      <main className="main-container">
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default MyApp;

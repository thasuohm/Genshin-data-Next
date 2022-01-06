import type { NextPage } from "next";
import Head from "next/head";
import Dashboard from "../app/components/Dashboard";
// import Navbar from "../app/components/Navbar";
// import SideBar from "../app/components/SideBar";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Genshin Impact Base</title>
        <meta
          name="description"
          content="Genshin impact data (for education only)"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Dashboard />
    </div>
  );
};

export default Home;

import Head from 'next/head';
import TitleChanger from '../components/TitleChanger';
const Home: React.FC = () => {
  return (
    <TitleChanger>
      <main>
        <h1>Hahaha, agora vamos começar</h1>
      </main>
    </TitleChanger>
  );
};
export default Home;

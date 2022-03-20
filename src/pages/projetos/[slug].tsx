import fs from 'fs';
import renderMathInElement from 'katex/dist/contrib/auto-render.mjs';
import 'katex/dist/katex.min.css';
import { GetStaticPaths } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { useEffect } from 'react';
import styled from 'styled-components';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { AddPopularity } from '../../services/projectsApi';
import { GetAllSlugs, GetPostBySlug } from '../../utils/projectsApi';
import { address } from '../../utils/values';
import hljs from 'highlight.js';
import lua from 'highlight.js/lib/languages/lua';
hljs.registerLanguage('lua', lua);
import 'highlight.js/styles/tokyo-night-dark.css';
import Head from 'next/head';
import ColorThief from 'colorthief';

const Meses = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

interface IImage {
  src: string;
}
interface IBanner {
  id: string;
}

const Background = styled.div`
  position: absolute;
  min-height: 100%;
  width: 100%;
  background-image: url('/images/mathBackground.png');
  background-color: #424242;
  z-index: 1;
  background-repeat: repeat;
  background-size: 1000px;
`;
const BackgroundFilter = styled.div`
  min-height: 100vh;
  background-color: #3a3a3ad1;
  z-index: 2;
  padding: 30px 0;
`;

const PostContainer = styled.div`
  overflow: hidden;
  border-radius: 10px;
  width: 80%;
  margin: 0 auto;
  background-color: white;
  @media (max-width: 700px) {
    width: 95%;
  }
`;

const TopContainer = styled.div`
  display: flex;
  width: 100%;
  border-bottom: solid 0.5px black;
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const TitleTopContainer = styled.div`
  flex-basis: 35%;
  padding-left: 10px;
  position: relative;
  min-height: 300px;
`;

const GeneralTitle = styled.h1``;

const Banner = styled.div<IBanner>`
  position: relative;
  flex-basis: 65%;
  min-height: 300px;
  background-size: cover;
  ${(p) => {
    return `background-image: url(${address}/posts/uploads/${p.id}/banner.jpg);`;
  }}
`;

const Description = styled.p`
  margin-top: 30px;
  text-indent: 20px;
  position: relative;
  margin-bottom: 35px;
`;

const Data = styled.p`
  position: absolute;
  bottom: 5px;
  left: 5px;
  color: #3f3f3fa9;
`;

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const Content = styled.div`
  padding-left: 20px;
  position: relative;
  flex-basis: 65%;
  border-right: solid 0.5px black;
  pre {
    width: 90%;
    margin: 20px auto;
    margin-left: 20px;
    code {
      border-radius: 5px;
    }
  }
`;
const ContentSide = styled.div`
  flex-basis: 35%;
`;

// Estilização das tags dentro do conteúdo do post
const Images = styled.div`
  width: 100%;
  p {
    flex-grow: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    img {
      height: 250px;
      margin: 5px;
    }
  }
`;
const Image = styled.div<IImage>`
  width: 50%;
  ${(p) => {
    return `background-image: url(${p.src});`;
  }}
`;
const components = { Images, Image };
const Project = ({ post }) => {
  useEffect(() => {
    hljs.highlightAll();
    AddPopularity(post.id);
    renderMathInElement(document.body);
  }, []);
  const d = new Date(post.date);
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta property='og:title' content={post.title} />
        <meta property='title' content={post.title} />
        <meta
          property='og:image'
          content={`${address}/posts/uploads/${post.id}/banner.jpg`}
        />
        <meta
          property='image'
          content={`${address}/posts/uploads/${post.id}/banner.jpg`}
        />
        <meta property='og:description' content={post.description} />
        <meta property='description' content={post.description} />
        <meta name='twitter:card' content='summary_large_image'></meta>
        <meta name='theme-color' content='#ffffff'></meta>
      </Head>
      <Header />
      <Background>
        <br />
        <br />
        <BackgroundFilter>
          <Header />
          <PostContainer>
            <TopContainer>
              <Banner id={post.id} />
              <TitleTopContainer>
                <GeneralTitle>{post.title}</GeneralTitle>
                <Description>{post.description}</Description>
                <Data>
                  {d.getDate()} de {Meses[d.getMonth()]}, {d.getFullYear()}
                </Data>
              </TitleTopContainer>
            </TopContainer>
            <ContentContainer>
              <Content>
                <MDXRemote {...post.content} components={components} />
              </Content>
              <ContentSide />
            </ContentContainer>
          </PostContainer>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <Footer />
        </BackgroundFilter>
      </Background>
    </>
  );
};

export default Project;
export const getStaticProps = async (ctx) => {
  const slug = ctx.params;
  const post = await GetPostBySlug(slug['slug']);
  const data = await fs.readFileSync(
    `./public/posts/uploads/${post.id}/content.md`,
    'utf8'
  );
  const serializedMd = await serialize(data);
  return {
    props: {
      post: {
        title: post.title,
        description: post.description,
        date: post.date.toString(),
        id: post.id,
        content: serializedMd,
      },
    },
    revalidate: 180,
  };
};
export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const paths = await GetAllSlugs();
  return {
    paths: paths.map((p) => {
      return {
        params: { slug: p },
      };
    }),
    fallback: 'blocking',
  };
};

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { GetAllSlugs, GetPostBySlug } from '../../utils/projectsApi';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import renderMathInElement from 'katex/dist/contrib/auto-render.mjs';

import 'katex/dist/katex.min.css';
import { AddPopularity } from '../../services/projectsApi';
import { GetStaticPaths } from 'next';
import axios from 'axios';
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
  width: 100vw;
  min-height: 100vh;
  background-image: url('/images/mathBackground.png');
  background-color: #424242;
  z-index: 1;
  background-repeat: repeat;
  background-size: 1000px;
`;
const BackgroundFilter = styled.div`
  width: 100vw;
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
`;

const TopContainer = styled.div`
  display: flex;
  width: 100%;
  border-bottom: solid 0.5px black;
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
    return `background-image: url(http://localhost:3000/posts/uploads/${p.id}/banner.jpg);`;
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
`;

const Content = styled.div`
  padding-left: 20px;
  position: relative;
  flex-basis: 65%;
  border-right: solid 0.5px black;
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
    AddPopularity(post.id);
    renderMathInElement(document.body);
  }, []);
  const router = useRouter();
  const { slug } = router.query;
  const d = new Date(post.date);
  return (
    <Background>
      <BackgroundFilter>
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
      </BackgroundFilter>
    </Background>
  );
};

export default Project;
export const getStaticProps = async (ctx) => {
  const slug = ctx.params;
  const post = await GetPostBySlug(slug['slug']);
  const { data } = await axios(
    `http://localhost:3000/posts/uploads/${post.id}/content.md`
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
  };
};
export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const paths = await GetAllSlugs();
  return {
    paths: paths, //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  };
};

import Head from 'next/head';
import Image from 'next/image';
import TitleChanger from '../components/TitleChanger';
import styled from 'styled-components';
import IndexCard from '../components/cards/IndexCard';
import MainTrajectory from '../components/cards/MainTrajectory';
import SubTrajectory from '../components/cards/SubTrajectory';
import { useEffect, useState } from 'react';
import AbilitiesCard from '../components/cards/AbilitiesCard';

interface IParticleProps {
  type: number;
}
const Body = styled.div`
  background-image: url('/images/mathBackground.png');
  background-repeat: repeat;
  background-size: 1000px;
`;
const VideoContainer = styled.div`
  height: 100vh;
  width: 100%;
  z-index: -2;
  background-image: url('/images/imgteste.png');
  background-size: cover;
  background-attachment: fixed;
`;
const VideoFilterContainer = styled.div`
  @media (max-width: 700px) {
    flex-direction: column;
  }
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 1;
  background-image: url('/images/filter.png');
  background-repeat: repeat;
  display: flex;
`;
const NameDiv = styled.div`
  color: white;
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 3vw;
  h1 {
    font-size: 4vw;
  }
  p {
    font-size: 1.8vw;
    color: #ffffffe1;
    text-indent: 3.2vw;
  }
  @media (max-width: 700px) {
    padding: 0;
    margin: auto;
    flex-basis: auto;
    h1 {
      font-size: 8vw;
    }
    p {
      text-align: center;
      font-size: 3.5vw;
      text-indent: 0;
    }
  }
`;
const CardsDiv = styled.div`
  z-index: 2;
  color: white;
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  @media (max-width: 700px) {
    flex-basis: auto;
  }
`;
function randomInteger(min, max): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const particleRandom = (max): string => {
  let val = '0px 0px #fff';
  for (var i = 0; i < max; i++) {
    val += `,${randomInteger(0, 4560)}px ${randomInteger(0, 4560)}px #fff`;
  }
  return val;
};
const Particle = styled.div<IParticleProps>`
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: -1;
  background: transparent;
  border-radius: 50%;
  &:after {
    background: transparent;
    content: '';
    top: 4560px;
    height: 2px;
    width: 2px;
    border-radius: 50%;
  }
  ${(p) => {
    if (p.type === 1) {
      return `animation: anim 60s linear infinite;height:2px;width:2px;box-shadow:${particleRandom(
        1000
      )};
      &:after{
        box-shadow: ${particleRandom(900)};
      }
      `;
    }
    if (p.type === 2) {
      return `animation: anim 120s linear infinite;height:2px;width:2px;box-shadow:${particleRandom(
        800
      )};
      &:after{
        box-shadow: ${particleRandom(500)};
        height:3px;width:3px;
      }
      `;
    }
    if (p.type === 3) {
      return `
      &:after{
        box-shadow: ${particleRandom(1100)};
        height:3px;width:3px;
      }
      `;
    }
    if (p.type === 4) {
      return `animation: anim 200s linear infinite;height:1px;width:1px;box-shadow:${particleRandom(
        1200
      )};
      &:after{
        box-shadow: ${particleRandom(700)};
        height:1px;width:1px;
      }
      `;
    }
  }}
  @keyframes anim {
    from {
      transform: translateY(0px);
    }
    to {
      transform: translateY(-4560px);
    }
  }
`;
const TitleSeparator = styled.h1`
  font-size: 4rem;
  padding-left: 3vw;
  margin: 25px 0;
  width: 90%;
`;
const TrajectoryContainer = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const TrajectoryInnerContainer = styled.div`
  padding-left: 70px;
  position: relative;
  align-content: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const Home: React.FC = () => {
  return (
    <TitleChanger>
      <Body>
        <VideoContainer>
          <VideoFilterContainer>
            <Particle type={1} />
            <Particle type={2} />
            <Particle type={3} />
            <Particle type={4} />
            <NameDiv>
              <h1>Vinícius Formigone</h1>
              <p>Opa, eai tudo bem?</p>
            </NameDiv>
            <CardsDiv>
              <IndexCard
                title={'Contato'}
                description={'Contatos para orçamentos ou informações.'}
                href='/portfolio'
              />
              <IndexCard
                title={'Portfólio'}
                description={'Meus projetos e trabalhos documentados.'}
                href='/portfolio'
              />
              <IndexCard
                title={'Currículo'}
                description={'Meu currículo atualizado em pdf.'}
                href='/portfolio'
              />
            </CardsDiv>
          </VideoFilterContainer>
        </VideoContainer>
        <TitleSeparator>Minha Trajetória</TitleSeparator>
        <TrajectoryContainer>
          <TrajectoryInnerContainer>
            <MainTrajectory
              img='/images/externos/brazaoETECBG.png'
              date='2018-2020'
              title='ETEC Professor Basilides de Godoy - ETIM Mecatrônica'
              description='Cursei meu ensino médio juntamente com o ensino técnico em
            Mecatrônica, devido minha proximidade à matéria de eletrônica, junto
            às aulas da faculdade de Cálculo, decidi por estudar mais afundo por
            conta própria as lacunas do meu aprendizado.'
            >
              <SubTrajectory
                img='/images/externos/TSC.png'
                date='2019'
                title='The Schools Challenge'
                description={
                  <>
                    Sendo uma iniciativa do banco JP. Morgan juntamente ao
                    Centro Paula Souza, experiencei o passo a passo para criação
                    de <i>Startups</i>
                  </>
                }
              ></SubTrajectory>
            </MainTrajectory>
            <MainTrajectory
              img='/images/externos/unesp.png'
              date='2021'
              title='Unesp São João da Boa Vista - Engenharia Aeronáutica'
              description='adhawuiydiawdniawnmd.'
            >
              <SubTrajectory
                img='/images/externos/fundacao-fat.png'
                date='2021'
                title='Fundação FAT - Computação em Nuvem e I.A'
                description={<>fgdgfdgdfgdfgdfg</>}
              ></SubTrajectory>
              <SubTrajectory
                img='/images/externos/adelphi.jpg'
                date='2021'
                title='Adelphi Unesp - Torneio de Ingresso'
                description={
                  <>
                    Meu primeiro contato com o <i>Software</i> Xflr5
                  </>
                }
              ></SubTrajectory>
            </MainTrajectory>
            <MainTrajectory
              img='/images/externos/usp.png'
              date='2022'
              title='USP São Carlos - Engenharia Aeronáutica'
              description='adhawuiydiawdniawnmd.'
            ></MainTrajectory>
          </TrajectoryInnerContainer>
        </TrajectoryContainer>
        <TitleSeparator>Minhas Habilidades</TitleSeparator>
        <TrajectoryContainer>
          <AbilitiesCard
            title='CAD & Impressão 3D / CNC'
            elements={[
              {
                title: 'AutoCAD, Inventor, Fusion 360',
                description:
                  'Requisitos durante o ensino técnico em Mecatrônica, utilizo o Fusion 360 em projetos próprios.',
              },
              {
                title: 'SolidWorks',
                description:
                  'Requisito em aulas de desenho na Unesp, foi necessário para o torneio de acesso ao Aerodesign Adelphi.',
              },
              {
                title: 'Blender',
                description:
                  'Utilizei para meu TCC, fornecendo renderização 3D realista para projetos feitos no Fusion 360.',
              },
              {
                title: 'Slicers variados, Repetier',
                description:
                  'Utilizei para impressões e controle de minha impressora 3D.',
              },
            ]}
          />
          <AbilitiesCard
            title='Simuladores & PCB'
            elements={[
              {
                title: 'Proteus, LTSpice, Falstad',
                description:
                  'Sendo Proteus um requisito durante o ensino técnico em mecatrônica, utilizo os três para casos diferentes.',
              },
              { title: 'EasyEDA' },
              { title: 'Autodesk EAGLE' },
              { title: 'FluidSIM' },
              { title: 'CADe SIMU' },
            ]}
          />
          <AbilitiesCard
            title='Programação'
            elements={[
              {
                title: 'HTML, CSS, JavaScript, TypeScript',
                description:
                  'Possuo experiência em React.js, Node.js, Next.js e Express em projetos Freelancer.',
              },
              {
                title: 'Python',
                description:
                  'Utilizo o Matplotlib, Numpy, Pandas e Scipy em relatórios e projetos que utilizem gráficos no dia a dia e na Faculdade.',
              },
              {
                title: 'MatLab',
                description:
                  'Utilizo no dia a dia e na faculdade, juntamente ao Matplotlib para melhor assimilação de temas matemáticos.',
              },
              {
                title: 'C#',
                description:
                  "Tenho conhecimento de ASP .NET, APi's, EF Core para projetos, e experiência de scripts para FiveM em projetos Feelancer.",
              },
              {
                title: 'Lua',
                description:
                  'Tenho experiência em projetos Freelancer de scripts para FiveM.',
              },
              {
                title: 'Java',
                description:
                  'Utilizo no Android Studio para projetos envolvendo sensores de celulares.',
              },
            ]}
          />
        </TrajectoryContainer>
        <TitleSeparator>Meus Projetos</TitleSeparator>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </Body>
    </TitleChanger>
  );
};
export default Home;

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BsChevronCompactDown } from 'react-icons/bs';
import styled from 'styled-components';
import AbilitiesCard from '../components/cards/AbilitiesCard';
import IndexCard from '../components/cards/IndexCard';
import MainTrajectory from '../components/cards/MainTrajectory';
import SubTrajectory from '../components/cards/SubTrajectory';
import Footer from '../components/Footer';
import ProjectCardAnimated from '../components/ProjectCardAnimated';
import TitleChanger from '../components/TitleChanger';
import { GetList, IProject } from '../services/projectsApi';
interface IParticleProps {
  type: number;
}
const Body = styled.div`
  background-image: url('/images/mathBackground.png');
  background-repeat: repeat;
  background-size: 1000px;
  position: absolute;
  z-index: -999;
  width: 100%;
  overflow-x: hidden;
`;
const VideoContainer = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  z-index: -2;
  background-image: url('/images/heroIndex.jpg');
  background-size: cover;
  background-position: right;
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
    text-align: justify;
  }
  @media (max-width: 700px) {
    padding: 0;
    margin: auto;
    flex-basis: auto;
    h1 {
      font-size: 8vw;
      text-align: center;
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
    margin-bottom: 20vh;
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
const ProjectCardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 200px;
  overflow: hidden;
  margin-bottom: 250px;
`;
const Home: React.FC = () => {
  const [projects, setprojects] = useState<IProject[]>([]);
  useEffect(() => {
    GetList().then((res) => {
      setprojects(res.sort((a, b) => b.popularity - a.popularity).slice(0, 3));
    });
  }, []);
  return (
    <TitleChanger>
      <Body>
        <VideoContainer>
          <p
            style={{
              position: 'absolute',
              bottom: '10px',
              color: 'white',
              fontSize: '45pt',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: '999',
            }}
          >
            <BsChevronCompactDown />
          </p>
          <VideoFilterContainer>
            <Particle type={1} />
            <Particle type={2} />
            <Particle type={3} />
            <Particle type={4} />
            <NameDiv>
              <h1>Vin??cius Formigone</h1>
              <p>
                Estudo Engenharia Aeron??utica na EESC - USP, possuo
                conhecimentos em Mec??nica, Eletr??nica e El??trica. Tenho
                experi??ncia em Programa????o trabalhando como Freelancer.
              </p>
            </NameDiv>
            <CardsDiv>
              <IndexCard
                title={'Contato'}
                description={'Contatos para or??amentos ou informa????es.'}
                href='/contato'
              />
              <IndexCard
                title={'Portf??lio'}
                description={'Meus projetos e trabalhos documentados.'}
                href='/portfolio'
              />
              <IndexCard
                title={'Curr??culo'}
                description={'Meu curr??culo atualizado em pdf.'}
                href='/portfolio'
              />
            </CardsDiv>
          </VideoFilterContainer>
        </VideoContainer>
        <TitleSeparator>Minha Trajet??ria</TitleSeparator>
        <TrajectoryContainer>
          <TrajectoryInnerContainer>
            <MainTrajectory
              img='/images/externos/brazaoETECBG.png'
              date='2018-2020'
              title='ETEC Professor Basilides de Godoy - ETIM Mecatr??nica'
              description='Cursei meu ensino m??dio juntamente com o ensino t??cnico em
            Mecatr??nica, devido minha proximidade ?? mat??ria de eletr??nica, junto
            ??s aulas da faculdade de C??lculo, decidi por estudar mais afundo por
            conta pr??pria conte??dos mais avan??ados que tenho interesse para projetos.'
            >
              <SubTrajectory
                img='/images/externos/TSC.png'
                date='2019'
                title='The Schools Challenge'
                description={
                  <>
                    Oferecido por uma iniciativa do banco JP. Morgan juntamente
                    ao Centro Paula Souza, com meu grupo formado, aprendi o
                    processo de cria????o de <i>Startups</i>. Obtive{' '}
                    <i>soft skills</i>
                    ao apresentar um <i>Pitch</i> de nosso projeto para
                    investidores, sendo um dos grupos finalistas e alcan??ando o
                    terceiro lugar.
                  </>
                }
              ></SubTrajectory>
            </MainTrajectory>
            <MainTrajectory
              img='/images/externos/unesp.png'
              date='2021'
              title='Unesp S??o Jo??o da Boa Vista - Engenharia Aeron??utica'
              description='Meu primeiro contato com a faculdade e com o curso de Engenharia Aeron??utica. Por conta da Covid-19, as aulas tiveram de ser online, o que me favoreceu para estudar programa????o de simula????es e representa????es, aplicadas no meu estudo das mat??rias.'
            >
              <SubTrajectory
                img='/images/externos/fundacao-fat.png'
                date='2021'
                title='Funda????o FAT - Computa????o em Nuvem e I.A'
                description={
                  <>
                    Realizei este curso para me orientar melhor de tecnologias
                    <i>Cloud</i>, e como estas podem ser utilizadas para r??pido
                    provisionamento de servidores e servi??os de I.A. Ao mesmo
                    tempo, reparei um servidor HPE que utilizo atualmente para
                    hospedar este site, para meus projetos e NAS. Com isto
                    obtive experi??ncia de servi??os open source, <i>SysAdmin</i>{' '}
                    em
                    <i>Linux</i>, conectividade e infraestrutura de rede{' '}
                    <i>On-premises</i> e <i>Cloud</i>.
                  </>
                }
              ></SubTrajectory>
              <SubTrajectory
                img='/images/externos/adelphi.jpg'
                date='2021'
                title='Adelphi Unesp - Torneio de Ingresso'
                description={
                  <>
                    Meu primeiro contato com o <i>Software</i> Xflr5 e com
                    assuntos relacionados ao projeto de uma arenave para a
                    competi????o SAE na categoria <i>Advanced</i>. Tive interesse
                    de estudar os transceptores utilizados nas areonaves
                    r??dio-controladas. Este intresse me incentivou para o come??o
                    do meu{' '}
                    <Link href='/projetos/estudo-de-circuitos-osciladores-e-r%C3%A1dios'>
                      Estudo de Radiofrequ??ncia
                    </Link>
                    .
                  </>
                }
              ></SubTrajectory>
            </MainTrajectory>
            <MainTrajectory
              img='/images/externos/usp.png'
              date='2022'
              title='USP S??o Carlos - Engenharia Aeron??utica'
              description='adhawuiydiawdniawnmd.'
            ></MainTrajectory>
          </TrajectoryInnerContainer>
        </TrajectoryContainer>
        <TitleSeparator>Minhas Habilidades</TitleSeparator>
        <TrajectoryContainer>
          <AbilitiesCard
            title='CAD & Impress??o 3D / CNC'
            elements={[
              {
                title: 'AutoCAD, Inventor, Fusion 360',
                description:
                  'Requisitos durante o ensino t??cnico em Mecatr??nica, utilizo o Fusion 360 em projetos pr??prios.',
              },
              {
                title: 'SolidWorks',
                description:
                  'Requisito em aulas de desenho na Unesp, foi necess??rio para o torneio de acesso ao Aerodesign Adelphi.',
              },
              {
                title: 'Blender',
                description:
                  'Utilizei para meu TCC, fornecendo renderiza????o 3D realista para projetos feitos no Fusion 360.',
              },
              {
                title: 'Slicers variados, Repetier',
                description:
                  'Utilizei para impress??es e controle de minha impressora 3D.',
              },
            ]}
          />
          <AbilitiesCard
            title='Simuladores & Eletr??nica'
            elements={[
              {
                title: 'Proteus, LTSpice, Falstad',
                description:
                  'Sendo Proteus um requisito durante o ensino t??cnico em mecatr??nica, utilizo os tr??s para casos diferentes.',
              },
              { title: 'EasyEDA' },
              { title: 'Autodesk EAGLE' },
              { title: 'FluidSIM' },
              { title: 'CADe SIMU' },
            ]}
          />
          <AbilitiesCard
            title='Programa????o'
            elements={[
              {
                title: 'HTML, CSS, JavaScript, TypeScript',
                description:
                  'Possuo experi??ncia em React.js, Node.js, Next.js e Express em projetos Freelancer.',
              },
              {
                title: 'Python',
                description:
                  'Utilizo o Matplotlib, Numpy, Pandas e Scipy em relat??rios e projetos que utilizem gr??ficos no dia a dia e na Faculdade.',
              },
              {
                title: 'MatLab',
                description:
                  'Utilizado em meus projetos e na faculdade, juntamente ao Matplotlib para melhor assimila????o de temas matem??ticos e an??lises gr??ficas.',
              },
              {
                title: 'C#',
                description:
                  "Tenho conhecimento de ASP .NET, APi's, EF Core para projetos, e experi??ncia de scripts para FiveM em projetos Feelancer.",
              },
              {
                title: 'Lua',
                description:
                  'Tenho experi??ncia em projetos Freelancer de scripts para FiveM.',
              },
              {
                title: 'Java',
                description:
                  'Utilizo no Android Studio para projetos envolvendo sensores de celulares.',
              },
              {
                title: 'LaTeX',
                description:
                  'Tenho experi??ncia na escrita de trabalhos acad??micos h?? 4 anos.',
              },
            ]}
          />
        </TrajectoryContainer>
        <TitleSeparator>Meus Projetos Em Destaque</TitleSeparator>
        <ProjectCardContainer>
          {projects.map((i, j) => {
            const d = new Date(i.date);
            return (
              <a
                key={j}
                href={`/projetos/${i.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <ProjectCardAnimated
                  banner={i.banner}
                  offset={j}
                  _id={i._id}
                  date={d}
                  description={i.description}
                  title={i.title}
                  toolsTags={i.toolsTags}
                />
              </a>
            );
          })}
        </ProjectCardContainer>
        <Footer />
      </Body>
    </TitleChanger>
  );
};
export default Home;

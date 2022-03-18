import React, { useEffect, useState } from 'react';
import { GetList, IProject } from '../services/projectsApi';
import styled from 'styled-components';
import ProjectCard from '../components/ProjectCard';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Body = styled.div`
  position: absolute;
  min-height: 100%;
  width: 100%;
  background-image: url('/images/mathBackground.png');
  background-repeat: repeat;
  background-size: 1000px;
`;
const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;
const ProjectCardContainer = styled.div`
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-bottom: 250px;
  @media (max-width: 700px) {
    justify-content: center;
  }
`;
const Portfolio = () => {
  const [list, setlist] = useState<IProject[]>([]);
  useEffect(() => {
    GetList().then((res) => {
      setlist(res);
    });
  }, []);

  return (
    <>
      <Header />
      <Body>
        <br />
        <ProjectCardContainer>
          {list.map((i, j) => {
            const d = new Date(i.date);
            return (
              <Link key={j} href={`/projetos/${i.slug}`}>
                <ProjectCard
                  banner={i.banner}
                  _id={i._id}
                  date={d}
                  description={i.description}
                  title={i.title}
                  toolsTags={i.toolsTags}
                />
              </Link>
            );
          })}
        </ProjectCardContainer>
        <Footer />
      </Body>
    </>
  );
};

export default Portfolio;

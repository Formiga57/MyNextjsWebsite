import React, { useEffect, useState } from 'react';
import { GetList, IProject } from '../services/projectsApi';
import styled from 'styled-components';
import ProjectCard from '../components/ProjectCard';

const Body = styled.div`
  position: absolute;
  height: 100%;
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
`;
const Portfolio = () => {
  const [list, setlist] = useState<IProject[]>([]);
  useEffect(() => {
    GetList().then((res) => {
      setlist(res);
    });
  }, []);

  return (
    <Body>
      <ProjectCardContainer>
        {list.map((i, j) => {
          const d = new Date(i.date);
          return (
            <Link key={j} href={`/projetos/${i.slug}`}>
              <ProjectCard
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
    </Body>
  );
};

export default Portfolio;

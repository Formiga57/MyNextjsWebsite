import React, { useEffect, useState } from 'react';
import { GetList, IProject } from '../services/projectsApi';
import styled from 'styled-components';

const ToolsId = ['CAD', 'JavaScript', 'C#', 'TypeScript', 'Java', 'Python'];

const ProjectCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProjectCard = styled.div`
  padding-left: 10px;
  color: black;
  width: 80%;
  border-radius: 10px;
  border: solid 0.5px #68686890;
`;
const ProjectCardTitle = styled.h2``;
const ProjectCardDesc = styled.p`
  padding-left: 15px;
`;
const ProjectCardDate = styled.p`
  font-size: 10pt;
`;
const ProjectCardTools = styled.p`
  font-size: 10pt;
`;

const Portfolio = () => {
  const [list, setlist] = useState<IProject[]>([]);
  useEffect(() => {
    GetList().then((res) => {
      console.log(res);
      setlist(res);
    });
  }, []);

  return (
    <div>
      <ProjectCardContainer>
        {list.map((i, j) => {
          const d = new Date(i.date);
          return (
            <ProjectCard key={j}>
              <ProjectCardTitle>{i.title}</ProjectCardTitle>
              <ProjectCardDesc>{i.description}</ProjectCardDesc>
              <ProjectCardDate>
                {d.getDate()}/{d.getMonth() + 1}/{d.getFullYear()}
              </ProjectCardDate>
              <ProjectCardTools>
                {i.toolsTags.map((i) => {
                  return ToolsId[i] + ', ';
                })}
              </ProjectCardTools>
            </ProjectCard>
          );
        })}
      </ProjectCardContainer>
    </div>
  );
};

export default Portfolio;

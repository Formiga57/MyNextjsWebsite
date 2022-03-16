import React, { useEffect, useState } from 'react';
import { GetList, IProject } from '../services/projectsApi';
import styled from 'styled-components';

const ToolsId = ['CAD', 'JavaScript', 'C#', 'TypeScript', 'Java', 'Python'];

interface IProjectCardBanner {
  id: string;
}
const Body = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-image: url('/images/mathBackground.png');
  background-repeat: repeat;
  background-size: 1000px;
`;
const Link = styled.a`
  margin: 10px;
  text-decoration: none;
  color: inherit;
  width: 290px;
`;

const ProjectCardContainer = styled.div`
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const ProjectCardBanner = styled.div<IProjectCardBanner>`
  width: 100%;
  height: 130px;
  background-size: cover;
  background-position-y: 50%;
  ${(p) => {
    return `background-image: url(http://localhost:3000/data3/uploads/${p.id}/banner.jpg);`;
  }}
`;
const ProjectCard = styled.div`
  background-color: white;
  height: 360px;
  overflow: hidden;
  color: black;
  width: 100%;
  border-radius: 10px;
  border: solid 0.5px #6868686a;
  cursor: pointer;
  &:hover ${ProjectCardBanner} {
    background-clip: 200px;
  }
`;
const ProjectCardTitle = styled.h2`
  padding-left: 10px;
`;
const ProjectCardDesc = styled.p`
  text-indent: 5px;
  padding-left: 10px;
`;
const ProjectCardDate = styled.p`
  font-size: 10pt;
  padding-left: 10px;
`;
const ProjectCardTools = styled.p`
  font-size: 10pt;
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
          console.log(i);
          const d = new Date(i.date);
          return (
            <Link key={j} href={`/projects/${i.slug}`}>
              <ProjectCard>
                <ProjectCardBanner id={i._id} />
                <ProjectCardTitle>{i.title}</ProjectCardTitle>
                <ProjectCardDesc>
                  {i.description.substring(0, 120)}
                  {i.description.length > 120 ? '...' : null}
                </ProjectCardDesc>
                <ProjectCardDate>
                  {d.getDate()}/{d.getMonth() + 1}/{d.getFullYear()}
                </ProjectCardDate>
                <ProjectCardTools>
                  {i.toolsTags.map((i) => {
                    return ToolsId[i] + ', ';
                  })}
                </ProjectCardTools>
              </ProjectCard>
            </Link>
          );
        })}
      </ProjectCardContainer>
    </Body>
  );
};

export default Portfolio;

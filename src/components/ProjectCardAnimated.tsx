import React, { useRef } from 'react';
import styled from 'styled-components';
import { address } from '../utils/values';
import OnScreen from './OnScreen';
const ToolsId = ['CAD', 'JavaScript', 'C#', 'TypeScript', 'Java', 'Python'];
interface IProps {
  banner: string;
  _id: string;
  title: string;
  description: string;
  date: Date;
  toolsTags: number[];
  offset?: number;
}
interface IContainer {
  visible: boolean;
  offset: number;
}
interface IProjectCardBanner {
  id: string;
  banner: string;
}

const ProjectCardBanner = styled.div<IProjectCardBanner>`
  width: 100%;
  height: 130px;
  background-size: cover;
  background-position-y: 50%;
  ${(p) => {
    return `background-image: url(${address}/posts/uploads/${p.id}/${p.banner});`;
  }}
`;
const Container = styled.div<IContainer>`
  position: relative;
  margin: 10px;
  width: 290px;
  background-color: white;
  height: 360px;
  overflow: hidden;
  color: black;
  border-radius: 10px;
  border: solid 0.5px #6868686a;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    border-radius: 5px;
    border: solid 2px #0000006a;
  }
  &:hover ${ProjectCardBanner} {
    background-clip: 200px;
  }
  ${(p) => {
    if (p.visible) {
      return `animation: slide-in-bottom 0.5s ease-out both;animation-delay:${
        p.offset / 4
      }s;`;
    } else {
      return 'opacity:0;';
    }
  }}
  @keyframes slide-in-bottom {
    0% {
      -webkit-transform: translateY(1000px);
      transform: translateY(1000px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      opacity: 1;
    }
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
  position: absolute;
  bottom: 5px;
  font-size: 10pt;
  padding-left: 10px;
`;
const ProjectCardTools = styled.p`
  font-size: 10pt;
`;
const ProjectCard: React.FC<IProps> = ({
  banner,
  _id,
  description,
  toolsTags,
  date,
  title,
  offset,
}) => {
  const ref = useRef();
  const isVisible = OnScreen(ref);
  return (
    <Container visible={isVisible} offset={offset}>
      <ProjectCardBanner id={_id} banner={banner} />
      <ProjectCardTitle ref={ref}>{title}</ProjectCardTitle>
      <ProjectCardDesc>
        {description.substring(0, 120)}
        {description.length > 120 ? '...' : null}
      </ProjectCardDesc>
      <ProjectCardDate>
        {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
      </ProjectCardDate>
      <ProjectCardTools>
        {toolsTags.map((i) => {
          return ToolsId[i] + ', ';
        })}
      </ProjectCardTools>
    </Container>
  );
};

export default ProjectCard;

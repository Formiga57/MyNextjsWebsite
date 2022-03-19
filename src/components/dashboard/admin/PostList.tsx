import React, { useEffect, useState } from 'react';
import { GetList, IProject, NewProject } from '../../../services/projectsApi';
import styled from 'styled-components';
import ProjectCard from '../../ProjectCard';
import Post from './Post';
import { AiOutlinePlus } from 'react-icons/ai';

const ProjectAddButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50pt;
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
    font-size: 60pt;
  }
`;

const ProjectCardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
`;
const PostList: React.FC = () => {
  const [Posts, setPosts] = useState<IProject[]>([]);
  const [Editing, setEditing] = useState<string | null>(null);
  useEffect(() => {
    GetList().then((res) => {
      setPosts(res);
    });
  }, []);

  if (!Editing) {
    return (
      <ProjectCardContainer>
        {Posts.map((i, j) => {
          const d = new Date(i.date);
          return (
            <div key={j} onClick={() => setEditing(i._id)}>
              <ProjectCard
                banner={i.banner}
                _id={i._id}
                date={d}
                description={i.description}
                title={i.title}
                toolsTags={i.toolsTags}
              />
            </div>
          );
        })}
        <ProjectAddButton
          onClick={() => {
            NewProject().then(({ data }) => {
              setEditing(data.id);
            });
          }}
        >
          <AiOutlinePlus></AiOutlinePlus>
        </ProjectAddButton>
      </ProjectCardContainer>
    );
  } else {
    return <Post end={setEditing} _id={Editing} />;
  }
};

export default PostList;

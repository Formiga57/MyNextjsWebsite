import React, { useEffect, useState } from 'react';
import { GetList, IProject } from '../../../services/projectsApi';
import styled from 'styled-components';
import ProjectCard from '../../ProjectCard';
import Post from './Post';

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
            <div onClick={() => setEditing(i._id)}>
              <ProjectCard
                _id={i._id}
                date={d}
                description={i.description}
                title={i.title}
                toolsTags={i.toolsTags}
              />
            </div>
          );
        })}
      </ProjectCardContainer>
    );
  } else {
    return <Post end={setEditing} _id={Editing} />;
  }
};

export default PostList;

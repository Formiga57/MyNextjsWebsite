import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';
import { AuthContext } from '../contexts/AuthContext';
interface IProps {
  roles: number[];
}
interface ITopRow {
  expanded: boolean;
}
interface IContainer {
  expanded: boolean;
}
enum Roles {
  post = 57,
}
const Container = styled.div<IContainer>`
  color: white;
  transition: ease-out 0.4s;
  height: 100vh;
  background-color: #0a022f;
  ${(p) => {
    if (p.expanded) {
      return 'width:280px;';
    } else {
      return 'width:80px;';
    }
  }}
`;

const TopRow = styled.div<ITopRow>`
  width: 100%;
  padding: 10px;
  text-align: center;
  display: flex;
  font-size: 25pt;
  align-items: center;
  p {
    font-size: 16pt;
    font-weight: bold;
  }
  div {
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  ${(p) => {
    if (p.expanded) {
      return 'justify-content: space-between;p{margin-right: 10px;}';
    } else {
      return 'justify-content: center;';
    }
  }}
`;

const SidebarElements = styled.div`
  display: flex;
  justify-content: center;
  font-size: 16pt;
  p {
    cursor: pointer;
  }
`;

const SideBar: React.FC<IProps> = ({ roles }) => {
  const [expanded, setExpanded] = useState<boolean>(true);
  const { setPage } = useContext(AuthContext);
  return (
    <Container expanded={expanded}>
      <TopRow expanded={expanded}>
        <p>{expanded ? 'Painel de Controle' : null}</p>
        <div onClick={() => setExpanded(!expanded)}>
          {expanded ? <AiOutlineMenuFold /> : <AiOutlineMenuUnfold />}
        </div>
      </TopRow>
      {roles?.map((i, j) => {
        switch (i) {
          case Roles.post:
            return (
              <SidebarElements key={j}>
                <p onClick={() => setPage(1)}>Postar</p>
              </SidebarElements>
            );
            break;
        }
      })}
    </Container>
  );
};

export default SideBar;
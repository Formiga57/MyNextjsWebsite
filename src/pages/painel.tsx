import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import styled from 'styled-components';
import { GetServerSideProps } from 'next';
import { VerifyToken } from '../utils/tokenVerify';
import SideBar from '../components/SideBar';
import PostList from '../components/dashboard/admin/PostList';
import { VerifyRefresh } from '../services/securityApi';
import Keys from '../components/dashboard/admin/TmpDiscordBots/Keys';
import KeysStats from '../components/dashboard/admin/TmpDiscordBots/KeyStats';
import TitleChanger from '../components/TitleChanger';

enum Pages {
  Hello,
  Posts,
  TmpDiscord,
  TmpDiscord2,
}

const FlexContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
`;
const ContentContainer = styled.div`
  position: relative;
  flex-grow: 1;
  height: 100vh;
  overflow-y: scroll;
`;
const Dashboard = ({ authenticated }) => {
  const { user, Page, setUser } = useContext(AuthContext);
  useEffect(() => {
    VerifyRefresh()
      .then((res) => {
        setUser(res);
      })
      .catch((err) => {
        window.location.replace('/login');
      });
  }, [setUser]);
  return (
    <TitleChanger>
      <FlexContainer>
        <SideBar roles={user?.roles}></SideBar>
        <ContentContainer>
          {(() => {
            switch (Page) {
              case Pages.Hello:
                return <div>Helouu!!</div>;
              case Pages.Posts:
                return <PostList />;
              case Pages.TmpDiscord:
                return <Keys chave={user.key} />;
              case Pages.TmpDiscord2:
                return <KeysStats chave={user.key} />;
            }
          })()}
        </ContentContainer>
      </FlexContainer>
    </TitleChanger>
  );
};

export default Dashboard;
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const token = await VerifyToken(
      ctx.req.cookies['refreshToken'],
      ctx.req.cookies['accessToken']
    );
  } catch (error) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

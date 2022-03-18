import React, { useContext, useEffect, useState } from 'react';
import { AuthContext, AuthProvider } from '../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import EventEmitter from 'events';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { VerifyToken } from '../utils/tokenVerify';
import SideBar from '../components/SideBar';
import Post from '../components/dashboard/admin/Post';
import PostList from '../components/dashboard/admin/PostList';
import { VerifyRefresh } from '../services/securityApi';

enum Pages {
  Hello,
  Posts,
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
const SendProjectContainter = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
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
    <FlexContainer>
      <SideBar roles={user?.roles}></SideBar>
      <ContentContainer>
        {(() => {
          switch (Page) {
            case Pages.Hello:
              return <div>Helouu!!</div>;
              break;
            case Pages.Posts:
              return <PostList />;
              break;
          }
        })()}
      </ContentContainer>
    </FlexContainer>
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

import React, { useContext, useState } from 'react';
import { AuthContext, AuthProvider } from '../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import EventEmitter from 'events';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { VerifyToken } from '../utils/tokenVerify';
const SendProjectContainter = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
const Dashboard = ({ authenticated }) => {
  const [File, setFile] = useState({});
  const [TextFile, setTextFile] = useState(null);
  const [Banner, setBanner] = useState<number>(0);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const formData = new FormData();
    for (const key of Object.keys(File)) {
      formData.append('imgArray', File[key], File[key].name);
    }
    formData.append('imgArray', TextFile, TextFile.name);
    console.log(data);
    axios
      .post('http://localhost:3000/api/projects/newProject', data)
      .then((res) => {
        formData.append('id', res.data.id);
        formData.append('banner', Banner.toString());
        axios.post('http://localhost:3000/api/uploadfile', formData);
      });
  };

  const { user } = useContext(AuthContext);
  const onFileChange = (e) => {
    setFile(e.target.files);
  };
  const onTextFileChange = (e) => {
    setTextFile(e.target.files[0]);
  };
  return (
    <AuthProvider>
      <SendProjectContainter>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type='text'
            placeholder='Título'
            {...register('title', { required: true })}
          />

          <input
            type='text'
            placeholder='Descrição'
            {...register('description', { required: true })}
          />
          <input
            type='file'
            placeholder='Banner'
            onChange={onFileChange}
            multiple
          />
          <input type='file' placeholder='Html' onChange={onTextFileChange} />
          <select name='cars' id='cars'>
            {Object.keys(File).map((i, j) => {
              return (
                <option key={j} value={j}>
                  {j}
                </option>
              );
            })}
          </select>
          <input type='submit' />
        </form>
      </SendProjectContainter>
    </AuthProvider>
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

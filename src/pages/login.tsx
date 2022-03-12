import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { HandleLogin } from '../services/securityApi';

const Container = styled.div``;

const Login = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    HandleLogin(data)
      .then((res) => window.location.replace('/painel'))
      .catch((err) => {});
  };
  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type='email'
          placeholder='Email ou usuário'
          {...register('identifier', { required: true })}
        />

        <input
          type='password'
          placeholder='Senha'
          {...register('password', { required: true })}
        />
        <input
          type='checkbox'
          placeholder='Manter logado'
          {...register('persist')}
        />
        <input type='submit' />
      </form>
    </Container>
  );
};

export default Login;

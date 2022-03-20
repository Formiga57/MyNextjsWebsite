import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import TitleChanger from '../components/TitleChanger';
import { HandleLogin } from '../services/securityApi';

interface IInput {
  error?: boolean;
}

const Input = styled.input<IInput>`
  border: inherit;
  border-radius: inherit;
  outline: inherit;
  background: transparent;
  ${(p) => {
    if (p.error) {
      return 'border-bottom: 2px solid red;';
    } else {
      return 'border-bottom: 2px solid black;';
    }
  }}
  box-sizing: border-box;
  padding: 5px;
  width: 90%;
  font-size: 15pt;
  margin: auto;
`;
const Background = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-image: url('/images/mathBackground.png');
  background-color: #424242;
  z-index: 1;
  background-repeat: repeat;
  background-size: 1000px;
`;
const BackgroundFilter = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #222222e8;
  z-index: 2;
  padding: 30px 0;
`;
const Container = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
  }
`;
const TitleDiv = styled.h1`
  width: 70%;
  margin: auto;
  margin-top: 25px;
  margin-bottom: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  font-size: 5rem;
  margin-bottom: -20px;
`;
const Button = styled.button`
  box-sizing: content-box;
  border-radius: 5px;
  width: 80px;
  padding: 10px;
  text-align: center;
  font-size: 15pt;
  border: none;
  font-family: 'Poppins', sans-serif;
  font-weight: bold;
  margin: auto;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background-color: black;
    color: white;
  }
`;
const Login = () => {
  const [clicked, setClicked] = useState(false);
  const [errored, setErrored] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setClicked(true);
    HandleLogin(data)
      .then((res) => window.location.replace('/painel'))
      .catch((err) => {
        setErrored(true);
        setClicked(false);
      });
  };
  return (
    <TitleChanger>
      <Background>
        <BackgroundFilter>
          <TitleDiv>Log-in</TitleDiv>
          <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                placeholder='Usuário / Email'
                type='text'
                {...register('identifier', { required: true })}
                error={errors.identifier?.type === 'required' || errored}
              />
              <br />
              <Input
                placeholder='Senha'
                type='password'
                {...register('password', { required: true })}
                error={errors.password?.type === 'required' || errored}
              />
              <br />
              <div style={{ textAlign: 'center' }}>
                Manter Logado
                <Input
                  style={{ height: '20px' }}
                  type='checkbox'
                  placeholder='Manter logado'
                  {...register('persist')}
                />
              </div>
              <br />
              <Button type='submit' disabled={clicked}>
                Enviar
              </Button>
            </form>
          </Container>
        </BackgroundFilter>
      </Background>
    </TitleChanger>
  );
};

export default Login;

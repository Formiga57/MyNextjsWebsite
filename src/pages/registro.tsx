import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { HandleRegister } from '../services/securityApi';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

interface IInput {
  error?: boolean;
}
const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  user: Yup.string().required().min(4),
  password: Yup.string()
    .required()
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .matches(/^(?=.*[a-z])(?=.*\d)/, 'A senha deve ser mais forte'),
  passwordConfirm: Yup.string()
    .required()
    .oneOf([Yup.ref('password')], 'As senhas não são iguais'),
  token: Yup.string().required(),
});
const formOptions = { resolver: yupResolver(validationSchema) };
const Input = styled.input<IInput>`
  border: inherit;
  border-radius: inherit;
  outline: inherit;
  background: transparent;
  box-sizing: border-box;
  padding: 5px;
  width: 90%;
  font-size: 15pt;
  margin: auto;
  ${(p) => {
    if (p.error) {
      return 'border-bottom: 2px solid red;';
    } else {
      return 'border-bottom: 2px solid black;';
    }
  }}
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
const Registro = () => {
  const [clicked, setClicked] = useState(false);
  const [tokenError, setTokenError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);
  const onSubmit = (data) => {
    setClicked(true);
    HandleRegister(data)
      .then((res) => window.location.replace('/login'))
      .catch((err) => {
        setClicked(false);
        if (err === 'Token não existe') {
          setTokenError(true);
        }
      });
  };
  return (
    <Background>
      <BackgroundFilter>
        <TitleDiv>Registro</TitleDiv>
        <Container>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              autoComplete='off'
              placeholder='Usuário'
              type='text'
              {...register('user')}
              error={errors.user}
            />
            <br />
            <Input
              autoComplete='off'
              placeholder='Email'
              {...register('email')}
              error={errors.email}
            />
            <br />
            <Input
              placeholder='Senha'
              type='password'
              {...register('password')}
              error={errors.password}
            />
            {errors.password?.message}
            <br />
            <Input
              placeholder='Senha'
              type='password'
              {...register('passwordConfirm')}
              error={errors.passwordConfirm}
            />
            {errors.passwordConfirm?.message}
            <br />
            <Input
              autoComplete='off'
              placeholder='Token'
              type='text'
              required
              {...register('token')}
              error={errors.token || tokenError}
            />
            <br />
            <Button type='submit' disabled={clicked}>
              Enviar
            </Button>
          </form>
        </Container>
      </BackgroundFilter>
    </Background>
  );
};

export default Registro;

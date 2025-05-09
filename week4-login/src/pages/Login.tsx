import styled from '@emotion/styled';
import React from 'react'
import { BasicButton, NavigateButton } from '../Style/Button';

export const Login = () => {
  return (
    <>
      <Container>
        <h2>로그인</h2>
        <Form>
            <InputContainer>
                <Label>아이디</Label>
                <Input placeholder='아이디' />
            </InputContainer>
            <InputContainer>
                <Label>비밀번호</Label>
                <Input placeholder='비밀번호'/>
            </InputContainer>
            <BasicButton>로그인</BasicButton>
        </Form>
        <NavigateButton>회원가입</NavigateButton>
      </Container>
    </>
  )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const Form = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: aliceblue;
    border-radius: 5px;
    padding: 50px;
`
const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 20px;
`

const Input = styled.input`
    width: 200px;
    height: 20px;
    justify-self: flex-end;
    align-self: flex-end;
`
const Label = styled.div`
    
`
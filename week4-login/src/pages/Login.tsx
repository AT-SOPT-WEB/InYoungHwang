import styled from '@emotion/styled';
import React, { useEffect } from 'react'
import { BasicButton, NavigateButton } from '../Style/Button';
import { fetchLogin } from '../apis/Login';
import { useInput } from '../hooks/useInput';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const navigate = useNavigate();
    const loginId = useInput('');
    const password = useInput('');

    const handleLogin = () => {
        const login = async () => {
            try{
                const result = await fetchLogin(loginId.value, password.value);
                localStorage.setItem("id", result.data.userId);
                navigate('/myPage');
            } catch (e) {
                console.log(e);
                alert("다시 시도해주세요");
            }
        }
        login();
    }

  return (
    <>
      <Container>
        <h2>로그인</h2>
        <Form>
            <InputContainer>
                <Label>아이디</Label>
                <Input type="text" placeholder='아이디' {...loginId}/>
            </InputContainer>
            <InputContainer>
                <Label>비밀번호</Label>
                <Input type="text" placeholder='비밀번호' {...password} />
            </InputContainer>
            <BasicButton onClick={()=>handleLogin()}>로그인</BasicButton>
        </Form>
        <NavigateButton onClick={()=>'/signUp'}>회원가입</NavigateButton>
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
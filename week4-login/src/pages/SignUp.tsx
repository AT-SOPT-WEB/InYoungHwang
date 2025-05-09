import React, { use, useEffect, useState } from 'react'
import { BasicButton, NavigateButton } from '../Style/Button';
import { useInput } from '../hooks/useInput';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { fetchSignUp } from '../apis/auth';

export const SignUp = () => {
    const navigate = useNavigate();
    const [pageStatus, setPageStatus] = useState<'id' | 'password' | 'nickname'>('id');
    const [message, setMessage] = useState<string>('');
    const loginIdInput = useInput('');
    const passwordInput = useInput('');
    const passwordCheckInput = useInput('');
    const nicknameInput = useInput('');
    const isButtonDisabled =
        (pageStatus === 'id' && loginIdInput.value.trim() === '') ||
        (pageStatus === 'password' &&
            (passwordInput.value.trim() === '' ||
            passwordCheckInput.value.trim() === '' ||
            passwordInput.value !== passwordCheckInput.value));

    const handleNext = () => {
        if(pageStatus === 'id') {
            setPageStatus('password');
        } 
        else if (pageStatus === 'password') {
            setPageStatus('nickname');
        } 
        else if(pageStatus === 'nickname'){
            navigate('/');
        }
    }

    const checkPassword = () => {
        if (passwordInput.value && passwordCheckInput.value) {
            if (passwordInput.value !== passwordCheckInput.value) {
              setMessage('비밀번호가 일치하지 않아요');
            } else {
              setMessage('');
            }
          }
    }

    const handleSignUp = () => {
        const signUp = async() => {
            try{
                const result = await fetchSignUp(loginIdInput.value, passwordInput.value, nicknameInput.value);
                alert('로그인에 성공하였습니다!');
                navigate('/');
            } catch (e: any) {
                alert(e.message); 
            }
        }
        signUp();
    }

    useEffect(() => {
        checkPassword();
    }, [passwordInput.value, passwordCheckInput.value]);


  return (
        <>
          <Container>
            <h2>회원가입</h2>
            <Form>
                    {pageStatus === 'id' &&
                        <>
                            <Label>아이디</Label>
                            <Input type="text" placeholder='아이디' {...loginIdInput}/>
                        </>
                    }
                    {pageStatus === 'password' &&
                        <>
                            <h3>비밀번호</h3>
                            <InputContainer>
                                <Input type="password" placeholder='비밀번호' {...passwordInput} />
                            </InputContainer>
                            <InputContainer>
                                <Input type="password" placeholder='비밀번호 확인' {...passwordCheckInput} />
                            </InputContainer>
                        </>
                    }
                    {pageStatus === 'nickname' &&
                        <>
                            <Label>닉네임</Label>
                            <Input type="text" placeholder='닉네임을 입력하세요'  {...nicknameInput} />
                        </>
                    }
                <Message>{message}</Message>
                {(pageStatus === 'id' || pageStatus === 'password') &&
                   <BasicButton onClick={handleNext} disabled={isButtonDisabled} active={!isButtonDisabled}>다음</BasicButton>
                }
                {pageStatus === 'nickname' &&
                    <BasicButton onClick={()=>handleSignUp()} disabled={isButtonDisabled} active={nicknameInput.value.trim() !== ''}>회원가입</BasicButton>
                }
            </Form>
            <Row>
                <span>이미 회원이신가요?</span><NavigateButton onClick={()=>navigate('/')}>로그인</NavigateButton>
            </Row>
          </Container>
        </>
  )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    justify-content: center;
    align-items: center;
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
    width: 170px;
    height: 20px;
    justify-self: flex-end;
    align-self: flex-end;
`
const Label = styled.div`
    
`
const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 13px;
`

const Message = styled.div`
    color: red;
    font-size: 12px;
`
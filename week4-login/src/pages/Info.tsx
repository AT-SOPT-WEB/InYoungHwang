import React from 'react'
import { useInput } from '../hooks/useInput';
import styled from '@emotion/styled';
import { BasicButton } from '../Style/Button';
import { patchNickname } from '../apis/auth';

export const Info = () => {
  const nicknameInput = useInput('');
  
  const updateNickname = async () => {
    try {
      const result = patchNickname(nicknameInput.value);
      console.log(result);
    } catch (e: any) {
      alert(e.message);
    }
  }

  const handleSubmit = () => {
    updateNickname();
  }

  return (
    <>
      <Container>
        <h2>내정보 수정하기</h2>
        <Form>
          <Label>새 닉네임</Label>
          <Input type="text" placeholder='새 닉네임을 입력하세요' {...nicknameInput}/>
          <BasicButton active={nicknameInput.value.trim() !== ''} onClick={()=>handleSubmit()}>저장</BasicButton>
        </Form>
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
    margin-top: 100px;
`;

const Label = styled.div`
    
`

const Form = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: aliceblue;
    border-radius: 5px;
    padding: 50px;
`
const Input = styled.input`
    width: 170px;
    height: 20px;
    justify-self: flex-end;
    align-self: flex-end;
`
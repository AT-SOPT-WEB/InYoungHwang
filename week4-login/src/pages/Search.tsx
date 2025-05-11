import React, { useState } from 'react'
import { useInput } from '../hooks/useInput';
import { BasicButton } from '../Style/Button';
import styled from '@emotion/styled';
import { fetchUsers } from '../apis/search';

export const Search = () => {
  const nicknameInput = useInput('');
  const [userList, setUserList] = useState([]);

  const handleSubmit = () => {
    const getUsers = async () => {
      try{
        const result = await fetchUsers(nicknameInput.value);
        setUserList(result.data.nicknameList);
      } catch (e: any) {
        alert(e.message);
      }
    }
    getUsers();
  }

  return (
       <>
         <Container>
           <h2>SOPT 회원 조회하기</h2>
           <Form>
             <Label>닉네임</Label>
             <Input type="text" placeholder='검색할 닉네임을 입력하세요' {...nicknameInput}/>
             <BasicButton active={nicknameInput.value.trim() !== ''} onClick={()=>handleSubmit()}>저장</BasicButton>
           </Form>
           <List>
              {userList?.map((user)=>
                <div>{user}</div>
              )}
           </List>
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

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
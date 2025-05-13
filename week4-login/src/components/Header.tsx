import styled from '@emotion/styled';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps{
  userName: string;
}

export const Header = ({userName} : HeaderProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('id');
    navigate('/');
  }

  return (
    <>
      <Container>
        <Menu>
          <Button onClick={()=>navigate('')}>내정보</Button>
          <Button onClick={()=>navigate('search')}>SOPT회원 조회하기</Button>
          <Button onClick={()=>handleLogout()}>로그아웃</Button>
        </Menu>
        <Menu>
          <Button>🧚 {userName}</Button>
        </Menu>
      </Container>
    </>
  )
}

const Container = styled.div`
  width: 100%;
  top: 0;
  background-color: aliceblue;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  box-sizing: border-box; 
`

const Menu = styled.div`
  display: flex;
  flex-direction: row;
  gap: 18px;
`

const Button = styled.div`
  font-size: 15px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
`
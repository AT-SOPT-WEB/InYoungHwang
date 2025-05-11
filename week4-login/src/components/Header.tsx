import styled from '@emotion/styled';
import React from 'react';

interface HeaderProps{
  userName: string;
}

export const Header = ({userName} : HeaderProps) => {
  return (
    <>
      <Container>
        <Menu>
          <Button>내정보</Button>
          <Button>SOPT회원 조회하기</Button>
          <Button>로그아웃</Button>
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
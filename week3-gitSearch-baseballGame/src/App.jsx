/** @jsxImportSource @emotion/react */
import { useState } from 'react'
import styled from '@emotion/styled'
import GitSearch from './pages/gitSearch'
import { BaseballGame } from './pages/BaseballGame'


function App() {
  const [page, setPage] = useState('gitSearch')

  return (
    <Container>
      <Header>
        <Title>🐢 깃허브 검색 &nbsp; | &nbsp; 숫자 야구 게임 🐰</Title>
        <Nav>
          <Button onClick={() => setPage('gitSearch')}> 🐈‍⬛</Button>
          <Button onClick={() => setPage('baseballGame')}>⚾️</Button>
        </Nav>
      </Header>
      <Main>
        {page === 'gitSearch' && <GitSearch />}
        {page === 'baseballGame' && <BaseballGame />}
      </Main>
    </Container>
  )
}

export default App

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const Header = styled.header`
  text-align: center;
  margin-bottom: 16px;
  background-color: #adddc3b4;
  width: 100%;
  padding: 50px;
`

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 12px;
`

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 10px;
`

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #ececec;
  color: #e3e3e3;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  border: 2px solid #55555556;

  &:hover {
    background-color: #555;
  }
`

const Main = styled.main`
  margin-top: 32px;
`
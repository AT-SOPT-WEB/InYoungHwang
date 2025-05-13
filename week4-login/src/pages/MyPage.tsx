import React, { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { Outlet } from 'react-router-dom'
import styled from '@emotion/styled'
import { fetchMypage } from '../apis/auth'

export const MyPage = () => {
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const getMypage = async() => {
      try{
        const result = await fetchMypage();
        console.log(result);
        setUserName(result.data.nickname);
      } catch (e: any){
        alert(e.message);
      }
    } 
    getMypage();
  }, [])

  return (
    <>
      <Container>
        <Header userName={userName}/>
        <Outlet />
      </Container>
    </>
  )
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
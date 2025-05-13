import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Login } from './pages/Login'
import { SignUp } from './pages/SignUp'
import { MyPage } from './pages/MyPage'
import { Info } from './pages/Info'
import { Search } from './pages/Search'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
    },
    {
      path: '/signUp',
      element: <SignUp />,
    },
    {
      path: '/myPage',
      element: <MyPage />,
      children: [
        {
          index: true,
          element: <Info />
        },
        {
          path: 'search',
          element: <Search />
        }
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App

import React from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth'

const Home = () => {
  const [auth, setAuth] = useAuth();

  return (
    <Layout title={"Home - MERN ECOMMERCE"}>Home
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  )
}

export default Home
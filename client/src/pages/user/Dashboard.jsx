import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'

const Dashboard = () => {

  const [ auth, setAuth ] = useAuth();
  return (
    <Layout title={"Dashboard- Ecommerce app"}>
      <div className="container p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu/>
          </div>
          <div className="col-md-9">
           <div className="card p-3">
              <h2>name : {auth?.user?.name}</h2>
              <h2>Email : {auth?.user?.email}</h2>
              <h2>mobile : {auth?.user?.phone}</h2>

           </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard

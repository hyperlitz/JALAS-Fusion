import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'

const Users = () => {
  return (
    <Layout title={"All Users - Ecommerce"}>
        <div className="container-fluid p-3">
            <div className="row">
                <div className="col-md-3">
                    <h3>Admin Panel</h3>
                    <AdminMenu/>
                </div>
                <div className="col-md-9">
                    <h3>users list</h3>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Users

import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from './../../components/Layout/AdminMenu';

const AdminDashboard = () => {
  return (
    <Layout title={"Admin-Dashboard"}>
         <div className="container-fluid  p-3 admin-dashboard">
            <div className="row">
                <div className="col-md-3">
                    <h3>Admin Panel</h3>
                    <AdminMenu/>
                </div>
                <div className="col-md-9 mt-3">
                    Content
                </div>
            </div>
         </div>
    </Layout>
  )
}

export default AdminDashboard


import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios'
import moment from 'moment'
import { Select } from 'antd'

const AdminOrder = () => {

    const [orders, setOrders] = useState([])
    const [status, setStatus] = useState([{ value: "Not Process", label: "Not Process" }, { value: "Processing", label: "Processing" }, { value: "Shipped", label: "Shipped" }, { value: "Delivered", label: "Delivered" }, { value: "Cancel", label: "Cancel" }])
    const [changeStatus, setChangeStatus] = useState("");

    // get the order list
    const getOrder = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/all-orders`);
            setOrders(data?.orders);
        } catch (error) {
            console.log(error)
        }
    }
    // get change value
    const onHandleChange = async (orderId,value) => {
        console.log("selected Value is",value, orderId)
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/product/update-order/${orderId}`, {status: value})
            console.log("updated data",data);
            getOrder()
        } catch (err) {
            console.log("error is",err.message)
        }
    }

    // life cycle hook
    useEffect(() => {
        getOrder()
    }, [])

    return (
        <Layout title={"Orders - Ecommerce"}>
            <div className="container-fluid p-3">
                <div className="row">
                    <div className="col-md-3">
                        <h3>Admin Panel</h3>
                        <AdminMenu />
                    </div>
                    <div className="col-md-6">
                        <h2>Orders List</h2>
                        <div className='mt-3'>
                            <div className='table-responsive'>
                                <table className="table table-bordered">
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">No</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Buyer</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Payment</th>
                                            <th scope="col">Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            orders?.map((o, i) => (
                                                <tr key={o?._id}>
                                                    <th scope="row">{i + 1}</th>
                                                    <td width={100}>
                                                        <Select 
                                                        defaultValue={o?.status}
                                                        options={status}
                                                        onChange={(value) => onHandleChange(o?._id, value)}
                                                        />
                                                    </td>
                                                    <td>{o?.buyer?.name}</td>
                                                    <td>{moment(o?.createAt).fromNow()}</td>
                                                    <td>{o?.payment}</td>
                                                    <td>{o?.products.length}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AdminOrder

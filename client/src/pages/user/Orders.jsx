import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import axios from 'axios'
import { useAuth } from '../../context/auth'
import moment from 'moment';
import {Modal} from 'antd'

const Orders = () => {

    const [auth, setAuth] = useAuth();
    const [orders, setOrders] = useState();
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false)

    const handleOk = () => {
        setOpen(false)
    }

    const handleCancel = () => {
        setOpen(false)
    }

    const getOrders = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/orders`);
            setOrders(data?.order)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (auth?.token) {
            getOrders()
        }
    }, [auth?.token])
    return (
        <Layout title={"Your Orders - Ecommerce"}>
            <div className="container p-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <h3>Orders List</h3>
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
                                                <td>{o?.status}</td>
                                                <td>{o?.buyer?.name}</td>
                                                <td>{moment(o?.createAt).fromNow()}</td>
                                                <td>{o?.payment}</td>
                                                <td>{o?.products.length}</td>
                                                <td><button className="btn btn-primary btn-sm" onClick={() => {
                                                    setOpen(true)
                                                    setProducts(o?.products)
                                                }}>Products</button></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        <Modal open={open}  onOk={handleOk} onCancel={handleCancel} >
                            {
                                products?.map(p => (
                                    <div className="card">
                                        <div className="d-flex flex-wrap" >
                                            <div className='col-md-4'>
                                                <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} width={100} height={100} className="card-img-top" alt="Product Image" />
                                            </div>
                                            <div className='col-md-8 mt-3'>
                                                <h5>{p?.name}</h5>
                                                <h5>{p?.description.substring(0, 30)}</h5>
                                                <h5>$ {p.price}</h5>
                                                <h5>{p?.category?.name}</h5>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </Modal>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Orders

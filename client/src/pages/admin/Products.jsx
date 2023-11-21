import React, {useEffect, useState} from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate , Link} from 'react-router-dom';

const Products = () => {

    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    // get all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`);
            const { success, message, products } = data;
            if (success) {
                setProducts(products)

            } else {
                toast.error(`Error is ${message}`)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    // life cycle method
    useEffect(() => {
        getAllProducts();
    }, [])

    return (
        <Layout title={"Products - Ecommerce"}>
            <div className="container-fluid p-3">
                <div className="row">
                    <div className="col-md-3">
                        <h3>Admin Panel</h3>
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h3>Product List</h3>
                        <div className="d-flex flex-wrap">
                            {
                                products?.map((p) => {
                                    return (
                                        <Link to={`/dashboard/admin/update-product/${p.slug}`} key={p._id} className='product-link'>
                                            <div className="card" style={{ width: '18rem' }}>
                                                <img className="card-img-top img img-fluid" src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} style={{ width: "100px" }} alt="Card image cap" />
                                                <div className="card-body">
                                                    <h5 className="card-title">{p.name}</h5>
                                                    <h6 className='card-title'>$ {p.price}</h6>
                                                    <p className="card-text">{p.description}</p>
                                                </div>
                                            </div>
                                        </Link>

                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Products

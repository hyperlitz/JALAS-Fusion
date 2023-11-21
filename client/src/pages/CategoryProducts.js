import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useCart } from '../context/Cart'
import toast from 'react-hot-toast'

const CategoryProducts = () => {

    const params = useParams()
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [cart, setCart] = useCart();
    const navigate = useNavigate();

    // get products by category wise
    const getProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/category-product/${params.slug}`)
            setProducts(data?.products);
            setCategory(data?.category);
        } catch (err) {
            console.log(err.message)
        }
    }

    // get Products
    useEffect(() => {
        getProducts()
    }, [params])

    return (
        <Layout>
            <div className="container-fluid">
                <div className="row p-3">
                    <h2>{category?.name} Products</h2>
                    <div className='d-flex flex-wrap mt-5 justify-content-center'>
                        {
                            products.length === 0 && <h4 className='text-center'>No Products Found !</h4>
                        }
                        {
                            products?.map(p => (
                                <div className="card" key={p._id}>
                                    <div className="image-container">
                                        <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                            width={200} height={200}
                                            className="card-img-top" alt="Product Image" />
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">{p?.name}</h5>
                                        <p className="card-text">{p?.description.substring(0, 30)}</p>
                                        <p className="card-price" style={{ fontSize: '22px', color: 'green', fontWeight: '600' }}>$ {p?.price}</p>
                                    </div>
                                    <div className="card-footer">
                                        <div className="btn-group">
                                            <button className="btn btn-success mr-1" onClick={() => {
                                                navigate(`/more-details/${p?.slug}`)
                                                
                                            }} style={{ borderRadius: '12px' }}>More Details</button>
                                            <button className="btn btn-primary" onClick={() => {
                                                setCart([...cart, p])
                                                localStorage.setItem('cart', JSON.stringify([...cart, p]))
                                                toast.success("product added to cart")
                                            }} style={{ borderRadius: '12px' }}>Add to Cart</button>
                                        </div>
                                    </div>
                                </div>
                            ))

                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CategoryProducts

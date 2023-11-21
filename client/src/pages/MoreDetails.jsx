import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useCart } from '../context/Cart'
import toast from 'react-hot-toast'

const MoreDetails = () => {
    const params = useParams()
    const [product, setProduct] = useState([]);
    const [similar, setSimilar] = useState([]);
    const [cart, setCart] = useCart()
    const navigate = useNavigate();

    // get product item
    const getProduct = async() => {
        try{
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`);
            setProduct(data?.product)
            getSimilarProducts(data?.product?.category?._id, data?.product?._id)
        }catch(err){
            console.log(err.message)
        }
    }

    // get similar products
    const getSimilarProducts = async(cId, pId) => {
        try{
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/similar-product`, {cId, pId})
            setSimilar(data?.products)
        }catch(err){
            console.log(err.message);
        }
    }

    // life cycle method
    useEffect(() => {
        getProduct()
    }, [])

    return (
        <Layout>
            <div className="container-fluid">
                <div className="row p-3">
                    <div className="col-md-6">
                        <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product?._id}`} className="card-img-top" alt="Product Image" width={400} height={400}/>
                    </div>
                    <div className="col-md-6 mt-5">
                        <h3>Name : {product?.name}</h3>
                        <h3>Description : {product?.description?.substring(0,30)}</h3>
                        <h3>Price : $ {product?.price}</h3>
                        <h3>Category : {product?.category?.name}</h3>
                        <h3>Shipping : {product?.shipping ?  "YES" : "NO"}</h3>
                        <button className="btn btn-primary" onClick={() => {
                            setCart([...cart, product])
                            localStorage.setItem('cart', JSON.stringify([...cart, product]))
                            toast.success("product added to cart")
                        }}>Add to Cart</button>
                    </div>
                </div>
                <div className='row p-3'>
                    <h3 className='text-center'>Similar Products</h3>
                        <div className='d-flex flex-wrap mt-5'> 
                            {
                                similar?.map(p => (
                                    <div className="card" key={p._id}>
                                        <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} width={200} height={200} className="card-img-top" alt="Product Image" />
                                        <div className="card-body">
                                            <h5 className="card-title">{p?.name}</h5>
                                            <p className="card-text">{p?.description.substring(0, 30)}</p>
                                            <p className="card-price" style={{ fontSize: '22px', color: 'green', fontWeight: '600' }}>$ {p?.price}</p>
                                        </div>
                                        <div className="card-footer">
                                            <div className="btn-group">
                                                <button className="btn btn-success mr-1" onClick={() => {
                                                    navigate(`/more-details/${p.slug}`)
                                                }} style={{ borderRadius: '12px' }}>More Details</button>
                                                <button className="btn btn-primary" onClick={() => {
                                                    setCart([...cart, p])
                                                    localStorage.setItem('cart', JSON.stringify([...cart, p]))
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

export default MoreDetails

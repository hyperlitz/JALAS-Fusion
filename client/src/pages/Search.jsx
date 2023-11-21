import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useSearch } from '../context/Search'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/Cart';
import toast from 'react-hot-toast';

const Search = () => {

    const [search, setSearch] = useSearch();
    const params = useParams()
    const navigate = useNavigate();
    const [ cart, setCart] = useCart()

    // get the product based on the search keyword
    const getProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/search-product/${params.keyword}`);
            setSearch({ ...search, result: data?.products })
        } catch (err) {
            console.log(err.message);
        }
    }

    // get products
    useEffect(() => {
        getProducts()
    }, [params])

   

    return (
        <Layout>
            <div className="container p-3">
                <h3>{search?.result?.length} Results Found</h3>
                <div className="row mt-4">
                        <div className='d-flex flex-wrap'>
                            {!search?.result?.length && <h3>No Product Found</h3>}
                            {
                                search?.result?.map(p => (
                                    <div className="card" key={p._id}>
                                        <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} width={200} height={200} className="card-img-top" alt="Product Image" />
                                        <div className="card-body">
                                            <h5 className="card-title">{p?.name}</h5>
                                            <p className="card-text">{p?.description.substring(0, 30)}</p>
                                            <p className="card-price">$ {p?.price}</p>
                                        </div>
                                        <div className="card-footer">
                                            <div className="btn-group">
                                                <button className="btn btn-success mr-1" onClick={() => {
                                                    navigate(`/more-details/${p.slug}`)
                                                }}>More Details</button>
                                                <button className="btn btn-primary" onClick={() => {
                                                    setCart([ ...cart, p])
                                                    localStorage.setItem('cart', [ ...cart, p])
                                                    toast.success("product added to cart")
                                                }}>Add to Cart</button>
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

export default Search

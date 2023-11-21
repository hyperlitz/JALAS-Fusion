import React from 'react'
import Layout from '../components/Layout/Layout'
import { useCategory } from '../hook/category'
import { useNavigate } from 'react-router-dom';

const Categories = () => {

    const categories = useCategory();
    const navigate = useNavigate()

    return (
        <Layout>
            <div className="container">
                <h2>All Categories</h2>
                <div className="row mt-3">
                    {
                        categories?.map(c => (
                            <div className="col-md-6 mt-3" key={c?._id}>
                                <button className='category-btn' style={{width:'100%', height:"100px"}}
                                    onClick={() => navigate(`/category/${c.slug}`)}
                                >{c?.name}</button>
                            </div>
                        ))
                    } 
                </div>
            </div>
        </Layout>
    )
}

export default Categories

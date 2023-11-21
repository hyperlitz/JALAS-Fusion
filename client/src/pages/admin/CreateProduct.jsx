import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import ProductForm from '../../components/Admin/ProductForm'
import axios from 'axios'

const CreateProduct = () => {
  const [options, setOptions] = useState([]);
 

  // get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
      let arr = [];
      for(let category of data.category){
        arr.push({ value : category._id, label : category.name})
      }
      setOptions(arr);
    } catch (err) {
      console.log("error ", err.message);
    }
  }

  useEffect(() => {
    getAllCategories()
  }, [])
  return (
    <Layout title={"Create Product - Ecommerce"}>
        <div className="container-fluid p-3">
            <div className="row">
                  <div className="col-md-3">
                    <h3>Admin Panel</h3>
                      <AdminMenu />
                  </div>
                  <div className="col-md-6">
                      <h2>Create Product</h2>
                      <div className='mt-3'>
                        <ProductForm optionArray={options}/>
                      </div>
                  </div>
            </div>
        </div>
    </Layout>
  )
}

export default CreateProduct

import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../components/Layout/Layout'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';
import AdminMenu from '../../components/Layout/AdminMenu';
import { Select } from 'antd';

const UpdateProduct = () => {

    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [name, setName] = useState(null)
    const [photo, setPhoto] = useState(null)
    const [description, setDescription] = useState(null)
    const [price, setPrice] = useState(null)
    const [category, setCategory] = useState(null)
    const [shipping, setShipping] = useState(null)
    const [quantity, setQuantity] = useState(null)
    const [id, setId] = useState(null)
    const [categories, setCategories] = useState([])
    const params = useParams();

    // get single product
    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`)
            const { success, message, product } = data;
            if (success) {
                console.log(product)
                setName(product?.name)
                setDescription(product?.description)
                setPrice(product?.price)
                setQuantity(product?.quantity)
                setShipping(product?.shipping)
                setId(product?._id)
                setCategory(product?.category?._id)
            } else {
                toast.error(`${message}`)
            }
        } catch (err) {
            toast.error("something went wrong")
        }
    }
    // on Update Product
    const onHandleSubmit = async (e) => {
        setIsLoading(true)
        e.preventDefault()
        try {
            let productData = new FormData();
            productData.append('name', name);
            productData.append('description', description);
            productData.append('price', price);
            productData.append('category', category)
            productData.append('shipping', shipping);
            productData.append('quantity', quantity);
            photo && productData.append('photo', photo)
            console.log(productData)
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`, productData);
            const { success, message } = data;
            if (success) {
                setIsLoading(false)
                toast.success("Updated")
                navigate('/dashboard/admin/products')
            } else {
                setIsLoading(false)
                toast.error(`${message}`)
            }
        } catch (err) {
            setIsLoading(false)
            toast.error(`${err.message}`)
        }
    }


    // get all categories..
    const getAllCategories = async () => {
        
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
            let arr = [];
            for (let category of data.category) {
                arr.push({ value: category._id, label: category.name })
            }
            setCategories([...arr])
        } catch (err) {
            console.log("error ", err.message);
        }
    }

    // delete product
    const deleteProduct = async (e) => {
        const q = window.prompt("are you sure");
        if(!q){
            return
        }
        setDeleteLoading(true)
        e.preventDefault()
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`);
            const { success, message } = data;
            if (success) {
                setDeleteLoading(false)
                toast.success("deleted")
                navigate('/dashboard/admin/products')
            } else {
                setDeleteLoading(false)
                toast.error(`${message}`)
            }
        } catch (err) {
            setDeleteLoading(false)
            console.log(err.message)
            toast.error(`error is ${err.message}`)
        }
    }

    // life cycle method
    useEffect(() => {
        getSingleProduct();
        getAllCategories();
        console.log(categories)
    }, [])


    return (
        <Layout title={'Update Product - Ecommerece App'}>
            <div className="container-fluid p-3">
                <div className="row">
                    <div className="col-md-3">
                        <h3>Admin Panel</h3>
                        <AdminMenu />
                    </div>
                    <div className="col-md-6">
                        <h2>Update Product</h2>
                        <div className='mt-3'>
                            <form className='product-form' onSubmit={onHandleSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Name"
                                        value={name}
                                        name='name'
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <Select
                                    value={category}
                                    style={{
                                        width: "100%",
                                        height: "42px",
                                        fontSize: "17px"
                                    }}
                                    showSearch
                                    options={categories}
                                    onChange={(value) => {
                                        setCategory(value);
                                    }}

                                />
                                <div className="form-group mt-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Description"

                                        value={description}
                                        name='description'
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="number"
                                        onChange={(e) => setPrice(e.target.value)}
                                        className="form-control"
                                        value={price}
                                        name='price'
                                        placeholder="Price in RS" />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="number"
                                        onChange={(e) => setQuantity(e.target.quantity)}
                                        className="form-control"
                                        placeholder="Quantity"
                                        name='quantity'
                                        value={quantity}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className='btn btn-outline-secondary w-100'>
                                        {
                                            photo ? photo.name : "Upload Photo"
                                        }
                                        <input
                                            className='btn btn-danger'
                                            accept='image/*'
                                            type="file"
                                            name='photo'
                                            onChange={(e) => setPhoto(e.target.files[0])}
                                            hidden />
                                    </label>
                                </div>
                                <div className="form-group">
                                    {
                                        photo ? (<img src={URL.createObjectURL(photo)} className='img img-fluid'></img>) :
                                            (<img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`} className='img img-fluid'></img>)
                                    }
                                </div>
                                <div className="form-group">
                                    <Select
                                        value={shipping ? "YES" : "NO"}
                                        style={{
                                            width: "100%",
                                            height: "42px",
                                            fontSize: "17px"
                                        }}
                                        options={[
                                            {
                                                value: false,
                                                label: "No"
                                            }, {
                                                value: true,
                                                label: "Yes"
                                            }
                                        ]}
                                        onChange={(e) => {
                                            setShipping(e)
                                        }}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    {
                                        !isLoading ? ("Update") : (
                                            <>
                                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            </>
                                        )
                                    }
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger m-1"
                                    onClick={deleteProduct}
                                >
                                   {
                                    !deleteLoading?("DELETE") : (
                                            <>
                                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            </>
                                    )
                                   }
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UpdateProduct

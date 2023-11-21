import React, { useState } from 'react'
import { Select } from 'antd'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'



const ProductForm = ({ optionArray }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [productDate, setProductData] = useState({
        name: "",
        photo: "",
        description: "",
        price: "",
        category: "",
        shipping: "",
        quantity: ""
    })
    const navigate = useNavigate()

    const { name, photo, description, price, category, shipping, quantity } = productDate;

    // submit the the form ( CREATE PRODUCT )
    const onHandleSubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        try {
            let productData = new FormData();
            productData.append('name', name);
            productData.append('description', description);
            productData.append('price', price);
            productData.append('category', category)
            productData.append('shipping', shipping);
            productData.append('quantity', quantity);
            productData.append('photo', photo);
            console.log(productData)
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/create-product`, productData);
            const { success, message } = data;
            if (success) {
                toast.success("product added")
                setIsLoading(false)
                navigate('/dashboard/admin/products')
            } else {
                toast.error(`${message}`)
                setIsLoading(false)
            }
        } catch (err) {
            toast.error(`error is ${err.message}`)
            setIsLoading(false)
        }
    }

    // change the field
    const onHandleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setProductData({
            ...productDate,
            [name]: value
        })
    }

    return (
        <>
            <form className='product-form' onSubmit={onHandleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        onChange={onHandleChange}
                        value={name}
                        name='name'
                    />
                </div>
                <Select
                    defaultValue="Category"
                    style={{
                        width: "100%",
                        height: "42px",
                        fontSize: "17px"
                    }}
                    showSearch
                    options={optionArray}
                    onChange={(value) => {
                        setProductData({
                            ...productDate,
                            'category': value
                        })
                    }}
                />
                <div className="form-group mt-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Description"
                        onChange={onHandleChange}
                        value={description}
                        name='description'
                    />
                </div>
                <div className="form-group">
                    <input
                        type="number"
                        onChange={onHandleChange}
                        className="form-control"
                        value={price}
                        name='price'
                        placeholder="Price in RS" />
                </div>
                <div className="form-group">
                    <input
                        type="number"
                        onChange={onHandleChange}
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
                            onChange={(e) => {
                                setProductData({
                                    ...productDate,
                                    'photo': e.target.files[0]
                                })
                            }}
                            hidden />
                    </label>
                </div>
                <div className="form-group">
                    {
                        photo && (<img src={URL.createObjectURL(photo)} className='img img-fluid'></img>)
                    }
                </div>
                <div className="form-group">
                    <Select
                        defaultValue="Shipping"
                        style={{
                            width: "100%",
                            height: "42px",
                            fontSize: "17px"
                        }}
                        options={[
                            {
                                value: 0,
                                label: "No"
                            }, {
                                value: 1,
                                label: "Yes"
                            }
                        ]}
                        onChange={(value) => {
                            setProductData({
                                ...productDate,
                                'shipping': value
                            })
                        }}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    {

                        !isLoading ? ("Create") : (
                            <>
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            </>)

                    }
                </button>
            </form>

        </>
    )
}

export default ProductForm

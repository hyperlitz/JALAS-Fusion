import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth'
import { Checkbox, Radio } from 'antd'
import axios from 'axios'
import { price } from '../components/Routes/Price'
import { useSearch } from '../context/Search'
import { useNavigate } from 'react-router-dom'
import { CartProvider, useCart } from '../context/Cart'
import toast from 'react-hot-toast'


const Home = () => {

  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoad, setShowLoad] = useState(true)
  const [search, setSearch] = useSearch();
  const [cart, setCart] = useCart()
  const navigate = useNavigate()

  // get the products 
  const getProduct = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`);
      setProducts(data?.products)
    } catch (err) {
      console.log("error is ", err.message)
    }
  }

  // get all categories 
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`)
      setCategories(data?.category)
    } catch (err) {
      console.log("error is", err.message)
    }
  }

  // set Checked id of the category
  const onChangeChecked = (value, id) => {
    try {
      let all = [...checked];
      if (value) {
        all.push(id);
        setChecked(all)
      } else {
        all = all.filter(cId => cId != id);
        setChecked(all)
      }
    } catch (err) {
      console.log("error is ", err.message)
    }

  }


  // get filtered Product List

  const filterProduct = async () => {
    setShowLoad(false)
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/filter-product`, { checked, radio })
      setProducts(data?.product)
      console.log(data);
    } catch (err) {
      console.log(err.message)
    }
  }

  // get total number of product

  const totalProduct = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/total`);
      console.log(data)
      setTotal(data?.total)
    } catch (err) {
      console.log(err.message)
    }
  }

  // get Product List as Per Page
  const productList = async (req, res) => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`)
      console.log(data)
      setProducts(data?.product)
    } catch (err) {
      console.log("error is ", err.message)
    }
  }


  // load more

  const loadMore = async () => {
    setIsLoading(true)
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`)
      setIsLoading(false)
      setProducts([...products, ...data.product])
    } catch (err) {
      console.log("error is ", err.message)
      setIsLoading(false)
    }
  }


  // life cycle method
  useEffect(() => {
    productList()
    getAllCategories()
    totalProduct()
  }, [])

  useEffect(() => {
    loadMore()
  }, [page])

  useEffect(() => {
    if (checked.length !== 0 || radio.length !== 0) {
      filterProduct()
    }
  }, [checked, radio])


  return (
    <Layout title={"Best Offers"}>
      <div className="home">
        <div className="row p-3">
          <div className="col-md-3 " >
            <div className='row p-2'>
              <h3 className='text-center'>Filter By Category</h3>

              <div className='d-flex flex-column'>
                {
                  categories?.map(c => (
                    <Checkbox
                      key={c._id}
                      onChange={(e) => onChangeChecked(e.target.checked, c._id)}
                      style={{ color: "black", fontSize: "15px", textTransform: "capitalize" }}>
                      {c.name}
                    </Checkbox>
                  ))
                }
              </div>
              <div className="row p-3">
                <h3 className='text-center'>Filter By Price</h3>
                <div className='d-flex flex-column'>
                  <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                    {
                      price.map(p => (
                        <Radio key={p._id} value={p.array}>{p.name}</Radio>
                      ))
                    }
                  </Radio.Group>
                </div>
              </div>
              <button className='btn btn-danger' onClick={
                () => window.location.reload()
              }>RESET FILTER</button>
            </div>
          </div>
          <div className="col-md-9">
            <div className="row">
              <img src="https://img.freepik.com/free-psd/flat-design-sales-discount-youtube-banner_23-2150751206.jpg" alt="" width={"100%"} style={{borderRadius:'10px'}} />
            </div>
            <h2 className='mt-2'>Products</h2>
            <div className='d-flex flex-wrap mt-3'>
              {!products.length && <h3>No Product Found</h3>}
              {
                products?.map(p => (
                  <div className="card" key={p._id} style={{ borderRadius: '10px' }}>
                    <div className="image-container">
                      <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                        width={200} height={200}
                        className="card-img-top" alt="Product Image" />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.description.substring(0, 30)}</p>
                      <p className="card-price" style={{ fontSize: '22px', color: 'green', fontWeight: '600' }}>$ {p.price}</p>
                    </div>
                    <div className="card-footer">
                      <div className="btn-group">
                        <button className="btn btn-success mr-1" onClick={() => {
                          navigate(`/more-details/${p.slug}`)
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
            <div className="row p-4">
              {
                products.length && showLoad && products.length < total && (
                  <button className="btn btn-warning ml-3" onClick={() => {
                    setPage(page + 1);
                  }}>
                    {
                      !isLoading ? "LOAD MORE" : "LOADING"
                    }
                  </button>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home

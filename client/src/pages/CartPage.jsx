import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../context/Cart'
import { useAuth } from '../context/auth';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const CartPage = () => {

    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("")
    const [loading, setLoading] = useState(false);
    const [cart, setCart] = useCart();
    const [auth] = useAuth()
    const navigate = useNavigate()

    // get total price of the cart
    const getTotal = () => {
        try {
            let total = 0;
            cart?.map((p) => total += p.price);
            return total.toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
            })
        } catch (err) {
            console.log(err.message)
        }
    }

    // remove cart item
    const removeCartItem = (pId) => {
        try {
            let all = [...cart];
            let index = all.findIndex(p => p._id === pId)
            all.splice(index, 1);
            setCart(all)
            localStorage.setItem('cart', JSON.stringify(all));
        } catch (err) {
            console.log(err.message)

        }
    }

    // get payment gateway token
    const getToken = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/braintree/token`)
            setClientToken(data?.token)
        } catch (err) {
            console.log(err)
        }
    }

    // handle payments
    // helpers.js

    const loadScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.async = true;
            script.onload = resolve;
            document.body.appendChild(script);
        });
    };

    const createOrder = async () => {
        let total = 0;
        cart?.map((p) => {
            total += p.price
        })
        const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/create-razorpay-order`, {amount: total})
        return data;
    };

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            if (window.Razorpay) resolve();
            else document.getElementById('razorpay').addEventListener('load', resolve);
        });
    };


    // payment 
    const handlePayment =async () => {
        await loadScript();
        const order = await createOrder();
        const options = {
            key: "rzp_test_XMXO3SrPxms6c8", // Replace with your Razorpay key
            amount: order.amount,
            currency: 'INR',
            name: 'MY Technology',
            description: 'Payment for your product',
            order_id: order.id,
            handler: async function (response) {
                if (!(response.razorpay_payment_id && response.razorpay_signature)){
                    console.log("Payment Failed")
                }
                let result = (response.razorpay_payment_id && response.razorpay_signature) ? "SUCCESS" : "FAILED";
                const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/create-order`, {cart, result})
                if(data?.ok){
                   toast.success("Payment succfully")
                }else{
                    toast.error("payment failed")
                }
                setCart([])
                localStorage.removeItem("cart")
                navigate('/dashboard/user/orders')
            },  
            prefill: {
                name: 'John Doe',
                email: 'johndoe@example.com',
                contact: '1234567890',
            },
        };
        const razorpay = new window.Razorpay(options);
        razorpay.open();
    }

    // life cycle hook
   



    return (
        <Layout>
            <div className="container p-2">
                {
                    auth && auth?.token && (<h5>Welcome {auth?.user?.name}</h5>)
                }
               
                <div className="row  p-3">
                    <div className="col-md-6">
                        <h3 className='text-center'>{cart?.length > 0 ? `You have ${cart?.length} cart items` : "cart is Empty"}</h3>

                        {
                            cart?.map(p => (
                                <div className="card">
                                    <div className="d-flex flex-wrap" >
                                        <div className='col-md-4'>
                                            <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} width={200} height={200} className="card-img-top" alt="Product Image" />
                                        </div>
                                        <div className='col-md-8 mt-3'>
                                            <h5>{p?.name}</h5>
                                            <h5>{p?.description.substring(0, 30)}</h5>
                                            <h5>$ {p.price}</h5>
                                            <h5>{p?.category?.name}</h5>
                                            <button className="btn btn-danger" onClick={() => removeCartItem(p._id)}>Remove</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                    <div className="col-md-6 mt-3">
                        <h3 className='text-center'>Cart Summery</h3>
                        <h6 className='text-center'>TOTAL | CHECKOUT | PAYMENT</h6>
                        <h4 className='text-center mt-3'>Total : {getTotal()}</h4>
                        {
                            (auth && auth?.user?.address) ? (
                                <>
                                    <h5>Current Address : </h5>
                                    <p className='text-center'>{auth?.user?.address} {auth?.user?.phone}</p>
                                    <div className="row d-flex justify-content-center mt-3">
                                        <button className='btn btn-warning' onClick={() => {
                                            navigate('/dashboard/user/profile', { state: "/cart" })
                                        }}>Update Address</button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="row d-flex justify-content-center mt-3">
                                        <button className='btn btn-warning' onClick={() => {
                                            navigate('/login', { state: "/cart" })
                                        }}>Please Login into Checkout</button>
                                    </div>
                                </>
                            )
                        }
                        <div className="row mt-2" style={{ display: 'flex', justifyContent: "center" }}>
                            {/* payment */}
                            <div id="razorpay">

                            </div>
                            <button className='btn btn-primary'
                             onClick={handlePayment}
                             disabled={!auth || !auth?.user || !cart?.length}
                             >Make Payment</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CartPage

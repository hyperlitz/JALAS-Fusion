import React, { useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth'

const Login = () => {

    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })
    const { email, password } = loginData;
    const [auth, setAuth] = useAuth();
    const location = useLocation();

    const onHandleSubmit = async (e) => {
        setIsLoading(true)
        e.preventDefault();
        console.log("Data is ", loginData)
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, { ...loginData });
            const { success, message, user, token } = data;
            if (!success) {
                toast.error(message);
                setIsLoading(false)
            } else {
                toast.success(message);
                console.log(user)
                setAuth({
                    ...auth,
                    user,
                    token
                })
                localStorage.setItem("auth", JSON.stringify({ user, token }));
                navigate(location.state || "/")
            }

        } catch (err) {
            setIsLoading(false);
            alert(err.message)
        }

    }
    const onHandleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        })
    }
    return (
        <Layout title={"Login - user"}>
            <div className='register'>
                <h1>Login Page</h1>
                <form onSubmit={onHandleSubmit}>
                    <div className="form-group mt-3">
                        <input type="email" name='email' value={email} className="form-control" id="exampleInputEmail" placeholder="Enter Your Email" required onChange={onHandleChange} />
                    </div>
                    <div className="form-group mt-3">
                        <input type="password" name='password' value={password} className="form-control" id="exampleInputPassword" placeholder="Enter Your password" required onChange={onHandleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary mt-2" style={{ minWidth: "100%" }}>
                        {
                            !isLoading ? ("Login") : (
                                <>
                                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                </>)
                        }
                    </button>
                    <button type="button" className="btn btn-info mt-2" style={{ minWidth: "100%" }} onClick={() => { navigate("/forgot-password") }}>Forgotten Password</button>
                </form>
            </div>
        </Layout>
    )
}

export default Login

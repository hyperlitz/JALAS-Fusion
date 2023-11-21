import React, { useState } from 'react'
import Layout from '../components/Layout/Layout'
import {toast} from 'react-toastify'
import axios from 'axios'
import {  useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'

const Register = () => {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        answer: ""
    })

    const onHandleChange = (e) => {
        const {name, value} = e.target;
        setRegisterData({
            ...registerData,
            [name] : value
        })
    }

    const  onHandleSubmit = async (e) => {
        setIsLoading(true)
        e.preventDefault()
        try{
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, { ...registerData });
            const {success, message, user} = data;
            if(!success){
                toast.error(message);
                navigate("/register")
            }else{
                toast.success(message);
                navigate("/login")
            }
 
        }catch(err){
            console.log(err.message)
            toast.error(err)
        }
    }

    return (
        <Layout title={"Register The user"}>
            <div className='register'>
                <h1>Register Page</h1>
                <form onSubmit={onHandleSubmit}>
                    <div className="form-group mt-3">
                        <input type="text" name='name' value={registerData.name} className="form-control" id="exampleInputName" placeholder="Enter Your Name" required onChange={onHandleChange}/>
                    </div>
                    <div className="form-group mt-3">
                        <input type="email" name='email' value={registerData.email} className="form-control" id="exampleInputEmail1"  placeholder="Enter Your Email"  required onChange={onHandleChange}/>
                    </div>
                    <div className="form-group mt-3">
                        <input type="password" name='password' value={registerData.password} className="form-control" id="exampleInputPassword"  placeholder="Enter Your Password" required onChange={onHandleChange} />
                    </div>
                    <div className="form-group mt-3 mb-3">
                        <input type="text" name='phone' value={registerData.phone} className="form-control" id="exampleInputPhone" placeholder="Enter Your Phone"  required onChange={onHandleChange}/>
                    </div>
                    <div className="form-group mt-3">
                        <input type="text" name='address' value={registerData.address} className="form-control" id="exampleInputAddress"  placeholder="Enter Your Address"  required onChange={onHandleChange}/>
                    </div>
                    <div className="form-group mt-3">
                        <input type="text" name='answer' value={registerData.answer} className="form-control" id="exampleInputAddress" placeholder="Your Favorite sports" required onChange={onHandleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary mt-2" style={{width:"100%"}}>
                        {
                            !isLoading?("Register"):("Loding....")
                        }
                    </button>
                </form>
            </div>
        </Layout>
    )
}

export default Register

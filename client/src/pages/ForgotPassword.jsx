import React, { useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {

    const navigate = useNavigate();
    const [fpData, setFpData] = useState({
        email: "",
        answer: "",
        newPassword: ""
    })

    const { email, answer, newPassword } = fpData;

    // trigger the function when change the input
    const onHandleChange = (e) => {
        const { name, value } = e.target;
        setFpData({
            ...fpData,
            [name]: value
        })
    }

    // trigger the function when submit the form
    const onHandleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`, {...fpData});
            const {success, message, err} = data;
            if(!success){
                toast.error(`message: ${err}`);
            }else{
                toast.success(message);
                navigate("/login")
            }
        } catch (err) {
            console.log("error ", err.message)
            alert("error", err.message)
            
        }
    }

    return (
        <Layout title={"forgot-password"}>
            <div className='forgot-password d-flex flex-column align-items-center justify-content-center' style={{ minHeight: "50vh" }}>
                <h3>Reset Password</h3>
                <form onSubmit={onHandleSubmit}>
                    <div className="form-group">
                        <input type="email" className="form-control" id="exampleInputEmail1" onChange={onHandleChange} name='email' placeholder="Enter email" />
                    </div>
                    <div className="form-group mt-3">
                        <input type="text" className="form-control" id="exampleInputEmail1" onChange={onHandleChange} name='answer' placeholder="Enter your favourite Sports" />
                    </div>
                    <div className="form-group mt-3">
                        <input type="password" className="form-control" id="exampleInputPassword1" onChange={onHandleChange} name='newPassword' placeholder="Enter The new password" />
                    </div>
                    <button type="submit" className="btn btn-primary mt-3" style={{ width: "100%" }} onSubmit={onHandleSubmit}>Submit</button>
                </form>
            </div>
        </Layout>
    )
}

export default ForgotPassword

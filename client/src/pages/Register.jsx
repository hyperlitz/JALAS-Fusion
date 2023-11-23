import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    answer: '',
  });

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, { ...registerData });
      const { success, message } = data;

      if (!success) {
        // Use SweetAlert for displaying errors
        Swal.fire({
          icon: 'error',
          title: 'Registration Error',
          text: message,
        });
      } else {
        // Use SweetAlert for displaying success messages
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: message,
        }).then(() => {
          // Redirect after successful registration
          window.location.href = '/login';
        });
      }
    } catch (err) {
      console.error(err);
      // Use SweetAlert for displaying generic error messages
      Swal.fire({
        icon: 'error',
        title: 'Registration Error',
        text: 'An error occurred while registering. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

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

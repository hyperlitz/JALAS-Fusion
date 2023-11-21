import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/auth';
import { useNavigate, useLocation } from 'react-router-dom';

const Profile = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [auth, setAuth] = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    // update profile
    const updateProfile = async (e) =>{
        e.preventDefault()
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/update-profile`, {name, password, phone, address})
            if(data?.success){
                
                setAuth({...auth, user : data?.updatedUser})
                let ls = localStorage.getItem('auth')
                ls = JSON.parse(ls)
                ls.user = data?.updatedUser;
                localStorage.setItem("auth", JSON.stringify(ls))
                toast.success("profile Updated Successfully")
                if(location.state){
                    navigate(location.state)
                }
            }else{
                toast.error(`error occur ${data.message}`)
            }
        } catch (err) {
            console.log(err.message)
            toast.error(`error is ${err.message}`)
        }
    }

    // set the address of User
    useEffect(() => {
        const {name, email, phone, address} = auth?.user
       setName(name)
       setAddress(address)
       setEmail(email)
       setPhone(phone)
       console.log(auth) 
    }, [])

  return (
    <Layout title={"Your Profile - Ecommerce"}>
        <div className="container p-3">
            <div className="row">
                <div className="col-md-3">
                    <UserMenu/>
                </div>
                <div className="col-md-9">
                    <h3>User Profile</h3>
                      <form onSubmit={updateProfile}>
                          <div className="form-group mt-3">
                              <input type="text" name='name' value={name} className="form-control" id="exampleInputName" placeholder="Enter Your Name" required 
                                  onChange={(e) => setName(e.target.value)} />
                          </div>
                          <div className="form-group mt-3">
                              <input type="email" name='email' value={email} className="form-control" id="exampleInputEmail1" placeholder="Enter Your Email" disabled 
                                  onChange={(e) => setEmail(e.target.value)} />
                          </div>
                          <div className="form-group mt-3">
                              <input type="password" name='password'  className="form-control" id="exampleInputPassword" placeholder="Enter New Password" value={password}  onChange={(e) => setPassword(e.target.value)} />
                          </div>
                          <div className="form-group mt-3 mb-3">
                              <input type="text" name='phone' value={phone} className="form-control" id="exampleInputPhone" placeholder="Enter Your Phone" required onChange={(e) => setPhone(e.target.value)} />
                          </div>
                          <div className="form-group mt-3">
                              <input type="text" name='address' value={address} className="form-control" id="exampleInputAddress" placeholder="Enter Your Address" required onChange={(e) => setAddress(e.target.value)} />
                          </div>
                          <button type="submit" className="btn btn-primary mt-2" style={{ width: "100%" }}>
                             Update Profile
                          </button>
                      </form>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Profile

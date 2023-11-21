import { useState, useEffect } from 'react';
import { useAuth } from '../../context/auth';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../Spinner';

export default function AdminRoute() {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();
    useEffect(() => {
        const authCheck = async () => {
            console.log("auth is ", auth)
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/admin-auth`);
            const { ok } = data;
            if (!ok) {
                console.log("Ok is false")
                setOk(false)
            } else {
                console.log("Ok is true")
                setOk(true);
            }
        }
        if (auth?.token) {
            authCheck()
        }
    }, [auth?.token])

    return ok ? <Outlet /> : <Spinner path=""/>
}
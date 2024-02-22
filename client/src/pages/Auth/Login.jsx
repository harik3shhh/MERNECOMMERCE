import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import {toast} from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom'
import "../../styles/AuthStyles.css"
import { useAuth } from '../../context/auth';


const Login = () => {
    const [auth, setAuth] = useAuth()

    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState({
       
        email: "",
        
        password: "",
        
    });

    //handling input
    const handleInput = (e)=>{
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value,
        });
    };


    // handle submit 
    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log(user);

        
        try {
        const url = "http://localhost:8000/api/v1/auth/login";
            const res = await fetch(url, {
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            const data = await res.json();
            if(res && res.ok){
                console.log(data);
                
                setUser({ email: "", password: "", });
                toast.success("Login Successful!!!");
                // toast.success(`Welcome ${data.user.name}`);
                setAuth({
                    ...auth,
                    user: data.user,
                    token: data.token,
                });

                localStorage.setItem("auth", JSON.stringify(data));

                navigate(location.state||"/");
            }else{
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(data.message);
        }


    };

    return (
        <Layout title={"Login - Ecommerce"}>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                <h1 className='heading'>Login</h1>

                    <div className="mb-3">
                        <input type="email" className="form-control" name="email" placeholder='Enter Your Email' 
                        value={user.email} onChange={handleInput}
                        />
                    </div>


                    <div className="mb-3">
                        <input type="password" className="form-control" name="password" placeholder='Password' 
                        value={user.password} onChange={handleInput}
                        />
                    </div>

                    <div className='mb-3'>
                    <button type="button" className="btn btn-primary" onClick={()=>{navigate("/forgot-password")}}>Forgot Password</button>
                    </div>

                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </Layout>
    )
}

export default Login
import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import {toast} from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom'
import "../../styles/AuthStyles.css"
import { useAuth } from '../../context/auth';


const ForgotPassword = () => {
    

    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState({
       
        email: "",
        
        answer: "",
        newpassword: "",
        
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
        const url = "http://localhost:8000/api/v1/auth/forgot-password";
            const res = await fetch(url, {
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            const data = await res.json();
            if(res && res.ok){
                
                
                setUser({ email: "",answer:"", newpassword: "", });
                toast.success("Password Reset Successful!!!");
                
               

                

                navigate(location.state||"/login");
            }else{
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(data.message);
        }


    };

    return (
        <Layout title={"Forgot Password - Ecommerce"}>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                <h1 className='heading'>Reset Password</h1>

                    <div className="mb-3">
                        <input type="email" className="form-control" name="email" placeholder='Enter Your Email' 
                        value={user.email} onChange={handleInput}
                        />
                    </div>

                    <div className="mb-3">
                        <input type="text" className="form-control" name="answer" placeholder='What is your favourite thing?' 
                        value={user.answer} onChange={handleInput}
                        />
                    </div>

                    <div className="mb-3">
                        <input type="password" className="form-control" name="newpassword" placeholder='New Password' 
                        value={user.newpassword} onChange={handleInput}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Reset</button>
                </form>
            </div>
        </Layout>
    )
}

export default ForgotPassword
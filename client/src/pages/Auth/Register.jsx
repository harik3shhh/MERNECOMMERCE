import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import {toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import "../../styles/AuthStyles.css"

const Register = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        phone:"",
        password: "",
        address: "",
        answer: "",
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
        const url = "http://localhost:8000/api/v1/auth/register";
            const response = await fetch(url, {
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            if(response.ok){
                setUser({ name:  "", email: "", password: "", phone: "", address: "", answer:"", });
                toast.success("Registration Successful!!!");
                navigate("/login");
            }else{
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong");
        }


    };

    return (
        <Layout title={"Register - Ecommerce"}>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                <h1 className='heading'>Register Form</h1>
                    <div className="mb-3"> 
                        <input type="text" className="form-control" name="name"  placeholder='Name'
                        value={user.name} onChange={handleInput} required
                        />
                    </div>

                    <div className="mb-3">
                        <input type="email" className="form-control" name="email" placeholder='Enter Your Email' 
                        value={user.email} onChange={handleInput} required
                        />
                    </div>


                    <div className="mb-3">
                        <input type="password" className="form-control" name="password" placeholder='Password' 
                        value={user.password} onChange={handleInput} required
                        />
                    </div>

                    <div className="mb-3">
                       
                        <input type="phone" className="form-control" name="phone" placeholder='+91' 
                        value={user.phone} onChange={handleInput} required
                        />
                            
                    </div>

                    <div className="mb-3">
                        <input type="text" className="form-control" name="address" placeholder='Address' 
                        value={user.address} onChange={handleInput} required
                        />  
                    </div>

                    <div className="mb-3">
                        <input type="text" className="form-control" name="answer" placeholder='What is your favourite thing?' 
                        value={user.answer} onChange={handleInput} required
                        />  
                    </div>

                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
            </div>
        </Layout>
    )
}

export default Register
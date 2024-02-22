import React, { useState } from 'react'
import { useAuth } from '../../context/auth';
import {toast} from 'react-hot-toast';


//Create Category Login
const CategoryForm = () => {
    const [auth] = useAuth();
    const [place, setPlace] = useState({
        name: "",
    });

    // console.log(auth?.token);

    const handleInput = (e)=>{
        let name = e.target.name;
        let value = e.target.value;

        setPlace({
            ...place,
            [name]: value,
        });
    };

    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log(place);

        
        try {
        const url = "http://localhost:8000/api/v1/category/create-category";
            const res = await fetch(url, {
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                    "Authorization" : `${auth.token}`
                },
                body: JSON.stringify(place),
            });

            const data = await res.json();
            if(res && res.ok){
                console.log(data);
                

                setPlace({ name: "", });
                toast.success(`New Category ${place.name} is Created!!!`);
                
            }else{
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(data.message);
        }


    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">

                    <input type="text" className='form-control' placeholder='Enter New Category' name='name'
                    value={place.name} onChange={handleInput}
                    />

                </div>


                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default CategoryForm
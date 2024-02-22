import React, { useState } from 'react'
import { useAuth } from '../../context/auth';
import {toast} from 'react-hot-toast';
import axios from 'axios';



const UpdateForm = () => {
    // const [auth] = useAuth();
    const [place, setPlace] = useState({
        name: "",
    });

    const [selected, setSelected] = useState(null)
    const [updateName, setUpdatedName] = useState("");

    const handleInput = (e)=>{
        let name = e.target.name;
        let value = e.target.value;

        setPlace({
            ...place,
            [name]: value,
        });
    };

    const handleUpdate = async(e) => {
        e.preventDefault();
        try {
          const {data} = await axios.put(`http://localhost:8000/api/v1/category/update-category/${selected._id}`, {name: updatedname});
          if(data.success){
            toast.success(`${updateName} is updated`);
            setSelected(null);
            setUpdatedName("");
            isOpen(false);
            getAllCategory();
          }else{
            toast.error(data.message);
    
          }
        } catch (error) {
          toast.error("Something went wrong while updating");
        }
      }

    return (
        <>
            <form onSubmit={handleUpdate}>
                <div className="mb-3">

                    <input type="text" className='form-control' placeholder='Update Category' name='updatedname'
                    value={place.updatedname} onChange={handleInput}
                    />

                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </>
    )
}

export default UpdateForm
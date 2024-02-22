import React, {useState, useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import {toast} from 'react-hot-toast';
import axios from "axios"
import CategoryForm from '../../components/Form/CategoryForm';
import {Modal} from "antd"
import UpdateForm from '../../components/Form/UpdateForm';
import { useAuth } from '../../context/auth';


const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [open, isOpen] = useState(false);
  const [auth] = useAuth();

  

  //GET ALL CATEGORIES
  const getAllCategory = async() => {
    
    try {
        const {data} = await axios.get("http://localhost:8000/api/v1/category/get-category");
        if(data?.success){
          setCategories(data?.category);
        }

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };


  useEffect(()=>{
    getAllCategory();
  }, [])

  //DELETE CATEGORY
  const handleDelete = async(id) => {
    // e.preventDefault();
    try {
      const config={
        headers: {
          Authorization: `${auth.token}`
        }
      };

      
      const {data} = await axios.delete(`http://localhost:8000/api/v1/category/delete-category/${id}`, config);
      if(data.success){
        toast.success(`Category is Deleted`);
        
        getAllCategory();
      }else{
        toast.error(data.message);

      }
    } catch (error) {
      toast.error("Something went wrong while Deleting");
    }
  }

  return (
    <Layout title={"Admin - Create Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
            <div className="col-md-3">
                <AdminMenu/>
            </div>
            <div className="col-md-9">
              <h1>Manage Category</h1>
              <div className="p-3 w-50">
                <CategoryForm />
              </div>
              <div className='w-75'>
              <table className="table">
  <thead>
    <tr>
     
      <th scope="col">Name</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
   
      {categories?.map(c => (
        <>
      <tr>
        <td key={c._id}>{c.name}</td>
        
      <td><button className='btn btn-primary' onClick={()=> {isOpen(true); setUpdatedName(c.name); setSelected(c)}}>Edit</button></td>
      <td><button className='btn btn-danger' onClick={()=>handleDelete(c._id)}>Delete</button></td>
      
    </tr>
        </>
      ))}
  </tbody>
</table>
              </div>
            </div>
            <Modal onCancel={()=> isOpen(false)} footer={null} open={open} >
              <UpdateForm/>
            </Modal>
        </div>
        </div>
    </Layout>
  )
}

export default CreateCategory
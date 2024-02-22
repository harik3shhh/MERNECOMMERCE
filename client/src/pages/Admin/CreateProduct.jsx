import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import {toast} from 'react-hot-toast';
import axios from "axios"
import { Select } from "antd"
import { useNavigate } from 'react-router-dom';

const {Option} = Select



const CreateProduct = () => {

  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");


//GET ALL CATEGORY
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



// handlesubmit create product
const handleSubmit = async(e) => {
e.preventDefault();

try {
  const productData = new FormData()
  productData.append("category", category)
  productData.append("name", name)
  productData.append("description", description)
  productData.append("price", price)
  productData.append("quantity", quantity)
  productData.append("photo", photo)

  const {data} = await axios.post("http://localhost:8000/api/v1/product/create-product", productData)
  if(data?.success){
    toast.success("Product Created Successfully");
    navigate("/dashboard/admin/products");
  }else{
    toast.error("Failed to Create Product");
  }
} catch (error) {
  console.log(error);
  toast.error("something went wrong while creating product");
}
};

  return (
    <Layout title={"Admin - Create Product"}>
      <div className="container-fluid m-3 p-3">
    <div className="row">
        <div className="col-md-3">
            <AdminMenu/>
        </div>
        <div className="col-md-9">
          <h1>Create Product</h1>
          <div className="m-1 w-75">
            <Select bordered={false} placeholder="select a category" size='large' showSearch className='form-select mb-3' onChange={(value)=> {setCategory(value)} }>
              {categories?.map(c => (
                <Option key={c._id} value={c._id}>{c.name}</Option>
              ))}

            </Select>

                {/* UPLOAD IMAGE */}

            <div className="mb-3 ">
              <label className='btn btn-outline-secondary col-md-12'>
                {photo? photo.name : "Upload Image"}
                <input type="file" name='photo' accept='image/*'
                onChange={(e) => setPhoto(e.target.files[0])}
                hidden />
              </label>
            </div>

                {/* IMAGE PREVIEW */}
            <div className="mb-3">
              {photo && (
                <div className="text-center">
                  <img src={URL.createObjectURL(photo)} alt="photo to upload" height={"200px"} className='img img-responsive'/>
                </div>
              )}
            </div>

            <div className="mb-3">
              <input type="text" value={name} placeholder='Write a name' className='form-control' onChange={(e)=> setName(e.target.value)} />
            </div>

            <div className="mb-3">
              <textarea cols="30" rows="4" value={description} placeholder='description' className='form-control' onChange={(e)=> setDescription(e.target.value)}></textarea>
            </div>

            <div className="mb-3">
              <input type="number" value={price} placeholder='price' className='form-control' onChange={(e)=> setPrice(e.target.value)} />
            </div>

            <div className="mb-3">
              <input type="number" value={quantity} placeholder='quantity' className='form-control' onChange={(e)=> setQuantity(e.target.value)} />
            </div>

            <div className="mb-3">
              <Select bordered={false}
              placeholder="Select Shipping"
              size='large'
              showSearch
              className='form-select mb-3'
              onChange={(value)=>{
                setShipping(value);
              }}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>

            <div className="mb-3">
              <button className='btn btn-primary' onClick={handleSubmit}>CREATE PRODUCT</button>
            </div>

          </div>
        </div>
    </div>
    </div>
</Layout>
  )
}

export default CreateProduct
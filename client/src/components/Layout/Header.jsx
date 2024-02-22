import React from 'react'
import {Link, NavLink} from "react-router-dom"
import { useAuth } from '../../context/auth'
import {toast} from 'react-hot-toast';

const Header = () => {
  const [auth, setAuth] = useAuth();
  const handleLogout = () =>{
    setAuth({
      ...auth,
      user:null,token: ""
    })
    localStorage.removeItem("auth");
    toast.success("Logout Successfully!!!");
  };


  return (
    <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand">🛒Shopping</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link " aria-current="page" to="/">Home</NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link " aria-current="page" to="/category">Category</NavLink>
        </li>

        {
          !auth.user ? (<>
                    <li className="nav-item">
          <NavLink className="nav-link" to="/register">Signup</NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" to="/login">Login</NavLink>
        </li>
          </>) : (<>

            {/* dropdown */}
            <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">

            {auth?.user?.name}
          </Link>

          <ul className="dropdown-menu">
            <li className='nav-item'><NavLink className="dropdown-item nav-link" to={`/dashboard/${auth?.user?.role === 1 ? "admin": "user"}`}>Dashboard</NavLink>
            </li>
            
            <li className="nav-item">
          <NavLink onClick={handleLogout} className="dropdown-item nav-link" to="/login">Logout</NavLink>
        </li>
          </ul>
        </li>

            
          </>)
        }

        <li className="nav-item">
          <NavLink className="nav-link" to="/cart">Cart (0)</NavLink>
        </li>

      </ul>
    
    </div>
  </div>
</nav>   
    </>
  )
  
}

export default Header        
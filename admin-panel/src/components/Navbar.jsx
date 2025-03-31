import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav class="navbar navbar-expand-lg bg-dark">
            <div class="container-fluid">
            <Link to='/' className='text-decoration-none'><a class="navbar-brand text-warning fs-4" href="#"><i class="bi bi-person-square"></i> Admin Panel</a></Link>
                <button class="navbar-toggler bg-warning" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto mb-2 gap-lg-5 mb-lg-0">
                        <li class="nav-item">
                        <Link to='/' className='text-decoration-none'><a class="nav-link fs-5 text-light active" aria-current="page" href="#"><i class="bi bi-pencil-square"></i> Add Product</a></Link>
                        </li>
                        <li class="nav-item">
                            <Link to='/viewproducts' className='text-decoration-none'><a class="nav-link fs-5 text-light" aria-current="page" href="#"><i class="bi bi-view-list"></i> View Products</a></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
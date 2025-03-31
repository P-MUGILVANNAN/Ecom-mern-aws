import React from 'react'

const Carousel = () => {
    return (
        <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="https://img.freepik.com/free-vector/gradient-shopping-discount-horizontal-sale-banner_23-2150322004.jpg?t=st=1743430673~exp=1743434273~hmac=26c99a9c48d4b93247166e0da10126a8f5733212e37d82f17d074bdd38f5e5ff&w=2000" height={'500px'} class="d-block w-100" alt="..." />
                </div>
                <div class="carousel-item">
                    <img src="https://img.freepik.com/free-psd/banner-template-big-sale-with-woman-shopping-bags_23-2148786756.jpg?t=st=1743430716~exp=1743434316~hmac=14d9b8f7be44555336a5cedd9619e4c914c59e63f9ebcef49551992fc135fd9b&w=2000" height={'500px'} class="d-block w-100" alt="..." />
                </div>
                <div class="carousel-item">
                    <img src="https://img.freepik.com/free-vector/horizontal-sale-banner-template_23-2148897328.jpg?t=st=1743430567~exp=1743434167~hmac=bcddd09608ab3246e3e43e20fe3c54e46ec7add326814df8b54bb82c81997b38&w=2000" height={'500px'} class="d-block w-100" alt="..." />
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    )
}

export default Carousel
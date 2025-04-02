import React from 'react';
import Carousel from '../components/Carousel';
import Trending from '../components/Trending';
import AboutUs from '../components/AboutUs';

const Home = () => {
  return (
    <div>
      <Carousel />
      <Trending />
      <AboutUs />
    </div>
  )
}

export default Home
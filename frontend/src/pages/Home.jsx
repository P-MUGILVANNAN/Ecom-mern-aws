import React from 'react';
import Carousel from '../components/Carousel';
import Trending from '../components/Trending';
import AboutUs from '../components/AboutUs';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <div>
      <Carousel />
      <Trending />
      <AboutUs />
      <Contact />
    </div>
  )
}

export default Home
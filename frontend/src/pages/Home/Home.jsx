import React from 'react'
import Hero from './sections/Hero'
import Footer from '../../layout/footer'
import Catagory from './sections/Catagory'
import TopRestaurants from './sections/Toprestaurants'
import Restaurantsnearby from './sections/Restaurantsnearby'

const Home = () => {
  return (
    <div>
      <Hero />
      <Catagory />
      <TopRestaurants />
      <Restaurantsnearby />
      <Footer />
    </div>
  )
}

export default Home

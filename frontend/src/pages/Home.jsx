import React from 'react'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import Catagory from '../components/catagory'
import TopRestaurants from '../components/cart/Toprestaurants'
import Restaurantsnearby from '../components/cart/Restaurantsnearby'

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

import React from 'react'
import Categories from '../Categories/Categories'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import MainSlider from '../MainSlider/MainSlider'


export default function Home() {
  return (
    <>
    <MainSlider></MainSlider>
    <Categories></Categories>
    <FeaturedProducts></FeaturedProducts>
    </>
  )
}

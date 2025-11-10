import React from 'react'
import Navbar from './Nav.jsx'
import Header from './Header.jsx'
import Work from './Work.jsx'
import Rating from './Rating.jsx'
import Footer from './Footer'
import ComplaintBox from './Complaint.jsx'


const Home = () => {
  return (
    <div><Navbar/>
    <Header/>
    <Work/>
    <Rating/>
    <ComplaintBox/>
    <Footer/></div>
  )
}

export default Home
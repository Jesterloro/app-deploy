import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo2} alt="" />
            <p>Our drinks are all about authenticity and quality. It has always been and it will always be. We’re passionate about sourcing the finest tea leaves, brewing them to perfection, and steeping them with great care before mixing and serving them with a smile.</p>
            <div className="footer-social-icons">
                <a href="https://www.facebook.com/AvenueTeaHousePinamalayan"><img src={assets.facebook_icon} alt="" /></a>
               <a href="https://www.instagram.com/explore/locations/102453712354584/avenue-tea-house-pinamalayan?igsh=Z2pnZmRxbmw5eWJr"><img src={assets.ig_icon} alt="" /></a>
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>0908 340 7745</li>
                <li>theavenueteahouse@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 © Avenue.com - All right Reserved. </p>
    </div>
  )
}

export default Footer

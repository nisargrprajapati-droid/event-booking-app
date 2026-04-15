import React from 'react'
import './About.css'

const About = () => {
  return (
    <div>

      {/* HERO SECTION */}
      <div className='about-hero'>
        <h2>ALL YOU NEED TO <br />KNOW</h2>
        <h1 className='about-title'>ABOUT</h1>
        <h1>HARMONI</h1>

        <a href="/home" className='about-link'>Home</a> |{" "}
        <a href="#" className='about-link'>About</a>
      </div>

      {/* CONTENT SECTION */}
      <div className='about-wrapper'>

        <div className='about-top'>
          <div className='about-left'>
            <h3>We are harmoni</h3>
            <h1>No.1 Events <br />Management</h1>
            <h4>Get Started</h4>
          </div>

          <div className='about-middle'>
            <h2>Our Mission</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>

          <div className='about-right'>
            <h2>Our Vision</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>

        {/* EVENTS GRID */}
        <div className="about-grid-wrapper">
          <div className="about-grid">

            <div className="about-card">
              <h3>Study with us</h3>
              <p>Visit our world-class facility for South African Scientist and Spectrum.</p>
            </div>

            <div className="about-card">
              <h3>Study with us</h3>
              <p>Visit our world-class facility for South African Scientist and Spectrum.</p>
            </div>

            <div className="about-card">
              <h3>Study with us</h3>
              <p>Visit our world-class facility for South African Scientist and Spectrum.</p>
            </div>

            <div className="about-card">
              <h3>Study with us</h3>
              <p>Visit our world-class facility for South African Scientist and Spectrum.</p>
            </div>

            <div className="about-card">
              <h3>Study with us</h3>
              <p>Visit our world-class facility for South African Scientist and Spectrum.</p>
            </div>

            <div className="about-card">
              <h3>Study with us</h3>
              <p>Visit our world-class facility for South African Scientist and Spectrum.</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default About

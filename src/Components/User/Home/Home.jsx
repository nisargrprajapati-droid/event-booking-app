import React from 'react'
import './Home.css'
import {  useNavigate } from 'react-router-dom'

const Home = () => {
   const navigate = useNavigate();
  return (
    <div className='home'>

      <div className='img1'>

        <div className='text'>
          <h1>One Stop Event<br /> Planet</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis,
            soluta animi quo inventore quidem delectus sapiente voluptatum velit sit!
            Temporibus fuga cupiditate quas id explicabo minima iusto saepe expedita culpa?
          </p>
          <p>Every Event shout be perfect</p>
          <input type='text' placeholder='Enter Your Email'></input>
          <button>Get Started</button>

        </div>
      </div>

      <div className="harmoni-section">
        <div className="top-row">
          <div className="left">
            <h3>What is Harmoni<br />Event</h3>
            <h2>Your Event Will be Beyond your imagination</h2>
          </div>

          <div className="right">
            <p>
              We so opinion me message as delight. Whole front do of Plate heard oh ought.
              His defective nor convinced residence own. Connection has put impossible
              own apartments boisterous. At jointure ladyship an insisted so humanity he.
              Friendly bechlour entrance to on by.
            </p>
            <a href="#" className="explore">Explore the Library</a>
          </div>
        </div>

        <div className="bottom-row">
          <div className="box">
            <h4>Chatbots</h4>
            <p>
              We so opinion friend me message as delight. Whole front do of Plate heard oh ought.
            </p>
          </div>

          <div className="box">
            <h4>Knowledgebase</h4>
            <p>
              At jointure ladyship an insisted so humanity he. Friendly bechlour entrance to on by.
              As put impossible own apartments b.
            </p>
          </div>

          <div className="box">
            <h4>Education</h4>
            <p>
              At jointure ladyship an insisted so humanity he. Friendly bechlour entrance to on by.
              As put impossible own apartments b.
            </p>
          </div>
        </div>
      </div>

      <div className='harmoni-section2'>
        <div className='f-row'>
          <p>Harmoni Event Management firm & wadding planer is a groups of creative minds who would like to make wedding
            ,birthday & any kind of events courteous & a better place for our clients to celibrate important moments of thier lives.......
          </p>

          <a href='#' className='request'>Request Early Access to get Started</a>
        </div>
        <div className='s-row'>
          <div className='box-s'>
            <h2>Photography</h2>
          </div>
          <div className='box-s'>
            <h2>Cinematography or videography service</h2>
          </div>
          <div className='box-s'>
            <h2>Full venue decoration Service</h2>
          </div>
          <div className='box-s'>
            <h2>Home Decoration</h2>
          </div>

        </div>
        <div className='t-row'>
          <div className='box-t'>
            <h3>A team of 3 talanted Photographers are redy to snap the best moments of your ceremony  </h3>
          </div>
          <div className='box-t'>
            <h3>Creative full HD 1080p Video, a difrent space  of your ceremony  </h3>
          </div>
          <div className='box-t'>
            <h3>A Blend of out-of-box ideas your precious<br /> date  </h3>
          </div>
          <div className='box-t'>
            <h3>just call us and total event solution under one roof  </h3>
          </div>
        </div>
      </div>

      <div className='g-start'>
        <div className='t'>
          <h4>Request Early Access to get started</h4>
          <h2>Registered Today & Start exploring the endless <br />posibilites</h2>
        </div>
        <div className='btn'>
          <button>GET STARTED</button>
        </div>
      </div>


    </div>
  )
}

export default Home ;

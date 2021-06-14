import React, { Component } from 'react'
import './HomePage.css';
import mainimage from "../../Assets/img/mainimage.png";
import {Link} from 'react-router-dom';

export default class HomePage extends Component {
    render() {
        return (
            <>
  {/* Hero Start */}
  <div className="hero">
    <div className="container-fluid">
      <div className="row align-items-center">
        <div className="col-sm-12 col-md-6">
          <div className="hero-text">
            <h1>Exercise is Good for Health</h1>
            <p>
              To get special training from our expert trainer
            </p>
            <div className="hero-btn">
              <Link to='/login'><a className="btn" href>Log In</a></Link> or &nbsp;
              <Link to='/signup'><a className="btn" href>Sign Up</a></Link>
            </div>
          </div>
        </div>
    
        <div className="col-sm-12 col-md-6 d-none d-md-block">
          <div className="hero-image">
            <img src={mainimage} alt="Hero Image" />
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Hero End */}
  
  {/* Service Start */}
  <div className="service">
    <div className="container">
      <div className="section-header text-center wow zoomIn" data-wow-delay="0.1s">
        <p>What we do</p>
        <h2>Workout For Health</h2>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.0s">
          <div className="service-item">
            <div className="service-icon">
              <i className="flaticon-workout" />
            </div>
            <h3>Heal emotions</h3>
            <p>
              Lorem ipsum dolor sit amet elit. Phasellus nec pretium mi. Curabitur facilisis ornare velit non
            </p>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.2s">
          <div className="service-item active">
            <div className="service-icon">
              <i className="flaticon-workout-1" />
            </div>
            <h3>Body Refreshes</h3>
            <p>
              Lorem ipsum dolor sit amet elit. Phasellus nec pretium mi. Curabitur facilisis ornare velit non
            </p>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.4s">
          <div className="service-item">
            <div className="service-icon">
              <i className="flaticon-workout-2" />
            </div>
            <h3>Mind &amp; Serenity</h3>
            <p>
              Lorem ipsum dolor sit amet elit. Phasellus nec pretium mi. Curabitur facilisis ornare velit non
            </p>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.6s">
          <div className="service-item">
            <div className="service-icon">
              <i className="flaticon-workout-3" />
            </div>
            <h3>Enjoy Your life</h3>
            <p>
              Lorem ipsum dolor sit amet elit. Phasellus nec pretium mi. Curabitur facilisis ornare velit non
            </p>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.8s">
          <div className="service-item">
            <div className="service-icon">
              <i className="flaticon-workout-4" />
            </div>
            <h3>Body &amp; Spirituality</h3>
            <p>
              Lorem ipsum dolor sit amet elit. Phasellus nec pretium mi. Curabitur facilisis ornare velit non
            </p>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="1s">
          <div className="service-item">
            <div className="service-icon">
              <i className="flaticon-yoga-pose" />
            </div>
            <h3>Body &amp; Mind</h3>
            <p>
              Lorem ipsum dolor sit amet elit. Phasellus nec pretium mi. Curabitur facilisis ornare velit non
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Service End */}
            </>
        )
    }
}

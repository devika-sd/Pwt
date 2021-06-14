import React, { Component } from 'react';
import './Footer.css';

export default class Footer extends Component {
    render() {
        return (
            <>


                {/* Footer Start */}
                <div className="footer wow fadeIn" data-wow-delay="0.3s">
                    <div className="container-fluid">
                        <div className="container">
                            <div className="footer-info">
                                <a href="index.html" className="footer-logo">E<span>ffor</span>t</a>
                                <h3>123 Street, New York, USA</h3>
                                <div className="footer-menu">
                                    <p>+012 345 67890</p>
                                    <p>info@example.com</p>
                                </div>
                                
                            </div>
                        </div>
                        <div className="container copyright">
                            <div className="row">
                                
                                <div className="footer-social col-md-6">
                                    <a href><i className="fab fa-twitter" /></a>
                                    <a href><i className="fab fa-facebook-f" /></a>
                                    <a href><i className="fab fa-youtube" /></a>
                                    <a href><i className="fab fa-instagram" /></a>
                                    <a href><i className="fab fa-linkedin-in" /></a>
                                </div>
                                
                                <div className="col-md-6">
                                    <p>© <a href="#">EfforT</a>, All Right Reserved.</p>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
                {/* Footer End */}

            </>
        )
    }
}

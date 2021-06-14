import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Trainer.css';
import trainer from "../../Assets/img/team-2.jpg";
import { authHeader } from '../Service/Auth-header';


export default class Trainer extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = { trainer: [] };
    }
    componentDidMount() {
        fetch('http://localhost:3004/api/v1/users?typeUser=trainer', {
            headers: authHeader()
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ trainer: data });
                console.log(data);
            });
    }
    render() {
        var list = this.state.trainer.map((value, i) => {
            return (<div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="1.4s">
                <div className="team-item">
                    <div className="team-img">
                        <img src={trainer} alt="Image" />
                    </div>
                    <div className="team-text">
                        <h2>{value.userName}</h2>
                        <p>{value.email}</p>
                    </div>
                </div>
            </div>)
        })
        return (
            <>

                {/* Team Start */}
                <div className="team">
                    <div className="container">
                        <div className="section-header text-center wow zoomIn" data-wow-delay="0.1s">
                            <p>Trainer</p>
                            <h2>Expert Workout Trainer</h2>
                        </div>
                        <div className="row">
                            {list}
                        </div>
                    </div>
                </div>
                {/* Team End */}

            </>
        )
    }
}

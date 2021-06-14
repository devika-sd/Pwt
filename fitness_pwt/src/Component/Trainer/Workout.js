import React, { Component } from 'react';
import mainimage from "../../Assets/img/blog-6.jpg";
import oops from "../../Assets/img/class-5.jpg";
import { authHeader } from '../Service/Auth-header';

export default class Workout extends Component {
    constructor() {
        super();
        this.state = { Workouts: [] };
    }
    componentDidMount() {
        fetch('http://localhost:3004/api/v1/workouts', {
            headers: authHeader()
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ Workouts: data });
                console.log(this.state.Workouts);
            });
    }
    render() {
        var list = this.state.Workouts.map((value, i) => {
            return (
                <div className="col-lg-4 col-md-6 col-sm-12 class-item filter-2 wow fadeInUp" data-wow-delay="1s">
                    <div className="class-wrap">
                        <div className="class-img">
                            <img src={mainimage} alt="Image" />
                        </div>
                        <div className="class-text">
                            <div>
                                <h2>{value.title}</h2>
                                <p>Calories burn per minute: {value.cbpm}</p>
                                <p>{value.desc}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
        return (
            <>
                {/* Class Start */}
                <div className="class">
                    <div className="container">
                        <div className="row class-container">
                            {list}
                        </div>
                    </div>
                </div>
                {/* Class End */}

            </>
        )
    }
}

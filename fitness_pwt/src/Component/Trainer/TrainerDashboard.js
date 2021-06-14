import React, { Component } from 'react';
import trainer from "../../Assets/img/team1.jpg";
import { authHeader } from '../Service/Auth-header';
import { Link } from 'react-router-dom';


export default class ListUser extends Component {
    constructor() {
        super();
        this.state = { users: [] };
    }
    componentDidMount() {
        fetch('http://localhost:3004/api/v1/trainer/users', {
            headers: authHeader()
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ users: data });
                console.log(this.state.users);
            });
    }
    render() {
        var list = this.state.users.map((value, i) => {
            return (
                <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.0s">
                    <div className="team-item">
                        <div className="team-img">
                            <img src={trainer} alt="Image" />
                            {localStorage.getItem('role')==='trainer'?<div className="trainer-social">
                                <Link to={"/addWorkout/" + value._id}><a href><i className="fas fa-plus"></i>&nbsp; workout</a></Link>
                                <Link to={{
                                    pathname: `/viewworkoutbyuser`,
                                    query: { userName: value.userName },
                                }}>
                                    <a href><i className="fas fa-eye"></i>&nbsp; workout</a>
                                </Link>
                            </div>:null}
                            
                        </div>
                        <div className="team-text" style={{ width: '100%' }}>
                            <h2>{value.userName}</h2>
                            <p style={{ width: '100%' }}>{value.email}</p>
                        </div>
                    </div>
                </div>
            )
        });
        return (
            <>
                {/* Team Start */}
                <div className="team">
                    <div className="container">
                        <div className="section-header text-center wow zoomIn" data-wow-delay="0.1s">
                            <p>Users</p>
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

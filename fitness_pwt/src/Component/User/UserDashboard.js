import React, { Component } from 'react';
import './userdashboard.css';
import mainimage from "../../Assets/img/blog-6.jpg";
import oops from "../../Assets/img/class-5.jpg";
import currentUser from "../Service/tokendecoder";
import { authHeader } from '../Service/Auth-header';
import WorkoutMVC from './workoutMVC';

export default class UserDashboard extends Component {
    constructor()
    {
        super();
        this.state={users:[],workout:[],opening:false};
    }
    componentDidMount()
    {
        console.log(currentUser.currentUser());
        fetch('http://localhost:3004/api/v1/trainer/' +currentUser.currentUser(), {
            headers: authHeader()
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ users: data,workout:data.workouts });
                console.log(this.state.workout);
            });
    }
    noSchedule()
    {
        return (
            <div className="col-lg-4 col-md-6 col-sm-12 class-item filter-2 wow fadeInUp" data-wow-delay="0.2s">
                                <div className="class-wrap">
                                    <div className="class-img">
                                        <img src={oops} alt="Image" />
                                    </div>
                                    <div className="class-text">
                                            <h2>Not scheduled</h2>
                                    </div>
                                </div>
                            </div>
        )
    }
    viewWorkouts()
    {
        var list=this.state.workout.map((value,i)=>{
            return (
                
                <div className="col-lg-4 col-md-6 col-sm-12 class-item filter-2 wow fadeInUp" data-wow-delay="1s">
                                <div className="class-wrap">
                                    <div className="class-img">
                                        <img src={mainimage} alt="Image" />
                                    </div>              
                                    <div className="class-text">
                                        <div>
                                            <h2>{value.title}</h2>
                                            <WorkoutMVC cbpm={value.cbpm} workoutId={value._id}></WorkoutMVC>
                                            <p>{value.summary}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
            )
        })
        return list;
    }
  
    render() {
        var work=null;
        if(this.state.workout.length === 0)
        {
            work = this.noSchedule();
        }
        else
        {
            work=this.viewWorkouts();
        }
        return (
            <>
                {/* Page Header End */}

                {/* Class Start */}
                <div className="class">
                    <div className="container">
                        
                        <div className="row class-container">
                             {work}
                        </div>
                    </div>
                </div>
                {/* Class End */}

            </>
        )
    }
}

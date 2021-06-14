import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { authHeader } from '../Service/Auth-header';


export default class Addworkout extends Component {
    constructor() {
        super();
        this.workouts = React.createRef();
        this.state = { userid: "", user: [], userName: '', workouts: [],setalert:''}
    }
    componentDidMount() {
        this.setState({ userid: this.props.match.params._id });
        var _id = this.props.match.params._id;
        fetch('http://localhost:3004/api/v1/workouts', {
            headers: authHeader()
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ workouts: data });
                console.log(this.state.workouts);
            });
        fetch('http://localhost:3004/api/v1/trainer/' + _id, {
            headers: authHeader()
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ user: data });
                console.log(this.state.user);
            });
    }
    addworkout() {
        console.log(this.workouts.current.value);
        var worklist=this.state.workouts.find((value)=>{
            if(value._id === this.workouts.current.value) 
                return value;
        })
        console.log(worklist)
        if (this.workouts.current.value === "") {
            this.setState({setalert:"please select workout"})  
        }
        else
        {
            this.setState({setalert:""})
            console.log(this.state.userid);
            fetch('http://localhost:3004/api/v1/trainer/users', {
                method: 'PUT',
                headers: authHeader(),
                body: JSON.stringify({
                    "_id":this.state.userid,
                    "workouts":worklist._id,
                    "title":worklist.title,
                    "cbpm":worklist.cbpm,
                    "summary":worklist.desc
                })
                })
                .then(response => response.json())
                .then(data => {
                    if(data.success){
                        alert("workout added successfully")
                    }
                });  
        }
    }
    render() {
        var option = this.state.workouts.map((value, i) => {
            return (
                <option value={value._id}>{value.title}</option>
            )
        });

        return (
            <>
                {/* userform Start */}
                <div className="userform">
                    <div className="container">
                        <div className="section-header text-center wow zoomIn" data-wow-delay="0.1s">
                            <h2>Assign Workout</h2>
                        </div>
                        <div className="row">
                            <div className="col-12 wow fadeInUp" data-wow-delay="0.1s">
                                <div className="userform-form">
                                    <form>
                                        <div className="control-group">
                                            <input disabled type="text" className="form-control" value={this.state.user.userName} placeholder="User Name" required="required" data-validation-required-message="Please enter your name" />
                                            <p className="help-block text-danger"></p>
                                        </div>
                                        <div className="control-group">
                                            <select ref={this.workouts} className="form-control" id="workouts" name="cars">
                                                <option value="">select workout</option>
                                                {option}
                                            </select>
                                            <p className="help-block text-danger">{this.state.setalert}</p>
                                        </div>

                                        <div>
                                            <button className="btn" type="button" onClick={this.addworkout.bind(this)}>Assign</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* userform End */}
            </>
        )
    }

}

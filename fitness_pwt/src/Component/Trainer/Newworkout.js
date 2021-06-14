import React, { Component } from 'react';
import { authHeader } from '../Service/Auth-header';

export default class Newworkout extends Component {
    constructor() {
        super();
        this.title="";
        this.cbpm=0;
        this.desc="";
        this.state = {title_error:"",cbpm_error:"",desc_error:""}
    }
    titlevalidation(event)
    {
        if((event.target.value.length > 5)&&(event.target.value.length < 25)){
            this.title = event.target.value;
            this.setState({title_error:""})
        }
        else
        {
            this.setState({title_error:"minimum length is 5 and maximum length is 25"})
        }
    }
    cbpmvalidation(event)
    {
        if((event.target.value > 10)&&(event.target.value < 10000))
        {
            this.cbpm = event.target.value;
            this.setState({cbpm_error:""});
        }    
        else
        {
            this.setState({cbpm_error:"minimum value is 10 and maximum value is 10000"})
        }    
    }
    descvalidation(event)
    {
        if(event.target.value.length > 5)
        {
            this.desc = event.target.value;
            this.setState({desc_error:""})
        }    
        else
        {
            this.setState({desc_error:"minimum length is 5"})
        }
    }
    addworkout() {
        fetch('http://localhost:3004/api/v1/workouts/', {
                method: 'POST',
                headers: authHeader(),
                body: JSON.stringify({
                    "title":this.title,
                    "desc":this.desc,
                    "cbpm":this.cbpm
                })
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if(data){
                        alert(data.message)
                    }
                });
    }
    render() {
        return (
            <>
                {/* userform Start */}
                <div className="userform">
                    <div className="container">
                        <div className="section-header text-center wow zoomIn" data-wow-delay="0.1s">
                            <h2>Add Workout</h2>
                        </div>
                        <div className="row">
                            <div className="col-12 wow fadeInUp" data-wow-delay="0.1s">
                                <div className="userform-form">
                                    <form>
                                        <div className="control-group">
                                            <input type="text" onChange={this.titlevalidation.bind(this)} className="form-control" placeholder="title" required="required" data-validation-required-message="Please enter your name" />
                                            <p className="help-block text-danger">{this.state.title_error}</p>
                                        </div>
                                        <div className="control-group">
                                            <input type="text" onChange={this.cbpmvalidation.bind(this)} className="form-control" placeholder="Calories burn per minute" required="required" data-validation-required-message="Please enter your name" />
                                            <p className="help-block text-danger">{this.state.cbpm_error}</p>
                                        </div>
                                        <div className="control-group">
                                            <input type="text" onChange={this.descvalidation.bind(this)} className="form-control" placeholder="Description" required="required" data-validation-required-message="Please enter your name" />
                                            <p className="help-block text-danger">{this.state.desc_error}</p>
                                        </div>
                                        <div>
                                            <button className="btn" type="button" onClick={this.addworkout.bind(this)}>Submit</button>
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

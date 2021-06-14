import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Login.css';

export default class Signup extends Component {
    constructor()
    {
        super();
        this.state={email:'',password:'',username:'',emailError:'',passwordError:'',nameError:'',emailvalid:0,passwordvalid:0,namevalid:''};
    }
    emailCheck(event)
    {
        let value=event.target.value;
        var mail=new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");
        if(!mail.test(value)){
            this.setState({emailError:"please enter valid mail",emailvalid:0})
        }
        else
        {
            this.setState({emailError:'',emailvalid:1}) 
        }
        this.setState({email:value})
    }
    userNameCheck(event)
    {
        let value=event.target.value;
        if(value.length<6){
            this.setState({nameError:"password must be greater than 6 characters",namevalid:0})
        }
        else
        {
            this.setState({nameError:'',namevalid:1}) 
        }
        this.setState({username:value})
    }
    passwordCheck(event)
    {
        let value=event.target.value;
        if(value.length<6){
            this.setState({passwordError:"password must be greater than 6 characters",passwordvalid:0})
        }
        else
        {
            this.setState({passwordError:'',passwordvalid:1}) 
        }
        this.setState({password:value})
    }
    validateUser()
    {
        fetch('http://localhost:3004/api/v1/users/signup', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userName:this.state.username,email:this.state.email,password:this.state.password}),
            })
            .then(response => response.json())
            .then(data=>{
                console.log(data);
                if (data.status === true)
                {
                    alert(data.message);
                    this.props.history.push('/login');
                }
            })
    }
    render() {
        var check=true;
        if((this.state.emailvalid === 1) && (this.state.passwordvalid === 1) && (this.state.namevalid === 1))
        {
            check=false;
        }
        console.log(this.validatecount);
        return (
            <>
                {/* login Header Start */}
                <div className="login-header">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h2>Sign Up</h2>
                            </div>
                            <div className="col-12">
                                <Link to='/login'>Log In</Link>
                                <Link to="/signup"><span style={{color:'gray'}}>Sign Up</span></Link>
                            </div>
                        </div>
                    </div>
                </div>
                {/* login Header End */}

                {/* userform Start */}
                <div className="userform">
                    <div className="container">
                        <div className="section-header text-center wow zoomIn" data-wow-delay="0.1s">
                            <p>New User Form</p>
                            <h2>User Details</h2>
                        </div>
                        <div className="row">
                            <div className="col-12 wow fadeInUp" data-wow-delay="0.1s">
                                <div className="userform-form">
                                    <div id="success" />
                                    <form>
                                        <div className="control-group">
                                            <input type="text" className="form-control" onChange={this.userNameCheck.bind(this)} id="user name" placeholder="User Name" required="required" data-validation-required-message="Please enter your name" />
                                            <p className="help-block text-danger">{this.state.nameError}</p>
                                        </div>
                                        <div className="control-group">
                                            <input type="email" className="form-control" onChange={this.emailCheck.bind(this)} id="name" placeholder="Email" required="required" data-validation-required-message="Please enter your name" />
                                            <p className="help-block text-danger">{this.state.emailError}</p>
                                        </div>
                                        <div className="control-group">
                                            <input type="password" className="form-control" onChange={this.passwordCheck.bind(this)} id="email" placeholder="Password" required="required" data-validation-required-message="Please enter your email" />
                                            <p className="help-block text-danger" >{this.state.passwordError}</p>
                                        </div>
                                        
                                        <div>
                                            <button className="btn" type="button" onClick={this.validateUser.bind(this)} disabled={check}>Signup</button>
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

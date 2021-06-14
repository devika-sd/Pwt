import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import { authHeader } from '../Service/Auth-header';
import {connect} from 'react-redux';
import * as actions from '../../actions/action';


class Login extends Component {
    constructor() {
        super();
        this.state = { email: '', password: '', emailError: '', passwordError: '', emailvalid: 0, passwordvalid: 0 };
    }
 
    emailCheck(event) {
        let value = event.target.value;
        var mail = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$",);
        if (!mail.test(value)) {
            this.setState({ emailError: "please enter valid mail", emailvalid: 0 })
        }
        else {
            this.setState({ emailError: '', emailvalid: 1 })
        }
        this.setState({ email: value })
    }
    passwordCheck(event) {
        let value = event.target.value;
        if (value.length < 6) {
            this.setState({ passwordError: "password must be greater than 6 characters", passwordvalid: 0 })
        }
        else {
            this.setState({ passwordError: '', passwordvalid: 1 })
        }
        this.setState({ password: value })
    }
    redirectFromHome(data)
    {
        alert(data.message);
        localStorage.setItem('token',data.token);
        this.props.updateuser(data.role);
        fetch('http://localhost:3004/api/v1/attendance', {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify({user:"60b0789d5ff53c2830870faa"}),
            })
            .then(response => response.json())
            .then(data=>{
                console.log(data);
                localStorage.setItem('log',data.data._id);
            })
        if(data.role === 'user')
        {
            this.props.history.push('/userdashboard');
        }
        else if(data.role === 'trainer')
        {
            this.props.history.push('/listUser');
        }
        else if(data.role === 'admin')
        {
            this.props.history.push('/listUser');
        }
    }
    validateUser() {
        fetch('http://localhost:3004/api/v1/users/login', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email:this.state.email,password:this.state.password}),
            })
            .then(response => response.json())
            .then(data=>{
                console.log(data);
               
            if (data.status === true)
                {
                    this.redirectFromHome(data);
                }
                else
                {
                    alert(data.message);
                }
            })
    }
    
    render() {
        console.log(this.props);
        var check = true;
        if ((this.state.emailvalid === 1) && (this.state.passwordvalid === 1)) {
            check = false;
        }
        return (
            <>
                {/* login Header Start */}
                <div className="login-header">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h2>Log In</h2>
                            </div>
                            <div className="col-12">
                                <Link to='/login'><span style={{ color: 'gray' }}>Log In</span></Link>
                                <Link to="/signup">Sign Up</Link>
                            </div>
                        </div>
                    </div>
                </div>
                {/* login Header End */}

                {/* userform Start */}
                <div className="userform">
                    <div className="container">
                        <div className="section-header text-center wow zoomIn" data-wow-delay="0.1s">
                            <p>Login Form</p>
                            <h2>User Details</h2>
                        </div>
                        <div className="row">
                            <div className="col-12 wow fadeInUp" data-wow-delay="0.1s">
                                <div className="userform-form">
                                    <form>
                                        <div className="control-group">
                                            <input type="email" className="form-control" onChange={this.emailCheck.bind(this)} id="email" placeholder="Email" required="required" data-validation-required-message="Please enter your name" />
                                            <p className="help-block text-danger">{this.state.emailError}</p>
                                        </div>
                                        <div className="control-group">
                                            <input type="password" className="form-control" onChange={this.passwordCheck.bind(this)} id="password" placeholder="Password" required="required" data-validation-required-message="Please enter your email" />
                                            <p className="help-block text-danger" >{this.state.passwordError}</p>
                                        </div>

                                        <div>
                                            <button className="btn" type="button" onClick={this.validateUser.bind(this)} disabled={check}>Login</button>
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

const mapStateToProps  =(state)=>{
    return { currentuser:state.currentuser}
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateuser:(user)=>dispatch(actions.userLogin(user))
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(Login)
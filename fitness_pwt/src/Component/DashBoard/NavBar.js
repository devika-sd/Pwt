import React, { Component } from 'react'
import './NavBar.css';
import {Link} from 'react-router-dom';
import { authHeader } from '../Service/Auth-header';
import {connect} from 'react-redux';
import * as actions from '../../actions/action';

class NavBar extends Component {
    constructor()
    {
        super();
        this.collapse="collapse navbar-collapse justify-content-between";
        this.state={scollfix:"navbar navbar-expand-lg bg-dark navbar-dark",currentrole:'',header:'Home',navbar:this.collapse,show:true};
    }
    componentDidMount()
    {
        this.setState({currentrole:localStorage.getItem('role')});
        console.log(this.state.currentrole);
    }
    logout()
    {
        fetch('http://localhost:3004/api/v1/attendance/'+localStorage.getItem('log'), {
            method: 'PATCH',
            headers: authHeader()
            })
            .then(response => response.json())
            .then(data=>{
                console.log(data);
                localStorage.clear();
                this.setState({currentrole:''});
                this.props.updateuser("");
                this.props.history.push('/');
            })
    }
    dashboard()
    {
        return (
            <div className="navbar-nav ml-auto">
                <Link to='/'><a className="nav-item nav-link">Home</a></Link>
            </div>
    )
    }
    userDashboard()
    {
        return (
                    <div className="navbar-nav ml-auto">
                        <Link to='/userdashboard'><a className="nav-item nav-link" onClick={()=> this.setState({header:'scheduled workouts'})}>Home</a></Link>
                        <a className="nav-item nav-link" onClick={this.logout.bind(this)}>Logout</a> 
                    </div>
        )
    }
    trainerDashboard()
    {
        return (
            
                    <div className="navbar-nav ml-auto">
                        <Link to="/listUser"><a className="nav-item nav-link" onClick={()=> this.setState({header:'Users'})}>Users</a></Link>
                        <Link to="/newWorkout"><a className="nav-item nav-link" onClick={()=> this.setState({header:'workouts'})}><i className="fas fa-plus"></i>&nbsp;Workouts</a></Link>
                        <Link to="/ViewWorkout"><a className="nav-item nav-link" onClick={()=> this.setState({header:'workouts'})}><i className="fas fa-eye"></i>&nbsp;Workouts</a></Link>
                        <a className="nav-item nav-link" onClick={this.logout.bind(this)}>Logout</a> 
                    </div>
        )
    }
    adminDashboard()
    {
        return (
                    <div className="navbar-nav ml-auto">
                        <Link to='/listUser'><a className="nav-item nav-link" onClick={()=> this.setState({header:'Users'})}>Users</a></Link>
                        <Link to="/addtrainer"><a className="nav-item nav-link" onClick={()=> this.setState({header:'Trainers'})}><i className="fas fa-plus"></i>&nbsp;Trainers</a></Link>
                        <Link to="/trainers"><a className="nav-item nav-link" onClick={()=> this.setState({header:'Trainers'})}><i className="fas fa-eye"></i>&nbsp;Trainers</a></Link>
                        <a className="nav-item nav-link" onClick={this.logout.bind(this)}>Logout</a> 
                    </div>
        )
    }
    
    togglenavbar()
    {
        console.log(this.state.show)
        if(this.state.show === true)
        {
            this.setState({navbar:"collapse navbar-collapse justify-content-between show",show:false});
        }
        else
        {
            this.setState({navbar:"collapse navbar-collapse justify-content-between",show:true});
        }
    }

    render() {
        var navMenu=null;
        if(this.props.currentuser === 'user')
        {
            navMenu=this.userDashboard();
        }
        else if(this.props.currentuser === 'admin')
        {
            navMenu=this.adminDashboard();
        }
        else if(this.props.currentuser === 'trainer')
        {
            navMenu=this.trainerDashboard();
        }
        else
        {
            navMenu=this.dashboard();
        }
        return (
            <>
                    {/* Top Bar Start */}
                    <div className="top-bar d-none d-md-block">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="top-bar-left">
                                        <div className="text">
                                            <i className="far fa-clock" />
                                            <h2>8:00 - 9:00</h2>
                                            <p>Mon - Fri</p>
                                        </div>
                                        <div className="text">
                                            <i className="fa fa-phone-alt" />
                                            {this.state.currentrole ? 
                                            <>
                                                <h2>{this.state.currentrole} :</h2>
                                                <p>For Appointment</p>
                                            </> :
                                            <>
                                                <h2>+123 456 7890</h2>
                                                <p>For Appointment</p>
                                            </>}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="top-bar-right">
                                        <div className="social">
                                            <a href><i className="fab fa-twitter" /></a>
                                            <a href><i className="fab fa-facebook-f" /></a>
                                            <a href><i className="fab fa-linkedin-in" /></a>
                                            <a href><i className="fab fa-instagram" /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Top Bar End */}
                    {/* Nav Bar Start */}
                    <div className={this.state.scollfix}>
                        <div className="container-fluid">
                            <span className="navbar-brand">E<span>ffor</span>t</span>
                            <button type="button" className="navbar-toggler" onClick={this.togglenavbar.bind(this)} data-toggle="collapse" data-target="#navbarCollapse">
                                <span className="navbar-toggler-icon" />
                            </button>
                            <div className={this.state.navbar} id="navbarCollapse">
                                {navMenu}
                            </div>
                        </div>
                    </div>
                    {/* Nav Bar End */}
                    {this.props.currentuser ?
                    < div className="body-header" >
                        <div className="container">
                            <div className="row">
                                <div className="col-12 text-center wow zoomIn section-header">
                                    <h2>{this.state.header}</h2>
                                </div>
                            </div>
                        </div>
                    </div >:<></>}
            </>
        )
    }
}
const mapStateToProps  =(state)=>{
    console.log(state)
    return { currentuser:state.currentuser}
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateuser:(user)=>dispatch(actions.userLogin(user))
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(NavBar)
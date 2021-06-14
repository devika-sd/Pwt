import React, { Component } from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';

import NavBar from './Component/DashBoard/NavBar';
import HomePage from './Component/DashBoard/HomePage';
import Addtrainer from './Component/Admin/Addtrainer';
import Footer from './Component/DashBoard/Footer';
import Login from './Component/Login/Login';
import Signup from './Component/Login/Signup';
import Trainer from './Component/DashBoard/Trainer';
import UserDashboard from './Component/User/UserDashboard';
import ListUser from './Component/Trainer/TrainerDashboard';
import Workout from './Component/Trainer/Workout';
import Addworkout from './Component/Trainer/Addworkout';
import Newworkout from './Component/Trainer/Newworkout';
import viewWorkout from './Component/Trainer/viewWorkout';

export default class Router extends Component {
    render() {
        return (
            <>
                 <BrowserRouter>
                    <Route path="/" component={NavBar}></Route>
                    <Switch>
                        <Route exact path="/" component={HomePage}></Route>
                        <Route path="/login" component={Login}></Route>
                        <Route path="/signup" component={Signup}></Route>
                        <Route path='/trainers' component={Trainer}></Route>
                        <Route path='/userdashboard' component={UserDashboard}></Route>
                        <Route path='/listUser' component={ListUser}></Route>
                        <Route path='/viewWorkout' component={Workout}></Route>
                        <Route path='/addWorkout/:_id' component={Addworkout}></Route>
                        <Route path="/newWorkout" component={Newworkout}></Route>
                        <Route path="/addtrainer" component={Addtrainer}></Route>
                        <Route path="/viewworkoutbyuser" component={viewWorkout}></Route>
                    </Switch>
                    <Route path='/' component={Footer}></Route>
                    
                 </BrowserRouter>
            </>
        )
    }
}

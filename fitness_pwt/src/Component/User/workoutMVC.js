import { React, useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import mainimage from "../../Assets/img/blog-6.jpg";
import './userdashboard.css';
import currentUser from '../Service/tokendecoder';
import { authHeader } from '../Service/Auth-header';


function getModalStyle() {
    return {
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
    };
}
const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: '500px',
        height: '500px',
        backgroundColor: '#F7CAC9',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function WorkoutMVC(props) {
    const classes = useStyles();
    var [modalStyle] = useState(getModalStyle);
    var [open, setOpen] = useState(false);
    const [cbpm, setCbpm] = useState(props.cbpm);
    const [workoutId] = useState(props.workoutId);
    const [second, setSecond] = useState('00');
    const [minute, setMinute] = useState('00');
    const [isActive, setIsActive] = useState(false);
    const [counter, setCounter] = useState(0);
    const [result,setResult]=useState();
    const [recordId,setRecord]=useState();

    useEffect(() => {
        let intervalId;

        if (isActive) {
            intervalId = setInterval(() => {
                const secondCounter = counter % 60;
                const minuteCounter = Math.floor(counter / 60);

                const computedSecond = String(secondCounter).length === 1 ? `0${secondCounter}` : secondCounter;
                const computedMinute = String(minuteCounter).length === 1 ? `0${minuteCounter}` : minuteCounter;

                setSecond(computedSecond);
                setMinute(computedMinute);

                setCounter(counter => counter + 1);
            }, 1000)
        }

        return () => clearInterval(intervalId);
    }, [isActive, counter]);

    function stopTimer() {
        var calories = (counter*cbpm)/60;
        setResult(`Calories burnt : ${calories}`);
        endworkout(calories);
        setIsActive(false);
        setCounter(0);
        setSecond('00');
        setMinute('00')
    }

    const handleopen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setResult("");
    }
    const startworkout =() =>{
        var userid = currentUser.currentUser();
        console.log("user Id ",userid);
        console.log("workout Id ",workoutId);
        fetch('http://localhost:3004/api/v1/workoutlog', {
                method: 'POST',
                headers: authHeader(),
                body: JSON.stringify({
                        user:userid,
                        workout:workoutId,
                })
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setRecord(data.data._id);
                    if(data.success){
                        alert("workout added successfully")
                    }
                });  
    }
    const endworkout=(calories)=>{
        fetch(`http://localhost:3004/api/v1/workoutlog/${recordId}`, {
                method: 'PUT',
                headers: authHeader(),
                body: JSON.stringify({
                        calories:calories
                })
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if(data.success){
                        alert("workout added successfully")
                    }
                });  
    }
    const checkClose=()=>{
        if(counter === 0)
        {
            handleClose();
        }

    }

    return (
        <div>
            <button className="btn" onClick={handleopen}>Do</button>
            <Modal
                open={open}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div style={modalStyle} className={classes.paper}>
                    <h2 id="simple-modal-title"></h2>
                    <div className="card" style={{ width: '100%', height: '99%', backgroundColor: 'white' }}>
                        <div className="card-body">
                            <i className="fas fa-times" style={{ float: 'right' }} onClick={checkClose}></i>
                            <div className="time">
                                <span className="minute">{minute}</span>
                                <span>:</span>
                                <span className="second">{second}</span>
                            </div>
                            <div style={{textAlign:'center'}}>{result}</div>
                            <div className="timer-text"  style={{float:'none'}}>
                                <button disabled={isActive} onClick={() => {setIsActive(true);startworkout();}} className="btn">
                                    Start
                                </button>
                                <button onClick={stopTimer} className="btn">End</button>
                            </div>
                        </div>
                    </div>

                </div>
            </Modal>
        </div>
    )
}

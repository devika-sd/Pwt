function sessionTimeout(callback) {
    console.log("sessionTimeout functioning starts fine");
    setTimeout(()=>{
        alert("Your Session expired.... please login again");
        localStorage.clear();
        callback();
    },3000)
}

export default sessionTimeout;

// sessionTimeout(()=>{
//     this.props.history.push("/");
// });
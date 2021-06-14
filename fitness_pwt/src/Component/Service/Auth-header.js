function authHeader() {
    var token=localStorage.getItem('token');
    if(token)
    {
        return {
            'Content-Type': 'application/json',
            'Authorization' :"Bearer "+token
        }
    }
    else
    {
        return {
            'Content-Type': 'application/json',
        }
    }
}

module.exports={authHeader};
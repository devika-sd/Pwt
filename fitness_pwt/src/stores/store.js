import * as actions from '../actions/action';

const initialstate={
    currentuser:""
}

const reducer=(state=initialstate,action)=>{
    console.log('In reducer recieved: ', action)
    switch(action.type){
        case actions.USER_LOGIN:  
            return {
               currentuser:action.payload
            }
        default: return state
    }
}


export default reducer;

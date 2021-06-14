export const USER_LOGIN = 'USER_LOGIN';

export const userLogin = (user)=> {
    console.log(user);
    return {type:USER_LOGIN, payload: user}
}
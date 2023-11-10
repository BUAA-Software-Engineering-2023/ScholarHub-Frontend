export const setToken = (token) => {
    localStorage.setItem('TOKEN', token);
}
export const setLogin = (isLogin)=>{
    localStorage.setItem('LOGIN',isLogin);
}
export const getLogin = ()=>{
   return   localStorage.getItem('LOGIN');
}
export const setName =(name) => localStorage.setItem('USER_NAME',name);

export const getToken = () => localStorage.getItem('TOKEN');
export const getName = () =>localStorage.getItem('USER_NAME')
export const clearToken = () => localStorage.removeItem('TOKEN');
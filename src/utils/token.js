export const setToken = (token) => {
    localStorage.setItem('TOKEN', token);
}
export const setLogin = (isLogin)=>{
    localStorage.setItem('LOGIN',isLogin);
}
export const getLogin = ()=>{
   return   localStorage.getItem('LOGIN');
}
export const getToken = () => localStorage.getItem('TOKEN');
export const clearToken = () => localStorage.removeItem('TOKEN');
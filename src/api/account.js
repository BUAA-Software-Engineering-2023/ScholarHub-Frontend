import requests from "@/utils/request.js";
export default {
    loginWithPassword(username,password){
        return requests({
            url: '/login',
            method: 'POST',
            data:{
                username,password
            }
        })
    },
    register(username,email,code,password,confirm_password){
        return requests({
            url: '/register',
            method: 'POST',
            data:{
                username,email,code,password,confirm_password
            }
        })
    },
    send_code(email){
        return requests({
            url: '/send-code',
            method: 'POST',
            data:{
                email
            }
        })
    }
}
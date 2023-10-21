import { defineStore } from "pinia";
import accountAPI from "@/api/account";
import { getToken, setToken, clearToken } from "@/utils/token";
import {ref} from "vue";

const state = () => {
    return {
        code: '',
        token: getToken(),
        userInfo: {},
        unreadMessage: false,
    }
}

const actions = {
    async loginWithCode(phone_number, code) {
        const result = await accountAPI.loginWithCode(phone_number, code);
        if (result.response.status === 200) {
            this.token = result.data.token;
            setToken(result.data.token);
            // setUser(response.data.id);
            // setName(response.data.name);
            return "登录成功";
        }
        return Promise.reject(result.message);
    },
    async loginWithPassword(email, password) {
        const response = await accountAPI.loginWithPassword(email, password);
        console.log(response)
        if (response.data.success) {
            this.token = response.data.token;
            console.log(this.token)
            setToken(response.data.token);
            // setUser(response.data.id);
            // setName(response.data.name);
            return "登录成功";

        }else{
            return response.data.message;
        }
    },
    async register(username,email,code,password,confirm_password) {
        const response = await accountAPI.register(username,email,code,password,confirm_password);
        console.log(response)
        if (response.data.success) {
            return "注册成功";
        }else{
            return response.data.message
        }
        // return Promise.reject(result.message);
    },
    async getCode(email) {
        const result = await accountAPI.send_code(email);
        console.log(result)
        if (result.data.success) {
            return "验证码已发送";
        }else{
            return result.data.message;
        }

    },
    logout() {
        this.token = undefined;
        this.userInfo = {};
        clearToken();
    },
    // async getUserInfo() {
    //     let result = await accountAPI.requestUserInfo();
    //     if (result.result === '1') {
    //         this.userInfo = result.data;
    //     } else {
    //         return Promise.reject(result.message);
    //     }
    //     result = await accountAPI.requestUnread();
    //     if (result.result === '1') {
    //         this.unreadMessage = result.unread;
    //     } else {
    //         return Promise.reject(result.message);
    //     }
    // },
    // async updatePassword(old_password, new_password) {
    //     const result = await accountAPI.updatePassword(old_password, new_password);
    //     if (result.response.status === 200) {
    //         return '修改成功'
    //     } else {
    //         return Promise.reject(result.message);
    //     }
    // },
    // async resetPassword(phone_number, vertification_code, new_password) {
    //     const result = await accountAPI.resetPassword(phone_number, vertification_code, new_password);
    //     if (result.response.status === 200) {
    //         return '修改成功'
    //     } else {
    //         return Promise.reject(result.message);
    //     }
    // },
    // async updatePhone(new_phone_number, vertification_code) {
    //     const result = await accountAPI.updatePhone(new_phone_number, vertification_code);
    //     if (result.response.status === 200) {
    //         this.token = result.token;
    //         clearToken();
    //         setToken(result.token);
    //         return '修改成功'
    //     } else {
    //         return Promise.reject(result.message);
    //     }
    // },
}

export const useAccountStore = defineStore("account", {
    state,
    actions
})
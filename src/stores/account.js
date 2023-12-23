import { defineStore } from "pinia";
import accountAPI from "@/api/account";
import { getToken, setToken, clearToken,setName } from "@/utils/token";
import {ref} from "vue";
import {useSearchStore} from "@/stores/search.js";
import {useLocalStorage} from "@vueuse/core";
const state = () => {
    return {
        code: '',
        token: getToken(),
        userInfo: useLocalStorage("userInfo", {}, localStorage),
        favorites:useLocalStorage("favorites",[]),
        unreadMessage: false,
    }
}
const actions = {
    setFavorite(favorite){
      this.favorites = favorite;
    },
    setInfo(info){
      this.userInfo = info;
    },
    setAvatar(url){
        this.userInfo.avatar = url;
    },
    async loginWithCode(phone_number, code) {
        const result = await accountAPI.loginWithCode(phone_number, code);
        if (result.response.status === 200) {
            console.log(result.data)
            this.token = result.data.data.token;
            setToken(result.data.data.token);
            console.log(result.data.data.token)
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
            this.token = response.data.data.token;
            setToken(this.token);
            console.log(this.token);
            setName(response.data.data.username);
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
        this.token = '';
        this.userInfo = {};
        clearToken();
    },
}

export const useAccountStore = defineStore("account", {
    state,
    actions
})
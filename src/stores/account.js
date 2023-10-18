import { defineStore } from "pinia";
import accountAPI from "@/api/account";
import { getToken, setToken } from "@/utils/token";

const state = () => {
    return {
        code: '',
        token: getToken(),
        userInfo: {},
        unreadMessage: false
    }
}


export const useAccountStore = defineStore("account", {
    state,
})
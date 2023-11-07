// 二次封装axios
import axios from 'axios'
import { useAccountStore } from "@/stores/account";
import {ElLoading, ElMessage} from "element-plus";
import router from "@/router";
import '@/assets/style/css/loading.scss'
import Swal from "sweetalert2";

// 1. 创建axios实例
const requests = axios.create({
    baseURL: '/api/v1',
    timeout: 5000
});

const CancelToken = axios.CancelToken;
const source = CancelToken.source();
let loading =  null;
// 2. 请求拦截器
// 封装loading
requests.interceptors.request.use(config => {
    const accountStore = useAccountStore();
    if (accountStore.token) {
        config.headers.Authorization = accountStore.token;
    }
    if(!config.noLoading){
        loading = ElLoading.service({
            lock: true,
            spinner: 'el-icon-loading',
        })
    }

    return config;
});

// 3. 响应拦截器
requests.interceptors.response.use(response => {
    if (loading) {
        loading.close();
    }
    return response;
}, error => {
    if (loading){
        loading.close();
    }
    console.log(error)
    if (error.response && error.response.data.detail) {
        let pattern = /token/i
        if (pattern.test(error.response.data.detail)) {
            const accountStore = useAccountStore();
            router.push({
                path: '/login',
            }).then(() => { });
        }
        else {
            Swal.fire({
                icon: 'error',
                title: error.response.data.detail,
            });
        }
    }
    else if (error.response && error.response.status === 403) {
        let promise = Swal.fire({
            icon: 'error',
            title:'您没有权限进行该操作'
        })
    }
    else if (error.response && error.response.status === 404) {
        let promise = Swal.fire({
            icon: 'error',
            title:'该资源不存在'
        });
    }
    else if (error.response && error.response.status === 500) {
        let promise = Swal.fire({
            icon: 'error',
            title:'服务器内部错误'
        });
    }
    else if (!error.response?.data.result) {
        error.response = {
            data: {
                result: '0',
                message: '未知错误，请稍后重试'
            }
        }
    }
    return error.response.data;
});

export default requests;

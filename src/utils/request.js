// 二次封装axios
import axios from 'axios'
import { useAccountStore } from "@/stores/account";
import { ElMessage } from "element-plus";
import router from "@/router";

// 1. 创建axios实例
const requests = axios.create({
    baseURL: '/api/v1',
    timeout: 5000
});

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

// 2. 请求拦截器
requests.interceptors.request.use(config => {
    const accountStore = useAccountStore();
    console.log(config)
    console.log(config.url === '/messages')
    if (accountStore.token) {
        config.headers.Authorization = accountStore.token;
    }
    return config;
});

// 3. 响应拦截器
requests.interceptors.response.use(response => {
    return response
}, error => {
    console.log(error)
    if (error.response && error.response.data.detail) {
        let pattern = /token/i
        if (pattern.test(error.response.data.detail)) {
            const accountStore = useAccountStore();
            accountStore.logout();
            router.push({
                path: '/login',
            }).then(() => { });
        }
        else {
            ElMessage({
                message: error.response.data.detail,
                type: 'error'
            });
        }
    }
    else if (error.response && error.response.status === 403) {
        ElMessage({
            message: '您没有权限进行该操作',
            type: 'error'
        });
    }
    else if (error.response && error.response.status === 404) {
        ElMessage({
            message: '该资源不存在',
            type: 'error'
        });
    }
    else if (error.response && error.response.status === 500) {
        ElMessage({
            message: '服务器内部错误',
            type: 'error'
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

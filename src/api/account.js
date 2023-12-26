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
    },
    upload_avatar(file) {
        const formData = new FormData();
        formData.append('file', file); // 'file' 是后端接收文件的字段名
        return requests({
            url: '/user/upload',
            method: 'POST',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                // 如果有需要，可以在这里添加其他请求头
            },
        });
    },
    upload_author_avatar(file) {
        const formData = new FormData();
        formData.append('file', file); // 'file' 是后端接收文件的字段名
        return requests({
            url: '/author/avatar',
            method: 'POST',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                // 如果有需要，可以在这里添加其他请求头
            },
        });
    },
    update_author_avatar(author_id,avatar){
        return requests({
            url: '/author/edit',
            method: 'PUT',
            data:{
                author_id: author_id,
                avatar:avatar
            }
        })
    },
    update_author_info(author_id,name,profile,avatar){
        return requests({
            url: '/author/edit',
            method: 'PUT',
            data:{
                author_id,
                name,
                profile,
                avatar
            }
        })
    }
}
import requests from "@/utils/request.js";
export default {
    get_favorite(){
        return requests({
            url: '/favorite',
            method: 'GET',
            data:{

            }
        })
    },
    create_favorite(title){
        return requests({
            url:'/favorite',
            method: 'POST',
            data:{
               title
            }
        })
    },
    update_favorite_name(favorite_id,title){
        return requests({
            url:'/favorite',
            method: 'PUt',
            data:{
                favorite_id,title
            }
        })
    },
    get_favorite_item(favorite_id){
        return requests({
            url:'/favoriteitem',
            method: 'GET',
            params:{
                favorite_id
            }
        })
    },


    delete_favorite(favorite_id){
        return requests({
            url:'/favorite',
            method: 'DELETE',
            data:{
                favorite_id
            }
        })
    },
    get_info(){
        return requests({
            url: '/user/info',
            method: 'GET',
            data:{
            }
        })
    },
    update_info(nickname,avatar){
        return requests({
            url: '/user/update',
            method: 'PUT',
            data:{
                nickname,
                avatar
            }
        })
    },
    get_history(){
        return requests({
            url: '/history',
            method: 'GET',
            data:{

            }
        })
    },
    add_favorite_item(favorite_id,work_id){
        return requests({
            url: '/favoriteitem',
            method: 'POST',
            data:{
                favorite_id,
                work_id
            }
        })
    },
    upload_paper(id,file) {
        const formData = new FormData();
        formData.append('file', file); // 'file' 是后端接收文件的字段名
        return requests({
            url: '/work/upload',
            method: 'POST',
            data: {
                id,
                file,
            },
            headers: {
                'Content-Type': 'multipart/form-data',
                // 如果有需要，可以在这里添加其他请求头
            },
        });
    },

}
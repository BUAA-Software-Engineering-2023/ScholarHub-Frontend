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
    update_info(nickname){
        return requests({
            url: '/user/update',
            method: 'PUT',
            data:{
                nickname
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
    }

}
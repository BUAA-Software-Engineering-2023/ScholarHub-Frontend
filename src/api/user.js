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
    }

}
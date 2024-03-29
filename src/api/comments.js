import requests from "@/utils/request.js";
export default {

    get_comments(work_id,reverse){
        return requests({
            url: '/comment/list',
            method: 'POST',
            data:{
                work_id,
                reverse
            }
        })
    },
    send_comments(work_id,content,reply_id) {
        return requests({
            url: '/comment/create',
            method: 'POST',
            data: {
                work_id,
                content,
                reply_id
            }
        })
    },
    delete_comments(comment_id){
        return requests({
            url: '/comment/delete',
            method: 'DELETE',
            data:{
                comment_id
            }
        })
    },
    top_comments(comment_id){
        return requests({
            url: '/comment/top',
            method: 'PATCH',
            data:{
                comment_id
            }
        })
    },
    untop_comments(comment_id){
        return requests({
            url: '/comment/untop',
            method: 'PATCH',
            data:{
                comment_id
            }
        })
    }
}
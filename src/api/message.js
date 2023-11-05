import requests from "@/utils/request.js";
export default {
    get_messages(){
        return requests({
            url:"/message",
            method:"GET",
        })
    },
    read_message(message_id){
        return requests({
            url:"/message/read",
            method:"PUT",
            data:{message_id}
        })
    },
    read_all_messages(){
        return requests({
            url:"/message",
            method:"PUT",
        })
    }
}
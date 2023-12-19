import requests from "@/utils/request.js";
export default {
    getPortalApply(){
        return requests({
            url: '/author/list-application',
            method: 'GET',
            data:{
            }
        })
    },
    reviewPortalApply(application_id,pass){
        return requests({
            url:'/author/process-application',
            method: 'POST',
            data:{
                application_id,
                pass
            }
        })
    },
    getSystemPaper(){
        return requests({
            url:'/work/list',
            method: 'GET',
            data:{

            }
        })
    },
    reviewPaperApply(id,pass){
        return requests({
            url:'/work/verify',
            method: 'PATCH',
            data:{
                id,
                pass
            }
        })
    },

}
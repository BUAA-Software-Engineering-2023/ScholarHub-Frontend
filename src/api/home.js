import requests from "@/utils/request.js";
export default {
    get_data(){
        return requests({
            url:"/total",
            method:"GET",
        })
    },
    get_recommendation(){
       return requests({
           url:"/recommend",
           method:"GET",
       })
    }
}
import requests from "@/utils/request.js";
export default {
    search_source(search){
        return requests({
            url: '/source/search',
            method: 'POST',
            data:{
                search
            }
        })
    },

    search_source_detail(id) {
        return requests({
            url: '/source/detail',
            method: 'GET',
            params: {
                id
            }
        })
    },

    search_institution(search) {
        return requests({
            url: '/institution/search',
            method: 'POST',
            data: {
                search
            }
        })
    },

    search_institution_detail(id) {
        return requests({
            url: '/institution/detail',
            method: 'GET',
            params: {
                id
            }
        })
    },

    search_concept(search) {
        return requests({
            url: '/concept/search',
            method: 'POST',
            data: {
                search
            }
        })
    },

    search_concept_detail(id) {
        return requests({
            url: '/concept/detail',
            method: 'GET',
            params: {
                id
            }
        })
    },

    search_publisher(search) {
        return requests({
            url: '/publisher/search',
            method: 'POST',
            data: {
                search
            }
        })
    },

    search_publisher_detail(id) {
        return requests({
            url: '/publisher/detail',
            method: 'GET',
            params: {
                id
            }
        })
    },

    search_funder(search) {
        return requests({
            url: '/funder/search',
            method: 'POST',
            data: {
                search
            }
        })
    },

    search_funder_detail(id) {
        return requests({
            url: '/funder/detail',
            method: 'GET',
            params: {
                id
            }
        })
    },
    auto_complete(search){
        return requests({
            url:"/work/autocomplete",
            method:"GET",
            params:{
                search
            },
            noLoading: true // 添加这个配置项
        })
    },
    history(){
        return requests({
            url: "/history",
            method: 'GET',
        })
    },
    search(search){
        return requests({
            url:"/work/search",
            method: 'POST',
            data:{
                search
            },
            showLoading:true,
        })
    },
    author_detail(author_id){
        return requests({
            url: "/author/detail",
            method:"POST",
            data:{
                author_id
            }
        })
    }
}
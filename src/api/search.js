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
    searchWithSort(search, sort){
        return requests({
            url:"/work/search",
            method: 'POST',
            data:{
                search,sort
            },
            showLoading:true,
        })
    },
    searchWithFilter(search, filter){
        return requests({
            url:"/work/search",
            method: 'POST',
            data:{
                search,filter
            },
            showLoading:true,
        })
    },
    searchExpert(search){
        return requests({
            url:"/author/search",
            method: 'POST',
            data:{
                search
            },
            showLoading:true,
        })
    },
    searchExpertWithPage(search,page){
        return requests({
            url:"/author/search",
            method: 'POST',
            data:{
                search,
                page,
            },
            showLoading:true,
        })
    },
    searchExpertWithAll(search,page,filter,sort){
        return requests({
            url:"/author/search",
            method: 'POST',
            data:{
                search,
                page,
                sort,
                filter,
            },
            showLoading:true,
        })
    },
    searchExpertFiltered(search,filter){
        return requests({
            url:"/author/search",
            method: 'POST',
            data:{
                search,
                filter,
            },
            showLoading:true,
        })
    },
    searchExpertSorted(search,sort){
        console.log("Region:",sort);
        return requests({
            url:"/author/search",
            method: 'POST',
            data:{
                search,
                sort,
            },
            showLoading:true,
        })
    },
    searchInstitution(search,page,filter,sort){
        return requests({
            url:"/author/search",
            method: 'POST',
            data:{
                search,
                page,
                sort,
                filter,
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
    },
    institution_detail(id){
        return requests({
            url: "/institution/detail",
            method:"POST",
            data:{
                id
            }
        })
    },
    get_article_detail(work_id){
        return requests({
            url: "/work/detail",
            method:"POST",
            data:{
                work_id
            }
        })
    }
}
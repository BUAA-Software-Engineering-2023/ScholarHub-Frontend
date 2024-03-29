import requests from "@/utils/request.js";
export default {
    search_source(search,page,position){
        return requests({
            url: '/source/search',
            method: 'POST',
            data:{
                search,
                page,
                position
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

    search_institution(search,page,position) {
        return requests({
            url: '/institution/search',
            method: 'POST',
            data: {
                search,
                page,
                position,
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

    search_concept(search,page,position) {
        return requests({
            url: '/concept/search',
            method: 'POST',
            data: {
                search,
                page,
                position
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

    search_publisher(search,page,position) {
        return requests({
            url: '/publisher/search',
            method: 'POST',
            data: {
                search,
                page,
                position
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

    search_funder(search,page,position) {
        return requests({
            url: '/funder/search',
            method: 'POST',
            data: {
                search,
                page,
                position
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
    auto_complete_works(search){
        return requests({
            url:"/work/autocomplete",
            method:"GET",
            params:{
                search
            },
            noLoading: true // 添加这个配置项
        })
    },
    auto_complete_authors(search){
        return requests({
            url:"/author/autocomplete",
            method:"GET",
            params:{
                search
            },
            noLoading: true // 添加这个配置项
        })
    },
    auto_complete_institutions(search){
        return requests({
            url:"/institution/autocomplete",
            method:"GET",
            params:{
                search
            },
            noLoading: true // 添加这个配置项
        })
    },
    auto_complete_concepts(search){
        return requests({
            url:"/concept/autocomplete",
            method:"GET",
            params:{
                search
            },
            noLoading: true // 添加这个配置项
        })
    },
    auto_complete_source(search){
        return requests({
            url:"/source/autocomplete",
            method:"GET",
            params:{
                search
            },
            noLoading: true // 添加这个配置项
        })
    },
    auto_complete_publishers(search){
        return requests({
            url:"/publisher/autocomplete",
            method:"GET",
            params:{
                search
            },
            noLoading: true // 添加这个配置项
        })
    },
    auto_complete_funders(search){
        return requests({
            url:"/funder/autocomplete",
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
    searchArticleWithAll(search,page,filter,sort,position){
        return requests({
            url:"/work/search",
            method: 'POST',
            data:{
                search,
                page,
                sort,
                filter,
                position,
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
    searchExpertWithAll(search,page,filter,sort,position){
        return requests({
            url:"/author/search",
            method: 'POST',
            data:{
                search,
                page,
                sort,
                filter,
                position,
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
    concept_detail(id){
        return requests({
            url: "/concept/detail",
            method:"POST",
            data:{
                id
            }
        })
    },
    funder_detail(id){
        return requests({
            url: "/funder/detail",
            method:"POST",
            data:{
                id
            }
        })
    },
    publisher_detail(id){
        return requests({
            url: "/publisher/detail",
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
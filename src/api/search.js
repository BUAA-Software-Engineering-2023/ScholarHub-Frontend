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
    autocomplete_source(search){
        return requests({
            url: '/source/autocomplete',
            method: 'GET',
            data:{
                search
            }
        })
    },
    autocomplete_institution(search){
        return requests({
            url: '/institution/autocomplete',
            method: 'POST',
            data:{
                search
            }
        })
    },
    autocomplete_concept(search){
        return requests({
            url: '/concept/autocomplete',
            method: 'GET',
            data:{
                search
            }
        })
    },
    autocomplete_publisher(search){
    return requests({
        url: '/publisher/autocomplete',
        method: 'GET',
        data:{
            search
        }
    })
    },
    autocomplete_funder(search){
    return requests({
        url: '/funder/autocomplete',
        method: 'POST',
        data:{
            search
        }
    })
},
}
import {useLocalStorage} from "@vueuse/core";
import Search from  "@/api/search.js"
import { defineStore } from "pinia";
export const useSearchStore = defineStore({
    id: "search",
    state:()=>{
        return{
            // 要保存的字段
            searchType:useLocalStorage(("searchType"),"works"),
            searchInput: useLocalStorage("searchInput",""),
            // 历史记录
            historyList: useLocalStorage("historyList",[]),
        }
    },
    actions:{
        setSearchType(searchType){
            this.searchType = searchType;
        },
        setSearchInput(searchInput){
          this.searchInput = searchInput;
        },
        setSearchHistory(searchHistoryList){
            this.historyList = searchHistoryList;
            console.log(searchHistoryList)
        },
        addHistory(newHistory){
            const index = this.historyList.findIndex(
                (item)=>item===newHistory
            );
            if (index!==-1){
                this.historyList.splice(index,1);
            }
            this.historyList.unshift(newHistory);
        },
        deleteAlleHistory(){
            this.historyList=[];
        }
    }

})
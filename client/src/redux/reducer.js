import {
    GET_ALL_VGAMES, GET_DETAIL, GET_GENRES, POST_VGAME, PAGINADO, 
    SEARCH_NAME, DELETE_VGAME, UPDATE_VGAME, CLEAR_DETAIL,
    FILTER_BANK, REMOVE_FILTER, FILTER_APPLY, REMOVE_ALL_FILTER,
    ERRORS, CLEAR_ERRORS, NOT_RELOAD
   } from "./actions";

// Initial state for the Redux store
let initialState ={
    videoGames :[],
    pageNumbers:[],
    gamesFiltered: [],
    detail: {},
    genres: [],
    coincidences: true,
    arr_of_filterObjs: [],
    errors: {},
    not_reload: false,
    paginado: [],
    currentPage: 1,
    pages: [],
    filteredPaginate:[]
}


// Reducer function for handling Redux actions
function rootReducer(state = initialState, action){
    const ITEMS_PER_PAGE = 15;

    switch(action.type){
        case GET_ALL_VGAMES:
            // Handle getting all videogames and paginating them
            const totalPagesGet = Math.ceil(action.payload.length / ITEMS_PER_PAGE)
            const pagesGet = [...Array(totalPagesGet + 1).keys()].slice(1)

            const indexOfLastP = state.currentPage * ITEMS_PER_PAGE
            const indexOfFirstP = indexOfLastP- ITEMS_PER_PAGE

            const vgRenderGet = action.payload.slice(indexOfFirstP, indexOfLastP)
            return {
                ...state,
                videoGames: action.payload,
                filteredPaginate: action.payload,
                pages: pagesGet,
                paginado: vgRenderGet

            }
        case PAGINADO:
            // Handle paginating the videogames
            var current
          if(isNaN(action.payload)){
            if(action.payload === "next"){
                if(state.currentPage !== state.pages.length){ current = state.currentPage +1}
                else{
                    return {...state}
                }
            }else if(action.payload === "end"){
                if(state.currentPage !== state.pages.length){
                    current = state.pages.length;
                }else{
                    return{...state}
                }
            }else if(action.payload === "prev"){
                if(state.currentPage !== 1){
                    current = state.currentPage -1
                  }else{
                        return{...state}
                    }
            }else if(action.payload === "start"){
                if(state.currentPage !== 1){
                  current = 1
                }else{
                    return{...state}
                }
            }}else{
                current = action.payload
            }
            const totalPages = Math.ceil(state.filteredPaginate.length / ITEMS_PER_PAGE)
            const pages = [...Array(totalPages + 1).keys()].slice(1)

            const indexOfLastPage = current * ITEMS_PER_PAGE
            const indexOfFirstPage = indexOfLastPage - ITEMS_PER_PAGE

            const vgRender = state.filteredPaginate.slice(indexOfFirstPage, indexOfLastPage)
             return{
                ...state,
                currentPage: current,
                paginado: vgRender,
                pages:pages
             } 

        case GET_DETAIL:
            // Handle getting the details of a specific videogame
            return{
                ...state,
                detail: action.payload
            } 
        case NOT_RELOAD:
            // Handle the notReload state
            return{
                ...state,
                not_reload: action.payload
            }
        case GET_GENRES: 
         // Handle getting the list of genres
            return{
                ...state,
                genres: action.payload
            }
        case ERRORS:
            // Handle errors and store them in the state
            const objError = action.payload
            return{
                ...state,
                errors: {...state.errors, [objError.type]: objError.error}
            }
        case CLEAR_ERRORS:
             // Handle clearing error messages
            return{
                ...state,
                errors: {}
            }    
        case POST_VGAME:
              // Handle post videogame action
            return{
                ...state,
                errors: {}
            }    
        
        case FILTER_BANK:
            let array = state.arr_of_filterObjs;
            //Checking there is no repeated filters
            if(action.payload.type === "games") array = array.filter((x)=>x.type !== "games") 
            if(action.payload.type === "sort") array = array.filter((x)=>x.type !== "sort")
            if(action.payload.type === "genres") array = array.filter((x)=>x.type !== "genres")
            array = [...array, action.payload]
            return{
            ...state,
            arr_of_filterObjs: array
            }

        case REMOVE_FILTER:
            //Handle the removal of a filter before applying it
            let arr = state.arr_of_filterObjs;
            let deletedFilter = arr.filter((x)=> x.value !== action.payload)
            return{
                ...state,
                arr_of_filterObjs: deletedFilter
            }
        case FILTER_APPLY:
            //Handle filters to apply simultaneously
            const filterObjs = state.arr_of_filterObjs;
            const games = filterObjs.find(x=>x.type === "games")
            const sort = filterObjs.find(x=>x.type === "sort")
            const genres = filterObjs.find(x=>x.type === "genres")
            
            let videoGames = state.videoGames

            if(games){
                if(games.value === "Existing"){
                    videoGames = videoGames.filter(x=>!x.createdInDb)
                }else if(games.value === "Created"){
                    videoGames = videoGames.filter(x=> x.createdInDb)
                }
            }
            if(sort){
                if(sort.value === "A-Z"){
                    videoGames = videoGames.sort((a,b)=> a.name.localeCompare(b.name))
                }else if(sort.value === "Z-A"){
                    videoGames = videoGames.sort((a,b)=> b.name.localeCompare(a.name))
                }else if(sort.value === "Increase Rating"){
                    videoGames = videoGames.sort((a,b)=> a.rating - b.rating)
                }else if(sort.value === "Decrease Rating"){
                    videoGames = videoGames.sort((a,b)=> b.rating - a.rating)
                }
            }
            if(genres){
                videoGames = videoGames.filter(x =>x.genres.some(j=>j.name === genres.value))
            }
            if(videoGames.length >0){
                const totalPages = Math.ceil(videoGames.length / ITEMS_PER_PAGE)
                const pages = [...Array(totalPages + 1).keys()].slice(1)

                const indexOfLastPage = ITEMS_PER_PAGE
                const indexOfFirstPage = indexOfLastPage - ITEMS_PER_PAGE

                const vgRender = videoGames.slice(indexOfFirstPage, indexOfLastPage)

                return{
                    ...state,
                    currentPage: 1,
                    filteredPaginate: videoGames,
                    pages: pages,
                    paginado: vgRender
                }
            } else{
                return{
                    ...state, coincidences:false, paginado:[]
                }
            }


        case REMOVE_ALL_FILTER:
            //Handle the removal of all filters
            return{
                ...state,
                arr_of_filterObjs: []
            }    

        case SEARCH_NAME:
            //Handle search by name and pagination
            const response = action.payload
            if(response.length>0){
                const totalPages = Math.ceil(response.length / ITEMS_PER_PAGE)
                const pages = [...Array(totalPages + 1).keys()].slice(1)

                const indexOfLastPage = ITEMS_PER_PAGE
                const indexOfFirstPage = indexOfLastPage - ITEMS_PER_PAGE

                const vgRender = response.slice(indexOfFirstPage, indexOfLastPage)

              return{
                ...state,
                currentPage: 1,
                filteredPaginate: response,
                pages: pages,
                paginado: vgRender,
                coincidences: true
              }
            }else{
              return{
                ...state,
                coincidences: false,
                paginado:[]
              }
            };  
        case DELETE_VGAME:
              // Handle delete videogame action
            return{
                ...state
            }   
        case UPDATE_VGAME:
             // Handle update videogame action
            return {
                ...state,
                detail:  action.payload
            }      
        case CLEAR_DETAIL:
             // removes the detail of an videogame once unmounted
             return{
                ...state, detail: {}
             }               
        default:
            return{
                ...state
            }
        }
};

export default rootReducer;
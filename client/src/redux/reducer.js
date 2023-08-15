import {
    GET_ALL_VGAMES, 
    GET_DETAIL, 
    GET_GENRES, 
    POST_VGAME, 
    PAGINADO, 
    CREATED_FILTER, 
    RATING_FILTER,
    ORDER_FILTER,
    GENRES_FILTER,
    SEARCH_NAME,
    DELETE_VGAME,
    UPDATE_VGAME,
    CLEAR_DETAIL,
    FILTER_BANK,
    REMOVE_FILTER, 
    FILTER_APPLY,
    REMOVE_ALL_FILTER,
    ERRORS,
    CLEAR_ERRORS,
    NOT_RELOAD
   } from "./actions";

let initialState ={
    videoGames :[],
    paginado: [],
    pageNumbers:[],
    currentPage: 0,
    gamesFiltered: [],
    filter: false,
    detail: {},
    genres: [],
    coincidences: true,
    arr_of_filterObjs: [],
    errors: {},
    not_reload: false
}

function rootReducer(state = initialState, action){
    const ITEMS_PER_PAGE = 15;
    switch(action.type){
        case GET_ALL_VGAMES:
            return {
                ...state,
                videoGames: action.payload,
                paginado: [...action.payload].splice(0,ITEMS_PER_PAGE)
            }

            case PAGINADO:
                const next_page = state.currentPage +1;
                const prev_page = state.currentPage -1;
                const first_index = action.payload === "next" ? next_page * ITEMS_PER_PAGE : prev_page * ITEMS_PER_PAGE;
                if(action.payload === "prev" && prev_page < 0){return {...state}}
    
                if(state.filter){
                    if(first_index >= state.gamesFiltered.length) {return {...state}}
                    return{
                        ...state,
                        paginado: [...state.gamesFiltered].splice(first_index, ITEMS_PER_PAGE),
                        currentPage: action.payload === "next"? next_page : prev_page
                      }
                }
    
                if (action.payload === "next" && first_index >= [...state.videoGames].length) {return {...state}}
    
                return{
                    ...state,
                    paginado: [...state.videoGames].splice(first_index, ITEMS_PER_PAGE),
                    currentPage: action.payload === "next"? next_page : prev_page
             }
        case GET_DETAIL:
            return{
                ...state,
                detail: action.payload
            } 
        case NOT_RELOAD:
            return{
                ...state,
                not_reload: action.payload
            }
        case GET_GENRES: 
            return{
                ...state,
                genres: action.payload
            }
        case ERRORS:
            const objError = action.payload
            return{
                ...state,
                errors: {...state.errors, [objError.type]: objError.error}
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                errors: {}
            }    
        // case CREATED_FILTER:
        //     if(action.payload === "created"){
        //         return{
        //             ...state,
        //             gamesFiltered: [...state.videoGames].filter(el=>el.createdInDb),
        //             paginado : [...state.videoGames].filter(el=>el.createdInDb).splice(0,ITEMS_PER_PAGE),
        //             filter: true
        //           }
        //     }else if(action.payload === "api"){
        //         return{
        //             ...state,
        //             gamesFiltered:[...state.videoGames].filter(el=> !el.createdInDb), 
        //             paginado : [...state.videoGames].filter(el=> !el.createdInDb).splice(0,ITEMS_PER_PAGE),
        //             filter: true
        //            }
        //         }
         
        // case RATING_FILTER:
        //     let rating;
        //     if(action.payload === "inc"){
        //         rating = [...state.videoGames].sort((a,b)=> a.rating - b.rating)
        //     }else if(action.payload === "dec"){
        //         rating = [...state.videoGames].sort((a,b)=> b.rating - a.rating)
        //     }
        //     return {
        //         ...state,
        //         filter: true,
        //         gamesFiltered: rating,
        //         paginado: rating.splice(0,ITEMS_PER_PAGE)
        //     };
        // case ORDER_FILTER:
        //         let order;
        //         if(action.payload === "inc_aZ"){
        //             order = [...state.videoGames].sort((a,b)=> a.name.localeCompare(b.name))
        //         }else if(action.payload === "dec_zA"){
        //             order = [...state.videoGames].sort((a,b)=> b.name.localeCompare(a.name))
        //         }
        //         return {
        //             ...state,
        //             filter: true,
        //             gamesFiltered: order,
        //             paginado: order.splice(0,ITEMS_PER_PAGE)
        //         }; 
        // case GENRES_FILTER:
        //     const videoGames = state.videoGames;
        //     let newArr = [];

        //     videoGames.forEach((g)=>{
        //       if(g.genres){
        //         const aux = g.genres.map(x=>x.name === action.payload)
        //         if(aux.includes(true)){
        //             newArr.push(g)
        //         }
        //       }
        //     })
        //     return{
        //         ...state,
        //         gamesFiltered: newArr,
        //         paginado: newArr.splice(0,ITEMS_PER_PAGE),
        //         filter : true
        //      }  
        case FILTER_BANK:
           let array = state.arr_of_filterObjs;
           //me aseguro q no haya dos iguales
           if(action.payload.type === "games") array = array.filter((x)=>x.type !== "games") 
        //    if(action.payload.type === "rating") array = array.filter((x)=>x.type !== "rating")
           if(action.payload.type === "sort") array = array.filter((x)=>x.type !== "sort")
           if(action.payload.type === "genres") array = array.filter((x)=>x.type !== "genres")
           array = [...array, action.payload]
           return{
            ...state,
            arr_of_filterObjs: array
           }

        case REMOVE_FILTER:
            let arr = state.arr_of_filterObjs;
            let deletedFilter = arr.filter((x)=> x.value !== action.payload)
            return{
                ...state,
                arr_of_filterObjs: deletedFilter
            }
        case FILTER_APPLY:
            const filterObjs = state.arr_of_filterObjs;
            const games = filterObjs.find(x=>x.type === "games")
            // const rating = filterObjs.find(x=>x.type === "rating")
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
            // if(rating){
            //     if(rating.value === "Increase Rating"){
            //         videoGames = videoGames.sort((a,b)=> a.rating - b.rating)
            //     }else if(rating.value === "Decrease Rating"){
            //         videoGames = videoGames.sort((a,b)=> b.rating - a.rating)
            //     }
            // }
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
                return{
                    ...state,
                    gamesFiltered: videoGames,
                    paginado: videoGames.splice(0,ITEMS_PER_PAGE),
                    filter: true
                }
            } else{
                return{
                    ...state, coincidences:false, paginado:[]
                }
            }
        case REMOVE_ALL_FILTER:

            return{
                ...state,
                arr_of_filterObjs: []
            }    

        case SEARCH_NAME:
            const response = action.payload
            if(response.length>0){
              return{
                ...state,
                gamesFiltered: response,
                paginado: response.splice(0,ITEMS_PER_PAGE),
                filter: true,
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
            return{
                ...state
            }   
        case UPDATE_VGAME:
            return {
                ...state,
                detail:  action.payload
            }      
        case CLEAR_DETAIL:
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
import axios from 'axios';

// Action types
export const GET_ALL_VGAMES = "GET_ALL_VGAMES";
export const GET_DETAIL = "GET_DETAIL";
export const GET_GENRES = "GET_GENRES";
export const POST_VGAME = "POST_VGAME";
export const PAGINADO = "PAGINADO";
export const SEARCH_NAME = "SEARCH_NAME";
export const DELETE_VGAME = "DELETE_VGAME";
export const UPDATE_VGAME = "UPDATE_VGAME";
export const CLEAR_DETAIL = "CLEAR_DETAIL";
export const FILTER_BANK = "FILTER_BANK";
export const REMOVE_FILTER = "REMOVE_FILTER";
export const FILTER_APPLY = "FILTER_APPLY";
export const REMOVE_ALL_FILTER = "REMOVE_ALL_FILTER";
export const ERRORS = "ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";
export const NOT_RELOAD = "NOT_RELOAD";


// Action to get all videogames
export function getAllVGames(){
 return async function(dispatch){
    try {
        const response = (await axios.get("http://localhost:3001/videogames")).data
        dispatch({
            type: GET_ALL_VGAMES,
            payload: response
        })
    } catch (error) {
        throw Error(error.message)
    }
 }
};


// Action to update the paginado state
export function paginado(value){
    return async function(dispatch){
     dispatch({
         type: PAGINADO,
         payload: value
     })
    }
 };


 // Action to get the details of a specific videogame
export function getDetail(id){
    return async function(dispatch){
        try {
            const response = (await axios.get("http://localhost:3001/videogames/" + id)).data
            dispatch({
                type: GET_DETAIL,
                payload: response
            })
        } catch (error) {
            throw Error(error.message)
        }
    }
};



// Action to clear the detail state
export function clearDetail(){
    return async function(dispatch){
     dispatch({
        type: CLEAR_DETAIL,
     })
    }
};


// Action to get the list of genres
export function getGenres(){
    return async function(dispatch){
        try {
            const response = (await axios.get("http://localhost:3001/genres")).data
            dispatch({
                type: GET_GENRES,
                payload: response
            })
        } catch (error) {
            throw Error(error.message)
        }
    }
};


// Action to post a new videogame
export function postVgame(payload){
    return async function(dispatch){
        try {
            const headers={'Content-Type':'application/json'}
            const response = await axios.post("http://localhost:3001/videogames", payload, {headers})
            dispatch({
                type: POST_VGAME,
                payload: response.data
            })
            return false
        } catch (error) {
            dispatch({
                type: ERRORS,
                payload: {type:"postVideogame",error:error.response.data}
            })
            return error
        }
    }
};


// Action to set new error messages
export function setNewErrors(obj){
    return async function(dispatch){
        dispatch({
            type: ERRORS,
            payload: obj
        })
    }
};


// Action to clear error messages
export function clearErrors(){
    return async function(dispatch){
        dispatch({
            type: CLEAR_ERRORS
        })
    }
};


// Action to update the notReload state
export function notReload(boolean){
    return async function(dispatch){
        dispatch({
            type: NOT_RELOAD,
            payload: boolean
        })
    }
};


// Action to filter videogames
export function filterBank(filterObj){
    return async function(dispatch){
        dispatch({
            type: FILTER_BANK,
            payload: filterObj
        })
    }
};



// Action to remove a filter
export function removeFilter(value){
    return async function(dispatch){
        dispatch({
            type: REMOVE_FILTER,
            payload: value
        })
    }
};


// Action to apply filters
export function filterApply(){
    return async function(dispatch){
        dispatch({
            type: FILTER_APPLY
        })
    }
};


// Action to remove all filters
export function removeAllFilter(){
    return async function(dispatch){
        dispatch({
            type: REMOVE_ALL_FILTER
        })
    }
};


// Action to search for videogames by name
export function searchName(name){
    return async function(dispatch){
        const response = (await axios.get("http://localhost:3001/videogames?name=" + name)).data
        dispatch({
            type: SEARCH_NAME,
            payload: response
        })
    }
};


// Action to delete a videogame
export function deleteVgame(id){
    return async function(dispatch){
        try {
            const response = await axios.delete("http://localhost:3001/delete/" + id)
            dispatch({
                type: DELETE_VGAME,
                payload: response.data
            })
        } catch (error) {
            throw Error(error.message)
        }
    }
};


// Action to update a videogame
export function updateVgame(payload, id){
    return async function(dispatch){
        try {
            const headers={'Content-Type':'application/json'}
            const response = await axios.patch(`http://localhost:3001/update/${id}`, payload, {headers})
            dispatch({
                type: UPDATE_VGAME,
                payload: response.data
            })
            return false
        } catch (error) {
            dispatch({
                type: ERRORS,
                payload: {type:"updateVideogame", error:error.response.data}
            })
            return error
        }
    }
};

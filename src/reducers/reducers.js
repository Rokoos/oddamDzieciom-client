import {
    LOGGED_IN_USER, 
    LOGOUT,
    SET_FILTERS,
    CLEAR_FILTERS,
    PAGE_NUM
} from '../actions/types'

export const userReducer= (state = null, {type, payload}) => {
    switch (type) {
        case LOGGED_IN_USER:
            return payload
        case LOGOUT:
            return payload    
        default:
            return state      
    }
}


export const filtersReducer= (state = null, {type, payload}) => {
    switch (type) {
        case SET_FILTERS:
            return payload   
        case CLEAR_FILTERS:
            return payload  
        default:
            return state      
    }
}


export const pageReducer= (state = 1, {type, payload}) => {
    switch (type) {
        case PAGE_NUM:
            return payload    
        default:
            return state      
    }
}
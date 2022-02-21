import {
  LOGGED_IN_USER,
  LOGOUT,
  SET_FILTERS,
  CLEAR_FILTERS,
  PAGE_NUM
} from './types'

// userReducer

export const loggedIn = ( name, email, token, role, _id, location) => ({
  type: LOGGED_IN_USER,
  payload: {
      name,
      email,
      token,
      role,
      _id,
      location
    }
})

export const userLogout = () => ({
  type: LOGOUT,
  payload: null
})

//filters reducer

export const setFilters = (filters) => ({
  type: SET_FILTERS,
  payload: filters
})

export const clearFilters = () => ({
  type: CLEAR_FILTERS,
  payload: null
})


//page reducer

export const setPageNum = (num) => ({
  type: PAGE_NUM,
  payload: num
})

import axios from 'axios'

// export const createOrUpdateUser = async (user, authtoken) => {
//   return await axios.post(`${process.env.REACT_APP_API}/create-or-update-user`,
//   user,
//      {
//       headers:{
//         authtoken
//       }
//     })
// }




export const currentUser = async (authtoken) => {
  return await axios.post(`${process.env.REACT_APP_API}/current-user`,
     {}, 
     {
      headers:{
        authtoken
      }
    })
}

export const admin = async (authtoken) => {
  return await axios.post(`${process.env.REACT_APP_API}/admin-products`,
     {}, 
     {
      headers:{
        authtoken
      }
    })
}

export const removeUserByAdmin = async (authtoken, id) => {
 return await axios.post(`${process.env.REACT_APP_API}/admin-remove-user/${id}`, {id},
 {
  headers: {
      authtoken
  }
})
}


export const signin = async ({email, password}) => {
  return await axios.post(`${process.env.REACT_APP_API}/signin`, {email, password}) 
}

export const signup = async ({name,email, password, location}) => {
  return await axios.post(`${process.env.REACT_APP_API}/signup`, {name, email, password, location}) 
}


export const isAuthenticated = () => {
  if(typeof window == 'undefined'){
      return false
  }

  if(localStorage.getItem('userTkn')){
      return JSON.parse(localStorage.getItem('userTkn'))
  }else{
      return false
  }

}
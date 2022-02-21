import axios from 'axios'


export const deleteUser = async (id, authtoken) =>  await axios.delete(`${process.env.REACT_APP_API}/user/${id}`, {
  headers: {
      authtoken
  }
})

export const getUser = async (id) =>  await axios.get(`${process.env.REACT_APP_API}/user/${id}`)


export const sendEmail = async (authtoken,data) => await axios.post(`${process.env.REACT_APP_API}/send-email`,{data}, {
  headers: {
      authtoken
  }
})

export const getUsersByCount = async (count) =>  await axios.get(`${process.env.REACT_APP_API}/users/${count}`)

export const getUsersCount = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/users/total`)

}

export const getUsers = async (sort, order, page, num) =>  await axios.post(`${process.env.REACT_APP_API}/users`,{sort, order, page, num})
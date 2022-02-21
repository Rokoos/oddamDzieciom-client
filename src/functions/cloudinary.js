import axios from 'axios'

export const deleteUserPhotos = (products, user) => {
  
    let items = products.map(product => product.image.public_id)
    axios.post(`${process.env.REACT_APP_API}/removeimages`, items,
  {
    headers:{
      authtoken: user ? user.token : ''
    }
  })
  
  
  

}

export const removeProductPhoto = (public_id, authtoken) => {
  axios.post(`${process.env.REACT_APP_API}/removeimages`, [public_id],
  {
    headers:{
      authtoken
    }
  })
  
}
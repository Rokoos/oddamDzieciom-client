import React, {Fragment} from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

const FileUploader = ({
  values,
  setValues,
  setPhoto
}) => {


  const user = useSelector(state => state.user)

const handleImageRemove = (public_id) => {
  axios.post(`${process.env.REACT_APP_API}/removeimages`, [public_id],
  {
    headers:{
      authtoken: user.token
    }
  })
  .then(res => {
    setValues({...values, image:''})
  })
  .catch(err => {
    console.log(err)
  })
}
  

  const addPhoto = (e) => {

  let file = e.target.files[0]
  setPhoto(file)
  const tempPhoto = {
    url: window.URL.createObjectURL(file)
  }
  setValues({...values, image: tempPhoto })
    e.target.value = null
  }


  return (
    <Fragment>
    <div className="row"
    style={{display: 'flex', justifyContent: 'center'}}>
      {values.image && (
        <div className="edit_post-photo" style={{
          position:'relative', 
          // backgroundColor:'gray'
        }}>
        <p
        onClick={() => handleImageRemove(values.image.public_id)}
        style={{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',  
        position:'absolute',
        right:0,
        width:'2rem',
        height:'2rem',
        backgroundColor:'red',
        borderRadius:'50% 50%',
        color:'#fff',
        cursor:'pointer'
      }}
        >x</p>
        <img className="img-fluid z-depth-1 mb-3" src={values.image.url}
        
        style={{height: "10rem"}} alt="product"/> 
      </div> 
        
      ) 
          }
    </div>
      <div className="row mt-3 mb-3"
      style={{display: 'flex', justifyContent: 'center'}}>
          <label className="btn btn-primary btn-raised" >Dodaj zdjęcie
              <input 
              disabled={values.image}
              hidden
              type="file" accept="images/*"
              onChange={addPhoto}/>
          </label>
      </div>
  </Fragment>
  )
}

export default FileUploader





         
import React, {useState, useCallback, useEffect, Fragment} from 'react'
import {toast} from 'react-toastify'
import { useSelector} from 'react-redux'
import {getProduct, updateProduct} from '../../functions/product'
import ProductUpdateForm from './ProductUpdateForm'
import Spinner from '../Spinner'
import FileUploader from '../FileUploader'
import {initState, categories} from '../../utils'
import Resizer from 'react-image-file-resizer'
import axios from 'axios'

const UpdateProduct = ({match, history}) => {

  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState(initState)
  const [photo, setPhoto] = useState('')
  

  const {id} = match.params

  const user = useSelector(state => state.user)

  const fetchProduct = useCallback(() => {
    setLoading(true)
    getProduct(id)
        .then(p => {
          setValues(values => ({ ...values, ...p.data }))
          setLoading(false)
        })
}, [id, setValues])


useEffect(() => {
  fetchProduct()
}, [fetchProduct])

const handleSubmit =e => {
  e.preventDefault()

 if(photo){
  Resizer.imageFileResizer(photo, 720, 720, 'JPEG', 100, 0, (uri) => {
    axios.post(`${process.env.REACT_APP_API}/uploadimage`, 
    { image: uri, userId: user._id},
    {
      headers:{
        authtoken: user.token
      }
    }
    )
    .then(res => {
      setValues({...values, image: res.data})
      updateProduct(id,{...values, image: res.data}, user.token)
      .then(response => {
      toast.success(`Edytowano ${response.data.title}!`)
      history.push('/')
    })
    })
    .catch(err => {
      console.log(err)
      toast.error(err.response.data.error)
    })
  },
  "base64"
  )
 } else {
  updateProduct(id, values, user.token)
  .then(res => {
    toast.success(`Edytowano ${res.data.title}!`)
    history.push('/')
  })
  .catch(err => {
    console.log(err)
    toast.error(err.response.data.error)
  })
 }
  

  
}



const handleChange = e => {
  setValues({...values, [e.target.name]: e.target.value})
}

  return (
    <div className="container mt-5 ">
    <div className="row">
      <div className="col-md-10 mx-auto">
        {
            loading ? <Spinner/> : (
              <Fragment>
                <FileUploader
                  className="text-center"
                  values={values}
                  setValues={setValues}
                  setLoading={setLoading}
                  setPhoto={setPhoto}
                />
                <ProductUpdateForm
                  handleSubmit={handleSubmit}
                  handleChange={handleChange}
                  ctgs={categories}
                  values={values}
                  />
              </Fragment>  
            )
          }  
      </div>
    </div>
  </div>
  )
}

export default UpdateProduct

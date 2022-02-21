import React, {useState, Fragment} from 'react'
// import ProductCreateForm from '../../../components/ProductCreateForm'
import {toast} from 'react-toastify'
import { useSelector} from 'react-redux'
import {createProduct} from '../../functions/product'
import ProductCreateForm from './ProductCreateForm'
import Spinner from '../Spinner'
import FileUploader from '../FileUploader'
import {initState, categories} from '../../utils'

import Resizer from 'react-image-file-resizer'
import axios from 'axios'



const ProductCreate = ({history}) => {

  const user = useSelector(state => state.user)

  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState(initState)
  const [photo, setPhoto] = useState('')


  const handleChange = e => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  const handleSubmit =  e => {
      e.preventDefault()
      setLoading(true)
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
            createProduct(user._id,{...values, image: res.data, location: user.location}, user.token)
            .then(res => {
            setValues(initState)
            setLoading(false)
            toast.success('Dodano produkt!')
          })
          })
          .catch(err => {
            // setLoading(false)
            console.log(err)
          })
        },
        "base64"
        )
      }


      createProduct(user._id,{...values, location: user.location}, user.token)
            .then(res => {
            setValues(initState)
            setLoading(false)
            toast.success('Dodano produkt!')
          })
          .catch(err => {
            // setLoading(false)
            console.log(err)
          })

      
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
                  <ProductCreateForm
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

export default ProductCreate

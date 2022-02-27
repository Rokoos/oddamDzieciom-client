import React, { Fragment, useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {userLogout } from '../../actions'
import {deleteUser, getUser } from '../../functions/user'
import { productsByUser} from '../../functions/product'
import { removeUserByAdmin} from '../../functions/auth'
import Product from '../../components/Product/Product'
import Spinner from '../../components/Spinner'
import { logout} from '../../utils'
import {toast} from 'react-toastify'
import ConfirmModal from "../../components/Product/Modals/ConfirmModal"

import { deleteUserPhotos} from '../../functions/cloudinary'


const UserProfile = ({match, history}) => {
  const [userData, setUserData] = useState('')
  const [ products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)


  const [modalVisible, setModalVisible] = useState(false)

  const handleModal = () => setModalVisible(true)

  const userId = match.params.userId
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)



  
  const removeUser = () => {

  logout()
  deleteUserPhotos(products, user)
  deleteUser(userId, user.token)
        .then(res => {
          dispatch(userLogout())
          toast.success('Do zobaczenia ponownie!')
          history.push('/')
        })
        .catch(err => {
          console.log(err)
          if (err.response.status === 400) toast.error(err.response.data)
        })


  }


  const removeByAdmin = () => {
    deleteUserPhotos(products, user)
    removeUserByAdmin(user.token, userId )
    .then(res => history.push('/admin-users'))
  }

  const whoInCharge = () => {
    if(user.role === 'admin') {
      return removeByAdmin()
    }else if(user.role === 'giver'){
      return removeUser()
    }
  }


  const fetchUser = useCallback(() => {
    setLoading(true)
    getUser(userId)
    .then(res => {
        setUserData(res.data)
        productsByUser(userId)
    .then(res => {
        setProducts(res.data)
        setLoading(false)
    })
    })
    .catch(error => {
      toast.error(error.response.data.error)
      history.push('/products')
    })
}, [userId, history]) 




useEffect(() => {
    fetchUser()
}, [userId,
   fetchUser
  ])

const renderProfileData = () => (
  <Fragment>
  {user  && 
    (
      <div className="row">
        <div className="col-md-8 mb-5">
          <div className="lead mt-2">
        <p >Użytkownik: {" "}<span className="font-italic">{userData.name}</span></p>
        <p >Kontakt: {" "}<span className="font-italic">{userData.email}</span></p>
        <p >Lokalizacja: {" "}<span className="font-italic">{userData.location}</span></p>
          </div>
        </div>
      </div>
    )
}
  {
    user && user._id === userData._id && (
      <div className="d-flex flex-column mx-auto" style={{maxWidth:'200px'}}>
      <Link to={`/product/create`} className="btn btn-raised btn-info  mb-4 custom_btn">
          Dodaj produkt
      </Link>
      <button onClick={ () => {
        handleModal()
      }   
      } className="btn btn-raised btn-danger  mb-2 custom_btn">Usuń profil</button>  
  </div>
    )
  }
 

  </Fragment>
)

  return (
    <div className="container" style={{marginTop:'100px'}}>
    {user && <h4 className="mt-5 mb-5 ">Profil użytkownika</h4>}
    
      {loading ? <Spinner/> : 
        (
      <Fragment>
      {renderProfileData()}
      {
        user && user.role === 'admin' && (
            <div className="text-center mb-4">
            <div className=" btn btn-raised btn-danger"
            onClick={ () => {
              handleModal()
            }   
            }
            >Usuń użytkownika</div>
            </div>
          )
      }
  <div className="row mb-5">
    <div className="col md-12">
    {
      products.length === 0 ? (<h4>{userData.name} dodał 0 produktów</h4>) : (
        <Fragment>
        <h4 className="mb-5 mt-5">Produkty użytkownika "<i>{userData.name}</i>"</h4>
         <div className="posts_container">
            {products.map(p => <Product  product={p}  key={p._id} />)}  
        </div>
        </Fragment>
      )
    } 
      </div>
  </div>
      </Fragment>)
      } 
      
      <ConfirmModal
      title={`Czy na pewno chcesz usunąć użytkownika ${userData.name} ?`} 
      modalVisible={modalVisible} 
      setModalVisible={setModalVisible} 
      remove={whoInCharge}
      />
     
    </div>
  )
}

export default UserProfile
